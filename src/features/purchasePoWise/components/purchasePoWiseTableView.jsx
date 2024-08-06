import React, { useState, useEffect } from "react";
import CustomTable from "./purchasePoWiseCustomTable";
import { Box, Spinner, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import NoDataFound from "../../../asset/images/nodatafound.png";
import { usePoWisePurchaseQuery } from "../slice/purchasePoWiseApi";

const PurchasePoWiseTableView = () => {
  const authData = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
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
  } = usePoWisePurchaseQuery({
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
    "Grn Po Number": data["grnInvoice.grnPoNumber"],
    "Grn Iv Code": data["grnInvoice.grnIvCode"],
    "Grn Type": data["grnInvoice.grnType"],
    "Vendor Code": data["grnInvoice.vendorCode"],
    "Vendor Name": data["grnInvoice.vendorName"],
  });

  // Convert individual items into new array with the necessary fields
  const newArray = individualItems.map(extractFields);
  console.log("Purchase Array", newArray);
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

export default PurchasePoWiseTableView;
