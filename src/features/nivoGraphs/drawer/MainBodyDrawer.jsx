import { Alert, Badge, Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Text, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react'
import { FiPlus, FiSettings } from 'react-icons/fi';
import { MdFullscreen } from 'react-icons/md';
import DynamicChart from '../chartConfigurations/DynamicChart';
import ChartConfiguration from '../chartConfigurations/ChartConfiguration';
import { useSelector } from 'react-redux';
import { chartsData } from '../jsonData/graphSkeleton';
import { BreadCrumb } from 'primereact/breadcrumb';
import { RxCross1 } from "react-icons/rx";
import { capitalizeWord, formatWordBetweenDashes } from '../../../utils/common';

const MainBodyDrawer = (props) => {
    const {
        isOpenGraphAddDrawer,
        onCloseGraphAddDrawer
    } = props;

    const { selectedWise, reportType } = useSelector((state) => state.graphSlice);
    const salesCustomerWise = useSelector((state) => state.salescustomer.widgets);
    console.log('🔵Widgets data from store: ', salesCustomerWise);

    const localStorageWidgets = JSON.parse(localStorage.getItem('widgets')) || [];
    console.log('🟢Widgets data from localStorage: ', localStorageWidgets);

    const checkSalesCustomerWise = salesCustomerWise === null ? salesCustomerWise : localStorageWidgets;

    const filteredCharts = checkSalesCustomerWise?.filter((chart) => {
        return chart.selectedWise === selectedWise;
    });
    console.log('🔴Filtered widgets: ', filteredCharts);

    const btnRef = React.useRef();
    const { onOpen: onOpenGraphSettingDrawer, onClose: onCloseGraphSettingDrawer, isOpen: isOpenGraphSettingDrawer } = useDisclosure();
    const { isOpen: isOpenGraphSettingsModal, onOpen: onOpenGraphSettingsModal, onClose: onCloseGraphSettingsModal } = useDisclosure();
    const { onOpen: onOpenGraphDetailsView } = useDisclosure();
    const { onClose } = useDisclosure();

    const [configureChart, setConfigureChart] = useState({});

    const items = [{ label: reportType }, { label: selectedWise }];
    const home = { icon: 'pi pi-home', url: 'https://primereact.org' }

    const handleGraphAddDrawer = () => {
        onOpenGraphSettingDrawer();
    };

    const removeProperty = (object) => {
        if (!object) {
            return {};
        }
        const { data, id, ...rest } = object;
        return rest;
    };

    const handleConfigure = (chart) => {
        console.log('clicked...')
        if (!chart) return;

        onOpenGraphSettingsModal();
        const filterData = removeProperty(chart);
        setConfigureChart(filterData);
    };

    const handleView = (chart) => {
        if (!chart) {
            return;
        }
        onOpenGraphDetailsView();
        const filterData = removeProperty(chart);
        setConfigureChart(filterData);
    };

    return (
        <Drawer
            isOpen={isOpenGraphAddDrawer}
            placement="right"
            onClose={onCloseGraphAddDrawer}
            finalFocusRef={btnRef}
        >
            <DrawerOverlay />
            <DrawerContent maxW="88vw">
                <DrawerCloseButton style={{ color: "white" }} />
                <DrawerHeader
                    style={{
                        backgroundColor: "#003060",
                        color: "white",
                    }}
                >
                    {formatWordBetweenDashes(selectedWise)}
                    <BreadCrumb
                        model={items}
                        home={home}
                    />
                </DrawerHeader>
                <DrawerBody>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            "& button": {
                                color: "#718296",
                                padding: "20px 20px",
                                fontSize: "14px",
                                border: "1px solid #dee2e6",
                                backgroundColor: "white",
                            },
                            "& button:hover": {
                                backgroundColor: "rgb(0, 48, 96)",
                                borderRadius: "5px",
                            },
                        }}
                        mb={6}
                    >
                        <Text fontWeight="bold">{capitalizeWord(reportType)} Wise Graph View</Text>
                        <Button
                            ref={btnRef}
                            type="button"
                            variant="outlined"
                            onClick={handleGraphAddDrawer}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                _hover: {
                                    color: "white",
                                },
                            }}
                        >
                            <FiPlus />
                            Add Graph
                        </Button>
                    </Box>

                    {/* Update sales graph details report */}
                    <Box display="flex" flexWrap="wrap" justifyContent="space-between">
                        {filteredCharts && filteredCharts?.length === 0 && (
                            <Alert
                                status="error"
                                sx={{
                                    fontSize: "16px",
                                    padding: "5px",
                                    borderRadius: "5px",
                                    height: "30px",
                                    px: "10px",
                                }}
                            >
                                No Sales Graph are there
                            </Alert>
                        )}
                        {filteredCharts &&
                            filteredCharts?.map((chart, index) => {
                                return (
                                    <Box
                                        key={index}
                                        width={{
                                            base: "100%",
                                            lg: "49%",
                                        }}
                                        mb={6}
                                    >
                                        <Box
                                            sx={{
                                                backgroundColor: "white",
                                                padding: "15px",
                                                my: 2.5,
                                                borderRadius: "8px",
                                                transition: "box-shadow 0.3s ease-in-out",
                                                border: "1px solid #dee2e6",
                                                "&:hover": {
                                                    boxShadow: "0 4px 4px rgba(0, 0, 0, 0.2)",
                                                },
                                            }}
                                            mb={3}
                                        >
                                            <Box
                                                display="flex"
                                                justifyContent="space-between"
                                                alignItems="center"
                                                mb={8}
                                            >
                                                <Box
                                                    style={{
                                                        padding: "10px",
                                                        fontWeight: 600,
                                                        color: "black",
                                                    }}
                                                >
                                                    {chart.chartName}
                                                    <Text
                                                        sx={{
                                                            color: "#718296",
                                                            fontSize: "10px",
                                                        }}
                                                    >
                                                        {chart.description}
                                                    </Text>
                                                </Box>
                                                <Box
                                                    style={{
                                                        padding: "10px",
                                                        fontWeight: 600,
                                                        color: "black",
                                                    }}
                                                >
                                                    <Button
                                                        variant="outline"
                                                        colorScheme='green'
                                                        style={{
                                                            padding: "15px 10px",
                                                            fontSize: "12px"
                                                        }}
                                                        mr={3}
                                                        onClick={() => handleConfigure(chart)}
                                                    >
                                                        <FiSettings style={{ marginRight: "6px" }} />{" "}
                                                        Configure
                                                    </Button>

                                                    <Button
                                                        variant="outline"
                                                        colorScheme='blue'
                                                        style={{
                                                            padding: "15px 10px",
                                                            fontSize: "12px"
                                                        }}
                                                        mr={3}
                                                        onClick={() => handleView(chart)}
                                                    >
                                                        <MdFullscreen style={{ marginRight: "6px" }} />{" "}
                                                        Full Screen
                                                    </Button>

                                                    <Button
                                                        variant="outline"
                                                        colorScheme='red'
                                                        sx={{
                                                            p: "15px 15px",
                                                            fontSize: "12px",
                                                            fontWeight: 'bold'
                                                        }}
                                                    >
                                                        <RxCross1 />
                                                    </Button>
                                                </Box>
                                            </Box>
                                            <Box sx={{ height: "300px" }}>
                                                <DynamicChart chart={chart} />
                                            </Box>
                                        </Box>
                                    </Box>
                                );
                            })}
                    </Box>
                    {/* //sales-product-wise graph settings */}
                    <Drawer
                        isOpen={isOpenGraphSettingDrawer}
                        placement="right"
                        onClose={onCloseGraphSettingDrawer}
                        finalFocusRef={btnRef}
                    >
                        <DrawerOverlay />
                        <DrawerContent maxW="87vw">
                            <DrawerCloseButton style={{ color: "white" }} />
                            <DrawerHeader
                                style={{
                                    backgroundColor: "#003060",
                                    color: "white",
                                }}
                            >
                                Choose Data Wise Graph
                            </DrawerHeader>
                            <DrawerBody>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 4px",
                                        p: 2,
                                        my: 2,
                                        flexGrow: 1,
                                    }}
                                >
                                    Total Graph ({
                                        chartsData.charts.filter((chart) =>
                                            chart.type !== "funnel" && chart.type !== "heatmap"
                                        ).length
                                    })
                                </Box>
                                <Box
                                    display="flex"
                                    flexWrap="wrap"
                                    justifyContent="space-between"
                                >
                                    {chartsData.charts.map((chart, index) => {
                                        if (selectedWise === "sales-product-wise") {
                                            if (chart.type === "funnel" || chart.type === "heatmap") return null;
                                        } else if (selectedWise === "sales-customer-wise") {
                                            if (chart.type === "funnel" || chart.type === "heatmap") return null;
                                        } else if (selectedWise === "sales-so-wise") {
                                            if (chart.type !== "funnel") return null;
                                        } else if (selectedWise === "sales-kam-wise") {
                                            if (chart.type === "funnel") return null;
                                        } else if (selectedWise === "sales-region-wise") {
                                            if (chart.type === "funnel") return null;
                                        } else if (selectedWise === "purchase-product-wise") {
                                            if (chart.type === "funnel" || chart.type === "heatmap") return null;
                                        } else if (selectedWise === "purchase-vendor-wise") {
                                            if (chart.type === "funnel" || chart.type === "heatmap") return null;
                                        } else if (selectedWise === "purchase-po-wise") {
                                            if (chart.type === "bump" || chart.type === "line" || chart.type === "areaBump" || chart.type === "heatmap") return null;
                                        } else if (selectedWise === "purchase-po-wise") {
                                            if (chart.type === "bump" || chart.type === "line" || chart.type === "areaBump" || chart.type === "heatmap") return null;
                                        }

                                        return (
                                            <Box
                                                key={index}
                                                width={{
                                                    base: "100%",
                                                    lg: "49.4%",
                                                }}
                                                mb={6}
                                            >
                                                <Box
                                                    sx={{
                                                        backgroundColor: "white",
                                                        padding: "15px",
                                                        my: 5,
                                                        borderRadius: "8px",
                                                        border: "1px solid #c4c4c4",
                                                    }}
                                                    mb={3}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent: "flex-end",
                                                            "& button": {
                                                                color: "#718296",
                                                                padding: "20px 20px",
                                                                fontSize: "14px",
                                                                border: "1px solid #dee2e6",
                                                                backgroundColor: "white",
                                                                borderRadius: "8px",
                                                            },
                                                            "& button:hover": {
                                                                backgroundColor: "rgb(0, 48, 96)",
                                                                borderRadius: "5px",
                                                                color: "white",
                                                            },
                                                        }}
                                                        mb={6}
                                                    >
                                                        <Button
                                                            type="button"
                                                            variant="outlined"
                                                            style={{
                                                                display: "flex",
                                                                alignItems: "center",
                                                                gap: 1,
                                                                _hover: {
                                                                    color: "white",
                                                                },
                                                            }}
                                                            onClick={() => handleConfigure(chart)}
                                                        >
                                                            <FiSettings sx={{ mr: "6px" }} />
                                                            Select
                                                        </Button>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            width: "100%",
                                                            height: "200px",
                                                        }}
                                                    >
                                                        <DynamicChart chart={chart} />
                                                    </Box>
                                                    <Badge
                                                        colorScheme="blue"
                                                        py={0}
                                                        px={3}
                                                        fontSize={9}
                                                    >
                                                        {chart.title}
                                                    </Badge>
                                                </Box>
                                            </Box>
                                        );
                                    })}
                                </Box>

                                <Drawer
                                    isCentered
                                    size="md"
                                    isOpen={isOpenGraphSettingsModal}
                                    onClose={onCloseGraphSettingsModal}
                                    finalFocusRef={btnRef}
                                >
                                    <DrawerOverlay />
                                    <DrawerContent maxW="86vw">
                                        <DrawerCloseButton color="white" size="lg" mt="8px" />
                                        <DrawerHeader
                                            color="white"
                                            mb="4px"
                                            fontSize="17px"
                                            fontWeight="500"
                                            padding="15px 15px"
                                            backgroundColor="#003060"
                                        >
                                            Graphical View Settings
                                        </DrawerHeader>
                                        <Divider orientation="horizontal" mb={6} />
                                        <DrawerBody>
                                            <ChartConfiguration configureChart={configureChart} />
                                        </DrawerBody>
                                    </DrawerContent>
                                </Drawer>
                            </DrawerBody>

                            <DrawerFooter>
                                <Button variant="outline" mr={3} onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button colorScheme="blue">Save</Button>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </DrawerBody>

                <DrawerFooter>
                    <Button variant="outline" mr={3} onClick={onClose}>
                        Cancel
                    </Button>
                    <Button colorScheme="blue">Save</Button>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default MainBodyDrawer