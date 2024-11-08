import React, { useState, useEffect, useRef } from "react";
import CustomTable from "./salesRegionWiseCustomTable";
import { Box, Spinner, Image, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import NoDataFound from "../../../asset/images/nodatafound.png";
import { useRegionWiseSalesQuery } from "../slice/salesRegionWiseApi";

const SalesRegionWiseTableView = () => {
  const authData = useSelector((state) => state.auth);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const [individualItems, setIndividualItems] = useState([]);
  const [toastShown, setToastShown] = useState(false);
  const toast = useToast();
  const [filters, setFilters] = useState({
    data: [
      "SUM(igst)",
      "SUM(sgst)",
      "SUM(cgst)",
      "SUM(salesPgi.salesDelivery.totalAmount)",
      "SUM(salesPgi.totalAmount)",
      // "customer.customerAddress.customer_address_state",
      "SUM(salesOrder.totalAmount)",
      "SUM(items.qty)",
      "SUM(all_total_amt)"
    ],
    "groupBy": [
      "customer.customerAddress.customer_address_state"
    ],
    "filter": [
    ],
    "page": 0,
    "size": 50,
    "sortBy": "customer.customerAddress.customer_address_state",
    "sortDir": "asc"
  });

  const {
    data: sales,
    isLoading,
    isFetching,
    error,
  } = useRegionWiseSalesQuery({
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
            const flattenedItem = flattenObject(item, "items.");
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

  const mainData = sales?.content;
  return (
    <Box ref={tableContainerRef} height="calc(100vh - 75px)" overflowY="auto">
      {individualItems.length > 0 && (
        <CustomTable
          newArray={mainData}
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

export default SalesRegionWiseTableView;
