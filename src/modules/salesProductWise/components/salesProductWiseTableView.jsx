import React, { useState, useEffect } from "react";
import CustomTable from "./salesProductWiseCustomTable";
import { Box, Spinner, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useFetchSalesQuery } from "../slice/salesBySlice";
import NoDataFound from "../../../asset/images/nodatafound.png";

const SalesProductWiseTableView = () => {
  const authData = useSelector((state) => state.auth);
  const [page, setPage] = useState(1);
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
  const [dateRange, setDateRange] = useState();
  const [individualItems, setIndividualItems] = useState([]);
  const {
    data: sales,
    isLoading,
    isFetching,
  } = useFetchSalesQuery({
    filters,
    page,
    authDetails: authData.authDetails,
  });

  const salesData = sales?.content;
  const pageInfo = sales?.lastPage;
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

  useEffect(() => {
    if (salesData) {
      let items = [];

      salesData.forEach((invoice) => {
        const flattenedInvoice = flattenObject(invoice);
        if (invoice.items && invoice.items.length > 0) {
          invoice.items.forEach((item) => {
            const flattenedItem = flattenObject(item, "item.");
            items.push({ ...flattenedInvoice, ...flattenedItem });
          });
        } else {
          items.push(flattenedInvoice);
        }
      });

      setIndividualItems(items);
    }
  }, [sales]);

  const extractFields = (data) => {
    return {
      "Item Name": data["items.itemName"],
      "Sales Delivery Total Amount": data["SUM(salesPgi.salesDelivery.totalAmount)"],
      "Sales Pgi Total Amount": data["SUM(salesPgi.totalAmount)"],
      "Quotation": data["SUM(salesPgi.totalAmount)"],
      "Sales Order": data["SUM(salesOrder.totalAmount)"],
      "Total Qty": data["SUM(items.qty)"],
      "Sub Total": data["SUM(items.basePrice - items.totalDiscountAmt)"],
      "Total Amount": data["SUM(all_total_amt)"],

    };
  };

  const newArray = individualItems.map((item) => {
    let itemObj = extractFields(item);
    // console.log(itemObj);
    return itemObj;
  });
  console.log(newArray, "newArray");

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
      ) : individualItems.length > 0 ? (
        <CustomTable
          individualItems={newArray}
          page={page}
          setDateRange={setDateRange}
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
