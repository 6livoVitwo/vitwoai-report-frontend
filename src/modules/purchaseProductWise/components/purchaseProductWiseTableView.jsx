import React, { useState, useEffect } from "react";
import CustomTable from "./purchaseProductWiseCustomTable";
import { Box, Spinner, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useFetchSalesQuery } from "../slice/purchaseBySlice";
import NoDataFound from "../../../asset/images/nodatafound.png";

const PurchaseProductWiseTableView = () => {
  const authData = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
      data: [
        "items.goodName",
        "items.goodCode",
        "SUM(items.goodQty)",
        "SUM(items.receivedQty)",
        "SUM(items.totalAmount)",
      ],
      groupBy: ["items.goodName"],
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
      size: 50,
  });

  const [dateRange, setDateRange] = useState();
  const {
    data: sales,
    isLoading,
    isFetching,
    isError,
    error,
  } = useFetchSalesQuery({
    filters,
    page,
    authDetails: authData.authDetails,
  });

  if (isError) {
    console.error("Error fetching sales data:", error);
  }

  // Extract and flatten sales data
  const purchasesData = sales?.content || [];
  const pageInfo = sales?.lastPage || 1;

  // Utility function to flatten nested objects
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

  // Process sales data to extract individual items
  const [individualItems, setIndividualItems] = useState([]);

  useEffect(() => {
    if (purchasesData.length) {
      const items = purchasesData.flatMap((invoice) => {
        const flattenedInvoice = flattenObject(invoice);
        return invoice.items && invoice.items.length > 0
          ? invoice.items.map((item) => {
              const flattenedItem = flattenObject(item, "item.");
              return { ...flattenedInvoice, ...flattenedItem };
            })
          : [flattenedInvoice];
      });

      setIndividualItems(items);
    }
  }, [purchasesData]);

  // Function to extract fields from each item
  const extractFields = (data, index) => ({
    "SL No": index + 1,
    "Good Name": data["items.goodName"],
    "Good Code": data["items.goodCode"],
    "Total Quantity": data["SUM(items.goodQty)"],
    "Received Quantity": data["SUM(items.receivedQty)"],
    "Total Amount": data["SUM(items.totalAmount)"],
  });

  // Convert individual items into new array with the necessary fields
  const newArray = individualItems.map(extractFields);
console.log("Purchase Array",newArray);
  return (
    <Box>
      {isLoading ? (
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
        <CustomTable
          individualItems={newArray}
          page={page}
          setPage={setPage}
          isFetching={isFetching}
          pageInfo={pageInfo}
        />
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

export default PurchaseProductWiseTableView;