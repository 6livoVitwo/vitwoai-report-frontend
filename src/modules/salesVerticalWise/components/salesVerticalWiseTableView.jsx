import React, { useState, useEffect } from "react";
import CustomTable from "./salesVerticalWiseCustomTable";
import { Box, Spinner, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useFetchSalesQuery } from "../slice/salesBySlice";
import NoDataFound from "../../../asset/images/nodatafound.png";

const SalesProductWiseTableView = () => {
  const authData = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    data: [
      "invoice_date",
      "companyFunction.functionalities_name",
      "SUM(salesPgi.salesDelivery.totalAmount)",
      "SUM(salesPgi.totalAmount)",
      "SUM(quotation.totalAmount)",
      "SUM(salesOrder.totalAmount)",
      "SUM(items.qty)",
      "SUM(due_amount)",
      "SUM(items.basePrice - items.totalDiscountAmt)",
      "SUM(all_total_amt)",
    ],
    groupBy: ["companyFunction.functionalities_name"],
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
  const salesData = sales?.content || [];
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
    if (salesData.length) {
      const items = salesData.flatMap((invoice) => {
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
  }, [salesData]);
  console.log("salesData", salesData);

  const formatDate = (dateString) => {
    try {
      const [year, month, day] = dateString.split("-").map(Number);
      const date = new Date(year, month - 1, day);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      return "Invalid Date";
    }
  };

  // Function to extract fields from each item
  const extractFields = (data, index) => ({
    "SL No": index + 1,
    "Functional Area": data["companyFunction.functionalities_name"],
    "Sales Delivery Total Amount":
      data["SUM(salesPgi.salesDelivery.totalAmount)"],
    "Sales Pgi Total Amount": data["SUM(salesPgi.totalAmount)"],
    Quotation: data["SUM(salesPgi.totalAmount)"],
    "Sales Order": data["SUM(salesOrder.totalAmount)"],
    "Total Qty": data["SUM(items.qty)"],
    "Sub Total": data["SUM(items.basePrice - items.totalDiscountAmt)"],
    "Total Amount": data["SUM(all_total_amt)"],
    "Due Amount": data["SUM(due_amount)"],
    "Invoice date": formatDate(data["invoice_date"]),
  });

  // Convert individual items into new array with the necessary fields
  const newArray = individualItems.map(extractFields);
  console.log("same probem", newArray);
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

export default SalesProductWiseTableView;
