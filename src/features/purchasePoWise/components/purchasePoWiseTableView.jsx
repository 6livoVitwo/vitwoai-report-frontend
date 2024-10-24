import React, { useState, useEffect, useRef } from "react";
import CustomTable from "./purchasePoWiseCustomTable";
import { Box, Spinner, Image, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import NoDataFound from "../../../asset/images/nodatafound.png";
import { usePoWisePurchaseQuery } from "../slice/purchasePoWiseApi";

const PurchaseProductWiseTableView = () => {
  const authData = useSelector((state) => state.auth);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const [individualItems, setIndividualItems] = useState([]);
  const [toastShown, setToastShown] = useState(false);
  const toast = useToast();

  const [filters, setFilters] = useState({
    data: [
      "grnInvoice.grnPoNumber",
      "grnInvoice.grnIvCode",
      "grnInvoice.vendorDocumentNo",
      "grnCreatedAt",
      "grnInvoice.vendorCode",
      "grnInvoice.vendorName",
      // "grnInvoice.postingDate",
      // "grnInvoice.grnType",
      // "grnInvoice.vendorDocumentDate",
      // "SUM(grnInvoice.grnSubTotal)",
      // "SUM(grnInvoice.grnTotalCgst)",
      // "SUM(grnInvoice.grnTotalSgst)",
      // "SUM(grnInvoice.grnTotalIgst)",
      // "SUM(grnInvoice.grnTotalTds)",
      // "SUM(grnInvoice.grnTotalAmount)",
      // "SUM(grnInvoice.dueAmt)",
    ],
    groupBy: ["grnInvoice.grnPoNumber"],
    filter: [],
    page: 0,
    size: 50,
    sortDir: "asc",
    sortBy: "grnInvoice.grnPoNumber",
  });

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
    "grnInvoice.grnPoNumber": data["grnInvoice.grnPoNumber"],
    "grnInvoice.grnIvCode": data["grnInvoice.grnIvCode"],
    "grnInvoice.grnType": data["grnInvoice.grnType"],
    "Vendor Code": data["grnInvoice.vendorCode"],
    "grnInvoice.vendorName": data["grnInvoice.vendorName"],
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
  useEffect(() => {
    if (sales?.totalPages < page && !toastShown) {
      toast({
        title: "No More Data",
        description: "You have reached the end of the list.",
        status: "warning",
        isClosable: true,
        duration: 4000,
        render: () => (
          <Box
            p={3}
            bg="orange.300"
            borderRadius="md"
            style={{ width: "300px", height: "70px" }} // Set custom width and height
          >
            <Box fontWeight="bold">No More Data</Box>
            <Box>You have reached the end of the list.</Box>
          </Box>
        ),
      });
      setToastShown(true); // Mark the toast as shown
    }
  }, [sales, page, toast, toastShown]);

  if (isLoading) {
    return (
      <Box
        height="calc(100vh - 75px)"
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
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
        justifyContent="center"
      >
        <Image src={NoDataFound} alt="No Data Available" />
      </Box>
    );
  }
  // const newArray = individualItems.map((data, index) =>
  //   extractFields(data, index)
  // );

  return (
    <Box ref={tableContainerRef} height="calc(100vh - 75px)" overflowY="auto">
      {individualItems.length > 0 && (
        <CustomTable
          newArray={individualItems}
          page={page}
          setPage={setPage}
          isFetching={isFetching}
          pageInfo={pageInfo}
          setSize={setSize}
          filters={filters}
          setFilters={setFilters}
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
