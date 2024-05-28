import { Box, Button, Checkbox, Grid, Heading, Select, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { FiSettings } from 'react-icons/fi'
import { IoMdColorFill } from 'react-icons/io'
import LineChart from '../nivoCharts/LineChart'
import BarChart from '../nivoCharts/BarChart'
import FunnelChart from '../nivoCharts/FunnelChart'
import NivoPieChart from '../nivoCharts/PieChart'
import AreaBump from '../nivoCharts/AreaBump'
import TypingMaster from './TypingMaster'

const GraphBaseView = ({ singleGraphData={}, setIsVariant=()=>{} }) => {
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
                        {/* <Heading mt={4} mb={4}>
                      Line Chart Graph
                    </Heading> */}
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
                                    {singleGraphData.title}
                                </Heading>
                            </Box>
                            <Box
                                style={{
                                    padding: "10px",
                                    fontWeight: 600,
                                    color: "black",
                                }}>
                                {/* <a href="#customized-data">
                                    <Button
                                        variant="outline"
                                        style={{
                                            padding: "15px 10px",
                                            fontSize: "12px",
                                            color: "#718296",
                                        }}
                                        mr={3}>
                                        <FiSettings style={{ marginRight: "6px" }} />
                                        Customized Data
                                    </Button>
                                </a> */}
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
                                    onClick={() => setIsVariant(true)}
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
                            {singleGraphData.type === "line" && <LineChart />}
                            {singleGraphData.type === "bar" && <BarChart />}
                            {/* {singleGraphData.type === "bar" && <DivergingStackedBarChart />} */}
                            {singleGraphData.type === "funnel" && <FunnelChart />}
                            {singleGraphData.type === "pie" && <NivoPieChart />}
                            {singleGraphData.type === "areaBump" && <AreaBump />}
                        </Box>
                        {/* <LineGraph id="lineChartShow" /> */}
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
                                {singleGraphData?.description}
                            </Heading>
                            <TypingMaster />
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box>
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

export default GraphBaseView