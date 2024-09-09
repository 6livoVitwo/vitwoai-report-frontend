import React, { useEffect, useState } from "react";
import { useDynamicNewQuery } from "../slice/graphApi";
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
} from "@chakra-ui/react";
import { capitalizeWord, lastDateOfMonth } from "../../../utils/common";
import { MdRemoveRedEye, MdSave } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { addWidget, updateWidget } from "../slice/graphSlice";
import { Accordion, AccordionTab } from "primereact/accordion";
import AreaBump from "../../dashboardNew/nivo/AreaBump";
import TypingMaster from "../../dashboardNew/components/TypingMaster";

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
  const [previewLoading, setPreviewLoading] = useState(false);
  const dispatch = useDispatch();
  const currentWidgets = useSelector((state) => state.salescustomer.widgets);

  const [chartApiConfig, setChartApiConfig] = useState({
    areaBump: [
      {
        wise: "sales",
        endpoint: "/sales/graph/product-wise-area-bump",
        body: {
          priceOrQty: "qty",
          dateString: "2024-01-01 to 2024-01-31",
          // year: 2023,
        },
      },
    ],
  });

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
  } = useDynamicNewQuery(
    endpoint
      ? {
          endpoint,
          body,
        }
      : null
  );

  useEffect(() => {
    console.log("Graph Data:", graphData);
    if (graphData) {
      setChartDataApi(graphData?.data || []);
    }
  }, [graphData]);

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
        marginTop="10px">
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
            <Box sx={{ height: "300px" }}>
              <ChartComponent liveData={chartDataApi} />
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
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                  <Stack spacing={3}>
                    <Text fontSize="sm" fontWeight="500">
                      Quantity
                    </Text>
                    <Select size="lg">
                      <option value="count">Qty</option>
                      <option value="sum">Price</option>
                    </Select>
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
