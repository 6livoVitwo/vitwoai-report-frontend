import React, { useEffect, useState } from "react";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Divider,
  Grid,
  Heading,
  Select,
  Spinner,
  Stack,
  useToast,
  Text,
  Badge,
  Card,
  CardFooter,
  CardBody,
} from "@chakra-ui/react";
import { capitalizeWord } from "../../../utils/common";
import { MdRemoveRedEye, MdSave } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Accordion, AccordionTab } from "primereact/accordion";
import { split } from "lodash";
import AreaBumpChart from "../chartSettings/AreaBumpChart";
import BumpChart from "../chartSettings/BumpChart";
import LineChart from "../chartSettings/LineChart";
import FunnelChart from "../chartSettings/FunnelChart";
import BarChart from "../chartSettings/BarChart";
import { MultiSelect } from "primereact/multiselect";
import {
  calculateCount,
  createBodyWise,
  setDateRange,
  updateBodyWise,
  updateCountAndWidth,
} from "../graphUtils/common";
import TypingMaster from "../../dashboardNew/components/TypingMaster";
import { useDynamicNewQuery } from "./graphApi";
import { addWidget, updateWidget } from "./graphSlice";
import HeatMapChart from "../chartSettings/HeatMapChart";

// all chart components here
const chartComponents = {
  areaBump: AreaBumpChart,
  bump: BumpChart,
  line: LineChart,
  funnel: FunnelChart,
  heatmap: HeatMapChart,
  bar: BarChart,
};

const newEndpoint = (data = "", type = "", processFlow = "") => {
  if (data === "sales-product-wise") {
    if (type === "bump" || type === "areaBump" || type === "line") {
      return "/sales/graph/product-wise-time-series-seq";
    } else if (type === "heatmap") {
      return "/sales/graph/kam-wise-heat-density";
    } else if (type === "bar" || type === "pie") {
      return "/sales/sales-graph-two";
    }
  } else if (data === "sales-customer-wise") {
    if (type === "bump" || type === "areaBump" || type === "line") {
      return "/sales/graph/customer-wise-time-series-seq";
    }
    return "/sales/graph/customer-wise-time-series-seq";
  } else if (data === "sales-so-wise") {
    if (type === "funnel") {
      return processFlow;
    }
    return "/sales/graph/so-wise-flow-process";
  } else if (data === "sales-region-wise") {
    if (type === "bump" || type === "areaBump" || type === "line") {
      return "/sales/graph/region-wise-time-series-seq";
    } else if (type === "heatmap") {
      return "/sales/graph/region-wise-heat-density";
    }
  }
};

const initialBodyWise = (
  selectedWise = "",
  type = "",
  priceOrQty = "",
  startDate = "",
  endDate = "",
  regionWise = ""
) => {
  console.log({
    selectedWise,
    type,
    priceOrQty,
    startDate,
    endDate,
    regionWise,
  });
  if (selectedWise === "sales-product-wise") {
    if (type === "bump" || type === "areaBump" || type === "line") {
      return {
        priceOrQty: `${priceOrQty}`,
        yearFrom: split(startDate, "-")[0],
        yearTo: split(endDate, "-")[0],
        monthFrom: split(startDate, "-")[1],
        monthTo: split(endDate, "-")[1],
      };
    } else if (type === "heatmap") {
      return {
        priceOrQty: `${priceOrQty}`,
      };
    } else if (type === "bar" || type === "pie") {
      return {
        xaxis: "items.itemName",
        yaxis: [
          "salesPgi.salesDelivery.totalAmount",
          "salesPgi.totalAmount",
          "quotation.totalAmount",
          "salesOrder.totalAmount",
          "all_total_amt",
        ],
        groupBy: ["items.itemName"],
        valuetype: "sum",
        filter: [
          {
            column: "invoice_date",
            operator: "between",
            type: "date",
            value: ["2021-03-01", "2025-03-29"],
          },
        ],
      };
    }
  } else if (selectedWise === "sales-region-wise") {
    if (type === "bump" || type === "areaBump" || type === "line") {
      return {
        day: 12,
        month: 6,
        year: 2024,
        wise: "",
      };
    } else if (type === "heatmap") {
      return {
        wise: `${regionWise}`,
      };
    }
  } else if (selectedWise === "sales-customer-wise") {
    if (type === "bump" || type === "areaBump" || type === "line") {
      return {
        monthFrom: "3",
        monthTo: "7",
        yearFrom: 2024,
        yearTo: 2024,
      };
    }
  }
};


  const yAxisOptions = [
    {
      value: "salesPgi.salesDelivery.totalAmount",
      label: "Sales PGI Delivery Amount",
    },
    { value: "salesPgi.totalAmount", label: "Sales PGI Amount" },
    { value: "quotation.totalAmount", label: "Quotation Amount" },
    { value: "salesOrder.totalAmount", label: "Sales Order Amount" },
    { value: "all_total_amt", label: "All Total Amount" },
  ];

