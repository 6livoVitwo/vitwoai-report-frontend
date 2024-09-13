import React, { useState } from "react";
import { chartsData } from "./data/fakeData";
import { border, Box, Text } from "@chakra-ui/react";
import MyChart from "./MyChart";
import { format } from 'date-fns'; // if you are using date-fns

import { Calendar } from "primereact/calendar";

const GraphCharts = () => {
  const [allCharts, setAllCharts] = useState(chartsData);
  const [dates, setDates] = useState(null);
  
  console.log({ dates });

  return (
    <Box>
      <Text fontWeight={"600"}>{allCharts.title}</Text>
      <Box>
        <Calendar
          value={dates}
          onChange={(e) => setDates(e.value)}
          selectionMode="range"
          readOnlyInput
          style={{ border: "1px solid #dee2e6" }}
        />
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        mt={10}>
        {allCharts?.charts?.map((chart, index) => {
          return (
            <Box
              key={index}
              width={{
                base: "100%",
                lg: "65%",
              }}
              mb={6}>
              <Box
                sx={{
                  backgroundColor: "white",
                  padding: "15px",
                  my: 2.5,
                  borderRadius: "8px",
                  border: "1px solid #dee2e6",
                  transition: "box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0 4px 4px rgba(0, 0, 0, 0.2)",
                  },
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
                    {chart.title}
                    <Text
                      sx={{
                        color: "#718296",
                        fontSize: "10px",
                      }}>
                      {chart.description}
                    </Text>
                  </Box>
                </Box>
                <Box sx={{ height: "300px" }}>
                  <MyChart chart={chart} />
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default GraphCharts;
