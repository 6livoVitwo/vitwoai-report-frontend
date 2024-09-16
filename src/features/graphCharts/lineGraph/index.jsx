// import React, { useState } from "react";
// import { chartsData } from "./data/fakeData";
// import { Box, Text } from "@chakra-ui/react";
// import MyChart from "./MyChart";
// import { format } from 'date-fns';

// import { Calendar } from "primereact/calendar";

// const GraphCharts = () => {
//   const [allCharts, setAllCharts] = useState(chartsData);
//   const [dates, setDates] = useState(null);
  
//   console.log({ dates });

//   return (
//     <Box>
//       <Text fontWeight={"600"}>{allCharts.title}</Text>

//       <Box>
//         <Calendar
//           value={dates}
//           onChange={(e) => setDates(e.value)}
//           selectionMode="range"
//           readOnlyInput
//           style={{ border: "1px solid #dee2e6" }}
//         />
//       </Box>
//       <Box
//         display="flex"
//         flexWrap="wrap"
//         justifyContent="space-between"
//         mt={10}>
//         {allCharts?.charts?.map((chart, index) => {
//           return (
//             <Box
//               key={index}
//               width={{
//                 base: "100%",
//                 lg: "65%",
//               }}
//               mb={6}>
//               <Box
//                 sx={{
//                   backgroundColor: "white",
//                   padding: "15px",
//                   my: 2.5,
//                   borderRadius: "8px",
//                   border: "1px solid #dee2e6",
//                   transition: "box-shadow 0.3s ease-in-out",
//                   "&:hover": {
//                     boxShadow: "0 4px 4px rgba(0, 0, 0, 0.2)",
//                   },
//                 }}
//                 mb={3}>
//                 <Box
//                   display="flex"
//                   justifyContent="space-between"
//                   alignItems="center"
//                   mb={8}>
//                   <Box
//                     style={{
//                       padding: "10px",
//                       fontWeight: 600,
//                       color: "black",
//                     }}>
//                     {chart.title}
//                     <Text
//                       sx={{
//                         color: "#718296",
//                         fontSize: "10px",
//                       }}>
//                       {chart.description}
//                     </Text>
//                   </Box>
//                 </Box>
//                 <Box sx={{ height: "300px" }}>
//                   <MyChart chart={chart} />
//                 </Box>
//               </Box>
//             </Box>
//           );
//         })}
//       </Box>
//     </Box>
//   );
// };

// export default GraphCharts;

import React, { useEffect, useState } from "react";
import { chartsData } from "./data/fakeData";
import { Box, Text } from "@chakra-ui/react";
import MyChart from "./MyChart";
import { Calendar } from "primereact/calendar";
import { format, parse, isWithinInterval, isValid } from "date-fns";

const GraphCharts = () => {
  const [filteredCharts, setFilteredCharts] = useState({
    title: "",
    charts: [],
  });
  const [dates, setDates] = useState([]); // Initialize as empty array

  useEffect(() => {
    if (dates.length === 2) {
      const [startDate, endDate] = dates;

      if (isValid(startDate) && isValid(endDate)) {
        const startFormatted = format(startDate, "yyyy-MM-dd");
        const endFormatted = format(endDate, "yyyy-MM-dd");

        console.log(
          "Filtering charts from",
          startFormatted,
          "to",
          endFormatted
        );

        const filtered = chartsData.charts.filter((chart) => {
          return chart.data.some((dataPoint) => {
            const dataDate = parse(dataPoint.x, "yyyy-MM-dd", new Date());
            return isWithinInterval(dataDate, {
              start: startDate,
              end: endDate,
            });
          });
        });

        setFilteredCharts({
          title: chartsData.title,
          charts: filtered,
        });

        console.log("Filtered charts:", filtered);
      } else {
        console.log("Invalid date range selected.");
        setFilteredCharts({
          title: chartsData.title,
          charts: [],
        });
      }
    } else {
      setFilteredCharts(chartsData);
      console.log("No date range selected, showing all charts");
    }
  }, [dates]);

  console.log("Filtered charts state:", filteredCharts);

  return (
    <Box>
      <Text fontWeight={"600"}>{filteredCharts.title}</Text>

      <Box mb={4}>
        <Calendar
          value={dates.length > 0 ? dates : null}
          onChange={(e) => setDates(e.value || [])}
          selectionMode="range"
          readOnlyInput
          style={{ border: "1px solid #dee2e6" }}
          dateFormat="yy-mm-dd" // Ensure the date format is specified
        />
      </Box>

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        mt={10}>
        {Array.isArray(filteredCharts.charts) &&
        filteredCharts.charts.length > 0 ? (
          filteredCharts.charts.map((chart, index) => (
            <Box key={index} width={{ base: "100%", lg: "65%" }} mb={6}>
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
          ))
        ) : (
          <Text>No charts available for the selected date range.</Text>
        )}
      </Box>
    </Box>
  );
};

export default GraphCharts;


