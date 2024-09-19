import React, { useEffect, useState } from "react";
import { useDynamicNewQuery } from "../slice/graphApi";
import { Alert, AlertIcon, Box, Button, Divider, Grid, Heading, Select, Spinner, Stack, useToast, Text } from "@chakra-ui/react";
import { capitalizeWord, lastDateOfMonth } from "../../../utils/common";
import { MdRemoveRedEye, MdSave } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addWidget, updateWidget } from "../slice/graphSlice";
import { Accordion, AccordionTab } from "primereact/accordion";
import AreaBump from "../../dashboardNew/nivo/AreaBump";
import TypingMaster from "../../dashboardNew/components/TypingMaster";
import { split } from "lodash";
import { calculateCount, createBodyWise, getDateDifference, getMonthDifference, setDateRange, updateBodyWise, updateCountAndWidth } from "../../../utils/graphs-utilitis";
import { Calendar } from 'primereact/calendar';
import { format } from "date-fns";
// all chart components here
const chartComponents = {
  areaBump: AreaBump,
};

const ChartConfiguration = ({ configureChart }) => {
  const { type } = configureChart;
  const toast = useToast();
  const dispatch = useDispatch();

  // these all are state variables
  const [chartDataApi, setChartDataApi] = useState([]);
  const [wise, setWise] = useState("sales");
  const [priceOrQty, setPriceOrQty] = useState("qty");
  const [previewLoading, setPreviewLoading] = useState(false);
  const currentWidgets = useSelector((state) => state.salescustomer.widgets);
  const [inputType, setInputType] = useState("month");
  const [dynamicWidth, setDynamicWidth] = useState(1200);
  const [startDate, setStartDate] = useState(inputType === 'month' ? '2024-01' : inputType === 'year' ? '2021' : '2024-01-01');
  const [endDate, setEndDate] = useState(inputType === 'month' ? '2024-12' : inputType === 'year' ? '2024' : '2024-01-20');
  const [bodyWise, setBodyWise] = useState({
    "priceOrQty": `${priceOrQty}`,
    "yearFrom": split(startDate, '-')[0],
    "yearTo": split(endDate, '-')[0],
    "monthFrom": split(startDate, '-')[1],
    "monthTo": split(endDate, '-')[1],
  });
  const [chartApiConfig, setChartApiConfig] = useState({
    areaBump: [
      {
        wise: "sales",
        endpoint: "/sales/graph/product-wise-area-bump",
        body: bodyWise
      },
    ],
  });

  const handleInputType = (data) => {
    let { startDate: newStartDate, endDate: newEndDate } = setDateRange(data);
    let newBodyWise = createBodyWise(data, newStartDate, newEndDate, priceOrQty);
    let count = calculateCount(data, newStartDate, newEndDate);

    setInputType(data);
    setDynamicWidth(200 * count);
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setBodyWise(newBodyWise);
    updateChartApiConfig(newBodyWise);
  }

  const handlePriceOrQty = (data) => {
    setPriceOrQty(data);
    let newBodyWise = createBodyWise(inputType, startDate, endDate, data);
    setBodyWise(newBodyWise);
    updateChartApiConfig(newBodyWise);
  }

  const handleDateUpdate = (type, data) => {
    let newStartDate = type === 'from' ? data : startDate;
    let newEndDate = type === 'to' ? data : endDate;

    // Update BodyWise
    const newBodyWise = updateBodyWise(inputType, newStartDate, newEndDate, bodyWise);

    // Set state updates
    if (type === 'from') {
      setStartDate(data);
    } else {
      setEndDate(data);
    }

    // Update count and width
    updateCountAndWidth(inputType, newStartDate, newEndDate, setDynamicWidth);
    console.log("updateCountAndWidth")
    console.log(dynamicWidth)
    // Update the bodyWise and trigger the API
    setBodyWise(newBodyWise);
    updateChartApiConfig(newBodyWise);
  };

  const handleFromDate = (data) => {
    handleDateUpdate('from', data);
  }

  const handleToDate = (data) => {
    handleDateUpdate('to', data);
  };

  const updateChartApiConfig = (newBodyWise) => {
    setChartApiConfig((prevConfig) => ({
      ...prevConfig,
      areaBump: [
        {
          wise: "sales",
          endpoint: "/sales/graph/product-wise-area-bump",
          body: newBodyWise
        },
      ],
    }));
  };

  const chartConfig = chartApiConfig[type];
  const { endpoint, body } = chartConfig ? chartConfig.find((config) => config.wise === wise) : {};
  const { data: graphData, isLoading, isError, error } = useDynamicNewQuery(endpoint ? { endpoint, body } : null, { skip: !endpoint });

  useEffect(() => {
    let isMounted = false;

    if (graphData) {
      const processedData = graphData?.data.map((item) => {
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
    }
  }, [graphData, endDate]);

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

  return (
    <>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        marginTop="10px"
      >
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
              <Box
                style={{
                  padding: "10px",
                  fontWeight: 600,
                  color: "black",
                }}>
                <Heading mt={4} mb={4}>
                  {wise !== "" ? capitalizeWord(wise) : capitalizeWord(type)}
                </Heading>
              </Box>
            </Box>
            <Box sx={{ height: "350px", width: "100%", overflowX: "auto" }}>
              <ChartComponent
                liveData={chartDataApi}
                startDate={startDate}
                endDate={endDate}
                dynamicWidth={dynamicWidth}
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
              <Box>
                <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                  <Stack spacing={3}>
                    <Text fontSize="sm" fontWeight="500">
                      Period (<span style={{ textTransform: "capitalize", fontWeight: "bold", color: "green" }}>{inputType}</span> Wise)
                    </Text>
                    <Select size="lg" value={inputType} onChange={(e) => handleInputType(e.target.value)}>
                      <option value="date">Day</option>
                      <option value="month">Month</option>
                      <option value="year">Year</option>
                    </Select>
                  </Stack>
                </Grid>
                <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                  <Stack spacing={3}>
                    <Text fontSize="sm" fontWeight="500">
                      Quantity
                    </Text>
                    <Select size="lg" value={priceOrQty} onChange={(e) => handlePriceOrQty(e.target.value)}>
                      <option value="qty">Qty</option>
                      <option value="price">Price</option>
                    </Select>
                  </Stack>
                </Grid>
                <Stack spacing={0} sx={{
                  borderRadius: "6px",
                  shadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  border: "1px solid rgba(0, 0, 0, 0.10)",
                  mt: 4,
                  p: 4
                }}>
                  <Text fontSize="sm" fontWeight="500">
                    Date Filter (<span style={{ textTransform: "capitalize", fontWeight: "bold", color: "green" }}>{inputType}</span> Wise)
                  </Text>
                  <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <Stack spacing={0}>
                      <Text fontSize="sm" fontWeight="500" >From Date</Text>
                      <input style={{ border: "1px solid rgba(0, 0, 0, 0.10)", borderRadius: "6px", paddingLeft: 4, paddingRight: 4 }} type={inputType} value={startDate} onChange={(e) => handleFromDate(e.target.value)} />
                    </Stack>
                    <Stack spacing={0}>
                      <Text fontSize="sm" fontWeight="500">To Date</Text>
                      <input style={{ border: "1px solid rgba(0, 0, 0, 0.10)", borderRadius: "6px", paddingLeft: 4, paddingRight: 4 }} type={inputType} value={endDate} onChange={(e) => handleToDate(e.target.value)} />
                    </Stack>
                  </Grid>
                  {/* <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <Stack spacing={0}>
                      <Text fontSize="sm" fontWeight="500" >From Year</Text>
                      <Calendar value={startDate} onChange={(e) => handleFromYear(e.target.value)} view="year" dateFormat="yy" />
                    </Stack>
                    <Stack spacing={0}>
                      <Text fontSize="sm" fontWeight="500">To Year</Text>
                      <Calendar value={endDate} onChange={(e) => handleToYear(e.target.value)} view="year" dateFormat="yy" />
                    </Stack>
                  </Grid> */}
                </Stack>
              </Box>
            </AccordionTab>
          </Accordion>
        </Box>
      </Box>
      {/* footer area */}
      <Divider my={6} />
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
    </>
  );
};

export default ChartConfiguration;
