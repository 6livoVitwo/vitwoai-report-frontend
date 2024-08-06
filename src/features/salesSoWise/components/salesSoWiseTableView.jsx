import React, { useState, useEffect } from "react";
import CustomTable from "./salesSoWiseCustomTable";
import { Box, Spinner, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import NoDataFound from "../../../asset/images/nodatafound.png";
import { useSoWiseSalesQuery } from "../slice/salesSoWiseApi";

const SalesSoWiseTableView = () => {
  const authData = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    data: [
      "customer.trade_name",
      "customer.customer_code",
      "salesOrder.so_number",
      "invoice_no",
      "invoice_date",
      "SUM(due_amount)",
      "SUM(salesPgi.salesDelivery.totalAmount)",
      "SUM(salesPgi.totalAmount)",
      "SUM(quotation.totalAmount)",
      "SUM(salesOrder.totalAmount)",
      "SUM(items.qty)",
      "SUM(items.basePrice - items.totalDiscountAmt - items.cashDiscountAmount)",
      "SUM(all_total_amt)",
      "SUM(items.totalTax)",
    ],
    groupBy: ["salesOrder.so_id"],
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
  } = useSoWiseSalesQuery({
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

  // Function to extract fields from each item
  const extractFields = (data, index) => ({
    "SL No": index + 1,
    "Trade Name": data["customer.trade_name"],
    "Custom Code": data["customer.customer_code"],
    "SO Total Amount": data["SUM(salesOrder.totalAmount)"],
    "SD Total Amount": data["SUM(salesPgi.salesDelivery.totalAmount)"],
    "Base Price":
      data[
        "SUM(items.basePrice - items.totalDiscountAmt - items.cashDiscountAmount)"
      ],
    "Invoice No": data["invoice_no"],
    "SO No": data["salesOrder.so_number"],
    Invoice_date: data["invoice_date"],
    "Item Quantity": data["SUM(items.qty)"],
    "Total Amount": data["SUM(all_total_amt)"],
    "Sales PGI Total Amount": data["SUM(salesPgi.totalAmount)"],
    "Sales Quotation Amount": data["SUM(quotation.totalAmount)"],
    "Due Amount": data["SUM(due_amount)"],
    "Total Tax": data["SUM(items.totalTax)"],
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

export default SalesSoWiseTableView;
