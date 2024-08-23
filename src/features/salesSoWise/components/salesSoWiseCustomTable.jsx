import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import {
  Box,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Checkbox,
  Input,
  Text,
  Select,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import debounce from "lodash/debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartSimple,faChartLine} from "@fortawesome/free-solid-svg-icons";
import { saveAs } from "file-saver";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { DownloadIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from 'primereact/calendar';


const CustomTable = ({ setPage, newArray, alignment }) => {
  const [data, setData] = useState([...newArray]);
  const [loading, setLoading] = useState(false);
  const [defaultColumns, setDefaultColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [columnFilters, setColumnFilters] = useState({});
  const [lastPage, setLastPage] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const toast = useToast();
  const tableContainerRef = useRef(null);
  const {
    onOpen: onOpenFilterModal,
    onClose: onCloseFilterModal,
    isOpen: isOpenFilterModal,
  } = useDisclosure();
  const {
    onOpen: onOpenDownloadReportModal,
    onClose: onCloseDownloadReportModal,
    isOpen: isOpenDownloadReportModal,
  } = useDisclosure();

  const getColumnStyle = (header) => ({
    textAlign: alignment[header] || "left",
  });

  const navigate = useNavigate();

  const reportOptions = [
    {
      label: 'Product Wise',
      value: '/reports/sales-product-wise/table-view',
    },
    {
      label: 'Customer Wise',
      value: '/reports/sales-customer-wise/table-view',
    },
    {
      label: 'Vertical Wise',
      value: '/reports/sales-vertical-wise/table-view',
    },
    {
      label: 'So Wise',
      value: '/reports/sales-so-wise/table-view'
    },
    {
      label: 'Kam wise',
      value: '/reports/sales-kam-Wise/table-view'
    },
  ];

  useEffect(() => {
    if (selectedReport) {
      navigate(`${selectedReport}`);
    }
  }, [selectedReport, navigate]);

  const handleReportChange = (e) => {
    const selectedValue = e.value;
    setSelectedReport(selectedValue);
  };

  const loadMoreData = async () => {
    if (!loading) {
      setLoading(true);
      // Fetch or generate new data
      const moreData = [...newArray]; // Assuming newArray contains new data
      setData((prevData) => {
        const uniqueData = [...new Set([...prevData, ...moreData])];
        return uniqueData;
      });
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
    }
  };

  useEffect(() => {
    const initialColumns = getColumns(data)
      .slice(0, 8)
      .map((column) => column.field);
    setDefaultColumns(initialColumns);
    setSelectedColumns(initialColumns);
  }, [data]);

  const getColumns = useCallback((data) => {
    if (!data || data.length === 0) {
      return [];
    }
    const sampleItem = data[0];
    return Object.keys(sampleItem).map((key) => ({
      field: key,
      header: key,
    }));
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const newColumnsOrder = Array.from(selectedColumns);
    const [removed] = newColumnsOrder.splice(result.source.index, 1);
    newColumnsOrder.splice(result.destination.index, 0, removed);
    setSelectedColumns(newColumnsOrder);
  };

  const toggleColumn = (columnName) => {
    setSelectedColumns((prevSelectedColumns) =>
      prevSelectedColumns.includes(columnName)
        ? prevSelectedColumns.filter((col) => col !== columnName)
        : [...prevSelectedColumns, columnName]
    );
  };

  const handleSelectAllToggle = () => {
    const allColumnFields = getColumns(data).map((column) => column.field);
    if (selectAll) {
      setSelectedColumns([]);
    } else {
      setSelectedColumns(allColumnFields);
    }
    setSelectAll((prevSelectAll) => !prevSelectAll);
  };

  const handleModalClose = () => {
    setSelectedColumns(defaultColumns);
    onClose();
  };

  const handleApplyChanges = () => {
    onClose();
    toast({
      title: "Column Added Successfully",
      status: "success",
      isClosable: true,
    });
  };

  const debouncedSearchQuery = useMemo(() => debounce(setSearchQuery, 300), []);

  useEffect(() => {
    return () => {
      debouncedSearchQuery.cancel();
    };
  }, [debouncedSearchQuery]);

  const handleSearchChange = (e) => {
    debouncedSearchQuery(e.target.value);
  };

  const filteredItems = useMemo(() => {
    let filteredData = [...newArray];
    Object.keys(columnFilters).forEach((field) => {
      const filter = columnFilters[field];
      filteredData = filteredData.filter((item) => {
        const value = item[field];

        switch (filter.condition) {
          case "like":
            return String(value)
              .toLowerCase()
              .includes(String(filter.value).toLowerCase());
          case "notLike":
            return !String(value)
              .toLowerCase()
              .includes(String(filter.value).toLowerCase());
          case "greaterThan":
            return Number(value) > Number(filter.value);
          case "greaterThanOrEqual":
            return Number(value) >= Number(filter.value);
          case "lessThan":
            return Number(value) < Number(filter.value);
          case "lessThanOrEqual":
            return Number(value) <= Number(filter.value);
          case "between":
            return (
              Number(value) >= Number(filter.value[0]) &&
              Number(value) <= Number(filter.value[1])
            );
          default:
            return true;
        }
      });
    });

    if (searchQuery) {
      filteredData = filteredData.filter((item) => {
        const values = Object.values(item);
        return values.some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    return filteredData;
  }, [data, searchQuery, columnFilters]);

  const formatHeader = (header) => {
    header = header.trim();
    const parts = header.split(".");
    const lastPart = parts.pop();
    const words = lastPart.split("_").join("");
    const spacedWords = words.replace(/([a-z])([A-Z])/g, "$1 $2");

    return spacedWords
      .split(" ")
      .map((word) => {
        if (word.toLowerCase() === "uom") {
          return "Uom";
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = tableContainerRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 5) {
      loadMoreData();
    }
  };

  useEffect(() => {
    const container = tableContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll()
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [loading, lastPage]);

  const handleColumnFilterConditionChange = (field, condition) => {
    condition = String(condition);
    setColumnFilters((prevFilters) => ({
      ...prevFilters,
      [field]: {
        ...prevFilters[field],
        condition,
      },
    }));
  };

  const handleColumnFilterValueChange = (field, value) => {
    let type = typeof value;
    if (type === "object" && value instanceof Date) {
      type = "date";
    } else if (type === "number") {
      type = "integer";
    } else {
      type = "string";
    }

    if (type === "string" || type === "integer") {
      value = value.trim();
    }

    setColumnFilters((prevFilters) => ({
      ...prevFilters,
      [field]: {
        ...prevFilters[field],
        value,
        column: field,
        type,
      },
    }));
  };

  const exportToExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(filteredItems);
      const workbook = {
        Sheets: { data: worksheet },
        SheetNames: ["data"],
      };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAs(
        new Blob([excelBuffer], {
          type: "application/octet-stream",
        }),
        "customers.xlsx"
      );
    });
  };

  // console.log(data, 'data');
  console.log(newArray, "newArray");
  console.log(selectedColumns, "selectedColumns");
  console.log(filteredItems, "filteredItems");

  return (
    <Box bg="white" padding="0px 10px" borderRadius="5px">
      <Box
        display="flex"
        borderRadius="5px"
        alignItems="center"
        justifyContent="space-between"
        padding="10px"
        marginBottom="10px"
        boxShadow="1px 2px 15px 2px #00000012"
        sx={{
          "& input:placeholder": {
            color: "white",
          },
        }}>
        <Input
          onChange={handleSearchChange}
          width="20%"
          bg="#dedede"
          padding="15px"
          h='36px'
          borderRadius="5px"
          placeholder="Search Global Data"
        />
        <Box
          display="flex"
          justifyContent="space-between"
          gap="10px"
          sx={{
            "& .react-datepicker-wrapper input": {
              bg: "#dedede",
              padding: "5px 10px",
              fontSize: "12px",
              width: "100px",
              borderRadius: "5px",
              outline: "none",
            },
          }}>
          <Dropdown
            value={selectedReport}
            options={reportOptions}
            onChange={(e) => {
              handleReportChange(e);
            }}
            optionLabel="label"
            placeholder="Select Sales Type"
            style={{
              width: "200px",
              background: '#dedede'
            }}
          />
          {/* Graph view  */}
          <Button
            aria-label="Graph View"
            borderRadius="30px"
            width="40px"
            height="40px"
            bg='transparent'
            border='1px solid gray'
            _hover={{
              bg: "mainBlue",
              color: "white",
            }}
            _active={{
              bg: "teal.600",
            }}
            _focus={{
              boxShadow: "outline",
            }}>
            <FontAwesomeIcon icon={faChartLine} fontSize='20px' />
          </Button>

          <Button
            onClick={onOpen}
            padding="15px"
            bg="transparent"
            color="mainBlue"
            border='1px solid gray'
            h='40px'
            w='40px'
            rounded='30px'
            _hover={{
              bg: "mainBlue",
              color: 'white'
            }}>
            <FontAwesomeIcon icon={faChartSimple} fontSize='20px' />

          </Button>
          <Menu>
            <MenuButton
              color="mainBlue"
              border='1px solid gray'
              padding="5px"
              h='40px'
              w='40px'
              borderRadius="30px"
              _hover={{
                color: "white",
                bg: "mainBlue",
              }}
              sx={{
                "& span": {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
              }}>
              <DownloadIcon fontSize='20px' />
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={exportToExcel}
                fontSize="13px"
                fontWeight="600"
                height="35px">
                <Box minW="25px">
                  <FontAwesomeIcon icon={faFileExcel} />
                </Box>
                <Box as="span">Export Report</Box>
              </MenuItem>
              <MenuItem
                fontSize="13px"
                fontWeight="600"
                height="35px"
                onClick={onOpenDownloadReportModal}>
                <Box minW="25px">
                  <FontAwesomeIcon icon={faFileExcel} />
                </Box>
                <Box as="span">Download Report</Box>
              </MenuItem>
              <Modal
                isCentered
                size="xl"
                isOpen={isOpenDownloadReportModal}
                onClose={onCloseDownloadReportModal}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader
                    fontWeight="600"
                    bg="mainBlue"
                    color="white"
                    fontSize="16px"
                    padding="12px">
                    Select Date Range
                  </ModalHeader>
                  <ModalCloseButton mt="5px" color="white" size="lg" />
                  <ModalBody>
                    <Box
                      display="flex"
                      flexDirection="column"
                      sx={{
                        "& .p-calendar input": {
                          height: "30px",
                        },
                        "& .p-calendar .p-inputtext ": {
                          padding: "5px 10px",
                          borderRadius: "5px",
                          mr: "0px",
                          bg: "#dedede",
                        },
                      }}>
                      <Text fontWeight="600" mb="5px" fontSize="14px">
                        Select Your Date - Range
                      </Text>
                      <Box display='flex'
                        justifyContent='space-between'
                        padding='5px'
                        alignItems='center'
                      >
                        <Calendar
                          value={startDate}
                          onChange={(e) => setStartDate(e.value)}
                          placeholder='Start Date'
                          style={{
                            width: '150px',
                            padding: '5px',
                          }}
                        />
                        <Text>to</Text>
                        <Calendar
                          value={endDate}
                          onChange={(e) => setEndDate(e.value)}
                          placeholder='End Date'
                          style={{
                            width: '150px',
                            padding: '5px',
                          }}
                        />
                      </Box>
                    </Box>
                  </ModalBody>

                  <ModalFooter>
                    <Button
                      mr={3}
                      padding="15px"
                      fontSize="13px"
                      bg="var(--chakra-colors-mainBlue)"
                      _hover={{
                        bg: "var(--chakra-colors-mainBlue)",
                      }}
                      color="white"
                      onClick={onCloseDownloadReportModal}>
                      Close
                    </Button>
                    <Button
                      padding="15px"
                      fontSize="13px"
                      bg="var(--chakra-colors-mainBlue)"
                      _hover={{
                        bg: "var(--chakra-colors-mainBlue)",
                      }}
                      color="white">
                      Filter
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </MenuList>
          </Menu>

          <Modal
            isOpen={isOpenFilterModal}
            onClose={onCloseFilterModal}
            size="xl"
            isCentered>
            <ModalOverlay />
            <ModalContent minW="40%">
              <ModalHeader
                fontWeight="600"
                bg="mainBlue"
                color="white"
                fontSize="16px"
                padding="12px">
                Filter Table Report by Column
              </ModalHeader>
              <ModalCloseButton mt="5px" color="white" size="lg" />
              <ModalBody>
                <Box height="60vh" overflowY="scroll" overflowX="hidden">
                  {getColumns(data).map((column) => {
                    const formattedHeader = formatHeader(column.header);
                    return (
                      <Box key={column.field}>
                        <Text
                          color="var(--chakra-colors-textBlack)"
                          fontWeight="600"
                          fontSize="14px"
                          mt="10px"
                          mb="3px">
                          {formattedHeader}
                        </Text>
                        <Box display="flex" gap="15px" mr="10px">
                          <Select
                            placeholder="Select option"
                            size="lg"
                            fontSize="12px"
                            h="35px"
                            value={columnFilters[column.field]?.condition || ""}
                            onChange={(e) =>
                              handleColumnFilterConditionChange(
                                column.field,
                                e.target.value
                              )
                            }>
                            <option value="like">Contain</option>
                            <option value="notLike">Not Contain</option>
                            <option value="greaterThan">Greater Than</option>
                            <option value="greaterThanOrEqual">
                              Greater Than or Equal
                            </option>
                            <option value="lessThan">Less Than</option>
                            <option value="lessThanOrEqual">
                              Less Than or Equal
                            </option>
                            <option value="between">Between</option>
                          </Select>
                          <Input
                            h="35px"
                            fontSize="12px"
                            padding="10px 10px"
                            value={columnFilters[column.field]?.value || ""}
                            onChange={(e) =>
                              handleColumnFilterValueChange(
                                column.field,
                                e.target.value
                              )
                            }
                            placeholder={`Filter ${column.header}`}
                          />
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </ModalBody>

              <ModalFooter>
                <Button
                  mr={3}
                  padding="15px"
                  fontSize="13px"
                  bg="var(--chakra-colors-mainBlue)"
                  _hover={{
                    bg: "var(--chakra-colors-mainBlue)",
                  }}
                  color="white"
                  onClick={onCloseFilterModal}>
                  Reset
                </Button>
                <Button
                  padding="15px"
                  fontSize="13px"
                  bg="var(--chakra-colors-mainBlue)"
                  _hover={{
                    bg: "var(--chakra-colors-mainBlue)",
                  }}
                  color="white">
                  Filter
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>
      </Box>
      <TableContainer
        ref={tableContainerRef}
        className="table-tableContainerRef"
        overflowY="auto"
        height="calc(100vh - 179px)"
        width="calc(100vw - 115px)">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided) => (
              <Table
                {...provided.droppableProps}
                ref={provided.innerRef}
                variant="simple">
                <Thead>
                  <Tr bg="#cfd8e1">
                    {selectedColumns.map((column, index) => (
                      <Draggable
                        key={column}
                        draggableId={column}
                        index={index}>
                        {(provided) => (
                          <Th
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            padding="15px 10px"
                            fontSize="13px"
                            fontWeight="500"
                            textTransform="capitalize"
                            fontFamily="Poppins, sans-serif"
                            color="black">
                            {formatHeader(column)}
                            <Popover >
                              <PopoverTrigger>
                                <Button
                                  bg='transparent'
                                >
                                  <i className=" pi pi-filter" style={{ color: 'slateblue', fontSize: '1.3rem' }}></i>
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent>
                                <PopoverArrow />
                                <PopoverCloseButton />
                                {/* <PopoverHeader>Confirmation!</PopoverHeader> */}
                                <PopoverBody h='150px' >
                                  <Select placeholder=' Filter With '
                                    mt='25px' p='5px'
                                    h='39px'
                                    border='1px solid gray'
                                    onChange={(e) =>
                                      handleColumnFilterConditionChange(
                                        column,
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option value='equal'>Equal</option>
                                    <option value='option2'>NotEqual</option>
                                    <option value='option3'>Like</option>
                                    <option value='option3'>Like</option>
                                    <option value='option3'>NotLike</option>
                                    <option value='option3'>GraterThan</option>
                                    <option value='option3'>GraterThanOrEqual</option>
                                    <option value='option3'>LessThan</option>
                                    <option value='option3'>LessThanOrEqual</option>
                                    <option value='option3'>Between</option>
                                  </Select>
                                  <Input placeholder='Search By Name'
                                    mt='8px'
                                    p='6px'
                                    ml='5px'
                                    w='174px'
                                    h='39px'
                                    border='1px solid gray'
                                    onChange={handleSearchChange}
                                  />
                                </PopoverBody>
                                <Box display='flex'
                                  justifyContent='flex-end'
                                  width='90%'
                                  ml='8px'
                                  mb='10px'

                                >
                                  <Button
                                    bg='mainBlue'
                                    width="58px"
                                    color="white"
                                    mb="5px"
                                    outline='none'
                                    _hover={{
                                      color: "white",
                                      bg: "mainBlue",
                                    }}
                                  >
                                    Apply
                                  </Button>

                                </Box>
                              </PopoverContent>
                            </Popover>
                          </Th>
                        )}
                      </Draggable>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item, index) => (
                      <Tr key={index}>
                        {selectedColumns.map((column, colIndex) => (
                          <Td
                            key={colIndex}
                            padding="10px"
                            style={getColumnStyle(column)}>
                            <Text
                              fontSize="13px"
                              whiteSpace="nowrap"
                              width={
                                column === "description"
                                  ? "300px"
                                  : column === "name"
                                    ? "200px"
                                    : "100px"
                              }
                              overflow="hidden"
                              textOverflow="ellipsis">
                              {item[column]}
                            </Text>
                          </Td>
                        ))}
                      </Tr>
                    ))
                  ) : (
                    <Tr>
                      <Td textAlign="center" colSpan={selectedColumns.length}>
                        No data available
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            )}
          </Droppable>
        </DragDropContext>
      </TableContainer>

      <Modal isOpen={isOpen} onClose={handleModalClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent minW="30%">
          <ModalHeader
            fontWeight="600"
            bg="mainBlue"
            color="white"
            fontSize="16px"
            padding="12px">
            Select Columns to Show
          </ModalHeader>
          <ModalCloseButton mt="5px" color="white" size="lg" />
          <ModalBody pt="10px">
            <Box padding="0px 10px" borderRadius="5px">
              <Checkbox
                isChecked={selectAll}
                onChange={handleSelectAllToggle}
                mb={4}
                size="lg"
                fontWeight="600">
                Select All
              </Checkbox>
            </Box>
            <Box
              height="60vh"
              overflowY="scroll"
              overflowX="hidden"
              display="flex"
              flexWrap="wrap"
              gap="5px"
              sx={{
                "& .columnCheckBox:nth-of-type(odd)": {
                  bg: "borderGrayLight",
                },
              }}>
              {getColumns(data).map((column) => {
                const formattedHeader = formatHeader(column.field);

                return (
                  <Box
                    key={column.field}
                    className="columnCheckBox"
                    padding="5px"
                    bg="rgba(231,231,231,1)"
                    borderRadius="5px"
                    width="48%">
                    <Checkbox
                      size="lg"
                      display="flex"
                      padding="5px"
                      borderColor="mainBluemedium"
                      key={column.field}
                      defaultChecked={selectedColumns.includes(column.field)}
                      isChecked={selectedColumns.includes(column.field)}
                      onChange={() => toggleColumn(column.field)}>
                      <Text
                        fontWeight="500"
                        ml="10px"
                        fontSize="12px"
                        color="textBlackDeep">
                        {formattedHeader}
                      </Text>
                    </Checkbox>
                  </Box>
                );
              })}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={3}
              padding="15px"
              fontSize="12px"
              bg="var(--chakra-colors-mainBlue)"
              color="white"
              _hover={{
                bg: "var(--chakra-colors-mainBlue)",
              }}
              onClick={handleModalClose}>
              Cancel
            </Button>
            <Button
              padding="15px"
              fontSize="12px"
              bg="var(--chakra-colors-mainBlue)"
              _hover={{
                bg: "var(--chakra-colors-mainBlue)",
              }}
              color="white"
              onClick={handleApplyChanges}>
              Apply Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CustomTable;
