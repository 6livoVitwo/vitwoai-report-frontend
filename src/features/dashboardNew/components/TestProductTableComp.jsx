import { Box, Button, Input, Menu, MenuButton, MenuList, Select, Stack, Table, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from "@chakra-ui/react";
import { FiFilter } from "react-icons/fi";
import { FaSortAmountDown } from "react-icons/fa";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useGetAllProductsQuery } from "../slice/graphApi";

const body = {
  "data": [
    "SUM(items.receivedQty)",
    "SUM(grnInvoice.grnTotalTds)",
    "SUM(grnInvoice.grnTotalSgst)",
    "SUM(grnInvoice.grnTotalIgst)",
    "grnCreatedBy",
    "grnCode",
    "dueDate",
    "grnCreatedAt",
    "items.goodName",
    "grnUpdatedAt",
    "SUM(items.goodQty)",
    "SUM(items.unitPrice)",
    "SUM(grnInvoice.grnTotalCgst)",
    "SUM(items.totalAmount)",
    "items.goodCode",
    "grnUpdatedBy"
  ],
  "groupBy": [
    "items.goodName"
  ],
  "filter": [],
  "page": 0,
  "size": 25,
  "sortDir": "asc",
  "sortBy": "items.goodName"
}

const TestProductTableComp = () => {

  const { data: allProducts, isSuccess, isLoading } = useGetAllProductsQuery({
    endpoint: '/purchase/purchase-groupby-data',
    method: 'POST',
    body
  });

  console.log({ allProducts, isSuccess, isLoading });

  const keys = allProducts?.content?.length ? Object.keys(allProducts?.content[0]) : [];

  return (
    <>
      <div>TestProductTableComp</div>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        mb: 5,
      }}>
        <Stack>
          <Input sx={{ width: '300px' }} placeholder='Global search ...' />
        </Stack>
        <Stack>
          <Text>Settings</Text>
        </Stack>
      </Box>
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
              <Th>Sl No</Th>
              {keys.map((key, index) => (
                <Th
                  key={index}
                >
                  {key}
                  <Stack sx={{ flexDirection: 'row' }}>
                    <FaSortAmountDown
                      size={10}
                      onClick={() => console.log('clicked on Sort...')}
                    />
                    <Menu>
                      <MenuButton rightIcon={<ChevronDownIcon />}>
                        <FiFilter size={10} />
                      </MenuButton>
                      <MenuList sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        p: 2
                      }}>
                        <Text sx={{ mb: 2 }}>Filtered</Text>
                        <Select sx={{ mb: 2 }} placeholder='Select option'>
                          <option value='notequal'>Not Equal</option>
                          <option value='equal'>Equal</option>
                          <option value='like'>Like</option>
                        </Select>
                        <Input sx={{ mb: 2 }} placeholder='Global search ...' />
                        <Button sx={{ mb: 2 }}>Apply</Button>
                      </MenuList>
                    </Menu>
                  </Stack>
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {
              allProducts?.content?.map((item, index) => (
                <Tr key={index}>
                  <Td>{index + 1})</Td>
                  {keys.map((key, index) => (
                    <Td key={index}>{item[key]}</Td>
                  ))}
                </Tr>
              ))
            }
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TestProductTableComp;