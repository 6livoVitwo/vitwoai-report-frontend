import React, { useState, useEffect, useRef } from "react";
import CustomTable from "./salesSoWiseCustomTable";
import { Box, Spinner, Image, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import NoDataFound from "../../../asset/images/nodatafound.png";
import { useSoWiseSalesQuery } from "../slice/salesSoWiseApi";
import Loader from "../../analyticloader/components/Loader";

const SalesSoWiseTableView = () => {
  const authData = useSelector((state) => state.auth);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const [individualItems, setIndividualItems] = useState([]);
  const [toastShown, setToastShown] = useState(false);
  const toast = useToast();

  const [filters, setFilters] = useState(
    {
      data: [
        "customer.trade_name",
        "customer.customer_code",
        "salesOrder.so_number",
        "invoice_no",
        "invoice_date",
        "SUM(due_amount)",
        "SUM(cgst)",
        "SUM(sgst)",
        "SUM(igst)",
        "SUM(quotation.totalAmount)",
        "SUM(salesPgi.salesDelivery.totalAmount)",
        "SUM(items.totalTax)",
        "SUM(salesPgi.totalAmount)",
        "SUM(salesOrder.totalAmount)",
        "SUM(items.qty)",
        "SUM(items.basePrice - items.totalDiscountAmt - items.cashDiscountAmount)",
        "SUM(all_total_amt)",
        "customer.customer_gstin",

      ],
      groupBy: ["salesOrder.so_id"],
      filter: [],
      page: 0,
      size: 50,
      sortDir: "asc",
      sortBy: "customer.trade_name",
    }
  )

  const {
    data: sales,
    isLoading,
    isFetching,
    error,
  } = useSoWiseSalesQuery({
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
        <Loader width={100} height={100} objectFit="contain" />
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
  // const newArray = individualItems.map((data, index) =>
  //   extractFields(data, index)
  // );

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

export default SalesSoWiseTableView;
