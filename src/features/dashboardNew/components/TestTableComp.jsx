import {
  Box,
  Button,
  Input,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { useState } from "react";

const TestTableComp = () => {
  const [intervalDays, setIntervalDays] = useState(50);
  const [bucket, setBucket] = useState(8); // Number of buckets to create
  const [allBuckets, setAllBuckets] = useState([]);
  const [selectedBucket, setSelectedBucket] = useState("");

  const handleBucketCreateButton = () => {
    // Clear previous buckets
    setAllBuckets([]);

    // Create new buckets based on intervalDays and bucket number
    const newBuckets = [];
    for (let i = 1; i <= bucket; i++) {
      const start = (i - 1) * intervalDays + 1;
      const end = i * intervalDays;

      newBuckets.push({
        value: `${start}-${end}`,
        label: `${start}-${end}`,
      });
    }

    // Update allBuckets with new bucket ranges
    setAllBuckets(newBuckets);
  };

  console.log("⭕ All Buckets:", allBuckets);

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
          spacing={4}
          align="left"
          my={4}
          width={"20%"}
          sx={{
            border: "1px solid #dee2e6",
            borderRadius: "8px",
            padding: "10px",
          }}
        >
          <Text>Input Range</Text>
          <Input
            placeholder="Interval in days"
            value={intervalDays}
            onChange={(e) => setIntervalDays(parseInt(e.target.value) || 0)} // Ensure numeric value
          />
          <Input
            placeholder="Number of Buckets"
            value={bucket}
            onChange={(e) => setBucket(parseInt(e.target.value) || 0)} // Ensure numeric value
          />
          <Button colorScheme="green" onClick={handleBucketCreateButton}>
            Save
          </Button>
        </Stack>

        {/* Select Date Range */}
        <Stack
          sx={{
            width: "20%",
          }}
        >
          <Text>Select Date Range</Text>
          <Select
            placeholder="Select bucket"
            value={selectedBucket}
            onChange={(e) => setSelectedBucket(e.target.value)}
          >
            {allBuckets.map((bucket, index) => (
              <option key={index} value={bucket.value}>
                {bucket.label}
              </option>
            ))}
          </Select>
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
          }}
        >
          <Thead>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </>
  );
};

export default TestTableComp;
