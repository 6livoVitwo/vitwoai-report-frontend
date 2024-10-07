

import React, { useState, useEffect, useRef } from "react";
import CustomTable from "./salesProductWiseCustomTable";
import { Box, Spinner, Image, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import NoDataFound from "../../../asset/images/nodatafound.png";
import { useProductWiseSalesQuery } from "../slice/salesProductWiseApi";

const SalesProductWiseTableView = () => {
  const authData = useSelector((state) => state.auth);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const [individualItems, setIndividualItems] = useState([]);
  const [toastShown, setToastShown] = useState(false);
  const toast = useToast();

  const [filters, setFilters] = useState({
    data: [
      "items.itemName",
      "SUM(salesPgi.salesDelivery.totalAmount)",
      "SUM(salesPgi.totalAmount)",
      "SUM(quotation.totalAmount)",
      "SUM(salesOrder.totalAmount)",
      "SUM(items.qty)",
      "SUM(items.basePrice - items.totalDiscountAmt)",
      "SUM(all_total_amt)",
    ],
    groupBy: ["items.itemName"],
    filter: [],
    page: 0,
    size: 50,
    sortBy: "invoice_date",
    sortDir: "asc",
  });

  const {
    data: sales,
    isLoading,
    isFetching,
    error,
  } = useProductWiseSalesQuery({
    filters,
    page,
    size,
    authDetails: authData.authDetails,
  });

  const pageInfo = sales?.lastPage;
  const tableContainerRef = useRef(null);

  // Function to flatten objects
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

  // Function to format dates
  const formatDate = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  const extractFields = (data, index) => ({
    "SL No": index + 1,
    "items.itemName": data["items.itemName"],
    "Sales Delivery Total Amount":
      data["SUM(salesPgi.salesDelivery.totalAmount)"],
    "Sales Pgi Total Amount": data["SUM(salesPgi.totalAmount)"],
    "Invoice Date": formatDate(data["invoice_date"]),
    Quotation: data["SUM(salesPgi.totalAmount)"],
    "Sales Order": data["SUM(salesOrder.totalAmount)"],
    "Total Qty": data["SUM(items.qty)"],
    "Sub Total": data["SUM(items.basePrice - items.totalDiscountAmt)"],
    "Total Amount": data["SUM(all_total_amt)"],
  });

  // Effect to handle data fetching
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
  

    const updateFilters = (newFilter) => {
    // First, check if the new filter value exists in the current data
    const valueExistsInCurrentData = newArray.some((item) => {
      const itemValue = item[newFilter.column]
        ? item[newFilter.column].toString().toLowerCase()
        : "";
      const filterValue = newFilter.value ? newFilter.value.toLowerCase() : "";
      return itemValue.includes(filterValue); // Check if the item's value includes the filter value
    });
  
    if (valueExistsInCurrentData) {
      // If value exists, update the filters and refetch data from the server
      setFilters((prevFilters) => ({
        ...prevFilters,
        filter: [...prevFilters.filter, newFilter], // Append new filter
        page: 0, // Reset page to fetch from the first page with the new filter
      }));
  
      // Clear the current individualItems to avoid showing old results while fetching
      setIndividualItems([]);
    } else {
      // If value doesn't exist, show a toast notification and do nothing else
      toast({
        title: "Filter Not Found",
        description: `No items found for the filter: ${newFilter.value}`,
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
            <Box fontWeight="bold">Filter Not Found</Box>
            <Box>No items found for the filter: {newFilter.value}</Box>
          </Box>
        ),
      });
    }
  };
  
  
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

  // Loading state
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

  // Error state
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

  // Transforming the data for the table
  const newArray = individualItems.map((data, index) =>
    extractFields(data, index)
  );

  return (
    <Box ref={tableContainerRef} height="calc(100vh - 75px)" overflowY="auto">
      {newArray.length > 0 && (
        <CustomTable
          newArray={newArray}
          page={page}
          setPage={setPage}
          isFetching={isFetching}
          pageInfo={pageInfo}
          setSize={setSize}
          filters={filters}
          setFilters={setFilters}
          updateFilters={updateFilters}
          alignment={{
            "Sales Delivery Total Amount": "right",
            "Sales Pgi Total Amount": "right",
            Quotation: "right",
            "Sales Order": "right",
            "Total Qty": "right",
            "Sub Total": "right",
            "Total Amount": "right",
          }}
        />
      )}
    </Box>
  );
};

export default SalesProductWiseTableView;
