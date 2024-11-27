import React, { useState, useEffect, useRef } from "react";
import CustomTable from "./salesKamWiseCustomTable";
import { Box, Spinner, Image, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import NoDataFound from "../../../asset/images/nodatafound.png";
import { useKamWiseSalesQuery } from "../slice/salesKamWiseApi";

const SalesKamWiseTableView = () => {
  const authData = useSelector((state) => state.auth);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const [individualItems, setIndividualItems] = useState([]);
  const [toastShown, setToastShown] = useState(false);
  const toast = useToast();

  const [filters, setFilters] = useState({
    data: [
      "kam.kamCode",
      "SUM(quotation.totalAmount)",
      "kam.kamName",
      "kam.designation",
      "SUM(items.qty)",
      "invoice_no",
      "SUM(items.basePrice - items.totalDiscountAmt - items.cashDiscountAmount)",
      "SUM(salesPgi.salesDelivery.totalAmount)",
      "SUM(salesOrder.totalAmount)",
      "kam.emp_code",
      "SUM(salesPgi.totalAmount)",
      "kam.email",
      "invoice_date",
      "SUM(all_total_amt)",
      "kam.contact",
      "SUM(due_amount)",
      "SUM(items.totalTax)",
    ],
    groupBy: ["kam.kamName", "kam.kamCode"],
    filter: [],
    page: 0,
    size: 20,
    sortDir: "asc",
    sortBy: "kam.kamName",
  });

  const {
    data: sales,
    isLoading,
    isFetching,
    error,
  } = useKamWiseSalesQuery({
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
  useEffect(() => {
    if (sales?.totalPages < page && !toastShown) {
      toast({
        title: "No More Data",
        description: "You have reached the end of the list.",
        status: "warning",
        isClosable: true,
        duration: 4000,
        render: () => (
          <Box
            p={3}
            bg="orange.300"
            borderRadius="md"
            style={{ width: "300px", height: "70px" }} 
          >
            <Box fontWeight="bold">No More Data</Box>
            <Box>You have reached the end of the list.</Box>
          </Box>
        ),
      });
      setToastShown(true); 
    }
  }, [sales, page, toast, toastShown]);

  if (isLoading) {
    return (
      <Box
        height="calc(100vh - 75px)"
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
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
        justifyContent="center"
      >
        <Image src={NoDataFound} alt="No Data Available" />
      </Box>
    );
  }
  return (
    <Box ref={tableContainerRef} height="calc(100vh - 75px)" overflowY="auto">
      {individualItems.length > 0 && (
        <CustomTable
          newArray={individualItems}
          page={page}
          setPage={setPage}
          isFetching={isFetching}
          pageInfo={pageInfo}
          setSize={setSize}
          filters={filters}
          setFilters={setFilters}
          sortBy="kam.kamName"
          sortDir="asc"
          alignment={{
            "SO Total Amount": "right",
            "SD Total Amount": "right",
            "Base Price": "right",
          }}
        />
      )}
    </Box>
  );
};

export default SalesKamWiseTableView;
