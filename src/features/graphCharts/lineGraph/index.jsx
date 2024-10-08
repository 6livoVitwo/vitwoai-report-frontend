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

import React, { useState, useEffect } from "react";
import { chartsData } from "./data/fakeData";
import { Box, Text } from "@chakra-ui/react";
import MyChart from "./MyChart";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import DatePicker styles

const formatDate = (date) => {
  if (!date || isNaN(date.getTime())) return null;
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const GraphCharts = () => {
  const [allCharts, setAllCharts] = useState({ charts: [] });
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredCharts, setFilteredCharts] = useState([]);

  useEffect(() => {
    // Initialize with chartsData
    setAllCharts(chartsData);
    setFilteredCharts(chartsData.charts || []);
  }, []);

  useEffect(() => {
    // Convert dates to comparable formats if valid
    const start = startDate ? formatDate(startDate) : null;
    const end = endDate ? formatDate(endDate) : null;

    console.log("Filtering dates:", { start, end });

    // Filter charts based on dates
    const filtered = allCharts.charts.filter(chart => {
      const chartDate = chart.date ? formatDate(new Date(chart.date)) : null;
      console.log("Chart date:", chartDate);
      return (
        (!start || (chartDate && chartDate >= start)) &&
        (!end || (chartDate && chartDate <= end))
      );
    });

    setFilteredCharts(filtered);
  }, [startDate, endDate, allCharts]);

  return (
    <Box>
      <Text fontWeight={"600"}>{allCharts.title}</Text>

      <Box>
        <Box mb={4}>
          <Text>Start Date</Text>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select start date"
            style={{ border: "1px solid #dee2e6" }}
            selectsStart
            startDate={startDate}
            endDate={endDate}
          />
        </Box>
        <Box mb={4}>
          <Text>End Date</Text>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select end date"
            style={{ border: "1px solid #dee2e6" }}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
          />
        </Box>
        <button
          onClick={() => { /* Apply filter logic here if needed */ }}>
          Apply Filter
        </button>
      </Box>

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="space-between"
        mt={10}>
        {filteredCharts.length > 0 ? (
          filteredCharts.map((chart, index) => (
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


