import React, { useState, useEffect, useRef } from "react";
import CustomTable from "./salesProductWiseCustomTable";
import { Box, Spinner, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import NoDataFound from "../../../asset/images/nodatafound.png";
import { useProductWiseSalesQuery } from "../slice/salesProductWiseApi";

const SalesProductWiseTableView = () => {
  const authData = useSelector((state) => state.auth);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const [individualItems, setIndividualItems] = useState([]);

  let filters = {
    data: [
      "items.itemName",
      "SUM(salesPgi.salesDelivery.totalAmount)",
      "SUM(salesPgi.totalAmount)",
      "SUM(quotation.totalAmount)",
      "SUM(salesOrder.totalAmount)",
      "SUM(items.qty)",
      "SUM(items.basePrice - items.totalDiscountAmt)",
      "SUM(all_total_amt)",
      "invoice_date",
    ],
    groupBy: ["items.itemName"],
    filter: [
      {
        column: "company_id",
        operator: "equal",
        type: "integer",
        value: 1,
      },
      {
        column: "branch_id",
        operator: "equal",
        type: "integer",
        value: 1,
      },
      {
        column: "location_id",
        operator: "equal",
        type: "integer",
        value: 1,
      },
      {
        column: "invoice_date",
        operator: "between",
        type: "date",
        value: ["2023-10-15", "2023-10-16"],
      },
      {
        column: "invoice_no",
        operator: "like",
        type: "string",
        value: "INV-0000000010",
      },
      {
        column: "customer.trade_name",
        operator: "like",
        type: "string",
        value: "Mindtree",
      },
    ],
    page: 0,
    size: 20,
  };
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

    const formatDate = (date) => {
      if (!date) return "";
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    };

  const extractFields = (data, index) => ({
    "SL No": index + 1,
    "Item Name": data["items.itemName"],
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
