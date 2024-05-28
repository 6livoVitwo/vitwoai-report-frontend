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
  Text,
} from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import LineChart from "../nivoCharts/LineChart";
import BarChart from "../nivoCharts/BarChart";
import FunnelChart from "../nivoCharts/FunnelChart";
import NivoPieChart from "../nivoCharts/PieChart";
import TypingMaster from "./TypingMaster";
import AreaBump from "../nivoCharts/AreaBump";
import { IoMdColorFill } from "react-icons/io";
import DivergingStackedBarChart from "../nivoCharts/DivergingStackedBarChart";
import GraphVariant from "./GraphVariant";
import GraphBaseView from "./GraphBaseView";

const GraphViewSettings = ({ isOpen, onClose, singleGraphData }) => {
  const [isVariant, setIsVariant] = useState(false)
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

  const [text, setText] = useState(`Lorem Ipsum is simply dummy text of the printing and typesetting industry. `);

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
              {isVariant ? <GraphVariant singleGraphData={singleGraphData} setIsVariant={setIsVariant} /> : <GraphBaseView singleGraphData={singleGraphData} setIsVariant={setIsVariant} />}
              {/* customize chart data start******************** */}
              {/* <Box
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
              </Box> */}
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
