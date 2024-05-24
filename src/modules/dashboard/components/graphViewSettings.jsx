import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Select,
  Stack,
  Grid,
  Checkbox,
} from "@chakra-ui/react";
import LineGraph from "../graphbar/lineGraph";
import { FiSettings } from "react-icons/fi";
import LineChart from "../nivoCharts/LineChart";
import BarChart from "../nivoCharts/BarChart";
import FunnelChart from "../nivoCharts/FunnelChart";
import NivoPieChart from "../nivoCharts/PieChart";

const GraphViewSettings = ({ isOpen, onClose, singleGraphData }) => {

  console.log(`Single data in the graph view settings => `, { singleGraphData });

  const [chartData, setChartData] = useState([
    {
      country: "USA",
      value: 2025,
    },
    {
      country: "China",
      value: 1882,
    },
    {
      country: "Japan",
      value: 1809,
    },
    {
      country: "Germany",
      value: 1322,
    },
    {
      country: "UK",
      value: 1122,
    },
    {
      country: "France",
      value: 1114,
    },
    {
      country: "India",
      value: 984,
    },
    {
      country: "Spain",
      value: 711,
    },
    {
      country: "Netherlands",
      value: 665,
    },
    {
      country: "South Korea",
      value: 443,
    },
    {
      country: "Canada",
      value: 441,
    },
  ]);

  const handleDataChange = (index, newValue) => {
    setChartData((prevData) =>
      prevData.map((dataPoint, i) =>
        i === index ? { ...dataPoint, value: newValue } : dataPoint
      )
    );
  };

  const [text, setText] = useState(`Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing`);

  return (
    <>
      <Box>
        <Drawer isCentered size="md" isOpen={isOpen} onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent maxW="70vw">
            <DrawerCloseButton color="white" size="lg" mt="8px" />
            <DrawerHeader
              color="white"
              mb="4px"
              fontSize="17px"
              fontWeight="500"
              padding="15px 15px"
              backgroundColor="#003060">
              Graphical View Settings
            </DrawerHeader>
            <Divider orientation="horizontal" mb={6} />
            <DrawerBody>
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
                        <a href="#customized-data">
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
                        </a>
                      </Box>
                    </Box>
                    <Box sx={{ height: "300px" }}>
                      {singleGraphData.type === "line" && <LineChart />}
                      {singleGraphData.type === "bar" && <BarChart />}
                      {singleGraphData.type === "funnel" && <FunnelChart />}
                      {singleGraphData.type === "pie" && <NivoPieChart />}
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
                      {text}
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                  <Stack spacing={3}>
                    <Select
                      placeholder='small size'
                      size='sm'
                    >
                      <option value='option1'>Option 1</option>
                      <option value='option2'>Option 2</option>
                      <option value='option3'>Option 3</option>
                    </Select>
                  </Stack>
                  <Stack spacing={3}>
                    <Select
                      placeholder='small size'
                      size='sm'
                    >
                      <option value='option1'>Option 1</option>
                      <option value='option2'>Option 2</option>
                      <option value='option3'>Option 3</option>
                    </Select>
                  </Stack>
                </Grid>
                <Grid templateColumns="repeat(1, 1fr)" gap={6} mt={6}>
                  <Stack spacing={[1, 5]} direction={['column', 'row']}>
                    <Checkbox size='md' colorScheme='green' defaultChecked>
                      Checkbox
                    </Checkbox>
                    <Checkbox size='lg' colorScheme='orange' defaultChecked>
                      Checkbox
                    </Checkbox>
                    <Checkbox size='md' colorScheme='green' defaultChecked>
                      Checkbox
                    </Checkbox>
                    <Checkbox size='lg' colorScheme='orange' defaultChecked>
                      Checkbox
                    </Checkbox>
                    <Checkbox size='md' colorScheme='green' defaultChecked>
                      Checkbox
                    </Checkbox>
                    <Checkbox size='lg' colorScheme='orange' defaultChecked>
                      Checkbox
                    </Checkbox>
                    <Checkbox size='md' colorScheme='green' defaultChecked>
                      Checkbox
                    </Checkbox>
                    <Checkbox size='lg' colorScheme='orange' defaultChecked>
                      Checkbox
                    </Checkbox>
                    <Checkbox size='md' colorScheme='green' defaultChecked>
                      Checkbox
                    </Checkbox>
                    <Checkbox size='lg' colorScheme='orange' defaultChecked>
                      Checkbox
                    </Checkbox>
                  </Stack>
                </Grid>
              </Box>
              {/* customize chart data start******************** */}
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
                    mb={3}
                    id="customized-data">
                    <Heading mt={4} mb={4}>
                      Customized Data
                    </Heading>
                    {chartData.map((dataPoint, index) => (
                      <FormControl key={index} mb={4}>
                        <FormLabel>{dataPoint.country}</FormLabel>
                        <Input
                          type="number"
                          value={dataPoint.value}
                          onChange={(e) =>
                            handleDataChange(
                              index,
                              parseInt(e.target.value, 10)
                            )
                          }
                          size="lg"
                        />
                      </FormControl>
                    ))}
                  </Box>
                </Box>
              </Box>
              {/* customize chart data end******************** */}
            </DrawerBody>
            <Divider orientation="horizontal" mt={2} mb={2} />
            <DrawerFooter>
              <Button
                variant="outline"
                style={{
                  padding: "20px 20px",
                  fontSize: "14px",
                  color: "white",
                  backgroundColor: "#003060",
                }}
                mr={3}>
                Save
              </Button>
              <Button
                variant="outline"
                style={{
                  padding: "20px 20px",
                  fontSize: "14px",
                  color: "#718296",
                }}
                mr={3}>
                Cancel
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>
    </>
  );
};

export default GraphViewSettings;
