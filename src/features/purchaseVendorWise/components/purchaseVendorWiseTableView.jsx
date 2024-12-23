import React, { useState, useEffect, useRef } from "react";
import CustomTable from "./purchaseVendorWiseCustomTable";
import { Box, Spinner, Image, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import NoDataFound from "../../../asset/images/nodatafound.png";
import { useVendorWisePurchaseQuery } from "../slice/purchaseVendorWiseApi";
import Loader from "../../analyticloader/components/Loader";

const PurchaseVendorWiseTableView = () => {
  const authData = useSelector((state) => state.auth);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const [individualItems, setIndividualItems] = useState([]);
  const [toastShown, setToastShown] = useState(false);
  const toast = useToast();
  const [filters, setFilters] = useState(
    {
      data: [
        "vendors.trade_name",
        "vendors.vendor_code",
        "SUM(items.igst)",
        "SUM(items.cgst)",
        "SUM(items.tds)",
        "SUM(items.sgst)",
        "SUM(items.totalAmount)",
        "SUM(items.goodsItems.stockSummary.movingWeightedPrice)",
      ],
      groupBy: ["grnInvoice.vendorCode", "grnInvoice.vendorName"],
      filter: [],
      page: 0,
      size: 20,
      sortDir: "asc",
      sortBy: "grnInvoice.vendorCode",
    });

  const {
    data: sales,
    isLoading,
    isFetching,
    error,
  } = useVendorWisePurchaseQuery({
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
    "grnInvoice.vendorName": data["grnInvoice.vendorName"],
    "Vendor Code": data["grnInvoice.vendorCode"],
    "SUM(grnInvoice.grnSubTotal)": data["SUM(grnInvoice.grnSubTotal)"],
    "SUM(grnInvoice.grnTotalCgst)": data["SUM(grnInvoice.grnTotalCgst)"],
    "SUM(grnInvoice.grnTotalSgst)": data["SUM(grnInvoice.grnTotalSgst)"],
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
            "Sub Total": "right",
            "Total CGSt": "right",
            "Total Sgst": "right",
          }}
        />
      )}
    </Box>
  );
};

export default PurchaseVendorWiseTableView;
