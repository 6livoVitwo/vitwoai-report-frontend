import { Box } from '@chakra-ui/react';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const StockLog = () => {
  return (
    <Box display="flex" flexDirection="column">
      <Box>
        <Box
          display="flex"
          gap="10px"
          pb="8px"
          borderBottom="1px solid var(--chakra-colors-borderGrayLight)"
          sx={{
            "& .active span": {
              bgColor: "mainBluemedium",
              color: "white",
            },
          }}>
          <NavLink to="/reports/stock-log/table-view">
            <Box
              as="span"
              fontSize="13px"
              fontWeight="600"
              bg="mainLightBlue"
              borderRadius="10px 10px 0px 0px"
              p="11px 17px"
              color="rgb(0 48 96)">
              Table View
            </Box>
          </NavLink>
          <NavLink to="/reports/stock-log/graph-view">
            <Box
              as="span"
              fontSize="13px"
              fontWeight="600"
              bg="mainLightBlue"
              borderRadius="10px 10px 0px 0px"
              p="11px 17px"
              color="rgb(0 48 96)">
              Graph View
            </Box>
          </NavLink>
        </Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default StockLog;
