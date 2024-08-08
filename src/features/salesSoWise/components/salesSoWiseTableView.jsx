import React, { useState, useEffect, useCallback, useRef } from "react";
import CustomTable from "./salesSoWiseCustomTable";
import { Box, Spinner, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import NoDataFound from "../../../asset/images/nodatafound.png";
import { useSoWiseSalesQuery } from "../slice/salesSoWiseApi";

const SalesSoWiseTableView = () => {
  const authData = useSelector((state) => state.auth);

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

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [individualItems, setIndividualItems] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);

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

        const uniqueItems = [
          ...prevItems,
          ...newItems.filter(
            (item) =>
              !prevItems.some(
                (prevItem) => prevItem.uniqueKey === item.uniqueKey
              )
          ),
        ];

        return uniqueItems;
      });
      setHasMore(sales.content.length === filters.size);
      setLoadingMore(false);
    } else {
      setHasMore(false);
      setLoadingMore(false);
    }
  }, [sales, filters.size]);

  const handleScroll = useCallback(() => {
    if (!loadingMore && hasMore && tableContainerRef.current) {
      const bottom =
        tableContainerRef.current.scrollHeight ===
        tableContainerRef.current.scrollTop +
          tableContainerRef.current.clientHeight;
      if (bottom) {
        setLoadingMore(true);
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, [hasMore, loadingMore]);

  useEffect(() => {
    const container = tableContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

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
          alignment={{
            "SO Total Amount": "right",
            "SD Total Amount": "right",
            "Base Price": "right",
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

export default SalesSoWiseTableView;
