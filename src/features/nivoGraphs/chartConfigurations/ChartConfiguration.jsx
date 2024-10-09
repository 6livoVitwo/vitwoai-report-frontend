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
import { MultiSelect } from "primereact/multiselect";

import { split } from "lodash";

import AreaBumpChart from "../chartSettings/AreaBumpChart";
import BumpChart from "../chartSettings/BumpChart";
import LineChart from "../chartSettings/LineChart";
import FunnelChart from "../chartSettings/FunnelChart";
import BarChart from "../chartSettings/BarChart";
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
import PieChart from "../chartSettings/PieChart";

// all chart components here
const chartComponents = {
  areaBump: AreaBumpChart,
  bump: BumpChart,
  line: LineChart,
  funnel: FunnelChart,
  heatmap: HeatMapChart,
  bar: BarChart,
  pie: PieChart,
};

const newEndpoint = (data = "", type = "", processFlow = "") => {
  if (data === "sales-product-wise") {
    if (type === "bump" || type === "areaBump" || type === "line") {
      return "/sales/graph/product-wise-time-series-seq";
    } else if (type === "bar" || type === "pie") {
      return "/sales/sales-graph-two";
    }
  } else if (data === "sales-customer-wise") {
    if (type === "bump" || type === "areaBump" || type === "line") {
      return "/sales/graph/customer-wise-time-series-seq";
    } else if (type === "bar" || type === "pie") {
      return "/sales/sales-graph-two";
    }
  } else if (data === "sales-so-wise") {
    if (type === "funnel") {
      return processFlow;
    }
    return "/sales/graph/so-wise-flow-process";
  } else if (data === "sales-kam-wise") {
    if (type === "bump" || type === "areaBump" || type === "line") {
      return "/sales/graph/kam-wise-time-series-seq";
    } else if (type === "heatmap") {
      return "/sales/graph/kam-wise-heat-density";
    } else if (type === "bar" || type === "pie") {
      return "/sales/sales-graph-two";
    }
  } else if (data === "sales-region-wise") {
    if (type === "bump" || type === "areaBump" || type === "line") {
      return "/sales/graph/region-wise-time-series-seq";
    } else if (type === "heatmap") {
      return "/sales/graph/region-wise-heat-density";
    } else if (type === "bar" || type === "pie") {
      return "/sales/sales-graph-two";
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
  if (selectedWise === "sales-product-wise") {
    if (type === "bump" || type === "areaBump" || type === "line") {
      return {
        priceOrQty: `${priceOrQty}`,
        yearFrom: split(startDate, "-")[0],
        yearTo: split(endDate, "-")[0],
        monthFrom: split(startDate, "-")[1],
        monthTo: split(endDate, "-")[1],
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
            value: [startDate, endDate],
          },
        ],
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
    } else if (type === "bar" || type === "pie") {
      return {
        "xaxis": "items.goodsItems.goodsGroup.goodGroupName",
        "yaxis": [
          "salesPgi.salesDelivery.totalAmount",
          "salesPgi.totalAmount",
          "quotation.totalAmount",
          "salesOrder.totalAmount",
          "all_total_amt"
        ],
        "groupBy": [
          "items.goodsItems.goodsGroup"
        ],
        "valuetype": "count",
        "filter": [
          {
            "column": "invoice_date",
            "operator": "between",
            "type": "date",
            "value": [startDate, endDate]
          }
        ]
      };
    }
  } else if (selectedWise === "sales-kam-wise") {
    if (type === "bump" || type === "areaBump" || type === "line") {
      return {
        monthFrom: "3",
        monthTo: "7",
        yearFrom: 2024,
        yearTo: 2024,
      };
    } else if (type === "heatmap") {
      return {
        priceOrQty: `${priceOrQty}`,
      };
    } else if (type === "bar" || type === "pie") {
      return {
        "xaxis": "kam.kamName",
        "yaxis": [
          "salesPgi.salesDelivery.totalAmount",
          "salesPgi.totalAmount",
          "quotation.totalAmount",
          "salesOrder.totalAmount",
          "all_total_amt"
        ],
        "groupBy": [
          "kam.kamCode"
        ],
        "valuetype": "count",

        "filter": [
          {
            "column": "invoice_date",
            "operator": "between",
            "type": "date",
            "value": [startDate, endDate]
          }
        ]
      }
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
    } else if (type === "bar" || type === "pie") {
      return {
        "xaxis": "customer.customerAddress.customer_address_state",
        "yaxis": [
          "salesPgi.salesDelivery.totalAmount",
          "salesPgi.totalAmount",
          "quotation.totalAmount",
          "salesOrder.totalAmount",
          "all_total_amt"
        ],
        "groupBy": [
          "customer.customerAddress.customer_address_state"
        ],
        "valuetype": "count",

        "filter": [
          {
            "column": "invoice_date",
            "operator": "between",
            "type": "date",
            "value": [startDate, endDate]
          }
        ]
      }
    }
  }
};

const initialStartDate = (inputType, type) => {
  if (type === "bar" || type === "pie") {
    return "2024-05-20";
  } else {
    if (inputType === "month") {
      return "2024-01";
    } else if (inputType === "year") {
      return "2021";
    } else if (inputType === "date") {
      return "2024-01-01";
    }
  }
};

const initialEndDate = (inputType, type) => {
  if (type === "bar" || type === "pie") {
    return "2024-05-31";
  } else {
    if (inputType === "month") {
      return "2024-12";
    } else if (inputType === "year") {
      return "2021";
    } else if (inputType === "date") {
      return "2024-01-01";
    }
  }
};

const ChartConfiguration = ({ configureChart }) => {
  const { type } = configureChart;
  const toast = useToast();
  const dispatch = useDispatch();

  // these all are state variables
  const [chartDataApi, setChartDataApi] = useState([]);
  const [wise, setWise] = useState("sales");
  const [priceOrQty, setPriceOrQty] = useState("qty");
  const [valuetype, setValuetype] = useState("count");
  const [previewLoading, setPreviewLoading] = useState(false);
  const currentWidgets = useSelector((state) => state.salescustomer.widgets);
  const [inputType, setInputType] = useState("month");
  const [dynamicWidth, setDynamicWidth] = useState(1200);
  const [regionWise, setRegionWise] = useState("pincode");
  const [startDate, setStartDate] = useState(initialStartDate(inputType, type));
  const [endDate, setEndDate] = useState(initialEndDate(inputType, type));
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

  const handleValueTypeChange = (e) => {
    const selectedValueType = e.target.value;
    setValuetype(selectedValueType);

    setChartApiConfig((prevConfig) => ({
      ...prevConfig,
      [type]: prevConfig[type].map((config) => ({
        ...config,
        body: {
          ...config.body,
          valuetype: selectedValueType,
        },
      })),
    }));
  };

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

  console.log("yAxisOptions", yAxisOptions);


  const handleYAxisChange = (e) => {
    const { value } = e.target;

    // If it's a multi-select, you should handle arrays
    const newValue = Array.isArray(value) ? value : [value];

    setChartApiConfig((prevConfig) => ({
      ...prevConfig,
      [type]: prevConfig[type].map((config) => ({
        ...config,
        body: {
          ...config.body,
          yaxis: newValue,
        },
      })),
    }));
  };

  const updateChartApiConfig = (newBodyWise) => {
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

  let finalData = graphData?.data;
  if (type === "funnel") {
    finalData = graphData?.steps;
  } else if (type === "bar" || type === "pie") {
    finalData = graphData?.content;
  }
  useEffect(() => {
    if (type === "heatmap") {
      setInputType("");
      setEndDate("");
      setStartDate("");
    } else if (type === "bar" || type === "pie") {
      setInputType("date");
      // setEndDate("");
      // setStartDate("");
    }
  }, [type]);

  useEffect(() => {
    let isMounted = false;
    if (finalData) {
      let processedData = [];
      // let newArr = [];

      if (type === "pie") {
        processedData = finalData.map((product, index) => {
          return {
            id: index,
            label: product?.yaxis,
            value: product?.all_total_amt,
          };
        });
      } else if (type === "bar") {
        processedData = finalData;
      } else {
        processedData = finalData.map((item) => {
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
      }

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
                    {type !== "heatmap" && type !== "bar" && type !== "pie" && (
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
                      type !== "bar" &&
                      type !== "pie" && (
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

                    {(type === "bar" || type === "pie") && (
                      <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                        <Stack spacing={3}>
                          <Text fontSize="sm" fontWeight="500">
                            Y Axis
                          </Text>
                          {type === "pie" ? (
                            <Select size="lg" onChange={handleYAxisChange}>
                              {yAxisOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Select>
                          ) : (
                            <MultiSelect
                              display="chip"
                              options={yAxisOptions.map((option) => ({
                                value: option.value,
                                label: option.label,
                              }))}
                              placeholder="Select Y-Axis"
                              onChange={handleYAxisChange}
                            />
                          )}
                        </Stack>
                        <Stack spacing={3}>
                          <Text fontSize="sm" fontWeight="500">
                            Filter
                          </Text>
                          <Select
                            size="lg"
                            value={valuetype}
                            onChange={handleValueTypeChange}>
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
                              type={inputType}
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
                              type={inputType}
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