import React, { useState, useMemo } from "react";
import { Tbody, Tr, Td, Th, Thead, Table, TableContainer, Button, Input, Text, Stack, Box, MenuItem, MenuList, MenuButton, Menu } from "@chakra-ui/react";
import { useReceivableCustomerQuery } from "../slice/receivableCustomerApi";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Pagination from "../../global/components/Pagination";
import { usePagination } from "../../global/hooks/usePagination";
import { exportToExcel, exportToImage, exportToPDF } from "../utils";

const ReceivableCustomerTableView = () => {
  const { first, rows, onPageChange } = usePagination(10);
  const [intervalDays, setIntervalDays] = useState(20);
  const [bucket, setBucket] = useState(5);
  const [asOnDate, setAsOnDate] = useState(new Date().toISOString().split("T")[0]);

  const [allBuckets, setAllBuckets] = useState([
    { value: 0, label: "0-20" },
    { value: 21, label: "21-40" },
    { value: 41, label: "41-60" },
    { value: 61, label: "61-80" },
    { value: 81, label: ">80" },
  ]);
  const [loading, setLoading] = useState(false);
  const [executionTime, setExecutionTime] = useState(0);

  const [body, setBody] = useState({
    interval: 20,
    bucketNo: 5,
    page: first / rows,
    size: rows,
    asOnDate: asOnDate
  });

  const handleBucketCreateButton = () => {
    if (loading) return;

    setLoading(true);
    const startTime = performance.now();
    const newBuckets = [];
    const maxVal = bucket * intervalDays;
    const actualBuckets = Math.min(bucket, 1000);

    for (let i = 0; i < actualBuckets; i++) {
      const start = i * intervalDays + (i > 0 ? 1 : 0);
      const end = (i + 1) * intervalDays;

      if (end < maxVal) {
        newBuckets.push({ value: i * end + 20, label: `${start}-${end}` });
      } else {
        newBuckets.push({ value: i * start, label: `>${maxVal - intervalDays}` });
        break;
      }
    }

    setAllBuckets(newBuckets);
    setLoading(false);
    setExecutionTime((performance.now() - startTime).toFixed(2));

    // Update the API body to reflect new interval and bucket count
    setBody({
      ...body,
      interval: intervalDays,
      bucketNo: bucket,
    });
  };

  const { data, isLoading } = useReceivableCustomerQuery({
    endpoint: "receivable/customer",
    method: "POST",
    body,
  });

  const receivableData = data?.content || [];
  const totalRecords = data?.totalElements || 0;

  // Memoize columns based on the response structure
  const columns = useMemo(() => {
    if (receivableData.length > 0) {
      return Object.keys(receivableData[0]).filter(
        (key) => key !== "dueAmounts" && key !== "onAccountAmounts"
      );
    }
    return [];
  }, [receivableData]);

  const handleAsOnDateButton = () => {
    setBody({
      ...body,
      asOnDate
    })
  }

  const handlePageChange = (event) => {
    onPageChange(event);
    setBody((prevBody) => ({
      ...prevBody,
      page: event.first / event.rows,
      size: event.rows,
    }))
  }

  function formatColumnName(column) {
    return column.replace(/([A-Z])/g, ' $1');
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        w={"95%"}
        mb={5}
        p={3}
        position="sticky"
        top={0}
        bg={"white"}
        zIndex="10"
      >
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon fontSize="25px" />} height={"40px"} fontSize={"12px"} >
            Export
          </MenuButton>
          <MenuList>
            <MenuItem onClick={exportToExcel}>Export to Excel</MenuItem>
            {/* <MenuItem onClick={exportToPDF}>Export to PDF</MenuItem> */}
            <MenuItem onClick={exportToImage}>Export as Image</MenuItem>
          </MenuList>
        </Menu>
        <Stack direction="row">
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon fontSize="25px" />} height={"40px"} fontSize={"12px"}>
              As on Date
              <Text fontSize={10}>{asOnDate}</Text>
            </MenuButton>
            <MenuList p={2}>
              <Input placeholder="As on Date" type="date" value={asOnDate} onChange={(e) => setAsOnDate(e.target.value)} />
              <MenuItem
                mt={4}
                onClick={handleAsOnDateButton}
                disabled={loading}
                isLoading={loading}
                loadingText="Creating Buckets..."
              >
                <Button
                  colorScheme="green"
                  width={"100%"}
                >
                  Save
                </Button>
              </MenuItem>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon fontSize="25px" />} height={"40px"} fontSize={"12px"}>
              Actions
            </MenuButton>
            <MenuList>
              {/* <MenuItem>Download</MenuItem> */}
              <Stack
                direction="column"
                align="left"
                gap={0}
                width={"100%"}
                sx={{
                  borderRadius: "8px",
                  padding: "10px",
                }}
              >
                <Text>Input Range</Text>
                <Text fontSize="xs">Interval in days</Text>
                <Input
                  placeholder="Interval in days"
                  value={intervalDays}
                  onChange={(e) => setIntervalDays(parseInt(e.target.value) || 0)}
                />
                <Text fontSize="xs">Number of Buckets</Text>
                <Input
                  placeholder="Number of Buckets"
                  value={bucket}
                  type="number"
                  min={0}
                  max={10}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setBucket(value > 10 ? 10 : value || 0);
                  }}
                />
                <MenuItem
                  mt={4}
                  onClick={handleBucketCreateButton}
                  disabled={loading}
                  isLoading={loading}
                  loadingText="Creating Buckets..."
                >
                  <Button
                    colorScheme="green"
                    width={"100%"}
                  >
                    Save
                  </Button>
                </MenuItem>
              </Stack>
            </MenuList>
          </Menu>
        </Stack>
      </Box>
      <TableContainer
        id="receivable-table"
        m={2}
        sx={{
          border: "1px solid #dee2e6",
          borderRadius: "8px",
          width: "95%",
          overflowY: "auto",
          mt: "-12px",
          height: "600px",
          "&::-webkit-scrollbar": {
            height: "1px",
          },
        }}
      >
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <Table
            size="lg"
            sx={{
              borderRadius: "8px",
              borderCollapse: "separate",
              borderSpacing: "0 5px"
            }}
          >
            <Thead
              sx={{
                position: "sticky",
                top:0,
                zIndex: 1,
                backgroundColor: "#b9b8b8"
              }}
            >
              <Tr>
                {columns.map((column, index) => (
                  <Th key={index} fontSize="13px" textTransform={"capitalize"}>
                    {formatColumnName(column)}
                  </Th>
                ))}
                {allBuckets.map((bucket, index) => (
                  <Th bg={"green.100"} key={`due-${index}`} fontSize="13px" textTransform={"capitalize"}>
                    {bucket.label} Due
                  </Th>
                ))}
                {allBuckets.map((bucket, index) => (
                  <Th bg={"red.100"} key={`account-${index}`} fontSize="13px" textTransform={"capitalize"}>
                    {bucket.label} On Account
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {receivableData.map((data, index) => (
                <Tr key={index} fontSize="13px">
                  {columns.map((column, idx) => (
                    <Td
                      sx={{
                        textAlign: column === "customerName" ? "left" : "right"
                      }}
                      key={idx}
                    >
                      {data[column]}
                    </Td>
                  ))}
                  {Object.keys(data.dueAmounts || {}).map((bucket, idx) => (
                    <Td sx={{ textAlign: "right" }} bg={"green.50"} key={`due-value-${idx}`}>
                      {data.dueAmounts?.[bucket] || "-"}
                    </Td>
                  ))}
                  {Object.keys(data.onAccountAmounts || {}).map((bucket, idx) => (
                    <Td sx={{ textAlign: "right" }} bg={"red.50"} key={`account-value-${idx}`}>
                      {data.onAccountAmounts?.[bucket] || "-"}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </TableContainer>


      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          w: "95%",
          mb: 5,
        }}
      >
        {/* <Text mt={4}>Execution Time: {executionTime} ms</Text> */}
        <Text mt={4}>Total Records: {totalRecords}</Text>
        <Pagination
          first={first}
          totalRecords={totalRecords}
          rows={rows}
          rowsPerPageOptions={[10, 25, totalRecords > 25 && parseInt(totalRecords / 5).toFixed(0), totalRecords > 25 && parseInt(totalRecords / 2).toFixed(0), totalRecords > 25 && totalRecords]}
          onPageChange={handlePageChange}
        />
      </Box>
    </>
  );
};

export default ReceivableCustomerTableView;