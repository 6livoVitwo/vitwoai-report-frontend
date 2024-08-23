import React, { useEffect, useState } from "react";
import { useDynamicNewQuery } from "../slice/graphApi";
import { Alert, AlertIcon, Box, Heading, Spinner } from "@chakra-ui/react";
import { capitalizeWord, lastDateOfMonth } from "../../../utils/common";
import { useSelector } from "react-redux";
import BarChart from "../../dashboardNew/nivo/BarChart";
import NivoPieChart from "../../dashboardNew/nivo/PieChart";
import LineChart from "../../dashboardNew/nivo/LineChart";

const chartComponents = {
  bar: BarChart,
  pie: NivoPieChart,
  line: LineChart,
};

const ViewChart = ({ configureChart }) => {
  const today = new Date().toISOString().slice(0, 10);
  const currentDate = new Date();
  const { type, group } = configureChart;

  const [chartDataApi, setChartDataApi] = useState([]);
  const currentWidgets = useSelector((state) => state.salescustomer.widgets);

  const formDate = lastDateOfMonth(currentDate);
  const toDate = today;
  const wise = "sales";

  const chartApiConfig = {
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
  };

  const chartConfig = chartApiConfig[type];
  const { endpoint, body } = chartConfig || {};

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
    if (graphData) {
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

  return (
    <>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        marginTop="10px">
        <Box
          width={{
            base: "100%",
            lg: "100%",
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
      </Box>
    </>
  );
};

export default ViewChart;
