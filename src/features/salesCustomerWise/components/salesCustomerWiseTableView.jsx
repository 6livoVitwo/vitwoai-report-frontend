import React, { useState, useEffect, useRef } from "react";
import CustomTable from "./salesCustomerWiseCustomTable";
import { Box, Spinner, Image, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import NoDataFound from "../../../asset/images/nodatafound.png";
import { useCustomerWiseSalesQuery } from "../slice/customerWiseSalesApi";
import Loader from "../../analyticloader/components/Loader";

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
        "invoice_date",
        "SUM(igst)",
        "SUM(sgst)",
        "SUM(cgst)",
        "SUM(due_amount)",
        "SUM(salesPgi.salesDelivery.totalAmount)",
        "SUM(salesPgi.totalAmount)",
        "SUM(quotation.totalAmount)",
        "SUM(items.basePrice - items.totalDiscountAmt - items.cashDiscountAmount)",
        "SUM(salesOrder.totalAmount)",
        "SUM(items.qty)",
        "SUM(all_total_amt)",
        "invoice_no",
        "SUM(items.totalTax)",
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

  // Function to rearrange columns
  const arrangeColumns = (data, columnOrder) => {
    return data.map((item) => {
      const orderedItem = {};
      columnOrder.forEach((key) => {
        orderedItem[key] = item[key] || null;
      });
      return orderedItem;
    });
  };

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
      const columnOrder = [
        "customer.trade_name",
        "customer.customer_code",
        "invoice_date",
        "SUM(items.qty)",
        "SUM(quotation.totalAmount)",
        "customer.customer_gstin",
        "SUM(igst)",
        "SUM(sgst)",
        "SUM(cgst)",
        "SUM(due_amount)",
        "SUM(salesPgi.salesDelivery.totalAmount)",
        "SUM(salesPgi.totalAmount)",
        "SUM(items.basePrice - items.totalDiscountAmt - items.cashDiscountAmount)",
        "SUM(salesOrder.totalAmount)",
        "SUM(all_total_amt)",
        "invoice_no",
        "SUM(items.totalTax)",
      ];
      const orderedItems = arrangeColumns(newItems, columnOrder);
      setIndividualItems((prevItems) => [...prevItems, ...orderedItems]);
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
            mb={9}
            bg="rgba(255, 195, 0, 0.2)"
            backdropFilter="blur(4px)"
            borderRadius="md"
            style={{ width: "400px", height: "70px" }}
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

  return (
    <Box ref={tableContainerRef} height="calc(100vh - 75px)" overflowY="hidden"
      className="table-tableContainerRefSacled"
    >
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
