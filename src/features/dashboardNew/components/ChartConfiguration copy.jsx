import React, { useEffect, useState } from 'react'
import BarChart from '../nivo/BarChart';
import { useDynamicNewQuery } from '../slice/graphApi';
import { Alert, AlertIcon, Box, Button, Checkbox, Grid, Heading, Input, Select, Spinner, Stack, Text } from '@chakra-ui/react';
import { FiSettings } from 'react-icons/fi';
import { IoMdColorFill } from 'react-icons/io';
import TypingMaster from './TypingMaster';


const chartComponents = {
    bar: BarChart,
};

const ChartConfiguration = ({ ...props }) => {
    const { type, group } = props.configureChart;
    const [chartDataApi, setChartDataApi] = useState([]);
    const chartApiConfig = {
        bar: {
            endpoint: '/sales/sales-graph-two',
            body: {
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
                        "column": "company_id",
                        "operator": "equal",
                        "type": "Integer",
                        "value": 1
                    },
                    {
                        "column": "invoice_date",
                        "operator": "between",
                        "type": "date",
                        "value": ["2022-01-15", "2023-10-16"]
                    },
                    {
                        "column": "location_id",
                        "operator": "equal",
                        "type": "Integer",
                        "value": 1
                    },
                    {
                        "column": "branch_id",
                        "operator": "equal",
                        "type": "Integer",
                        "value": 1
                    }
                ]
            },
        },
        pie: {
            endpoint: '/sales/sales-graph-pie',
            body: {
                // JSON body for pie chart
            },
        },
    };

    const chartConfig = chartApiConfig[type];
    const { endpoint, body } = chartConfig || {};

    const { data: graphData, isLoading, isError, error } = useDynamicNewQuery({ endpoint, body });

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

    console.log({ graphData })

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
                                    title
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
                            <ChartComponent data={chartDataApi} />
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
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <Stack spacing={3}>
                        <Text fontSize="sm" fontWeight="500">From Date</Text>
                        <Input
                            size='lg'
                            type='date'
                            onChange={(e) => console.log(e.target.value)}
                            value={'2022-01-01'}
                        />
                    </Stack>
                    <Stack spacing={3}>
                        <Text fontSize="sm" fontWeight="500">To Date</Text>
                        <Input
                            size='lg'
                            type='date'
                            onChange={(e) => console.log(e.target.value)}
                            value={'2022-01-01'}
                        />
                    </Stack>
                </Grid>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                    <Stack spacing={3}>
                        <Text fontSize="sm" fontWeight="500">X Axis</Text>
                        <Select
                            placeholder='Select One'
                            size='lg'
                        >
                            <option value='country'>Country</option>
                            <option value='state'>State</option>
                        </Select>
                    </Stack>
                    <Stack spacing={3}>
                        <Text fontSize="sm" fontWeight="500">Y Axis</Text>
                        <Select
                            placeholder='Select One'
                            size='lg'
                        >
                            <option value='option1'>Male</option>
                            <option value='option2'>Female</option>
                            <option value='option3'>Food</option>
                            <option value='option3'>Weather</option>
                        </Select>
                    </Stack>
                </Grid>
                <Grid templateColumns="repeat(1, 1fr)" gap={6} mt={6}>
                    <Stack spacing={[1, 5]} direction={['column', 'row']}>
                        <Checkbox size='md' colorScheme='green' defaultChecked>
                            Population
                        </Checkbox>
                        <Checkbox size='md' colorScheme='orange' defaultChecked>
                            Avarage Age
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
        </>
    )
}

export default ChartConfiguration