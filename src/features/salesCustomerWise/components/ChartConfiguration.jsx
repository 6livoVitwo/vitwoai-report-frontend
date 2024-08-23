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
  Input,
  Select,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { capitalizeWord, lastDateOfMonth } from "../../../utils/common";
import { MdRemoveRedEye, MdSave } from "react-icons/md";
import { MultiSelect } from "primereact/multiselect";
import { useDispatch } from "react-redux";
import { addWidget, updateWidget } from "../slice/graphSlice";
import { useSelector } from "react-redux";
import { Accordion, AccordionTab } from "primereact/accordion";
import BarChart from "../../dashboardNew/nivo/BarChart";
import NivoPieChart from "../../dashboardNew/nivo/PieChart";
import LineChart from "../../dashboardNew/nivo/LineChart";
import TypingMaster from "../../dashboardNew/components/TypingMaster";

const chartComponents = {
  bar: BarChart,
  pie: NivoPieChart,
  line: LineChart,
};

const ChartConfiguration = ({ configureChart }) => {
  console.log("Props:", configureChart);

  const today = new Date().toISOString().slice(0, 10);
  const currentDate = new Date();
  const { type, group } = configureChart;

  const toast = useToast();
  const [chartDataApi, setChartDataApi] = useState([]);
  const [formDate, setFormDate] = useState(lastDateOfMonth(currentDate));
  const [toDate, setToDate] = useState(today);
  const [wise, setwise] = useState("sales");
  const [valuetype, setValuetype] = useState("count");
  const [previewLoading, setPreviewLoading] = useState(false);
  const dispatch = useDispatch();
  const currentWidgets = useSelector((state) => state.salescustomer.widgets);

  const [chartApiConfig, setChartApiConfig] = useState({
    bar: [
      {
        wise: "sales",
        endpoint: "/sales/sales-graph-two",
        body: {
          xaxis: "items.goodsItems.goodsGroup.goodGroupName",
          yaxis: [
            "salesPgi.salesDelivery.totalAmount",
            "salesPgi.totalAmount",
            "quotation.totalAmount",
            "salesOrder.totalAmount",
            "all_total_amt",
          ],
          groupBy: ["items.goodsItems.goodsGroup"],
          valuetype: "count",
          filter: [
            {
              column: "company_id",
              operator: "equal",
              type: "Integer",
              value: 1,
            },
            {
              column: "invoice_date",
              operator: "between",
              type: "date",
              value: [formDate, toDate],
            },
            {
              column: "location_id",
              operator: "equal",
              type: "Integer",
              value: 1,
            },
            {
              column: "branch_id",
              operator: "equal",
              type: "Integer",
              value: 1,
            },
          ],
        },
      },
    ],
    pie: [
      {
        wise: "sales",
        endpoint: "/sales/sales-graph-two",
        body: {
          xaxis: "items.goodsItems.goodsGroup.goodGroupName",
          yaxis: [
            "salesPgi.salesDelivery.totalAmount",
            "salesPgi.totalAmount",
            "quotation.totalAmount",
            "salesOrder.totalAmount",
            "all_total_amt",
          ],
          groupBy: ["items.goodsItems.goodsGroup"],
          valuetype: "count",
          filter: [
            {
              column: "company_id",
              operator: "equal",
              type: "Integer",
              value: 1,
            },
            {
              column: "invoice_date",
              operator: "between",
              type: "date",
              value: [formDate, toDate],
            },
            {
              column: "location_id",
              operator: "equal",
              type: "Integer",
              value: 1,
            },
            {
              column: "branch_id",
              operator: "equal",
              type: "Integer",
              value: 1,
            },
          ],
        },
      },
    ],
    line: [
      {
        wise: "sales",
        endpoint: "/sales/sales-graph-two",
        body: {
          xaxis: "items.goodsItems.goodsGroup.goodGroupName",
          yaxis: [
            "salesPgi.salesDelivery.totalAmount",
            "salesPgi.totalAmount",
            "quotation.totalAmount",
            "salesOrder.totalAmount",
            "all_total_amt",
          ],
          groupBy: ["items.goodsItems.goodsGroup"],
          valuetype: "count",
          filter: [
            {
              column: "company_id",
              operator: "equal",
              type: "Integer",
              value: 1,
            },
            {
              column: "invoice_date",
              operator: "between",
              type: "date",
              value: [formDate, toDate],
            },
            {
              column: "location_id",
              operator: "equal",
              type: "Integer",
              value: 1,
            },
            {
              column: "branch_id",
              operator: "equal",
              type: "Integer",
              value: 1,
            },
          ],
        },
      },
    ],
  });

  const chartConfig = chartApiConfig[type];
  const { endpoint, body } = chartConfig || {};
  console.log("chartConfig1:", chartConfig);

  const selectedConfig = Array.isArray(chartConfig)
    ? chartConfig.find((config) => config.wise === wise)
    : null;

  const {
    data: graphData,
    isLoading,
    isError,
    error,
  } = useDynamicNewQuery(
    selectedConfig
      ? {
          endpoint: selectedConfig.endpoint,
          body: selectedConfig.body,
        }
      : null
  );

  useEffect(() => {
    console.log("Selected Config:", selectedConfig);
    if (graphData) {
      console.log("Graph Data:", graphData);
      setChartDataApi(graphData?.content);
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

  const updateChartConfig = (key, value) => {
    console.log({ key, value });

    setChartApiConfig((prevConfig) => {
      const updatedConfig = prevConfig[type].map((config) => ({
        ...config,
        body: {
          ...config.body,
          [key]: value,
        },
      }));

      return {
        ...prevConfig,
        [type]: updatedConfig,
      };
    });
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

  const handleYAxisChange = (e) => {
    const { value } = e.target;

    setChartApiConfig((prevConfig) => ({
      ...prevConfig,
      [type]: prevConfig[type].map((config) => ({
        ...config,
        body: {
          ...config.body,
          yaxis: value,
        },
      })),
    }));
  };

  const handlePreviewBtn = (form, to) => {
    setPreviewLoading(true);
    setTimeout(() => {
      setChartApiConfig((prevConfig) => ({
        ...prevConfig,
        [type]: prevConfig[type].map((config) => ({
          ...config,
          body: {
            ...config.body,
            filter: [
              {
                column:
                  config.wise === "purchase" ? "postingDate" : "invoice_date",
                operator: "between",
                type: "date",
                value: [form, to],
              },
            ],
          },
        })),
      }));
      setPreviewLoading(false);
    }, 500);
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
                      X Axis
                    </Text>
                    <MultiSelect
                      className="w-full sm:w-22rem"
                      display="chip"
                      style={{ border: "1px solid #e2e8f0" }}
                      options={yAxisOptions}
                      value={selectedConfig?.body?.yaxis || []}
                      onChange={(e) => handleYAxisChange(e)}
                      placeholder="Select Y-Axis"
                    />
                  </Stack>
                  <Stack spacing={3}>
                    <Text fontSize="sm" fontWeight="500">
                      Y Axis
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
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                  <Stack spacing={3}>
                    <Text fontSize="sm" fontWeight="500">
                      From Date
                    </Text>
                    <Input
                      size="lg"
                      type="date"
                      onChange={(e) => setFormDate(e.target.value)}
                      value={formDate}
                    />
                  </Stack>
                  <Stack spacing={3}>
                    <Text fontSize="sm" fontWeight="500">
                      To Date
                    </Text>
                    <Input
                      size="lg"
                      type="date"
                      onChange={(e) => setToDate(e.target.value)}
                      value={toDate}
                    />
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
          onClick={() => handlePreviewBtn(formDate, toDate)}>
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
