import React, { useState } from "react";
import { chartsData } from "./data/fakeData";
import {
  Box,
  Text,
} from "@chakra-ui/react";
import MyCharts from "./MyCharts";

const GraphCharts = () => {
  const [allCharts, setAllCharts] = useState(chartsData);

  return (
    <Box>
      <Text fontWeight={"600"}>{allCharts.title}</Text>
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
                lg: "49%",
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
                  <MyCharts chart={chart} />
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
