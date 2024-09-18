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

const chartComponents = {
  areaBump: AreaBump,
};

const ChartConfiguration = ({ configureChart }) => {
  console.log("Props:", configureChart);

  const today = new Date().toISOString().slice(0, 10);
  const currentDate = new Date();
  const { type } = configureChart;

  const toast = useToast();
  const [chartDataApi, setChartDataApi] = useState([]);
  const [formDate, setFormDate] = useState(lastDateOfMonth(currentDate));
  const [toDate, setToDate] = useState(today);
  const [wise, setWise] = useState("sales");
  const [priceOrQty, setPriceOrQty] = useState("qty");
  const [previewLoading, setPreviewLoading] = useState(false);
  const dispatch = useDispatch();
  const currentWidgets = useSelector((state) => state.salescustomer.widgets);
  const [inputType, setInputType] = useState("month");

  const [dynamicWidth, setDynamicWidth] = useState(1200);
  const [startDate, setStartDate] = useState(inputType === 'month' ? '2024-01' : '2024-01-01');
  const [endDate, setEndDate] = useState(inputType === 'month' ? '2024-12' : '2024-01-20');

  const startYear = (split(startDate, '-')[0] || '2024');
  const startMonth = (split(startDate, '-')[1] || '01');
  const endYear = (split(endDate, '-')[0] || '2024');
  const endMonth = (split(endDate, '-')[1] || '12');

  const [bodyWise, setBodyWise] = useState({
    priceOrQty: `${priceOrQty}`,
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

  const getDateDifference = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    // Difference in milliseconds
    const differenceInTime = endDate - startDate;
    // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 milliseconds)
    const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);
    return differenceInDays;
  };

  const getMonthDifference = (start, end) => {
    const [startYear, startMonth] = start.split('-').map(Number);
    const [endYear, endMonth] = end.split('-').map(Number);

    const yearDifference = endYear - startYear;
    const monthDifference = endMonth - startMonth;

    // Total month difference
    return yearDifference * 12 + monthDifference;
  };

  const handleFromDate = (data) => {
    setStartDate(data);
  }

  const handleInputType = (data) => {
    let newStartDate, newEndDate, newBodyWise;

    setInputType(data);
    if (data === 'month') {
      newStartDate = '2024-01';
      newEndDate = '2024-12';

      newBodyWise = {
        priceOrQty: `${priceOrQty}`,
        "yearFrom": split(newStartDate, '-')[0],
        "yearTo": split(newEndDate, '-')[0],
        "monthFrom": split(newStartDate, '-')[1],
        "monthTo": split(newEndDate, '-')[1],
      };
    } else {
      newStartDate = '2024-01-01';
      newEndDate = '2024-01-20';

      newBodyWise = {
        priceOrQty: `${priceOrQty}`,
        dateString: `${newStartDate} to ${newEndDate}`,
      };
    }

    setStartDate(newStartDate);
    setEndDate(newEndDate);
    setBodyWise(newBodyWise);
    setChartApiConfig({
      areaBump: [
        {
          wise: "sales",
          endpoint: "/sales/graph/product-wise-area-bump",
          body: newBodyWise
        },
      ],
    })
  }

  const handleToDate = (data) => {
    let newBodyWise;
  
    if (inputType === 'month') {
      newBodyWise = {
        ...bodyWise,
        "yearTo": split(data, '-')[0],
        "monthTo": split(data, '-')[1],
      };
    } else {
      newBodyWise = {
        ...bodyWise,
        dateString: `${startDate} to ${data}`,
      };
    }
  
    setEndDate(data);
    setBodyWise(newBodyWise);
    const count = inputType === 'month' ? getMonthDifference(startDate, data) : getDateDifference(startDate, data);
    setDynamicWidth(200 * count);
  
    // Trigger API call by updating chartApiConfig
    updateChartApiConfig(newBodyWise);
  };

  const updateChartApiConfig = (newBodyWise) => {
    setChartApiConfig((prevConfig) => ({
      ...prevConfig,
      areaBump: [
        {
          wise: "sales",
          endpoint: "/sales/graph/product-wise-area-bump",
          body: newBodyWise, // Updated body based on the selected input type
        },
      ],
    }));
  };

  const chartConfig = chartApiConfig[type];
  const { endpoint, body } = chartConfig
    ? chartConfig.find((config) => config.wise === wise)
    : {};

  console.log("chartConfig:", chartConfig);

  const {
    data: graphData,
    isLoading,
    isError,
    error,
    refetch
  } = useDynamicNewQuery(
    endpoint
      ? {
        endpoint,
        body
      }
      : null,
    { skip: !endpoint }
  );

  // Use effect to trigger API call when endDate changes
  useEffect(() => {
    if (endpoint && body) {
      refetch();
    }
  }, [endDate, startDate, priceOrQty]); // Listen for changes to endDate or startDate

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
    return <div>No valid chart type provided</div>;
  }

  const handlePreviewBtn = () => {
    setPreviewLoading(true);
    setTimeout(() => {
      setPreviewLoading(false);
    }, 500);
  };

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
        {/* show graph view */}
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
            <Box sx={{ height: "300px", width: "100%", overflowX: "auto" }}>
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

        {/* show accordion */}
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
                      Period ({inputType} wise)
                    </Text>
                    <Select size="lg" value={inputType} onChange={(e) => handleInputType(e.target.value)}>
                      <option value="date">Day</option>
                      <option value="month">Month</option>
                    </Select>
                  </Stack>
                </Grid>
                <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                  <Stack spacing={3}>
                    <Text fontSize="sm" fontWeight="500">
                      Quantity
                    </Text>
                    <Select size="lg" value={priceOrQty} onChange={(e) => setPriceOrQty(e.target.value)}>
                      <option value="qty">Qty</option>
                      <option value="price">Price</option>
                    </Select>
                  </Stack>
                </Grid>
                <Grid templateColumns="repeat(1, 1fr)" gap={6}>
                  <Stack spacing={3} width={'90%'}>
                    <Text fontSize="sm" fontWeight="500">
                      Date Filter ({inputType} wise)
                    </Text>
                    <Box sx={{ display: 'flex' }}>
                      <Stack spacing={4} width={320} bg={'yellow.300'} p={4}>
                        <Text>From Date</Text>
                        <input type={inputType} value={startDate} onChange={(e) => handleFromDate(e.target.value)} />
                      </Stack>
                      <Stack spacing={4} width={320} bg={'yellow.300'} p={4}>
                        <Text>To Date</Text>
                        <input type={inputType} value={endDate} onChange={(e) => handleToDate(e.target.value)} />
                      </Stack>
                    </Box>
                  </Stack>
                </Grid>
              </Box>
            </AccordionTab>
          </Accordion>
        </Box>
      </Box>

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
