import { Alert, Badge, Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Text, useDisclosure } from '@chakra-ui/react';
import React, { useMemo, useState } from 'react'
import { FiPlus, FiSettings } from 'react-icons/fi';
import { MdFullscreen, MdRefresh } from 'react-icons/md';
import DynamicChart from '../chartConfigurations/DynamicChart';
import ChartConfiguration from '../chartConfigurations/ChartConfiguration';
import { useSelector } from 'react-redux';
import { chartsData } from '../jsonData/graphSkeleton';
import { BreadCrumb } from 'primereact/breadcrumb';
import { RxCross1 } from "react-icons/rx";
import { capitalizeWord, formatWordBetweenDashes } from '../../../utils/common';
import { Sidebar } from 'primereact/sidebar';
import { useDispatch } from 'react-redux';
import { refreshWidget, removeWidget } from '../chartConfigurations/graphSlice';
import useProcessedData from '../hooks/useProcessedData';
import useChartRefresh from '../hooks/useChartRefresh';

const MainBodyDrawer = (props) => {
    const [visible, setVisible] = useState(false);
    const [fullScreenChartView, setFullScreenChartView] = useState({});
    const dispatch = useDispatch();
    const { isOpenGraphAddDrawer, onCloseGraphAddDrawer } = props;
    const { selectedWise, reportType } = useSelector((state) => state.graphSlice);
    const widgets = useSelector((state) => state.graphSlice.widgets);
    const localStorageWidgets = JSON.parse(localStorage.getItem('widgets')) || [];
    const checkWidgets = widgets?.length > 0 ? widgets : localStorageWidgets;

    const token = useSelector((state) => state.auth.authDetails);
    // decode data from token
    const decodedToken = useMemo(() => {
        return token ? JSON.parse(atob(token.split('.')[1])) : null;
    }, [token]);

    const companyId = decodedToken?.data?.company_id;
    const branchId = decodedToken?.data?.branch_id;
    const locationId = decodedToken?.data?.location_id;
    const userId = decodedToken?.data?.authUserId;

    const filteredCharts = checkWidgets?.filter((chart) => {
        return chart.selectedWise === selectedWise && chart.reportType === reportType && chart.companyId === companyId && chart.branchId === branchId && chart.locationId === locationId && chart.userId === userId;
    });

    const btnRef = React.useRef();
    const { onOpen: onOpenGraphSettingDrawer, onClose: onCloseGraphSettingDrawer, isOpen: isOpenGraphSettingDrawer } = useDisclosure();
    const { isOpen: isOpenGraphSettingsModal, onOpen: onOpenGraphSettingsModal, onClose: onCloseGraphSettingsModal } = useDisclosure();
    const [configureChart, setConfigureChart] = useState({});

    const items = [{ label: reportType }, { label: selectedWise }];
    const home = { icon: 'pi pi-home', url: '#' }

    const [chart, setChart] = useState({ endpoint: '', body: {}, method: '', type: '', processFlow: '' });

    const { graphData, handleRefresh } = useChartRefresh(chart);
    const processedGraphData = useProcessedData(graphData, chart?.type);

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
        onOpenGraphSettingDrawer();
        onOpenGraphSettingsModal();
        const filterData = removeProperty(chart);
        setConfigureChart(filterData);
    };

    const handleFullScreen = (chart) => {
        setFullScreenChartView(chart);
        setVisible(true);
    };

    const handleWidgetDelete = (id) => {
        console.log('id', id)
        dispatch(removeWidget(id));
    }

    const handleRefreshWidget = (chart) => {
        setChart(chart);
        handleRefresh(chart);
        console.log('in the handleRefreshWidget', { processedGraphData })
        dispatch(refreshWidget({ id: chart.id, data: processedGraphData }));
    }

    console.log('🗑️ Redux Store', widgets);
    console.log('🫙 LocalStorage', localStorageWidgets)
    return (
        <>
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
                                                            <FiSettings />
                                                        </Button>

                                                        {/* <Button
                                                            variant="outline"
                                                            colorScheme='purple'
                                                            sx={{
                                                                p: "15px 10px",
                                                                fontSize: "12px"
                                                            }}
                                                            mr={3}
                                                            onClick={() => handleRefreshWidget(chart)}
                                                        >
                                                            <MdRefresh />
                                                        </Button> */}
                                                        <Button
                                                            variant="outline"
                                                            colorScheme='blue'
                                                            sx={{
                                                                p: "15px 10px",
                                                                fontSize: "12px"
                                                            }}
                                                            mr={3}
                                                            onClick={() => handleFullScreen(chart)}
                                                        >
                                                            <MdFullscreen />
                                                        </Button>

                                                        <Button
                                                            variant="outline"
                                                            colorScheme='red'
                                                            sx={{
                                                                p: "15px 10px",
                                                                fontSize: "12px",
                                                                fontWeight: 'bold'
                                                            }}
                                                            onClick={() => handleWidgetDelete(chart.id)}
                                                        >
                                                            <RxCross1 />
                                                        </Button>
                                                    </Box>
                                                </Box>
                                                <Box sx={{ height: "250px", width: "100%", overflow: "auto" }}>
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
                                                                overflow: "hidden",
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

                                {/* <DrawerFooter>
                                    <Button variant="outline" mr={3} onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button colorScheme="blue">Save</Button>
                                </DrawerFooter> */}
                            </DrawerContent>
                        </Drawer>
                    </DrawerBody>

                    {/* <DrawerFooter>
                        <Button variant="outline" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme="blue">Save</Button>
                    </DrawerFooter> */}
                </DrawerContent>
            </Drawer>
            <div className="card flex justify-content-center">
                <Sidebar
                    style={{ overflow: "auto !important" }}
                    visible={visible}
                    onHide={() => setVisible(false)}
                    fullScreen
                >
                    <h2>{fullScreenChartView?.chartName}</h2>
                    <h2>{fullScreenChartView?.description}</h2>
                    <Divider mt={3} />
                    <div style={{ height: "450px", width: "100%", marginTop: "50px", overflow: "auto !important" }}>
                        <DynamicChart chart={fullScreenChartView} />
                    </div>
                </Sidebar>
            </div>
        </>
    )
}

export default MainBodyDrawer