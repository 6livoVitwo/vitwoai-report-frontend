import React, { useState, useEffect, useRef } from "react";
import CustomTable from "./purchaseVendorWiseCustomTable";
import { Box, Spinner, Image, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import NoDataFound from "../../../asset/images/nodatafound.png";
import { useVendorWisePurchaseQuery } from "../slice/purchaseVendorWiseApi";
import { useFetchDataQuery } from "../slice/purchaseVendorWiseApi";

let filters = {
  data: [
    "grnInvoice.vendorCode",
    "grnInvoice.vendorName",
    "SUM(grnInvoice.grnSubTotal)",
    "SUM(grnInvoice.grnTotalCgst)",
    "SUM(grnInvoice.grnTotalSgst)",
    "SUM(grnInvoice.grnTotalIgst)",
    "SUM(grnInvoice.grnTotalTds)",
    "SUM(grnInvoice.grnTotalAmount)",
    "SUM(grnInvoice.dueAmt)",
  ],
  groupBy: ["grnInvoice.vendorCode", "grnInvoice.vendorName"],
  filter: [
    {
      column: "companyId",
      operator: "equal",
      type: "integer",
      value: 1,
    },
    {
      column: "branchId",
      operator: "equal",
      type: "integer",
      value: 1,
    },
    {
      column: "locationId",
      operator: "equal",
      type: "integer",
      value: 1,
    },
  ],
  page: 0,
  size: 20,
  "sortDir": "asc",
  "sortBy": "grnInvoice.vendorCode"
};
const PurchaseVendorWiseTableView = () => {
  const authData = useSelector((state) => state.auth);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const [individualItems, setIndividualItems] = useState([]);
  const toast = useToast();

  const {
    data: sales,
    isLoading,
    isFetching,
    error,
  } = useVendorWisePurchaseQuery({
    filters,
    page,
    size,
    authDetails: authData.authDetails,
  });

  const pageInfo = sales?.lastPage;

  const tableContainerRef = useRef(null);

  const flattenObject = (obj, prefix = "") => {
    let result = {};
    for (let key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        if (Array.isArray(obj[key])) {
          obj[key].forEach((item, index) => {
            Object.assign(
              result,
              flattenObject(item, `${prefix}${key}[${index}].`)
            );
          });
        } else {
          Object.assign(result, flattenObject(obj[key], `${prefix}${key}.`));
        }
      } else {
        result[`${prefix}${key}`] = obj[key];
      }
    }
    return result;
  };

  const extractFields = (data, index) => ({
    "SL No": index + 1,
    "Vendor Name": data["grnInvoice.vendorName"],
    "Vendor Code": data["grnInvoice.vendorCode"],
    "Sub Total": data["SUM(grnInvoice.grnSubTotal)"],
    "Total CGSt": data["SUM(grnInvoice.grnTotalCgst)"],
    "Total Sgst": data["SUM(grnInvoice.grnTotalSgst)"],
  });

  useEffect(() => {
    if (sales?.content?.length) {
      const newItems = sales.content.flatMap((invoice) => {
        const flattenedInvoice = flattenObject(invoice);
        return invoice.items?.length
          ? invoice.items.map((item) => {
            const flattenedItem = flattenObject(item, "item.");
            return { ...flattenedInvoice, ...flattenedItem };
          })
          : [flattenedInvoice];
      });
      setIndividualItems((prevItems) => [...prevItems, ...newItems]);
    }
  }, [sales]);

  if (isLoading) {
    return (
      <Box
        height="calc(100vh - 75px)"
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    );
  }
  if (error) {
    return (
      <Box
        bg="white"
        width="100%"
        height="calc(100vh - 103px)"
        display="flex"
        alignItems="center"
        justifyContent="center">
        <Image src={NoDataFound} alt="No Data Available" />
      </Box>
    );
  }

  if (sales?.
    totalPages < page) {
    toast({
      title: 'No More Data',
      description: 'You have reached the end of the list.',
      status: 'warning',
      isClosable: true,
      duration: 800, //(5000 ms = 5 seconds)
    })
  }

  const newArray = individualItems.map((data, index) =>
    extractFields(data, index)
  );
  console.log(sales?.totalPages, 'sales');
  console.log(newArray, 'newArray');

  return (
    <Box ref={tableContainerRef} height="calc(100vh - 75px)" overflowY="auto">
      {individualItems.length > 0 && (
        <CustomTable
          newArray={newArray}
          page={page}
          setPage={setPage}
          isFetching={isFetching}
          pageInfo={pageInfo}
          setSize={setSize}
          filters={filters}
          alignment={{
            "Sub Total": "right",
            "Total CGSt": "right",
            "Total Sgst": "right",
          }}
        />
      )}
    </Box>
  );
};

export default PurchaseVendorWiseTableView;
