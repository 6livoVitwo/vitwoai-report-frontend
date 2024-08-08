import React, { useState, useEffect, useCallback, useRef } from "react";
import CustomTable from "./salesCustomerWiseCustomTable";
import { Box, Spinner, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import NoDataFound from "../../../asset/images/nodatafound.png";
import { useCustomerWiseSalesQuery } from "../slice/customerWiseSalesApi";

const SalesProductWiseTableView = () => {
  const authData = useSelector((state) => state.auth);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);  
  const [individualItems, setIndividualItems] = useState([]);

  let filters = {
    data: [
      "customer.trade_name",
      "customer.customer_code",
      "customer.customer_gstin",
      "SUM(igst)",
      "SUM(sgst)",
      "SUM(cgst)",
      "SUM(due_amount)",
      "SUM(salesPgi.salesDelivery.totalAmount)",
      "SUM(salesPgi.totalAmount)",
      "SUM(quotation.totalAmount)",
      "SUM(salesOrder.totalAmount)",
      "SUM(items.qty)",
      "SUM(items.basePrice - items.totalDiscountAmt)",
      "SUM(all_total_amt)",
    ],
    groupBy: ["customer.trade_name"],
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
    size: 20,
  };
  const {
    data: sales,
    isLoading,
    isFetching,
  } = useCustomerWiseSalesQuery({
    filters,
    page,
    size,
    authDetails: authData.authDetails,
  });

  const pageInfo = sales?.lastPage;

  console.log("last page", pageInfo);

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
    "Trade Name": data["customer.trade_name"],
    "Customer Code": data["customer.customer_code"],
    "Customer GSTIN": data["customer.customer_gstin"],
    IGST: data["SUM(igst)"],
    SGST: data["SUM(sgst)"],
    CGST: data["SUM(cgst)"],
    "Due Amount": data["SUM(due_amount)"],
    "Sales Delivery": data["SUM(salesPgi.salesDelivery.totalAmount)"],
    "Sales PGI TotalAmount": data["SUM(salesPgi.totalAmount)"],
    Quotation: data["SUM(quotation.totalAmount)"],
    "Sales Order Total Amount": data["SUM(salesOrder.totalAmount)"],
    "Items Quantity": data["SUM(items.qty)"],
    "Best Price": data["SUM(items.basePrice - items.totalDiscountAmt)"],
    "Total Amount": data["SUM(all_total_amt)"],
  });

  useEffect(() => {
    if (sales?.content?.length) {
      setIndividualItems((prevItems) => {
        const newItems = sales.content.flatMap((invoice) => {
          const flattenedInvoice = flattenObject(invoice);
          return invoice.items?.length
            ? invoice.items.map((item) => {
                const flattenedItem = flattenObject(item, "item.");
                return { ...flattenedInvoice, ...flattenedItem };
              })
            : [flattenedInvoice];
        });

         console.log("Previous items:", prevItems);
         console.log("New items:", newItems);

        const uniqueItems = [
          ...prevItems,
          ...newItems.filter(
            (item) =>
              !prevItems.some(
                (prevItem) => prevItem.uniqueKey === item.uniqueKey
              )
          ),
        ];

          console.log("Unique items:", uniqueItems);

        return uniqueItems;
      });
    }
  }, [sales, filters.size]);

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
      ) : individualItems.length > 0 ? (
        <CustomTable
          newArray={individualItems.map((item, index) =>
            extractFields(item, index)
          )}
          page={page}
          setPage={setPage}
          isFetching={isFetching}
            pageInfo={pageInfo}
            setSize={setSize}
          alignment={{
            IGST: "right",
            SGST: "right",
            CGST: "right",
            "Due Amount": "right",
          }}
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
