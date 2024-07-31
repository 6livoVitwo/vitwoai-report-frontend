import React, { useState, useEffect, useCallback, useRef } from "react";
import CustomTable from "./salesProductWiseCustomTable";
import { Box, Spinner, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useFetchSalesQuery } from "../slice/salesBySlice";
import NoDataFound from "../../../asset/images/nodatafound.png";

const SalesProductWiseTableView = () => {
  const authData = useSelector((state) => state.auth);

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
    filter: [
      {
        column: "company_id",
        operator: "equal",
        type: "Integer",
        value: 1,
      },
      {
        column: "location_id",
        operator: "equal",
        type: "Integer",
        value: 1,
      },
      {
        column: "branch_id",
        operator: "equal",
        type: "Integer",
        value: 1,
      },
    ],
    page: 0,
    size: 50,
  });

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [individualItems, setIndividualItems] = useState([]);
  
  const {
    data: sales,
    isLoading,
    isFetching,
    isError,
    error,
  } = useFetchSalesQuery({
    filters: { ...filters, page },
    authDetails: authData.authDetails,
  });

  const tableContainerRef = useRef(null);

  useEffect(() => {
    if (sales?.content?.length) {
      setIndividualItems((prevItems) => [
        ...prevItems,
        ...sales.content.flatMap((invoice) => {
          const flattenedInvoice = flattenObject(invoice);
          return invoice.items?.length
            ? invoice.items.map((item) => {
                const flattenedItem = flattenObject(item, "item.");
                return { ...flattenedInvoice, ...flattenedItem };
              })
            : [flattenedInvoice];
        }),
      ]);
      setHasMore(sales.content.length === filters.size); // Determine if more data is available
    } else {
      setHasMore(false);
    }
  }, [sales, filters.size]);

  const flattenObject = (obj, prefix = "") => {
    let result = {};
    for (let key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        if (Array.isArray(obj[key])) {
          obj[key].forEach((item, index) => {
            Object.assign(result, flattenObject(item, `${prefix}${key}[${index}].`));
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

  const handleScroll = useCallback(() => {
    if (
      tableContainerRef.current &&
      tableContainerRef.current.scrollHeight - tableContainerRef.current.scrollTop <=
        tableContainerRef.current.clientHeight + 10
    ) {
      if (!isFetching && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [isFetching, hasMore]);

  useEffect(() => {
    const container = tableContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  const extractFields = (data, index) => ({
    "SL No": index + 1,
    "Item Name": data["items.itemName"],
    "Sales Delivery Total Amount": data["SUM(salesPgi.salesDelivery.totalAmount)"],
    "Sales Pgi Total Amount": data["SUM(salesPgi.totalAmount)"],
    Quotation: data["SUM(salesPgi.totalAmount)"],
    "Sales Order": data["SUM(salesOrder.totalAmount)"],
    "Total Qty": data["SUM(items.qty)"],
    "Sub Total": data["SUM(items.basePrice - items.totalDiscountAmt)"],
    "Total Amount": data["SUM(all_total_amt)"],
  });

  const newArray = individualItems.map(extractFields);

  return (
    <Box ref={tableContainerRef} height="calc(100vh - 75px)" overflowY="auto">
      {isLoading && !isFetching ? (
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
      ) : newArray.length > 0 ? (
        <CustomTable individualItems={newArray} />
      ) : (
        <Box
          bg="white"
          width="100%"
          height="calc(100vh - 103px)"
          display="flex"
          alignItems="center"
          justifyContent="center">
          <Image src={NoDataFound} alt="No Data Available" />
        </Box>
      )}
    </Box>
  );
};

export default SalesProductWiseTableView;
