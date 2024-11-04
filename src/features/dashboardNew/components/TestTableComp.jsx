import { Box, Button, Input, Spinner, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useState } from "react";
import { tableData as iniTableData } from "../data/tableData";

const TestTableComp = () => {
  const [intervalDays, setIntervalDays] = useState(50);
  const [bucket, setBucket] = useState(5);
  const [allBuckets, setAllBuckets] = useState([]);
  const [selectedBucket, setSelectedBucket] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [executionTime, setExecutionTime] = useState(0);
  const [tableData, setTableData] = useState(iniTableData);

  console.log("tableData ⭕", tableData);

  const handleBucketCreateButton = () => {
    if (isLoading) return;

    setIsLoading(true);
    setAllBuckets([]);

    const startTime = performance.now();

    const newBuckets = [];
    const maxVal = bucket * intervalDays;
    const maxBuckets = 1000; // Set a reasonable limit
    const actualBuckets = Math.min(bucket, maxBuckets);

    const createBuckets = (i) => {
      if (i < actualBuckets) {
        const start = i * intervalDays + (i > 0 ? 1 : 0);
        const end = (i + 1) * intervalDays;

        if (end < maxVal) {
          newBuckets.push({
            value: i * end + 20,
            label: `${start}-${end}`,
          });
        } else {
          newBuckets.push({
            value: i * start,
            label: `>${maxVal - intervalDays}`,
          });
          setAllBuckets(newBuckets);
          setIsLoading(false); // Stop loading
          const endTime = performance.now();
          const timeTaken = (endTime - startTime).toFixed(2);
          setExecutionTime(timeTaken);
          return; // Stop the recursion
        }

        // Schedule the next call
        setTimeout(() => createBuckets(i + 1), 0);
      } else {
        setAllBuckets(newBuckets);
        const endTime = performance.now();
        const timeTaken = (endTime - startTime).toFixed(2);
        setExecutionTime(timeTaken);
        setIsLoading(false); // Stop loading
      }
    };
    createBuckets(0);
  };

  return (
    <>
      <div>TestTableComp</div>
      <Box
        sx={{
          display: "flex",
          gap: 5,
        }}
      >
        <Stack
          direction="column"
          align="left"
          gap={0}
          width={"20%"}
          sx={{
            border: "1px solid #dee2e6",
            borderRadius: "8px",
            padding: "10px",
          }}
        >
          <Text>Input Range</Text>
          <Text fontSize='xs'>Interval in days</Text>
          <Input
            placeholder="Interval in days"
            value={intervalDays}
            onChange={(e) => setIntervalDays(parseInt(e.target.value) || 0)}
          />
          <Text fontSize='xs'>Number of Buckets</Text>
          <Input
            placeholder="Number of Buckets"
            value={bucket}
            onChange={(e) => setBucket(parseInt(e.target.value) || 0)}
          />
          <Button colorScheme="green" mt={4} onClick={handleBucketCreateButton} isLoading={isLoading}>
            Save
          </Button>
        </Stack>
      </Box>

      {/* Table Component */}
      <TableContainer>
        <Table
          size="lg"
          sx={{
            border: "1px solid #dee2e6",
            borderRadius: "8px",
            borderCollapse: "separate",
            borderSpacing: "0 5px",
            my: 5
          }}
        >
          <Thead sx={{ backgroundColor: "#f8f9fa" }} >
            <Tr>
              <Th>Customer Code</Th>
              <Th>Customer Name</Th>
              <Th>netDue</Th>
              <Th>onAccountDue</Th>
              <Th>Total Due</Th>
              {allBuckets.map((bucket, index) => (
                <Th key={index}>{bucket.label}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((data, index) => {
              console.log("data", data);
              return (
                <Tr key={index}>
                  <Td>{data.customerCode}</Td>
                  <Td>{data.customerName}</Td>
                  <Td>{data.netDue}</Td>
                  <Td>{data.onAccountDue}</Td>
                  <Td>{data.totalDue}</Td>
                  {Object.keys(data.dueAmounts).map((key, index) => {
                    console.log("key ⭕", key);
                    return <Td key={index}>{data.dueAmounts[key]}</Td>;
                  })}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
      {isLoading ? <Spinner /> :
        <>
          <Text>Execution Time: {(executionTime / 1000).toFixed(2)} (second)</Text>
          <Text>Execution Time: {executionTime} (ms)</Text>
        </>
      }
    </>
  );
};

export default TestTableComp;
