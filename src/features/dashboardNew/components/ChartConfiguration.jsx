import React, { useEffect, useState } from 'react';
import { useDynamicNewQuery } from '../slice/graphApi';
import { Alert, AlertIcon, Box, Button, Checkbox, Divider, Grid, Heading, Input, Select, Spinner, Stack, Text } from '@chakra-ui/react';
import { FiSettings } from 'react-icons/fi';
import { IoMdColorFill } from 'react-icons/io';
import TypingMaster from './TypingMaster';
import { capitalizeWord, lastDateOfMonth } from '../../../utils/common';
import { MdRemoveRedEye, MdSave } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { addWidget, updateWidget } from '../slice/graphSlice';
import { useSelector } from 'react-redux';
import BarChart from '../nivo/BarChart';
import NivoPieChart from '../nivo/PieChart';
import LineChart from '../nivo/LineChart';
import AreaBump from '../nivo/AreaBump';

const chartComponents = {
  bar: BarChart,
  pie: NivoPieChart,
  line: LineChart,
  areaBump: AreaBump,
  // Add other chart components here if needed
};

const ChartConfiguration = ({ ...props }) => {
  const today = new Date().toISOString().slice(0, 10);
  const currentDate = new Date();
  const { type, group } = props?.configureChart;
  const [chartDataApi, setChartDataApi] = useState([]);
  const [formDate, setFormDate] = useState(lastDateOfMonth(currentDate));
  const [toDate, setToDate] = useState(today);
  const [wise, setwise] = useState('sales');
  const [previewLoading, setPreviewLoading] = useState(false);
  const dispatch = useDispatch();
  const currentWidgets = useSelector(state => state.dashboard.widgets);

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
      {
        wise: "purchase",
        endpoint: "/purchase/purchase-graph-two",
        body: {
          xaxis: "items.goodsItems.goodsGroup.goodGroupName",
          yaxis: [
            "grnInvoice.grnSubTotal",
            "grnInvoice.grnTotalCgst",
            "grnInvoice.grnTotalIgst",
            "grnInvoice.grnTotalAmount",
          ],
          groupBy: ["items.goodsItems.goodsGroup"],
          valuetype: "count",
          filter: [
            {
              column: "companyId",
              operator: "equal",
              type: "integer",
              value: 1,
            },
            {
              column: "postingDate",
              operator: "between",
              type: "date",
              value: [formDate, toDate],
            },
            {
              column: "branchId",
              operator: "equal",
              type: "integer",
              value: 1,
            },
            {
              column: "locationId",
              operator: "equal",
              type: "integer",
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
      {
        wise: "purchase",
        endpoint: "/purchase/purchase-graph-two",
        body: {
          xaxis: "items.goodsItems.goodsGroup.goodGroupName",
          yaxis: [
            "grnInvoice.grnSubTotal",
            "grnInvoice.grnTotalCgst",
            "grnInvoice.grnTotalIgst",
            "grnInvoice.grnTotalAmount",
          ],
          groupBy: ["items.goodsItems.goodsGroup"],
          valuetype: "count",
          filter: [
            {
              column: "companyId",
              operator: "equal",
              type: "integer",
              value: 1,
            },
            {
              column: "postingDate",
              operator: "between",
              type: "date",
              value: [formDate, toDate],
            },
            {
              column: "branchId",
              operator: "equal",
              type: "integer",
              value: 1,
            },
            {
              column: "locationId",
              operator: "equal",
              type: "integer",
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
      {
        wise: "purchase",
        endpoint: "/purchase/purchase-graph-two",
        body: {
          xaxis: "items.goodsItems.goodsGroup.goodGroupName",
          yaxis: [
            "grnInvoice.grnSubTotal",
            "grnInvoice.grnTotalCgst",
            "grnInvoice.grnTotalIgst",
            "grnInvoice.grnTotalAmount",
          ],
          groupBy: ["items.goodsItems.goodsGroup"],
          valuetype: "count",
          filter: [
            {
              column: "companyId",
              operator: "equal",
              type: "integer",
              value: 1,
            },
            {
              column: "postingDate",
              operator: "between",
              type: "date",
              value: [formDate, toDate],
            },
            {
              column: "branchId",
              operator: "equal",
              type: "integer",
              value: 1,
            },
            {
              column: "locationId",
              operator: "equal",
              type: "integer",
              value: 1,
            },
          ],
        },
      },
    ],
    areaBump: [
      {
        wise: "sales",
        endpoint: "/sales/sales-graph-two",
        body: {
          // JSON body for area bump chart
        },
      },
    ],
  });

  const chartConfig = chartApiConfig[type];
  const selectedConfig = chartConfig.find(config => config.wise === wise);

  const { data: graphData, isLoading, isError, error } = useDynamicNewQuery(
    selectedConfig ? {
      endpoint: selectedConfig.endpoint,
      body: selectedConfig.body
    } : null
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
          Error: {error?.data || 'An error occurred'}
        </Alert>
      </>
    );
  }

  if (!ChartComponent) {
    return <div>No valid chart type provided</div>;
  }

  const updateChartConfig = (key, value) => {
    setChartApiConfig(prevConfig => ({
      ...prevConfig,
      [type]: {
        ...prevConfig.bar,
        body: {
          ...prevConfig.bar.body,
          [key]: value
        }
      }
    }));
  };

  const handleDateChange = (form, to) => {    
    setChartApiConfig(prevConfig => ({
      ...prevConfig,
      [type]: {
        ...prevConfig[type],
        body: {
          ...prevConfig[type].body,
          "filter": [
            {
              "column": "invoice_date",
              "operator": "between",
              "type": "date",
              "value": [form, to]
            }
          ]
        }
      }
    }));
  };

  const handlePreviewBtn = (form, to) => {
    setPreviewLoading(true);
    setTimeout(() => {
      setChartApiConfig(prevConfig => ({
        ...prevConfig,
        [type]: prevConfig[type].map(config => ({
          ...config,
          body: {
            ...config.body,
            "filter": [
              {
                "column": config.wise === 'purchase' ? 'postingDate' : 'invoice_date',
                "operator": "between",
                "type": "date",
                "value": [form, to]
              }
            ]
          }
        }))
      }))
      setPreviewLoading(false);
    }, 500);
  }


  //OLd code for save bar chart
  // const handleSaveBtn = () => {
  //     const widgetIndex = currentWidgets.findIndex(widget => widget.type === type);
  //     if (widgetIndex === -1) {
  //         const newWidgets = {
  //             id: '1',
  //             chartName: `Bar Chart (${wise})`,
  //             title: 'Bar Chart',
  //             type: 'bar',
  //             group: 'distributionComparison',
  //             pinned: true,
  //             description: 'This is Bar Chart || imranali59059',
  //             data: chartDataApi,
  //         }
  //         dispatch(addWidget(newWidgets))
  //     } else {
  //         dispatch(updateWidget({
  //             index: widgetIndex,
  //             chartName: wise,
  //             title: 'Bar Chart',
  //             type: 'bar',
  //             group: 'distributionComparison',
  //             pinned: true,
  //             description: 'This is Bar Chart || imranali59059',
  //             data: chartDataApi
  //         }))
  //     }
  // }

  //Updated code for showing all chart
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
      description: `This is ${type} Chart `,
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
  };

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
            lg: "69%",
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
              <Box
                style={{
                  padding: "10px",
                  fontWeight: 600,
                  color: "black",
                }}>
                <Button
                  variant="outline"
                  style={{
                    padding: "15px 10px",
                    fontSize: "12px",
                    color: "#718296",
                  }}>
                  <FiSettings style={{ marginRight: "6px" }} />
                  Settings
                </Button>
                <Button
                  variant="outline"
                  onClick={() => console.log("clicked")}
                  style={{
                    padding: "15px 10px",
                    fontSize: "12px",
                    color: "#718296",
                    marginLeft: "8px",
                  }}>
                  <IoMdColorFill style={{ marginRight: "6px" }} />
                  Variants
                </Button>
              </Box>
            </Box>
            <Box sx={{ height: "300px" }}>
              <ChartComponent liveData={chartDataApi} />
            </Box>
          </Box>
        </Box>
        <Box
          width={{
            base: "100%",
            lg: "29%",
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
            <Box style={{ lineHeight: "1.5", fontSize: "14px" }}>
              <Heading mt={4} mb={4}>
                description
              </Heading>
              <TypingMaster />
            </Box>
          </Box>
        </Box>
      </Box>

      <Box>
        <Grid templateColumns="repeat(1, 1fr)" gap={6}>
          <Stack spacing={3}>
            <Text fontSize="sm" fontWeight="500">Wise {wise !== '' && `(${wise})`}</Text>
            <Select
              // placeholder='Select One'
              size='lg'
              onChange={(e) => setwise(e.target.value)}
              value={wise}
            >
              <option value='sales'>Sales</option>
              <option value='purchase'>Purchase</option>
            </Select>
          </Stack>
        </Grid>
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          <Stack spacing={3}>
            <Text fontSize="sm" fontWeight="500">From Date</Text>
            <Input
              size='lg'
              type='date'
              onChange={(e) => setFormDate(e.target.value)}
              value={formDate}
            />
          </Stack>
          <Stack spacing={3}>
            <Text fontSize="sm" fontWeight="500">To Date</Text>
            <Input
              size='lg'
              type='date'
              onChange={(e) => setToDate(e.target.value)}
              value={toDate}
            />
          </Stack>
        </Grid>
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <Stack spacing={3}>
            <Text fontSize="sm" fontWeight="500">X Axis</Text>
            <Select
              placeholder='Select One'
              size='lg'
              onChange={(e) => updateChartConfig("xaxis", e.target.value)}
              value={''}
            >
              <option value='items.goodsItems.goodsGroup.goodGroupName'>Goods Group Name</option>
              <option value='another.option'>Another Option</option>
            </Select>
          </Stack>
          <Stack spacing={3}>
            <Text fontSize="sm" fontWeight="500">Y Axis</Text>
            <Select
              placeholder='Select One'
              size='lg'
              onChange={(e) => updateChartConfig("yaxis", [e.target.value])}
              value={''}
            >
              <option value='salesPgi.salesDelivery.totalAmount'>Total Amount</option>
              <option value='salesPgi.totalAmount'>Sales Amount</option>
              <option value='quotation.totalAmount'>Quotation Amount</option>
              <option value='salesOrder.totalAmount'>Order Amount</option>
              <option value='all_total_amt'>All Total Amount</option>
            </Select>
          </Stack>
        </Grid>
        <Grid templateColumns="repeat(1, 1fr)" gap={6} mt={6}>
          <Stack spacing={[1, 5]} direction={['column', 'row']}>
            <Checkbox size='md' colorScheme='green' defaultChecked>
              Population
            </Checkbox>
            <Checkbox size='md' colorScheme='orange' defaultChecked>
              Average Age
            </Checkbox>
            <Checkbox size='md' colorScheme='blue' defaultChecked>
              Median Age
            </Checkbox>
            <Checkbox size='md' colorScheme='red' defaultChecked>
              Total Population
            </Checkbox>
            <Checkbox size='md' colorScheme='pink' defaultChecked>
              Cover Total Area
            </Checkbox>
          </Stack>
        </Grid>
      </Box>
      <Divider my={6} />
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant='outline'
          colorScheme='pink'
          leftIcon={previewLoading ? <Spinner /> : <MdRemoveRedEye />}
          sx={{
            p: '20px 20px',
            fontSize: '14px',
          }}
          mr={3}
          onClick={() => handlePreviewBtn(formDate, toDate)}
        >
          Preview
        </Button>
        <Button
          variant='solid'
          colorScheme='teal'
          leftIcon={<MdSave />}
          sx={{
            p: '20px 20px',
            fontSize: '14px',
          }}
          mr={3}
          onClick={handleSaveBtn}
        >
          Save
        </Button>
      </Box>
    </>
  )
}

export default ChartConfiguration;
