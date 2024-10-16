import React, { useState, useEffect, useRef } from "react";
import CustomTable from "./salesCustomerWiseCustomTable";
import { Box, Spinner, Image, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import NoDataFound from "../../../asset/images/nodatafound.png";
import { useCustomerWiseSalesQuery } from "../slice/customerWiseSalesApi";

const SalesCustomerWiseTableView = () => {
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
      filter: [],
      page: 0,
      size: 20,
      sortDir: "asc",
      sortBy: "customer.trade_name",
    }
  )

  const {
    data: sales,
    isLoading,
    isFetching,
    error,
  } = useCustomerWiseSalesQuery({
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

  const extractFields = (data, index) => ({
    "SL No": index + 1,
    "customer.trade_name": data["customer.trade_name"],
    "customer.customer_code": data["customer.customer_code"],
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
            style={{ width: "300px", height: "70px" }} // Set custom width and height
          >
            <Box fontWeight="bold">No More Data</Box>
            <Box>You have reached the end of the list.</Box>
          </Box>
        ),
      });
      setToastShown(true); // Mark the toast as shown
    }
  }, [sales, page, toast, toastShown]);
  if (isLoading) {
    return (
      <Box
        height='calc(100vh - 75px)'
        width='100%'
        display='flex'
        alignItems='center'
        justifyContent='center'>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </Box>
    );
  }
  if (error) {
    return (
      <Box
        bg='white'
        width='100%'
        height='calc(100vh - 103px)'
        display='flex'
        alignItems='center'
        justifyContent='center'>
        <Image src={NoDataFound} alt='No Data Available' />
      </Box>
    );
  }

  // const newArray = individualItems.map((data, index) =>
  //   extractFields(data, index)
  // );
  // console.log(sales, 'main data');
  // console.log(newArray, 'newArray');

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
            IGST: "right",
            SGST: "right",
            CGST: "right",
            "Due Amount": "right",
          }}
        />
      )}
    </Box>
  );
};

export default SalesCustomerWiseTableView;
