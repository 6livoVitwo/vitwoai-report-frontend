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
  PopoverArrow,
  PopoverCloseButton,
  Tooltip,
} from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import debounce from "lodash/debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faChartLine,
  faArrowDownShortWide,
  faArrowUpWideShort,
  faArrowRightArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { saveAs } from "file-saver";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { DownloadIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { useGetSelectedColumnsQuery } from "../slice/purchaseProductWiseApi";
import { useProductWisePurchaseQuery } from "../slice/purchaseProductWiseApi";
import { useGetGlobalsearchPurchaseQuery } from "../slice/purchaseProductWiseApi";

const CustomTable = ({ setPage, newArray, alignment, filters }) => {
  const [data, setData] = useState([...newArray]);
  const [loading, setLoading] = useState(false);
  const [defaultColumns, setDefaultColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const { isOpen, onOpen, onClose, onApplyChanges } = useDisclosure();
  const [columnFilters, setColumnFilters] = useState({});
  const [lastPage, setLastPage] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [filterCondition, setFilterCondition] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [applyFilter, setApplyFilter] = useState(false);
  // Temporary states to hold user inputs before applying the filter
  const [tempFilterCondition, setTempFilterCondition] = useState("");
  const [tempFilterValue, setTempFilterValue] = useState("");
  const [tempSearchQuery, setTempSearchQuery] = useState("");
  const [columns, setColumns] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [sortColumn, setSortColumn] = useState();
  const [sortOrder, setSortOrder] = useState();
  const [currentPage, setCurrentPage] = useState(0); // Default page is 0

  //API Calling sorting
  const { data: ProductData, refetch: refetchProduct } =
    useProductWisePurchaseQuery({
      filters: {
        ...filters,
        //  sortBy: sortColumn,
        // sortDir: sortOrder,
      },
      page: currentPage,
    });
  // console.log("piyas ninja", ProductData);

  //Api calling for selected columns
  const { data: columnData } = useGetSelectedColumnsQuery();
  // console.log("01010101", columnData);

  // api calling from global search
  const { data: searchData } = useGetGlobalsearchPurchaseQuery(filters, {
    skip: !searchQuery,
  });
  // console.log("piyas3333333", searchData);

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
      label: "Product Wise",
      value: "/reports/product-wise/table-view",
    },
    {
      label: "Vendor Wise",
      value: "/reports/vendor-wise/table-view",
    },
    {
      label: "PO Wise",
      value: "/reports/po-wise/table-view",
    },
  ];

  // Fetching columns data from API
  useEffect(() => {
    if (columns.length) {
      // Initialize selected columns based on fetched data or some default logic
      setSelectedColumns(columns.map((col) => col.field)); // Example initialization
    }
  }, [columns]);

  useEffect(() => {
    if (selectedReport) {
      navigate(`${selectedReport}`);
    }
  }, [selectedReport, navigate]);

  const handleReportChange = (e) => {
    const selectedValue = e.value;
    setSelectedReport(selectedValue);
  };

  //function for filter
  const handleTempFilterConditionChange = (e) => {
    setTempFilterCondition(e.target.value);
  };

  const handleTempFilterValueChange = (e) => {
    setTempFilterValue(e.target.value);
  };
  const handleApplyFilter = () => {
    const newFilters = {
      ...columnFilters,
      [selectedColumns]: {
        condition: tempFilterCondition,
        value: tempFilterValue,
      },
    };

    // Trigger a data re-fetch or update the filtered data
    setColumnFilters(newFilters);
    // Alternatively, if you want to filter data directly
    // setFilteredData(filteredItems);
  };

  //sort asc desc
  const handleSort = (column) => {
    const newSortOrder =
      sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    // Update sort state
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };
  // Trigger the API call when sortColumn or sortOrder changes
  useEffect(() => {
    refetchProduct({
      filters: {
        ...filters,
        sortBy: sortColumn,
        sortDir: sortOrder,
      },
      page: currentPage,
    });
  }, [sortColumn, sortOrder, refetchProduct]); // Ensure dependencies are correct

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

  // Handle column selection
  const toggleColumn = (columnName) => {
    setSelectedColumns((prevSelectedColumns) =>
      prevSelectedColumns.includes(columnName)
        ? prevSelectedColumns.filter((col) => col !== columnName)
        : [...prevSelectedColumns, columnName]
    );
  };

  // const handleSelectAllToggle = () => {
  //   const allColumnFields = getColumns(data).map((column) => column.field);
  //   if (selectAll) {
  //     setSelectedColumns([]);
  //   } else {
  //     setSelectedColumns(allColumnFields);
  //   }
  //   setSelectAll((prevSelectAll) => !prevSelectAll);
  // };
  // Handle toggle of "Select All" checkbox
  const handleSelectAllToggle = () => {
    if (selectAll) {
      setSelectedColumns([]); // Deselect all columns
    } else {
      const allColumns = getColumns(data) // Select all columns
        .concat(
          columnData
            ? Object.keys(columnData?.content[0] || {}).map((key) => ({
                field: key,
                header: key,
              }))
            : []
        )
        .map((column) => column.field);

      setSelectedColumns(allColumns);
    }
    setSelectAll(!selectAll);
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

  const debouncedSearchQuery = useMemo(() => debounce(setSearchQuery), []);

  useEffect(() => {
    return () => {
      debouncedSearchQuery.cancel();
    };
  }, [debouncedSearchQuery]);

  const handleSearchChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleSearchClick = () => {
    debouncedSearchQuery(inputValue);
  };
  const clearAllFilters = () => {
    setSearchQuery("");
    setInputValue("");
    setColumnFilters({});
    setSortColumn("");
  };
  const filteredItems = useMemo(() => {
    // Combine newArray and columnData.content
    let combinedData = [...newArray];
    if (columnData && columnData.content.length > 0) {
      combinedData = combinedData.concat(columnData.content);
    }
    let filteredData = [...combinedData]; // Copy the combined data
    // Apply column filters
    Object.keys(columnFilters).forEach((field) => {
      const filter = columnFilters[field];
      if (filter.condition && filter.value) {
        filteredData = filteredData.filter((item) => {
          const value = item[field];
          switch (filter.condition) {
            case "equal":
              return (
                String(value).toLowerCase() ===
                String(filter.value).toLowerCase()
              );
            case "notEqual":
              return (
                String(value).toLowerCase() !==
                String(filter.value).toLowerCase()
              );
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
              if (Array.isArray(filter.value) && filter.value.length === 2) {
                return (
                  Number(value) >= Number(filter.value[0]) &&
                  Number(value) <= Number(filter.value[1])
                );
              }
              return false;
            default:
              return true;
          }
        });
      }
    });

    // Apply global search filter (if searchQuery exists)
    if (searchQuery) {
      filteredData = filteredData.filter((item) => {
        return Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    // Apply sorting
    if (sortColumn) {
      filteredData.sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    // Filter data to only include selected columns
    if (selectedColumns.length > 0) {
      filteredData = filteredData.map((item) => {
        const filteredItem = {};
        selectedColumns.forEach((column) => {
          filteredItem[column] = item[column];
        });
        return filteredItem;
      });
    }

    return filteredData;
  }, [
    data,
    newArray,
    columnData,
    searchData,
    searchQuery,
    columnFilters,
    sortColumn,
    sortOrder,
    filterCondition,
    filterValue,
    selectedColumns,
  ]);

  // useEffect(() => {
  //   if (applyFilter) {
  //     setApplyFilter(false);
  //   }
  // }, [applyFilter]);

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

    if (scrollTop + clientHeight >= scrollHeight - 1) {
      loadMoreData();
    }
  };

  useEffect(() => {
    const container = tableContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll();
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

  console.log(data, "data");
  // console.log(newArray, "newArray");
  // console.log(selectedColumns, "selectedColumns");
  // console.log("filteredItems010101",filteredItems);

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
        }}
      >
        <Box display="flex" alignItems="center" w="20%" position="relative">
          <Input
            onChange={handleSearchChange}
            value={inputValue}
            width="100%"
            bg="#dedede"
            padding="15px"
            h="36px"
            borderRadius="5px"
            placeholder="Search Global Data"
            pr="40px"
            zIndex="1"
          />
          <button
            onClick={handleSearchClick}
            style={{
              position: "absolute",
              right: "10px", // Adjust the position as needed
              top: "50%",
              transform: "translateY(-50%)",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "20px",
              zIndex: "2",
            }}
          >
            <i
              className="pi pi-search"
              style={{ fontSize: "2rem", opacity: "0.8" }}
            ></i>
          </button>
        </Box>
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
          }}
        >
          <Tooltip label="Clear All" hasArrow>
            <Button
              onClick={clearAllFilters}
              borderRadius="5px"
              w="40px"
              h="40px"
              bg="#d6eaf8"
              _hover={{
                bg: "mainBlue",
                color: "white",
              }}
            >
              <i
                className="pi pi-filter-slash"
                style={{ fontSize: "1.5rem" }}
              ></i>
            </Button>
          </Tooltip>

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
              // background: '#dedede',
              border: "1px solid gray ",
            }}
          />
          <Popover>
            <PopoverTrigger>
              <Button
                rounded="full"
                w="40px"
                h="40px"
                bg="none"
                border="1px solid #1b4f72 "
                _hover={{
                  bg: "mainBlue",
                  color: "white",
                }}
              >
                Goods
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              {/* <PopoverArrow /> */}
              <PopoverCloseButton />
              <PopoverHeader display="flex" justifyContent="center">
                Select Groups
              </PopoverHeader>
              <PopoverBody>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-around"
                >
                  <Button
                    rounded="9px"
                    border="1px solid gray"
                    w="100%"
                    p=""
                    m="2px"
                    h="40px"
                  >
                    Good Groups
                  </Button>
                  <Button
                    rounded="9px"
                    border="1px solid gray"
                    w="100%"
                    p=""
                    m="2px"
                    h="40px"
                  >
                    Good Items
                  </Button>
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          {/* Graph view  */}
          <Tooltip label="Graph View" hasArrow>
            <Button
              aria-label="Graph View"
              borderRadius="30px"
              width="40px"
              height="40px"
              bg="transparent"
              border="1px solid gray"
              _hover={{
                bg: "mainBlue",
                color: "white",
              }}
              _active={{
                bg: "teal.600",
              }}
              _focus={{
                boxShadow: "outline",
              }}
            >
              <FontAwesomeIcon icon={faChartLine} fontSize="20px" />
            </Button>
          </Tooltip>

          <Tooltip label="Select Columns to Show" hasArrow>
            <Button
              onClick={onOpen}
              padding="15px"
              height="40px"
              color="mainBlue"
              width="40px"
              borderRadius="30px"
              bg="transparent"
              border="1px solid gray"
              _hover={{
                bg: "mainBlue",
                color: "white",
              }}
            >
              <FontAwesomeIcon icon={faChartSimple} fontSize="20px" />
            </Button>
          </Tooltip>

          <Menu>
            <Tooltip label="Export" hasArrow>
              <MenuButton
                color="mainBlue"
                height="40px"
                width="40px"
                padding="5px"
                borderRadius="30px"
                border="1px solid gray"
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
                }}
              >
                <DownloadIcon fontSize="20px" />
              </MenuButton>
            </Tooltip>
            <MenuList>
              <MenuItem
                onClick={exportToExcel}
                fontSize="13px"
                fontWeight="600"
                height="35px"
              >
                <Box minW="25px">
                  <FontAwesomeIcon icon={faFileExcel} />
                </Box>
                <Box as="span">Export Report</Box>
              </MenuItem>
              <MenuItem
                fontSize="13px"
                fontWeight="600"
                height="35px"
                onClick={onOpenDownloadReportModal}
              >
                <Box minW="25px">
                  <FontAwesomeIcon icon={faFileExcel} />
                </Box>
                <Box as="span">Download Report</Box>
              </MenuItem>
              <Modal
                isCentered
                size="xl"
                isOpen={isOpenDownloadReportModal}
                onClose={onCloseDownloadReportModal}
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader
                    fontWeight="600"
                    bg="mainBlue"
                    color="white"
                    fontSize="16px"
                    padding="12px"
                  >
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
                      }}
                    >
                      <Text fontWeight="600" mb="5px" fontSize="14px">
                        Select Your Date - Range
                      </Text>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        padding="5px"
                        alignItems="center"
                      >
                        <Calendar
                          value={startDate}
                          onChange={(e) => setStartDate(e.value)}
                          placeholder="Start Date"
                          style={{
                            width: "150px",
                            padding: "5px",
                          }}
                        />
                        <Text>to</Text>
                        <Calendar
                          value={endDate}
                          onChange={(e) => setEndDate(e.value)}
                          placeholder="End Date"
                          style={{
                            width: "150px",
                            padding: "5px",
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
                      onClick={onCloseDownloadReportModal}
                    >
                      Close
                    </Button>
                    <Button
                      padding="15px"
                      fontSize="13px"
                      bg="var(--chakra-colors-mainBlue)"
                      _hover={{
                        bg: "var(--chakra-colors-mainBlue)",
                      }}
                      color="white"
                    >
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
            isCentered
          >
            <ModalOverlay />
            {/* <ModalContent minW="40%">
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
            </ModalContent> */}
          </Modal>
        </Box>
      </Box>
      <TableContainer
        ref={tableContainerRef}
        className="table-tableContainerRef"
        overflowY="auto"
        height="calc(100vh - 195px)"
        width="calc(100vw - 115px)"
      >
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided) => (
              <Table
                {...provided.droppableProps}
                ref={provided.innerRef}
                variant="simple"
              >
                <Thead
                  style={{
                    position: "sticky",
                    top: 0,
                  }}
                >
                  <Tr bg="#ffffff">
                    {selectedColumns.map((column, index) => (
                      <Draggable
                        key={column}
                        draggableId={column}
                        index={index}
                      >
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
                            color="black"
                          >
                            {formatHeader(column)}

                            {/* A-Z Filter  */}
                            <Button
                              className="A_to_Z"
                              bg="none"
                              _hover={{ bg: "none" }}
                              onClick={() => handleSort(column)}
                            >
                              {sortColumn === column ? (
                                sortOrder === "asc" ? (
                                  <FontAwesomeIcon
                                    icon={faArrowDownShortWide}
                                  />
                                ) : (
                                  <FontAwesomeIcon icon={faArrowUpWideShort} />
                                )
                              ) : (
                                <FontAwesomeIcon
                                  icon={faArrowRightArrowLeft}
                                  rotation={90}
                                  fontSize="13px"
                                />
                              )}
                            </Button>

                            <Popover>
                              <PopoverTrigger>
                                <Button
                                  bg="transparent"
                                  _hover={{
                                    bg: "none",
                                  }}
                                >
                                  <i
                                    className=" pi pi-filter"
                                    style={{
                                      color: "slateblue",
                                      fontSize: "1.3rem",
                                    }}
                                  ></i>
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent>
                                <PopoverArrow />
                                <PopoverCloseButton fontSize="10px" />
                                {/* <PopoverHeader>Confirmation!</PopoverHeader> */}
                                <PopoverBody h="150px">
                                  <Select
                                    placeholder=" Filter With "
                                    mt="25px"
                                    p="5px"
                                    h="39px"
                                    border="1px solid gray"
                                    onChange={handleTempFilterConditionChange}
                                  >
                                    <option value="equal">Equal</option>
                                    <option value="notEqual">NotEqual</option>
                                    <option value="like">Like</option>
                                    <option value="notLike">NotLike</option>
                                    <option value="greaterThan">
                                      GreaterThan
                                    </option>
                                    <option value="greaterThanOrEqual">
                                      GreaterThanOrEqual
                                    </option>
                                    <option value="lessThan">LessThan</option>
                                    <option value="lessThanOrEqual">
                                      LessThanOrEqual
                                    </option>
                                    <option value="between">Between</option>
                                  </Select>
                                  <Input
                                    placeholder="Search By Name"
                                    mt="8px"
                                    p="6px"
                                    ml="5px"
                                    w="174px"
                                    h="39px"
                                    border="1px solid gray"
                                    onChange={handleTempFilterValueChange}
                                  />
                                </PopoverBody>

                                <Box
                                  display="flex"
                                  justifyContent="flex-end"
                                  width="90%"
                                  ml="8px"
                                  mb="10px"
                                >
                                  <Button
                                    onClick={handleApplyFilter}
                                    bg="mainBlue"
                                    width="58px"
                                    color="white"
                                    mb="5px"
                                    outline="none"
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
                            style={getColumnStyle(column)}
                          >
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
                              textOverflow="ellipsis"
                            >
                              {/* {item[column]} */}
                              {/* {item[column] !== undefined ? item[column] : "-"} */}
                              {typeof item[column] === "object" &&
                              item[column] !== null
                                ? item[column].listName || item[column].index // or JSON.stringify(item[column]) if simple
                                : item[column] !== undefined
                                ? item[column]
                                : "-"}
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
            padding="12px"
          >
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
                fontWeight="600"
              >
                Select All
              </Checkbox>
            </Box>
            <Box
              height="60vh"
              overflowY="scroll"
              overflowX="hidden"
              display="flex"
              flexWrap="wrap"
              gap="8px"
              sx={{
                "& .columnCheckBox:nth-of-type(odd)": {
                  bg: "borderGrayLight",
                },
              }}
            >
              {(getColumns(data) || [])
                .concat(
                  columnData
                    ? Object.keys(columnData?.content[0] || {}).map((key) => ({
                        field: key,
                        header: key,
                      }))
                    : []
                )
                .map((column, index) => {
                  const formattedHeader = formatHeader(
                    column.field || column.header
                  );
                  return (
                    <Box
                      key={column.field || index}
                      className="columnCheckBox"
                      padding="5px"
                      bg="rgba(231,231,231,1)"
                      borderRadius="5px"
                      width="48%"
                    >
                      <Checkbox
                        size="lg"
                        display="flex"
                        padding="5px"
                        borderColor="mainBluemedium"
                        defaultChecked={selectedColumns.includes(column.field)}
                        isChecked={selectedColumns.includes(column.field)}
                        onChange={() => toggleColumn(column.field)}
                      >
                        <Text
                          fontWeight="500"
                          ml="10px"
                          fontSize="12px"
                          color="textBlackDeep"
                        >
                          {formattedHeader}
                        </Text>
                      </Checkbox>
                    </Box>
                  );
                })}

              {/* {getColumns(data).map((column) => {
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
                      onChange={() => toggleColumn(column.field)}
                    >
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
              })} */}
              {/* imran59059 */}
              {/* { columnData &&
                Object.keys(columnData?.content[0]).map((key, indx) => {
                  return <Box
                    key={indx}
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
                      key={key}
                      defaultChecked={key}
                      isChecked={key}
                      onChange={() => toggleColumn(key)}
                    >
                      <Text
                        fontWeight="500"
                        ml="10px"
                        fontSize="12px"
                        color="textBlackDeep">
                        {key}
                      </Text>
                    </Checkbox>
                  </Box>
                })
              } */}
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
              onClick={handleModalClose}
            >
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
              onClick={handleApplyChanges}
            >
              Apply Changes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CustomTable;
