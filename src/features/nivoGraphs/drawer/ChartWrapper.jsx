import { useMemo } from "react";
import DynamicChart from "../chartConfigurations/DynamicChart";
import { useDynamicNewQuery } from "../chartConfigurations/graphApi";
import useProcessedData from "../hooks/useProcessedData";
import { Alert, Box, Button, HStack, Skeleton, SkeletonCircle, Spinner, Stack, Text } from "@chakra-ui/react";
import { RxCross1 } from "react-icons/rx";
import { MdFullscreen } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import ChartSkeleton from "./ChartSkeleton";

const ChartWrapper = ({ chart, handleConfigure, handleFullScreen, handleWidgetDelete }) => {

    const { id, endpoint, body, method, type, processFlow, selectedWise, reportType, dynamicWidth, dynamicHeight, startDate, endDate, inputType, companyId, branchId, locationId, userId } = chart;

    const { data: graphData, isLoading, error } = useDynamicNewQuery(
        endpoint
            ? { endpoint: type === "funnel" ? processFlow : endpoint, body, method }
            : null,
        { skip: !endpoint }
    );

    const finalData = useMemo(() => {
        if (type === "funnel") {
            return graphData?.steps || [];
        } else if (type === "bar" || type === "pie") {
            return graphData?.content || [];
        }
        return graphData?.data || [];
    }, [graphData, type]);

    const processedData = useProcessedData(finalData, type);

    const chartData = {
        id: id,
        chartName: `Chart (${selectedWise})`,
        title: `${type.charAt(0).toUpperCase() + type.slice(1)} Chart`,
        type: type,
        group: "distributionComparison",
        pinned: true,
        description: `This is ${type} Chart`,
        data: processedData || [],
        selectedWise,
        reportType,
        dynamicWidth,
        dynamicHeight,
        startDate,
        endDate,
        inputType,
        endpoint,
        body,
        method,
        companyId,
        branchId,
        locationId,
        userId
    }

    if (error) return <Alert status="error">Error loading chart {id}: {error.message}</Alert>;

    return (
        <>
            {isLoading ? <ChartSkeleton /> : <Box
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
                                mr={3}
                                mt={2}
                                onClick={() => handleWidgetDelete(chart.id)}
                            >
                                <RxCross1 />
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{ height: "250px", width: "100%", overflow: "auto" }}>
                        <DynamicChart chart={chartData} />
                    </Box>
                </Box>
            </Box>}
        </>
    );
};

export default ChartWrapper;