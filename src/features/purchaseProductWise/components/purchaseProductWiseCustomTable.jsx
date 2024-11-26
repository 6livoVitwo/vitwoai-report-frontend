import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Box, Button, useDisclosure, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Checkbox, Input, Text, Select, useToast, Menu, MenuButton, MenuList, MenuItem, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverArrow, PopoverCloseButton, Tooltip, Heading } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import debounce from "lodash/debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Calendar } from "primereact/calendar";
import styled from "@emotion/styled";
import { faChartLine, faArrowDownShortWide, faArrowUpWideShort, faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { saveAs } from "file-saver";
import { faFileExcel, faGear, faDownload } from "@fortawesome/free-solid-svg-icons";
import { DownloadIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { Dropdown } from "primereact/dropdown";
import { useDispatch } from "react-redux";
import { handleGraphWise } from "../../nivoGraphs/chartConfigurations/graphSlice";
import { useGetSelectedColumnsPurchaseQuery } from "../slice/purchaseProductWiseApi";
import { useProductWisePurchaseQuery } from "../slice/purchaseProductWiseApi";
import { useGetGlobalsearchPurchaseQuery } from "../slice/purchaseProductWiseApi";
import MainBodyDrawer from "../../nivoGraphs/drawer/MainBodyDrawer";

const CssWrapper = styled.div`
  .p-component {
    font-size: 1.2rem;
  }

  .p-dropdown .p-dropdown-label.p-placeholder {
    color: #00000061;
    font-size: 1.2rem;
    font-weight: normal;
    font-family: "Poppins", sans-serif;
  }

  .action-tooltip .chakra-tooltip {
    border-radius: 5px;
    font-size: 1rem;
    padding: 2px 8px;
  }

`;
const CustomTable = ({ setPage, newArray, alignment, filters, setFilters }) => {
  const sortButtonRef = useRef(null);
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
  const [tempFilterCondition, setTempFilterCondition] = useState("");
  const [tempFilterValue, setTempFilterValue] = useState("");
  const [tempSelectedColumns, setTempSelectedColumns] = useState([]);
  const [columns, setColumns] = useState([]);
  const [sortColumn, setSortColumn] = useState("items.goodName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [activeFilterColumn, setActiveFilterColumn] = useState(null);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [localFilters, setLocalFilters] = useState({ ...filters });
  const [dates, setDates] = useState(null);
  const dispatch = useDispatch();
  const [isBodyScaled, setIsBodyScaled] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [triggerFilter, setTriggerFilter] = useState(false);
  const [triggerSort, setTriggerSort] = useState(false);
  const handlePopoverClick = (column) => {
    setActiveFilterColumn(column);
  };

  const rightAlignColumns = ["SUM(items.totalAmount)", "SUM(grnInvoice.grnTotalTds)", "SUM(grnInvoice.grnTotalSgst)", "SUM(grnInvoice.grnTotalIgst)", "SUM(grnInvoice.grnTotalCgst)", "SUM(items.unitPrice)", "items.goodsItems.stockSummary.movingWeightedPrice"];

  //...Advanced Filter API CALL...
  const { data: productDataFilter, refetch: refetchProductFilter } = useProductWisePurchaseQuery(
    { filters: localFilters },
    { skip: !triggerFilter }
  );

  //Api calling for selected columns drop down
  const { data: columnData, refetch: refetchColumnData } =
    useGetSelectedColumnsPurchaseQuery();

  // api calling from global search
  const { data: searchData } = useGetGlobalsearchPurchaseQuery(
    filters,
    {
      skip: !searchQuery,
    }
  );

  const toast = useToast();

  const tableContainerRef = useRef(null);

  const { onOpen: onOpenDownloadReportModal, onClose: onCloseDownloadReportModal, isOpen: isOpenDownloadReportModal } = useDisclosure();
  const { onOpen: onOpenGraphAddDrawer, onClose: onCloseGraphAddDrawer, isOpen: isOpenGraphAddDrawer } = useDisclosure();

  const getColumnStyle = (header) => ({
    textAlign: alignment[header] || "left",
  });

  const navigate = useNavigate();

  const reportOptions = [
    {
      label: "Product Wise",
      value: "/reports/purchase-product-wise/table-view",
    },
    {
      label: "Vendor Wise",
      value: "/reports/purchase-vendor-wise/table-view",
    },
    {
      label: "PO Wise",
      value: "/reports/purchase-po-wise/table-view",
    },
  ];

  // Fetching columns data from API
  useEffect(() => {
    if (columns.length) {
      setSelectedColumns(columns.map((col) => col.field));
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

  //sort asc desc
  const handleSort = (column) => {
    const newSortOrder =
      sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newSortOrder);
    setTriggerSort(true);
  };
  const loadMoreData = async () => {
    if (!loading) {
      setLoading(true);
      const moreData = [...newArray];
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
  const clearPriviewColumnData = () => {
    setPage(0);
  };

  // Handle column selection
  const toggleColumn = (field) => {
    setTempSelectedColumns((prev) =>
      prev.includes(field)
        ? prev.filter((col) => col !== field)
        : [...prev, field]
    );
  };
  const handleSelectAllToggle = () => {
    const allColumns = columnData
      ? Object.keys(columnData?.content[0] || {}).map((key) => ({
        field: key,
        listName: columnData.content[0][key]?.listName || key,
      }))
      : [];
    const uniqueColumns = allColumns.map((col) => col.field);
    if (selectAll) {
      setTempSelectedColumns([]);
    } else {
      setTempSelectedColumns(uniqueColumns);
    }
    setSelectAll(!selectAll);
  };

  const handleModalClose = () => {
    setTempSelectedColumns(selectedColumns);
    onClose();
  };
  const handleApplyChanges = () => {
    const updatedSelectedColumns = Array.from(
      new Set(
        tempSelectedColumns.map((col) => {
          const matchingColumn = columnData?.content[0][col];
          return matchingColumn ? matchingColumn.listName || col : col;
        })
      )
    );
    clearPriviewColumnData();
    setFilters((prevFilters) => ({
      ...prevFilters,
      data: updatedSelectedColumns,
    }));
    setSelectedColumns(updatedSelectedColumns);
    refetchColumnData({ columns: updatedSelectedColumns });
    onClose();
    toast({
      title: "Columns Applied Successfully",
      status: "success",
      isClosable: true,
    });
  };
  useEffect(() => {
    if (isOpen) {
      const filteredColumns = columnData?.content[0]
        ? Object.keys(columnData.content[0]).filter((key) =>
          selectedColumns.includes(columnData.content[0][key]?.listName)
        )
        : [];
      setTempSelectedColumns(filteredColumns);
    }
  }, [isOpen, selectedColumns, columnData]);

  const debouncedSearchQuery = useMemo(() => debounce(setSearchQuery, 300), []);
  useEffect(() => {
    return () => {
      debouncedSearchQuery.cancel();
    };
  }, [debouncedSearchQuery]);

  const handleSearchChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };
  const handleSearchClick = () => {
    const filteredColumns = selectedColumns.filter(
      (column) => !column.includes("SUM")
    );
    const updatedFilters = {
      ...filters,
      filter: [
        ...filters.filter,
        ...filteredColumns.map((column) => ({
          column: column,
          operator: "like",
          type: "string",
          value: inputValue,
        })),
      ],
    };
    setFilters(updatedFilters);
    setSearchQuery(inputValue);
  };
  const FiltersTrigger = () => {
    setSortColumn("");
  };

  const clearAllFiltersbutton = () => {
    setSearchQuery("");
    setInputValue("");
    setColumnFilters({});
    window.location.reload();
  };

  // Clear single filter active column....
  const clearsingleFilter = (column) => {
    setLocalFilters((prevFilters) => {
      const updatedFilters = {
        ...prevFilters,
        filter: prevFilters.filter.filter((filter) => filter.column !== column),
      };
      if (updatedFilters.filter.length === 0) {
        window.location.reload();
      }
      return updatedFilters;
    });
    setColumnFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
      delete newFilters[column];
      return newFilters;
    });
    setTempFilterCondition(null);
    setTempFilterValue("");
    setActiveFilterColumn(null);
    refetchProductFilter();
  };

  const filteredItems = useMemo(() => {
    let filteredData = [...newArray];
    // Global search
    if (searchData?.content && searchData?.content.length > 0) {
      filteredData = searchData.content;
    }
    // Sorting
    else if (sortColumn) {
      filteredData = [...filteredData].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }
    // Advanced filters
    else if (
      productDataFilter?.content &&
      productDataFilter?.content.length > 0
    ) {
      filteredData = productDataFilter.content;
    }
    setTableData(filteredData);
  }, [newArray, searchData, sortColumn, sortOrder, productDataFilter]);

  const formatHeader = (column) => {
    if (columnData && columnData.content) {
      const apiContent = columnData.content[0];
      for (const key in apiContent) {
        if (apiContent[key].listName === column) {
          return key;
        }
      }
    }
    return column;
  };

  // ...Handle scroll...
  let previousScrollLeft = 0;
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight, scrollLeft, clientWidth } =
      tableContainerRef.current;
    if (scrollLeft !== previousScrollLeft) {
      previousScrollLeft = scrollLeft;
      return;
    }
    if (scrollTop + clientHeight >= scrollHeight - 5 && !loading) {
      loadMoreData();
    }
  };
  useEffect(() => {
    const container = tableContainerRef.current;
    if (container) {
      const debouncedHandleScroll = debounce(handleScroll, 5);
      container.addEventListener("scroll", debouncedHandleScroll);
      return () =>
        container.removeEventListener("scroll", debouncedHandleScroll);
    }
  }, [loading, lastPage]);

  //function for filter
  const handleTempFilterConditionChange = (e) => {
    const value = e?.target?.value;
    if (value !== undefined) {
      setTempFilterCondition(value);
    } else {
      console.error("Temp filter condition is undefined.");
    }
  };
  const handleTempFilterValueChange = (e) => {
    const value = e?.target?.value;
    if (value !== undefined) {
      if (tempFilterCondition === "between") {
        setTempFilterValue([dates[0], dates[1]]);
      } else {
        setTempFilterValue(value);
      }
    } else {
      console.error("Temp filter value is undefined.");
    }
  };

  const handleApplyFiltersSUM = () => {
    if (tempFilterCondition && tempFilterValue) {
      setColumnFilters((prevFilters) => ({
        ...prevFilters,
        [activeFilterColumn]: {
          condition: tempFilterCondition,
          value: tempFilterValue,
          column: activeFilterColumn,
          type: typeof tempFilterValue === "number" ? "integer" : "string",
        },
      }));
      setTempFilterCondition(null);
      setTempFilterValue("");
      setActiveFilterColumn(null);
      // This will trigger the query
      setFiltersApplied(true);
    } else {
      console.error("Filter condition or value missing");
    }
  };

  const handleApplyFilters = () => {
    if (tempFilterCondition && tempFilterValue && activeFilterColumn) {
      // For the "between" operator, the value must be an array
      const filterValue =
        tempFilterCondition === "between" ? tempFilterValue : tempFilterValue;

      // Create a new filter object
      const newFilter = {
        column: activeFilterColumn,
        operator: tempFilterCondition,
        type:
          tempFilterCondition === "between"
            ? "date"
            : typeof tempFilterValue === "number"
              ? "integer"
              : "string",
        value: filterValue,
      };

      // Update localFilters state
      const updatedFilters = {
        ...localFilters,
        filter: [...localFilters.filter, newFilter],
      };

      // Update column filters for the UI display
      setColumnFilters((prevFilters) => ({
        ...prevFilters,
        [activeFilterColumn]: {
          condition: tempFilterCondition,
          value: filterValue,
          column: activeFilterColumn,
          type:
            tempFilterCondition === "between"
              ? "date"
              : typeof tempFilterValue === "number"
                ? "integer"
                : "string",
        },
      }));

      // Update local filters state
      setLocalFilters(updatedFilters);
      setFiltersApplied(true);

      // Clear temporary values
      setTempFilterCondition(null);
      setTempFilterValue("");
      setActiveFilterColumn(null);
    } else {
      console.error("Filter condition, value, or column is missing");
    }
  };

  const handleClick = useCallback(() => {
    if (activeFilterColumn) {
      const columnType = activeFilterColumn;
      if (columnType.includes("SUM(")) {
        handleApplyFiltersSUM();
        return;
      }
      handleApplyFilters();
    }
    setTriggerFilter(true);
  }, [activeFilterColumn, handleApplyFiltersSUM, handleApplyFilters]);

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

  const handleGraphAddDrawer = () => {
    setIsBodyScaled(true);
    onOpenGraphAddDrawer();
    dispatch(
      handleGraphWise({
        selectedWise: "purchase-product-wise",
        reportType: "purchase",
      })
    );
  };

  return (
    <Box bg="white">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        gap="10px"
        padding="10px 20px"
        marginBottom="10px"
        position="relative"
        zIndex="999"
        sx={{
          "& input:placeholder": {
            color: "white",
          },
        }}
      >
        <Box>
          <Heading
            as="h1"
            fontSize="2rem"
            fontWeight="600"
            color="mainBlue"
            textTransform="capitalize"
          >
            Purchase Product Table View
          </Heading>
        </Box>
        <Box
          display="flex"
          justifyContent="flex-end"
          gap="10px"
          alignItems="center"
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
          <Box display="flex" alignItems="center" w="175px" position="relative">
            <Input
              onChange={handleSearchChange}
              value={inputValue}
              onKeyDown={handleKeyDown}
              width="100%"
              bg="#fff"
              padding="15px"
              h="31px"
              borderRadius="5px"
              borderColor="#00000061"
              placeholder="Search Global Data"
              pr="40px"
              zIndex="1"
              fontSize="1.2rem"
              color="#000"
              sx={{
                "&::placeholder": {
                  color: "#00000061",
                },
                "&:hover": {
                  borderColor: "#00000061",
                },
                "&:focus": {
                  outline: "none",
                  borderColor: "#00000061",
                  boxShadow: "none",
                  e: "none",
                  boxShadow: "none",
                },
              }}
            />
            <button
              onClick={handleSearchClick}
              style={{
                position: "absolute",
                right: "10px",
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
                style={{ fontSize: "1.7rem", opacity: "0.5" }}
              >
              </i>
            </button>
          </Box>
          <CssWrapper>
            <Dropdown className="custom-dropdown"
              value={selectedReport}
              options={reportOptions}
              onChange={(e) => {
                handleReportChange(e);
              }}
              optionLabel="label"
              placeholder="Search Sales Type"
              panelStyle={{ margin: "0", padding: "0.75rem 1.25rem" }}
              style={{
                width: "175px",
                border: "1px solid #00000061 ",
                display: "flex",
                alignItems: "center",
                height: "32px",
                borderColor: "#dedede",
              }}
              sx={{
                "& .p-dropdown-label": {
                  color: "blue",
                  fontSize: "1.2rem",
                },
                "&:focus": {
                  outline: "none",
                  borderColor: "#cccccc61",
                  boxShadow: "none",
                },
                "& .p-dropdown-trigger": {
                  color: "#00000061",
                },
                "& .p-dropdown .p-dropdown-label.p-placeholder": {
                  color: "red",
                },
              }}
            />
          </CssWrapper>
          <Popover>
            <PopoverContent>
              {/* <PopoverArrow /> */}
              <PopoverCloseButton />
              <PopoverHeader display="flex" justifyContent="center">
                Select Groups
              </PopoverHeader>
              <PopoverBody>
                <Box display="flex" justifyContent="space-around">
                  <Button
                    rounded="9px"
                    border="1px solid gray"
                    w="100px"
                    m="2px"
                    h="40px"
                  >
                    <p style={{ fontSize: "10px" }}>
                      Good <br /> Groups
                    </p>
                  </Button>
                  <Button
                    rounded="9px"
                    border="1px solid gray"
                    w="100px"
                    m="2px"
                    h="40px"
                  >
                    <p style={{ fontSize: "10px" }}>
                      Good <br /> Items
                    </p>
                  </Button>
                </Box>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Tooltip
            className="action-tooltip"
            label="Clear All"
            hasArrow
            bg="gray.400"
            color="white"
            fontSize="1.2rem"
            p="5px 10px"
            borderRadius="7px"
          >
            <Button
              onClick={clearAllFiltersbutton}
              borderRadius="5px"
              w="30px"
              h="30px"
              // bg="#d6eaf8"
              bg="#0d3a6833"
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

          {/* Graph view  */}
          <Tooltip
            className="action-tooltip"
            label="Graph View"
            hasArrow
            bg="gray.400"
            color="white"
            fontSize="1.2rem"
            p="5px 10px"
            borderRadius="7px"
          >
            <Button
              onClick={handleGraphAddDrawer}
              aria-label="Graph View"
              borderRadius="5px"
              width="30px"
              height="30px"
              bg="#0d3a6833"
              // border="1px solid gray"
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
              <FontAwesomeIcon icon={faChartLine} fontSize="1.8rem" />
            </Button>
          </Tooltip>

          <Tooltip
            className="action-tooltip"
            label="Select Columns to Show"
            hasArrow
            bg="gray.400"
            color="white"
            fontSize="1.2rem"
            p="5px 10px"
            borderRadius="7px"
          >
            <Button
              onClick={onOpen}
              fontSize="0.9rem"
              height="30px"
              color="mainBlue"
              width="30px"
              borderRadius="5px"
              bg="#0d3a6833"
              // border="1px solid gray"
              _hover={{
                bg: "mainBlue",
                color: "white",
              }}
            >
              {/* <FontAwesomeIcon icon={faChartSimple} fontSize="20px" /> */}
              <FontAwesomeIcon icon={faGear} fontSize="1.8rem" />
            </Button>
          </Tooltip>

          <Menu zIndex="1000">
            <Tooltip
              className="action-tooltip"
              label="Export"
              hasArrow
              bg="gray.400"
              color="white"
              fontSize="1.2rem"
              p="5px 10px"
              borderRadius="7px"
            >
              <MenuButton
                color="mainBlue"
                height="30px"
                width="30px"
                padding="5px"
                borderRadius="5px"
                // border="1px solid gray"
                bg="#0d3a6833"
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
                <DownloadIcon fontSize="1.8rem" />
              </MenuButton>
            </Tooltip>
            <MenuList padding="8px" borderRadius="7px" borderColor="#e4e4e499" boxShadow="rgba(0, 0, 0, 0.15) 0px 14px 34px -14px;" position="relative" zIndex="999">
              <MenuItem onClick={exportToExcel} fontSize="1.2rem" height="35px" padding="10px" borderRadius="7px">
                <Box minW="25px" margin="3px 7px" display="flex" alignItems="center" justifyContent="flex-start">
                  <FontAwesomeIcon icon={faFileExcel} fontSize="1.8rem" color="#003a73c9" />
                </Box>
                <Box as="span">Export Report</Box>
              </MenuItem>
              <MenuItem
                fontSize="1.2rem"
                height="35px"
                padding="10px" borderRadius="7px"
                onClick={onOpenDownloadReportModal}
              >
                <Box minW="25px" margin="3px 7px" display="flex" alignItems="center" justifyContent="flex-start">
                  <FontAwesomeIcon icon={faDownload} fontSize="1.8rem" color="#003a73c9" />
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
                    bg="mainBlue"
                    color="white"
                    fontSize="1.2rem"
                    padding="5px"
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

        </Box>
      </Box>


      <TableContainer
        ref={tableContainerRef}
        className={`table-tableContainerRef ${isOpenGraphAddDrawer ? 'table-tableContainerRef-scaled' : ''}`}
        overflowY="auto"
        margin="0 auto"
        height="calc(100vh - 130px)"
        width="calc(100vw - 100px)"
        border="1px solid #ebebeb"
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
                            padding="7px 15px"
                            fontSize="1.35rem"
                            fontWeight="500"
                            textTransform="capitalize"
                            fontFamily="Poppins, sans-serif"
                            color="black"
                            background="#cfd8e1a6"
                            letterSpacing="0"
                          >
                            {formatHeader(column)}

                            {/* A-Z Filter  */}
                            {column !== "SL No" &&
                              !column.toLowerCase().includes("sum") && (
                                <Button
                                  className="A_to_Z"
                                  bg="none"
                                  _hover={{ bg: "none" }}
                                  onClick={() => handleSort(column)}
                                  ref={sortButtonRef}
                                  position="relative"
                                  top="-2px"
                                  fontSize="1.2rem"
                                  color="#003060"
                                  marginLeft="10px"
                                >
                                  {sortColumn === column ? (
                                    sortOrder === "asc" ? (
                                      <FontAwesomeIcon
                                        icon={faArrowDownShortWide}
                                      />
                                    ) : (
                                      <FontAwesomeIcon
                                        icon={faArrowUpWideShort}
                                      />
                                    )
                                  ) : (
                                    <FontAwesomeIcon
                                      icon={faArrowRightArrowLeft}
                                      rotation={90}
                                      fontSize="13px"
                                    />
                                  )}
                                </Button>
                              )}
                            {column !== "SL No" && (
                              <Popover
                                isOpen={activeFilterColumn === column}
                                onClose={() => {
                                  setActiveFilterColumn(null);
                                }}
                                autoFocus={false}
                                closeOnBlur={false}
                              >
                                <PopoverTrigger>
                                  {columnFilters[column] ? (
                                    <Button
                                      bg="transparent"
                                      onClick={() => {
                                        clearsingleFilter(column);
                                      }}
                                    >
                                      <i
                                        className="pi pi-filter-slash"
                                        style={{
                                          color: "003060",
                                          fontSize: "1.3rem",
                                        }}
                                      ></i>
                                    </Button>
                                  ) : (
                                    <Button
                                      bg="transparent"
                                      onClick={() => handlePopoverClick(column)}
                                    >
                                      <i
                                        className="pi pi-filter"
                                        style={{
                                          color: "#003060",
                                          fontWeight: "bold",
                                          fontSize: "1.3rem",
                                          position: "relative",
                                          top: "-2px",
                                        }}
                                      ></i>
                                    </Button>
                                  )}
                                </PopoverTrigger>
                                {activeFilterColumn === column && (
                                  <PopoverContent w="120%">
                                    <PopoverArrow />
                                    <PopoverCloseButton
                                      size="lg"
                                      onClick={() => {
                                        setTempFilterCondition("");
                                        setTempFilterValue("");
                                        setDates([]);
                                      }}
                                    />
                                    <PopoverBody h="auto" maxH="300px">
                                      <Box>
                                        <Box key={column} mb="12px">
                                          <Text
                                            color="var(--chakra-colors-textBlack)"
                                            fontWeight="500"
                                            fontSize="14px"
                                            mt="10px"
                                            mb="5px"
                                          >
                                            {formatHeader(column)}
                                          </Text>
                                          <Box
                                            display="flex"
                                            flexDirection="column"
                                            gap="10px"
                                          >
                                            <Select
                                              placeholder="Select condition"
                                              size="sm"
                                              fontSize="12px"
                                              h="35px"
                                              onChange={
                                                handleTempFilterConditionChange
                                              }
                                            >
                                              <option value="equal">
                                                Equal
                                              </option>
                                              <option value="notEqual">
                                                Not Equal
                                              </option>
                                              <option value="like">Like</option>
                                              <option value="notLike">
                                                Not Like
                                              </option>
                                              <option value="greaterThan">
                                                Greater Than
                                              </option>
                                              <option value="greaterThanOrEqual">
                                                Greater Than or Equal
                                              </option>
                                              <option value="lessThan">
                                                Less Than
                                              </option>
                                              <option value="lessThanOrEqual">
                                                Less Than or Equal
                                              </option>
                                              <option value="between">
                                                Between
                                              </option>
                                            </Select>

                                            {tempFilterCondition ===
                                              "between" ? (
                                              <Box
                                                display="flex"
                                                gap="10px"
                                                flexDirection="column"
                                              >
                                                <Calendar
                                                  value={dates}
                                                  placeholder=" Select date"
                                                  style={{
                                                    width: "100%",
                                                    height: "35px",
                                                    border: "1px solid #dee2e6",
                                                    borderRadius: "5px",
                                                  }}
                                                  onChange={(e) => {
                                                    const formattedDates =
                                                      e.value.map((date) => {
                                                        if (date) {
                                                          const adjustedDate =
                                                            new Date(date);
                                                          adjustedDate.setMinutes(
                                                            adjustedDate.getMinutes() -
                                                            adjustedDate.getTimezoneOffset()
                                                          );
                                                          return adjustedDate
                                                            .toISOString()
                                                            .split("T")[0];
                                                        }
                                                        return null;
                                                      });
                                                    setDates(e.value);
                                                    setTempFilterValue(
                                                      formattedDates
                                                    );

                                                    if (
                                                      e.value[0] &&
                                                      e.value[1]
                                                    ) {
                                                      setCalendarVisible(false);
                                                    }
                                                  }}
                                                  selectionMode="range"
                                                  readOnlyInput
                                                  hideOnRangeSelection
                                                  visible={calendarVisible}
                                                  onVisibleChange={(e) =>
                                                    setCalendarVisible(
                                                      e.visible
                                                    )
                                                  }
                                                />
                                              </Box>
                                            ) : (
                                              <Input
                                                h="35px"
                                                fontSize="12px"
                                                padding="6px"
                                                onChange={
                                                  handleTempFilterValueChange
                                                }
                                                placeholder="Search by value"
                                                value={tempFilterValue}
                                                type={
                                                  tempFilterCondition === "like"
                                                    ? "string"
                                                    : "integer"
                                                }
                                              />
                                            )}
                                          </Box>
                                        </Box>
                                      </Box>
                                    </PopoverBody>
                                    <Box
                                      display="flex"
                                      justifyContent="flex-end"
                                      width="90%"
                                      ml="8px"
                                      mb="10px"
                                    >
                                      <Button
                                        bg="mainBlue"
                                        width="58px"
                                        color="white"
                                        mb="5px"
                                        outline="none"
                                        _hover={{
                                          color: "white",
                                          bg: "mainBlue",
                                        }}
                                        onClick={() => {
                                          handleClick();
                                          FiltersTrigger();
                                          setActiveFilterColumn(null);
                                        }}
                                      >
                                        Apply
                                      </Button>
                                    </Box>
                                  </PopoverContent>
                                )}
                              </Popover>
                            )}
                          </Th>
                        )}
                      </Draggable>
                    ))}
                  </Tr>
                </Thead>

                <Tbody>
                  {tableData.length > 0 ? (
                    tableData.map((item, index) => (
                      <Tr key={index}>
                        {selectedColumns.map((column, colIndex) => (
                          <Td
                            key={colIndex}
                            padding="12px 15px"
                            borderBottom="1px solid #e1e1e1"
                            borderTop="1px solid #e1e1e1"
                            style={getColumnStyle(column)}
                          >

                            <Text
                              fontSize="1.4rem"
                              fontWeight={column === "items.goodName" ? "600" : "400"}
                              color="#4e4e4e"
                              whiteSpace="nowrap"
                              width={
                                column === "description"
                                  ? "300px"
                                  : column === "items.goodName"
                                    ? "250px"
                                    : "auto"
                              }
                              overflow="hidden"
                              textOverflow="ellipsis"
                              title={column === "items.goodName" ? item[column] : undefined}
                              textAlign={rightAlignColumns.includes(column) ? "right" : "left"}
                            >
                              {item[column] || "-"}
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

      {/* Main drawer */}
      <MainBodyDrawer
        isOpenGraphAddDrawer={isOpenGraphAddDrawer}
        onCloseGraphAddDrawer={onCloseGraphAddDrawer}
      />

      <Modal isOpen={isOpen} onClose={handleModalClose} size="xl" isCentered className="{`column-selectScaled ${isOpenGraphAddDrawer ? 'column-selectScaled-scaled' : ''}`}">
        <ModalOverlay />
        <ModalContent minW="40%">
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
              {columnData?.content && columnData.content.length > 0
                ? Object.keys(columnData.content[0])
                  .map((key) => ({
                    field: key,
                    header: key,
                  }))
                  .map((column) => {
                    const formattedHeader = formatHeader(
                      column.field || column.header
                    );
                    return (
                      <Box
                        key={column.field}
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
                          isChecked={tempSelectedColumns.includes(
                            column.field
                          )}
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
                  })
                : null}
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