const ChartConfiguration = ({ configureChart }) => {
  const { type } = configureChart;
  const toast = useToast();
  const dispatch = useDispatch();

  // these all are state variables
  const [chartDataApi, setChartDataApi] = useState([]);
  const [wise, setWise] = useState("sales");
  const [priceOrQty, setPriceOrQty] = useState("qty");
  const [sumOrCount, setSumOrCount] = useState("count");
  const [previewLoading, setPreviewLoading] = useState(false);
  const currentWidgets = useSelector((state) => state.salescustomer.widgets);
  const [inputType, setInputType] = useState("month");
  const [dynamicWidth, setDynamicWidth] = useState(1200);
  const [regionWise, setRegionWise] = useState("pincode");
  const [selectedYAxisValues, setSelectedYAxisValues] = useState([]);
  const [startDate, setStartDate] = useState(
    inputType === "month"
      ? "2024-01"
      : inputType === "year"
      ? "2021"
      : "2024-01-01"
  );
  const [endDate, setEndDate] = useState(
    inputType === "month"
      ? "2024-12"
      : inputType === "year"
      ? "2024"
      : "2024-01-20"
  );
  const { selectedWise } = useSelector((state) => state.graphSlice);
  const [processFlow, setProcessFlow] = useState(
    "/sales/graph/so-wise-flow-process"
  );
  const [dynamicHeight, setDynamicHeight] = useState(4000);

  const [bodyWise, setBodyWise] = useState(
    initialBodyWise(
      selectedWise,
      type,
      priceOrQty,
      startDate,
      endDate,
      regionWise
    )
  );
  const [chartApiConfig, setChartApiConfig] = useState({
    areaBump: [
      {
        wise: "sales",
        method: "POST",
        endpoint: newEndpoint(selectedWise, type, processFlow),
        body: bodyWise,
      },
    ],
    bump: [
      {
        wise: "sales",
        method: "POST",
        endpoint: newEndpoint(selectedWise, type, processFlow),
        body: bodyWise,
      },
    ],
    line: [
      {
        wise: "sales",
        method: "POST",
        endpoint: newEndpoint(selectedWise, type, processFlow),
        body: bodyWise,
      },
    ],
    funnel: [
      {
        wise: "sales",
        method: "GET",
        endpoint: newEndpoint(selectedWise, type, processFlow),
        body: bodyWise,
      },
    ],
    heatmap: [
      {
        wise: "sales",
        method: "POST",
        endpoint: newEndpoint(selectedWise, type, processFlow),
        body: bodyWise,
      },
    ],
    bar: [
      {
        wise: "sales",
        method: "POST",
        endpoint: newEndpoint(selectedWise, type, processFlow),
        body: bodyWise,
      },
    ],
    pie: [
      {
        wise: "sales",
        method: "POST",
        endpoint: newEndpoint(selectedWise, type, processFlow),
        body: bodyWise,
      },
    ],
  });

  const handleInputType = (data) => {
    let { startDate: newStartDate, endDate: newEndDate } = setDateRange(data);
    let newBodyWise = createBodyWise(
      data,
      newStartDate,
      newEndDate,
      priceOrQty
    );
    let count = calculateCount(data, newStartDate, newEndDate);

    setInputType(data);
    setDynamicWidth(200 * count);
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setBodyWise(newBodyWise);
    updateChartApiConfig(newBodyWise);
  };

  const handlePriceOrQty = (data) => {
    let newBodyWise = createBodyWise(inputType, startDate, endDate, data, type);
    setPriceOrQty(data);
    setBodyWise(newBodyWise);
    updateChartApiConfig(newBodyWise);
  };

  const handleSumOrCount = (data) => {
    let newBodyWise = createBodyWise(inputType, startDate, endDate, data, type);
    setSumOrCount(data);
    setBodyWise(newBodyWise);
    updateChartApiConfig(newBodyWise);
  };

const handleYAxisChange = (e) => {
  console.log("MultiSelect change event:", e);
  const selectedValues = e.value;
  console.log("Selected Y-Axis Values:", selectedValues);

  if (!selectedValues || selectedValues.length === 0) {
    console.warn("No Y-Axis values selected");
    return;
  }

  const newBodyWise = createBodyWise(
    inputType,
    startDate,
    endDate,
    selectedValues,
    type
  );
  console.log("New BodyWise:", newBodyWise);

  setBodyWise(newBodyWise);
  setSelectedYAxisValues(selectedValues);
  updateChartApiConfig(newBodyWise);
};

  useEffect(() => {
    console.log("Chart API Config updated:", chartApiConfig);
  }, [chartApiConfig]);


  const handleDateUpdate = (dateType, data, type) => {
    let newStartDate = dateType === "from" ? data : startDate;
    let newEndDate = dateType === "to" ? data : endDate;

    // Update BodyWise
    const updatedBodyWise = updateBodyWise(
      inputType,
      newStartDate,
      newEndDate,
      bodyWise,
      type
    );

    // Set state updates
    if (dateType === "from") {
      setStartDate(data);
    } else {
      setEndDate(data);
    }

    // Update count and width
    updateCountAndWidth(inputType, newStartDate, newEndDate, setDynamicWidth);

    // Update the bodyWise and trigger the API
    setBodyWise(updatedBodyWise);
    updateChartApiConfig(updatedBodyWise);
  };

  const handleFromDate = (data) => {
    handleDateUpdate("from", data, type);
  };

  const handleToDate = (data) => {
    handleDateUpdate("to", data, type);
  };

  const updateChartApiConfig = (newBodyWise) => {
    console.log({ newBodyWise });
    setChartApiConfig((prevConfig) => ({
      ...prevConfig,
      areaBump: [
        {
          wise: "sales",
          method: "POST",
          endpoint: newEndpoint(selectedWise, type, processFlow),
          body: newBodyWise,
        },
      ],
      bump: [
        {
          wise: "sales",
          method: "POST",
          endpoint: newEndpoint(selectedWise, type, processFlow),
          body: newBodyWise,
        },
      ],
      line: [
        {
          wise: "sales",
          method: "POST",
          endpoint: newEndpoint(selectedWise, type, processFlow),
          body: newBodyWise,
        },
      ],
      funnel: [
        {
          wise: "sales",
          method: "GET",
          endpoint: newEndpoint(selectedWise, type, processFlow),
          body: bodyWise,
        },
      ],
      heatmap: [
        {
          wise: "sales",
          method: "POST",
          endpoint: newEndpoint(selectedWise, type, processFlow),
          body: newBodyWise,
        },
      ],
      bar: [
        {
          wise: "sales",
          method: "POST",
          endpoint: newEndpoint(selectedWise, type, processFlow),
          body: bodyWise,
        },
      ],
      pie: [
        {
          wise: "sales",
          method: "POST",
          endpoint: newEndpoint(selectedWise, type, processFlow),
          body: bodyWise,
        },
      ],
    }));
  };

  const chartConfig = chartApiConfig[type];
  const { endpoint, body, method } = chartConfig
    ? chartConfig.find((config) => config.wise === wise)
    : {};
  const {
    data: graphData,
    isLoading,
    isError,
    error,
  } = useDynamicNewQuery(
    endpoint
      ? { endpoint: type === "funnel" ? processFlow : endpoint, body, method }
      : null,
    { skip: !endpoint }
  );

  console.log("🔵 imran => ", { graphData });

  let finalData = graphData?.data;
  if (type === "funnel") {
    finalData = graphData?.steps;
  } else if (type === "bar") {
    finalData = graphData?.content;
  }

  useEffect(() => {
    if (type === "heatmap") {
      setInputType("");
      setEndDate("");
      setStartDate("");
    } else if (type === "bar") {
      setInputType("");
      setEndDate("");
      setStartDate("");
    }
  }, [type]);

  useEffect(() => {
    let isMounted = false;
    if (finalData) {
      const processedData = finalData.map((item) => {
        return {
          ...item,
          data: item?.data?.map((entry) => {
            return {
              ...entry,
              y: parseFloat(entry?.y),
            };
          }),
        };
      });

      if (!isMounted) {
        setChartDataApi(processedData || []);
      }
    }
    // clean up function to prevent memory leak
    return () => {
      isMounted = true;
    };
  }, [finalData, endDate]);

  const ChartComponent = chartComponents[type];
  if (isLoading) return <Spinner />;

  if (isError) {
    return (
      <>
        <Alert status="error">
          <AlertIcon />
          Error: {error?.data || "An error occurred"}
        </Alert>
      </>
    );
  }

  if (!ChartComponent) {
    return <Alert status="error">No valid chart type provided</Alert>;
  }

  // handle preview button
  const handlePreviewBtn = () => {
    setPreviewLoading(true);
    setTimeout(() => {
      setPreviewLoading(false);
    }, 500);
  };

  // handle save button
  const handleSaveBtn = () => {
    const widgetIndex = currentWidgets.findIndex(
      (widget) => widget.type === type
    );

    const widgetData = {
      id: "1",
      chartName: `Chart (${wise})`,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Chart`,
      type: type,
      group: "distributionComparison",
      pinned: true,
      description: `This is ${type} Chart`,
      data: chartDataApi,
    };

    if (widgetIndex === -1) {
      dispatch(addWidget(widgetData));
    } else {
      dispatch(
        updateWidget({
          index: widgetIndex,
          ...widgetData,
        })
      );
    }
    toast({
      title: "Chart Saved Successfully",
      status: "success",
      isClosable: true,
    });
  };

  const handleProcessFlow = (value) => {
    console.log({ value });
    setProcessFlow(value);
  };

  return (
    <Card variant={"unstyled"}>
      <CardBody sx={{ minHeight: "77vh" }}>
        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="space-between"
          marginTop="10px">
          {/* graph view section */}
          <Box
            width={{
              base: "100%",
              lg: "59%",
            }}
            mb={6}>
            <Box
              sx={{
                backgroundColor: "white",
                padding: "15px",
                borderRadius: "8px",
                border: "1px solid #c4c4c4",
              }}
              mb={3}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={8}>
                <Heading mt={4} mb={4}>
                  {/* {wise !== "" ? capitalizeWord(wise) : capitalizeWord(type)} Product Wise */}
                  {capitalizeWord(selectedWise)}
                </Heading>
                <Badge colorScheme="green" px={4}>
                  {type}
                </Badge>
              </Box>
              <Box sx={{ height: "350px", width: "100%", overflowX: "auto" }}>
                <ChartComponent
                  liveData={chartDataApi}
                  startDate={startDate}
                  endDate={endDate}
                  dynamicWidth={dynamicWidth}
                  dynamicHeight={dynamicHeight}
                  inputType={inputType}
                />
              </Box>
            </Box>
          </Box>

          {/* accordion section */}
          <Box
            width={{
              base: "100%",
              lg: "39%",
            }}>
            <Accordion activeIndex={0}>
              <AccordionTab
                header="Basic Info"
                headerStyle={{
                  backgroundColor: "#f0f0f0",
                  color: "#333",
                  padding: "7px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  borderTopLeftRadius: "6px",
                  borderTopRightRadius: "6px",
                }}
                contentStyle={{
                  border: "1px solid #ecebeb",
                }}>
                <Box mb={3}>
                  <Box style={{ lineHeight: "1.5", fontSize: "14px" }}>
                    <Heading mt={4} mb={4}>
                      Graph Info
                    </Heading>
                    <TypingMaster />
                  </Box>
                </Box>
              </AccordionTab>
              <AccordionTab
                header="Customized Graph"
                headerStyle={{
                  backgroundColor: "#f0f0f0",
                  color: "#333",
                  padding: "7px",
                  fontSize: "14px",
                  fontWeight: "bold",
                  borderTopLeftRadius: "6px",
                  borderTopRightRadius: "6px",
                }}
                contentStyle={{
                  border: "1px solid #ecebeb",
                }}>
                {type === "funnel" ? (
                  <Box>
                    <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                      <Stack spacing={3}>
                        <Text fontSize="sm" fontWeight="500">
                          Process Flow
                        </Text>
                        <Select
                          size="lg"
                          value={processFlow}
                          onChange={(e) => handleProcessFlow(e.target.value)}>
                          <option value="/sales/graph/so-wise-flow-process">
                            SO
                          </option>
                          <option value="/sales/graph/request-wise-flow-process">
                            Request
                          </option>
                          <option value="/sales/graph/quotation-so-wise-flow-process">
                            Quotation SO
                          </option>
                          <option value="/sales/graph/quotation-invoice-wise-flow-process">
                            Quotation Invoice
                          </option>
                          <option value="/sales/graph/invoice-wise-flow-process">
                            Invoice
                          </option>
                        </Select>
                      </Stack>
                    </Grid>
                  </Box>
                ) : (
                  <Box>
                    {type !== "heatmap" && type !== "bar" && (
                      <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                        <Stack spacing={3}>
                          <Text fontSize="sm" fontWeight="500">
                            Period (
                            <span
                              style={{
                                textTransform: "capitalize",
                                fontWeight: "bold",
                                color: "green",
                              }}>
                              {inputType}
                            </span>{" "}
                            Wise)
                          </Text>
                          <Select
                            size="lg"
                            value={inputType}
                            onChange={(e) => handleInputType(e.target.value)}>
                            <option value="date">Day</option>
                            <option value="month">Month</option>
                            <option value="year">Year</option>
                          </Select>
                        </Stack>
                      </Grid>
                    )}
                    {selectedWise !== "sales-customer-wise" &&
                      type !== "bar" && (
                        <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                          <Stack spacing={3}>
                            <Text fontSize="sm" fontWeight="500">
                              Quantity
                            </Text>
                            <Select
                              size="lg"
                              value={priceOrQty}
                              onChange={(e) =>
                                handlePriceOrQty(e.target.value)
                              }>
                              <option value="qty">Qty</option>
                              <option value="price">Price</option>
                            </Select>
                          </Stack>
                        </Grid>
                      )}
                    {type === "bar" && (
                      <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                        <MultiSelect
                          className="w-full sm:w-22rem"
                          display="chip"
                          style={{ border: "1px solid #e2e8f0" }}
                          options={yAxisOptions}
                          value={selectedYAxisValues} // This is the state that holds the selected values
                          onChange={handleYAxisChange} // This function should handle updates
                          placeholder="Select Y-Axis"
                        />

                        <Stack spacing={3}>
                          <Text fontSize="sm" fontWeight="500">
                            Filter
                          </Text>
                          <Select
                            size="lg"
                            value={sumOrCount}
                            onChange={(e) => handleSumOrCount(e.target.value)}>
                            <option value="count">Count</option>
                            <option value="sum">Sum</option>
                          </Select>
                        </Stack>
                      </Grid>
                    )}
                    {type !== "heatmap" && (
                      <Stack
                        spacing={0}
                        sx={{
                          borderRadius: "6px",
                          shadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                          border: "1px solid rgba(0, 0, 0, 0.10)",
                          mt: 4,
                          p: 4,
                        }}>
                        <Text fontSize="sm" fontWeight="500">
                          Date Filter (
                          <span
                            style={{
                              textTransform: "capitalize",
                              fontWeight: "bold",
                              color: "green",
                            }}>
                            {inputType}
                          </span>{" "}
                          Wise)
                        </Text>
                        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                          <Stack spacing={0}>
                            <Text fontSize="sm" fontWeight="500">
                              From Date
                            </Text>
                            <input
                              style={{
                                border: "1px solid rgba(0, 0, 0, 0.10)",
                                borderRadius: "6px",
                                paddingLeft: 4,
                                paddingRight: 4,
                              }}
                              type={inputType === "" && "date"}
                              value={startDate}
                              onChange={(e) => handleFromDate(e.target.value)}
                            />
                          </Stack>
                          <Stack spacing={0}>
                            <Text fontSize="sm" fontWeight="500">
                              To Date
                            </Text>
                            <input
                              style={{
                                border: "1px solid rgba(0, 0, 0, 0.10)",
                                borderRadius: "6px",
                                paddingLeft: 4,
                                paddingRight: 4,
                              }}
                              type={inputType === "" && "date"}
                              value={endDate}
                              onChange={(e) => handleToDate(e.target.value)}
                            />
                          </Stack>
                        </Grid>
                      </Stack>
                    )}
                  </Box>
                )}
              </AccordionTab>
            </Accordion>
          </Box>
        </Box>
      </CardBody>
      {/* footer area */}
      <Divider my={6} sx={{ border: "1px solid #e4e4e4" }} />
      <CardFooter sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="outline"
            colorScheme="pink"
            leftIcon={previewLoading ? <Spinner /> : <MdRemoveRedEye />}
            sx={{
              p: "20px 20px",
              fontSize: "14px",
            }}
            mr={3}
            onClick={handlePreviewBtn}>
            Preview
          </Button>
          <Button
            variant="solid"
            colorScheme="teal"
            leftIcon={<MdSave />}
            sx={{
              p: "20px 20px",
              fontSize: "14px",
            }}
            mr={3}
            onClick={handleSaveBtn}>
            Save
          </Button>
        </Box>
      </CardFooter>
    </Card>
  );
};

export default ChartConfiguration;
