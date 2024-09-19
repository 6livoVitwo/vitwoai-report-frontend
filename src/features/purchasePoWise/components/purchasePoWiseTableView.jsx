import React, { useState, useEffect, useRef } from "react";
import CustomTable from "./purchasePoWiseCustomTable";
import { Box, Spinner, Image,useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import NoDataFound from "../../../asset/images/nodatafound.png";
import { usePoWisePurchaseQuery } from "../slice/purchasePoWiseApi";

const PurchaseProductWiseTableView = () => {
  const authData = useSelector((state) => state.auth);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const [individualItems, setIndividualItems] = useState([]);
  const toast = useToast();


  let filters = {
    data: [
      "grnInvoice.grnPoNumber",
      "grnInvoice.grnIvCode",
      "grnInvoice.postingDate",
      "grnInvoice.vendorDocumentNo",
      "grnInvoice.vendorDocumentDate",
      "grnInvoice.grnType",
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
    groupBy: ["grnInvoice.grnPoNumber"],
    filter: [
      // {
      //   column: "companyId",
      //   operator: "equal",
      //   type: "integer",
      //   value: 1,
      // },
      // {
      //   column: "branchId",
      //   operator: "equal",
      //   type: "integer",
      //   value: 1,
      // },
      // {
      //   column: "locationId",
      //   operator: "equal",
      //   type: "integer",
      //   value: 1,
      // },
    ],
    page: 0,
    size: 20,
    sortDir: "asc",
    sortBy: "grnInvoice.grnPoNumber",
  };
  const {
    data: sales,
    isLoading,
    isFetching,
    error,
  } = usePoWisePurchaseQuery({
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
    "Grn Po Number": data["grnInvoice.grnPoNumber"],
    "Grn Iv Code": data["grnInvoice.grnIvCode"],
    "Grn Type": data["grnInvoice.grnType"],
    "Vendor Code": data["grnInvoice.vendorCode"],
    "Vendor Name": data["grnInvoice.vendorName"],
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
  if(sales?.
    totalPages < page){
    toast({
      title: 'No More Data',
      description: 'You have reached the end of the list.',
			status: 'warning',
			isClosable: true,
      duration:800, //(5000 ms = 5 seconds)
		})
  }
  const newArray = individualItems.map((data, index) =>
    extractFields(data, index)
  );
  // console.log(sales, 'main data');
  // console.log(newArray, 'newArray');

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
            "Total Quantity": "right",
            "Received Quantity": "right",
            "Total Amount": "right",
          }}
        />
      )}
    </Box>
  );
};

export default PurchaseProductWiseTableView;
