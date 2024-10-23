import React, { useEffect, useState } from "react";
import { Alert, AlertIcon, Box, Button, Divider, Grid, Heading, Select, Spinner, Stack, useToast, Text, Badge, Card, CardFooter, CardBody } from "@chakra-ui/react";
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
import { calculateCount, createBodyWise, setDateRange, updateBodyWise, updateCountAndWidth } from "../graphUtils/common";
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

const graphDescriptions = {
  bar: "The Bar chart can display multiple data series, either stacked or side by side. It supports both vertical and horizontal layouts, with negative values positioned below the respective axes. You can customize the bar item component to render any valid SVG element, receiving styles, data, and event handlers. The responsive variant is called ResponsiveBar, available in the @nivo/api package. For legend configuration, you'll need to specify the dataFrom property, which determines how to compute the legend's data using indexes or keys.",
  pie: "This component generates a pie chart from an array of data, where each item must include an id and a value property. Keep in mind that the margin object does not account for radial labels, so you should adjust it accordingly to provide sufficient space. The responsive version of this component is called ResponsivePie.",
  areaBump:
    "The AreaBump chart combines ranking and values, displaying both over time on the y-axis. This makes it ideal for understanding trends in performance. If your primary interest lies in rankings alone, the Bump chart is a more streamlined option. It effectively highlights shifts in position without the added complexity of values. Choose based on your specific data needs!",
  bump: "The Bump chart visualizes the rankings of multiple series over time. While it resembles line charts, it focuses solely on displaying rankings rather than specific measurements on the y-axis. This makes it easy to track changes in position for each series at any given moment. By highlighting only the rankings, it simplifies the analysis of competitive dynamics. It's an effective tool for showcasing shifts in standings over time.",
  line: "This line chart supports stacking capabilities. It takes an array of data series, each with an id and a nested array of points (containing x and y properties), to compute the line for each series. Any datum with a null x or y value will be treated as a gap, resulting in skipped segments of the corresponding line.",
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
  } else if (data === "purchase-product-wise") {
    if (type === "areaBump" || type === "line" || type === "bump") {
      return "/purchase/graph/material-wise-time-series-seq"
    } else if (type === "bar" || type === "pie") {
      return "/purchase/purchase-graph-two";
    }
  } else if (data === "purchase-vendor-wise") {
    if (type === "areaBump" || type === "line" || type === "bump") {
      return "/purchase/graph/vendor-wise-time-series-seq"
    } else if (type === "bar" || type === "pie") {
      return "/purchase/purchase-graph-two";
    }
  } else if (data === "purchase-po-wise") {
    if (type === "funnel") {
      return processFlow;
    } else if (type === "bar" || type === "pie") {
      return "/purchase/purchase-graph-two";
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
        valuetype: "count",
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
  } else if (selectedWise === "purchase-product-wise") {
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
        xaxis: "items.goodName",
        yaxis: [
          "grnInvoice.grnSubTotal",
          "grnInvoice.grnTotalCgst",
          "grnInvoice.grnTotalIgst",
          "grnInvoice.grnTotalAmount",
        ],
        groupBy: ["items.goodCode"],
        valuetype: "count",
        filter: [
          {
            column: "vendorDocumentDate",
            operator: "between",
            type: "date",
            value: [startDate, endDate],
          },
        ],
      };
    }
  } else if (selectedWise === "purchase-vendor-wise") {
    if (type === "bump" || type === "areaBump" || type === "line") {
      return {
        yearFrom: split(startDate, "-")[0],
        yearTo: split(endDate, "-")[0],
        monthFrom: split(startDate, "-")[1],
        monthTo: split(endDate, "-")[1],
      };
    } else if (type === "bar" || type === "pie") {
      return {
        "xaxis": "vendors.trade_name",
        "yaxis": [
          "grnInvoice.grnSubTotal",
          "grnInvoice.grnTotalCgst",
          "grnInvoice.grnTotalIgst",
          "grnInvoice.grnTotalAmount"
        ],
        "groupBy": [
          "vendors.vendor_code"
        ],
        "valuetype": "count",
        "filter": [
          {
            "column": "vendorDocumentDate",
            "operator": "between",
            "type": "date",
            "value": [startDate, endDate]
          }
        ]
      }
    }
  } else if (selectedWise === "purchase-po-wise") {
    if (type === "bar" || type === "pie") {
      return {
        "xaxis": "po.po_number",
        "yaxis": [
          "grnInvoice.grnSubTotal",
          "grnInvoice.grnTotalCgst",
          "grnInvoice.grnTotalIgst",
          "grnInvoice.grnTotalAmount"
        ],
        "groupBy": [
          "po.po_number"
        ],
        "valuetype": "count",
        "filter": [
          {
            "column": "vendorDocumentDate",
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
  const { selectedWise, reportType } = useSelector((state) => state.graphSlice);
  const [currentDescription, setCurrentDescription] = useState(
    graphDescriptions[type]
  );
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

  const handleDateUpdate = (dateType, data, type, reportType) => {
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
    handleDateUpdate("from", data, type, reportType);
  };

  const handleToDate = (data) => {
    handleDateUpdate("to", data, type, reportType);
  };

  // const yAxisOptions = [
  //   {
  //     value: "salesPgi.salesDelivery.totalAmount",
  //     label: "Sales PGI Delivery Amount",
  //   },
  //   { value: "salesPgi.totalAmount", label: "Sales PGI Amount" },
  //   { value: "quotation.totalAmount", label: "Quotation Amount" },
  //   { value: "salesOrder.totalAmount", label: "Sales Order Amount" },
  //   { value: "all_total_amt", label: "All Total Amount" },
  // ];

  // console.log("yAxisOptions", yAxisOptions);

  const yAxisOptions = () => {
    if (reportType === "sales") {
      return [
        {
          value: "salesPgi.salesDelivery.totalAmount",
          label: "Sales PGI Delivery Amount",
        },
        { value: "salesPgi.totalAmount", label: "Sales PGI Amount" },
        { value: "quotation.totalAmount", label: "Quotation Amount" },
        { value: "salesOrder.totalAmount", label: "Sales Order Amount" },
        { value: "all_total_amt", label: "All Total Amount" },
      ];
    } else if (reportType === "purchase") {
      return [
        {
          value: "grnInvoice.grnSubTotal",
          label: "GRN Subtotal",
        },
        { value: "grnInvoice.grnTotalCgst", label: "GRN Total CGST" },
        { value: "grnInvoice.grnTotalIgst", label: "GRN Total IGST" },
        { value: "grnInvoice.grnTotalAmount", label: "GRN Total Amount" },
      ];
    }
    return [];
  };


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

  console.log('🟢🔵🔴', { selectedWise })

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
                    <TypingMaster text={currentDescription} />
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
                        {selectedWise !== "purchase-po-wise" ? (
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
                        ) : (
                          <Select
                            size="lg"
                            value={processFlow}
                            onChange={(e) => handleProcessFlow(e.target.value)}>
                            <option value="/purchase/graph/rfq-wise-flow-process">
                              RFQ
                            </option>
                            <option value="/purchase/graph/po-wise-flow-process">
                              PO
                            </option>
                            <option value="/purchase/graph/grn-wise-flow-process">
                              GRN
                            </option>
                            <option value="/purchase/graph/grn-invoice-wise-flow-process">
                              GRN Invoice
                            </option>
                          </Select>
                        )}
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
                      selectedWise !== "purchase-vendor-wise" &&
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
                              {yAxisOptions().map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </Select>
                          ) : (
                            <MultiSelect
                              display="chip"
                              options={yAxisOptions().map((option) => ({
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