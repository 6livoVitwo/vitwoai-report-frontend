import React, { useState, useMemo } from "react";
import { Tbody, Tr, Td, Th, Thead, Table, TableContainer, Button, Input, Text, Stack, Box, MenuItem, MenuList, MenuButton, Menu } from "@chakra-ui/react";
import { useReceivableCustomerQuery } from "../slice/receivableCustomerApi";
import { ChevronDownIcon } from "@chakra-ui/icons";

const ReceivableCustomerTableView = () => {
  const [intervalDays, setIntervalDays] = useState(20);
  const [bucket, setBucket] = useState(5);
  const [asOnDate, setAsOnDate] = useState("2024-10-20");
  const [allBuckets, setAllBuckets] = useState([
    { value: 0, label: "0-20" },
    { value: 21, label: "21-40" },
    { value: 41, label: "41-60" },
    { value: 61, label: "61-80" },
    { value: 81, label: ">80" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [executionTime, setExecutionTime] = useState(0);

  const [body, setBody] = useState({
    interval: 20,
    bucketNo: 5,
    page: 0,
    size: 10,
    asOnDate: asOnDate
  });

  const handleBucketCreateButton = () => {
    if (isLoading) return;

    setIsLoading(true);
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
    setIsLoading(false);
    setExecutionTime((performance.now() - startTime).toFixed(2));

    // Update the API body to reflect new interval and bucket count
    setBody({
      ...body,
      interval: intervalDays,
      bucketNo: bucket,
    });
  };

  const { data } = useReceivableCustomerQuery({
    endpoint: "receivable/",
    method: "POST",
    body,
  });

  const receivableData = data?.content || [];

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

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        w={"95%"}
        mb={5}
      >
        <Text>Execution Time: {executionTime} ms</Text>
        <Stack direction="row">
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              As on Date
              <Text fontSize={8}>{asOnDate}</Text>
            </MenuButton>
            <MenuList p={2}>
              <Input placeholder="As on Date" type="date" value={asOnDate} onChange={(e) => setAsOnDate(e.target.value)} />
              <MenuItem
                mt={4}
                onClick={handleAsOnDateButton}
                disabled={isLoading}
                isLoading={isLoading}
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
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
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
                  border: "1px solid #dee2e6",
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
                  onChange={(e) => setBucket(parseInt(e.target.value) || 0)}
                />
                <MenuItem
                  mt={4}
                  onClick={handleBucketCreateButton}
                  disabled={isLoading}
                  isLoading={isLoading}
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
        sx={{ border: "1px solid #dee2e6", borderRadius: "8px", padding: "10px", width: "95%" }}
      >
        <Table
          size="lg"
          sx={{
            border: "1px solid #dee2e6",
            borderRadius: "8px",
            borderCollapse: "separate",
            borderSpacing: "0 5px",
            my: 5,
          }}
        >
          <Thead sx={{ backgroundColor: "#f8f9fa" }}>
            <Tr>
              {columns.map((column, index) => (
                <Th key={index}>{column}</Th>
              ))}
              {allBuckets.map((bucket, index) => (
                <Th bg={"green.100"} key={`due-${index}`}>
                  {bucket.label} Due
                </Th>
              ))}
              {allBuckets.map((bucket, index) => (
                <Th bg={"red.100"} key={`account-${index}`}>
                  {bucket.label} On Account
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {receivableData.map((data, index) => (
              <Tr key={index}>
                {columns.map((column, idx) => (
                  <Td key={idx}>{data[column]}</Td>
                ))}
                {Object.keys(data.dueAmounts || {}).map((bucket, idx) => (
                  <Td bg={"green.50"} key={`due-value-${idx}`}>
                    {data.dueAmounts?.[bucket] || "-"}
                  </Td>
                ))}
                {Object.keys(data.onAccountAmounts || {}).map((bucket, idx) => (
                  <Td bg={"red.50"} key={`account-value-${idx}`}>
                    {data.onAccountAmounts?.[bucket] || "-"}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      <Text mt={4}>Execution Time: {executionTime} ms</Text>
    </>
  );
};

export default ReceivableCustomerTableView;
