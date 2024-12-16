import React, { useState, useEffect, useRef } from "react";
import CustomTable from "./purchaseCostCenterWiseCustomTable";
import { Box, Spinner, Image, useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import NoDataFound from "../../../asset/images/nodatafound.png";
import { useCostCenterWisePurchaseQuery } from "../slice/purchaseCostCenterWiseApi";
import Loader from "../../analyticloader/components/Loader";

const PurchaseProductWiseTableView = () => {
    const authData = useSelector((state) => state.auth);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(50);
    const [individualItems, setIndividualItems] = useState([]);
    const [toastShown, setToastShown] = useState(false);
    const toast = useToast();

    const [filters, setFilters] = useState({
        data: [
            "items.grnCostCenter.CostCenter_desc",
            "items.grnCostCenter.CostCenter_code",
            "SUM(items.unitPrice)",
            "SUM(items.receivedQty)",
            "SUM(items.goodQty)",
            "SUM(items.cgst)",
            "SUM(items.sgst)",
            "SUM(items.igst)",
            "SUM(items.totalAmount)",
            "SUM(items.tds)",
            "SUM(grnInvoice.grnInvoiceItems.goodQty)",
            "SUM(grnInvoice.grnInvoiceItems.receivedQty)",
            "SUM(grnInvoice.grnInvoiceItems.unitPrice)",
            "SUM(grnInvoice.grnInvoiceItems.cgst)",
            "SUM(grnInvoice.grnInvoiceItems.sgst)",
            "SUM(grnInvoice.grnInvoiceItems.igst)",
            "SUM(grnInvoice.grnInvoiceItems.tds)",
            "SUM(grnInvoice.grnInvoiceItems.totalAmount)",
            "SUM(grnInvoice.grnInvoiceItems.itemStocksQty)"
        ],
        groupBy: ["items.grnCostCenter.CostCenter_code"],
        filter: [],
        page: 0,
        size: 50,
        sortDir: "asc",
        sortBy: "items.grnCostCenter.CostCenter_desc",
    });

    const {
        data: sales,
        isLoading,
        isFetching,
        error,
    } = useCostCenterWisePurchaseQuery({
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
                "items.grnCostCenter.CostCenter_desc",
                "items.grnCostCenter.CostCenter_code",
                "SUM(items.unitPrice)",
                "SUM(items.receivedQty)",
                "SUM(items.goodQty)",
                "SUM(items.cgst)",
                "SUM(items.sgst)",
                "SUM(items.igst)",
                "SUM(items.totalAmount)",
                "SUM(items.tds)",
                "SUM(grnInvoice.grnInvoiceItems.goodQty)",
                "SUM(grnInvoice.grnInvoiceItems.receivedQty)",
                "SUM(grnInvoice.grnInvoiceItems.unitPrice)",
                "SUM(grnInvoice.grnInvoiceItems.cgst)",
                "SUM(grnInvoice.grnInvoiceItems.sgst)",
                "SUM(grnInvoice.grnInvoiceItems.igst)",
                "SUM(grnInvoice.grnInvoiceItems.tds)",
                "SUM(grnInvoice.grnInvoiceItems.totalAmount)",
                "SUM(grnInvoice.grnInvoiceItems.itemStocksQty)"
            ];
            const orderedItems = arrangeColumns(newItems, columnOrder);
            setIndividualItems((prevItems) => [...prevItems, ...orderedItems]);
        }
    }, [sales]);

    useEffect(() => {
        if (!sales?.totalPages || !page) return;
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
                        "Total Quantity": "right",
                        "Received Quantity": "right",
                        "Total Amount": "right",
                    }}
                />
            )}
        </Box>
    );
};

export default PurchaseProductWiseTableView;
