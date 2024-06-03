import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import ReceivableChart from "./receivableChart";
import ChartDrawer from './chartDrawer';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';

const ReceivableGraphView = () => {
  const authData = useSelector((state) => state.auth);
  const decoded = jwtDecode(authData.authDetails);
  const graphData = [
    {
      id: "graph1",
      name: "XY Graph",
      type: "xy",
      chartData: [
        { country: "USA", value: 2025 },
        { country: "China", value: 1882 },
        { country: "Japan", value: 1809 },
        { country: "Germany", value: 1322 },
        { country: "UK", value: 1122 },
        { country: "France", value: 1114 },
        { country: "India", value: 984 },
        { country: "Spain", value: 711 },
        { country: "Netherlands", value: 665 },
        { country: "South Korea", value: 443 },
        { country: "Canada", value: 441 },
      ],
    },
    {
      id: "graph2",
      name: "Circle Graph",
      type: "circle",
      chartData: [
        { country: "USA", value: 2025 },
        { country: "China", value: 1882 },
        { country: "Japan", value: 1809 },
        { country: "Germany", value: 1322 },
        { country: "UK", value: 1122 },
        { country: "France", value: 1114 },
        { country: "India", value: 984 },
        { country: "Spain", value: 711 },
        { country: "Netherlands", value: 665 },
        { country: "South Korea", value: 443 },
        { country: "Canada", value: 441 },
      ],
    },
  ];

  return (
    <Box>
      <Box mb="15px" textAlign="center">
        <Heading
          textTransform="capitalize"
          color="mainBlue"
          pb="5px"
          fontWeight="700"
          fontSize="22px">
          {decoded.data.companyName}
        </Heading>
        <Text fontWeight="600" fontSize="13px">
          Location - {decoded.data.locationName}
        </Text>
      </Box>
      <ChartDrawer graphData={graphData} />
      <ReceivableChart />
    </Box>
  );
};

export default ReceivableGraphView;
