import React, { useState, useEffect, useCallback, useRef } from "react";
import CustomTable from "./purchaseProductWiseCustomTable";
import { Box, Spinner, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import NoDataFound from "../../../asset/images/nodatafound.png";
import { useProductWisePurchaseQuery } from "../slice/purchaseProductWiseApi";

const PurchaseProductWiseTableView = () => {
  const authData = useSelector((state) => state.auth);

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
  } = useProductWisePurchaseQuery({
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
    "Good Name": data["items.goodName"],
    "Good Code": data["items.goodCode"],
    "Total Quantity": data["SUM(items.goodQty)"],
    "Received Quantity": data["SUM(items.receivedQty)"],
    "Total Amount": data["SUM(items.totalAmount)"],
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
            "Total Quantity": "right",
            "Received Quantity": "right",
            "Total Amount": "right",
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

export default PurchaseProductWiseTableView;
