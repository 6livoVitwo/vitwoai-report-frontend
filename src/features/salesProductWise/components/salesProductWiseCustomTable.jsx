import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Box, Button, useDisclosure, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Checkbox, Input, Text, Select, useToast, Menu, MenuButton, MenuList, MenuItem, Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverCloseButton, PopoverArrow, PopoverHeader, Tooltip, Spinner } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import debounce from "lodash/debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faChartLine, faArrowDownShortWide, faArrowUpWideShort, faArrowRightArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { saveAs } from "file-saver";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { DownloadIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { useGetSelectedColumnsproductQuery } from "../slice/salesProductWiseApi";
import { useProductWiseSalesQuery } from "../slice/salesProductWiseApi";
import { useGetGlobalsearchProductQuery } from "../slice/salesProductWiseApi";
import MainBodyDrawer from "../../nivoGraphs/drawer/MainBodyDrawer";
import { handleGraphWise } from "../../nivoGraphs/chartConfigurations/graphSlice";
import { useDispatch } from "react-redux";
import { useGetexportdataSalesProductQuery } from "../slice/salesProductWiseApi"

const CustomTable = ({ setPage, newArray, alignment, filters, setFilters }) => {
  const [data, setData] = useState([...newArray]);
  const [loading, setLoading] = useState(false);
  const [defaultColumns, setDefaultColumns] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [columnFilters, setColumnFilters] = useState({});
  const [lastPage, setLastPage] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [initialized, setInitialized] = useState(false);

  const dispatch = useDispatch();

  const [tempFilterCondition, setTempFilterCondition] = useState("");
  const [tempFilterValue, setTempFilterValue] = useState("");
  const [columns, setColumns] = useState([]);
  const [sortColumn, setSortColumn] = useState("invoice_date");
  const [sortOrder, setSortOrder] = useState("asc");
  const [activeFilterColumn, setActiveFilterColumn] = useState(null);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [localFilters, setLocalFilters] = useState({ ...filters });
  const [tempSelectedColumns, setTempSelectedColumns] = useState([]);
  const [dates, setDates] = useState(null);
  const [triggerFilter, setTriggerFilter] = useState(false);
  const [triggerSort, setTriggerSort] = useState(false);
  const [localFiltersdate, setLocalFiltersdate] = useState(null);
  const [triggerApiCall, setTriggerApiCall] = useState(false);
  const [selectdate, setSelectdate] = useState([]);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const handlePopoverClick = (column) => {
    setActiveFilterColumn(column);
  };

  //......Advanced Filtering....
  const { data: productDataFilter, refetch: refetchsalesproductdata } = useProductWiseSalesQuery(
    { filters: localFilters },
    {
      skip: !triggerFilter,
    }
  );

  // ...Export API CALL...
  const { data: exportData } = useGetexportdataSalesProductQuery(
    localFiltersdate || {}, { skip: !triggerApiCall });

  //api call for drop-down-data columns....
  const { data: columnData, refetch: refetchColumnData } =
    useGetSelectedColumnsproductQuery();

  //.........Api call to get global search.......
  const { data: searchData } = useGetGlobalsearchProductQuery(filters, {
    skip: !searchQuery,
  });

  const toast = useToast();
  const tableContainerRef = useRef(null);
  const {
    onClose: onCloseFilterModal,
    isOpen: isOpenFilterModal,
  } = useDisclosure();
  const {
    onOpen: onOpenDownloadReportModal,
    onClose: onCloseDownloadReportModal,
    isOpen: isOpenDownloadReportModal,
  } = useDisclosure();

  const {
    onOpen: onOpenGraphAddDrawer,
    onClose: onCloseGraphAddDrawer,
    isOpen: isOpenGraphAddDrawer,
  } = useDisclosure();

  const getColumnStyle = (header) => ({
    textAlign: alignment[header] || "left",
  });

  const navigate = useNavigate();

  const reportOptions = [
    {
      label: "Product Wise",
      value: "/reports/sales-product-wise/table-view",
    },
    {
      label: "Customer Wise",
      value: "/reports/sales-customer-wise/table-view",
    },
    {
      label: "Vertical Wise",
      value: "/reports/sales-vertical-wise/table-view",
    },
    {
      label: "So Wise",
      value: "/reports/sales-so-wise/table-view",
    },
    {
      label: "Kam wise",
      value: "/reports/sales-kam-Wise/table-view",
    },
    {
      label: "Region Wise",
      value: "/reports/sales-region-wise/table-view",
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
      await new Promise((resolve) => setTimeout(resolve, 2000));
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
    if (!initialized && data.length > 0) {
      const initialColumns = getColumns(data)
        .slice(0, 8)
        .map((column) => column.field);
      setDefaultColumns(initialColumns);
      setSelectedColumns(initialColumns);
      setTempSelectedColumns(initialColumns);
      setInitialized(true);
    }
  }, [data, initialized]);

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

  // Fetching columns data from API
  useEffect(() => {
    if (columns.length) {
      setSelectedColumns(columns.map((col) => col.field));
    }
  }, [columns]);

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
  }
  const toggleColumn = (field) => {
    if (field === "SL No") return;
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

    // const uniqueColumns = Array.from(new Set(allColumns.map((col) => col.listName)));
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
    ).filter((col) => col !== "SL No");

    clearPriviewColumnData();
    setFilters((prevFilters) => ({
      ...prevFilters,
      data: updatedSelectedColumns,
    }));

    const storedColumns = JSON.parse(localStorage.getItem("selectedColumns")) || [];

    const columnsChanged = JSON.stringify(updatedSelectedColumns) !== JSON.stringify(storedColumns);

    if (!columnsChanged) {
      toast({
        title: "No changes to apply",
        status: "info",
        isClosable: true,
      });
      return;
    }
    setSelectedColumns(updatedSelectedColumns);
    refetchColumnData({ columns: updatedSelectedColumns });
    onClose();
    // localStorage.setItem("selectedColumns", JSON.stringify(updatedSelectedColumns));
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
  const handleSearchClick = () => {
    const filteredColumns = selectedColumns.filter(column => !column.includes('SUM'));
    const updatedFilters = {
      ...filters,
      filter: [
        ...filters.filter,
        ...filteredColumns.map(column => ({
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

  const clearAllFilters = () => {
    setSearchQuery("");
    setInputValue("");
    setColumnFilters({});
    setTempFilterCondition(null);
    setTempFilterValue("");
    setActiveFilterColumn(null);
    window.location.reload();
  };

  // Clear single filter active column.... 
  const clearsingleFilter = (column) => {
    console.log('Clearing filter for column:', column);
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
    refetchsalesproductdata();
  };

  // function date expoet Calling for date filter
  const handleFilter = () => {
    if (!dates || dates.length === 0) {
      alert("Please select dates before applying the filter!");
      return;
    }
    handleDateSelection(dates);
  };
  useEffect(() => {
    if (selectdate && selectdate.length > 0) {
      const [startDate, endDate] = selectdate;
      const oneYearInMillis = 365 * 24 * 60 * 60 * 1000;
      if (new Date(endDate) - new Date(startDate) > oneYearInMillis) {
        toast({
          title: "No More Data",
          description: "You have reached the end of the list.",
          status: "warning",
          isClosable: true,
          duration: 4000,
          render: () => (
            <Box
              p={3}
              bg="orange.300"
              borderRadius="md"
              style={{ width: "300px", height: "80px" }}
            >
              <Box fontWeight="bold">Please choose a valid range</Box>
              <Box>Selected date range exceeds one year. Please choose a valid range.</Box>
            </Box>
          ),
        });
        return;
      }
      setLocalFiltersdate({
        data: selectedColumns,
        groupBy: ["items.itemName"],
        filter: [
          {
            column: "invoice_date",
            operator: "between",
            type: "date",
            value: selectdate,
          },
        ],
        timestamp: new Date().getTime(),
      });
      setTriggerApiCall(true);

    }
  }, [selectdate]);

  const formattedDates = (dates) => {
    return dates.map((date) => {
      if (date) {
        const adjustedDate =
          new Date(date);
        adjustedDate.setMinutes(
          adjustedDate.getMinutes() -
          adjustedDate.getTimezoneOffset()
        );
        const value = adjustedDate
          .toISOString()
          .split("T")[0];
        return value;
      }
      return null;
    });
  }
  const handleDateSelection = (dates) => {
    const formatDate = formattedDates(dates);
    setSelectdate(formatDate);
  };

  //hide the calendar
  const handleDateChange = (e) => {
    setDates(e.value);
    if (e.value[0] && e.value[1]) {
      setCalendarVisible((prevKey) => prevKey + 1);
    }
  };


  // Sorting logic
  const handleSort = (column) => {
    const newSortOrder =
      sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newSortOrder);
    setTriggerSort(true);
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
    else if (productDataFilter?.content && productDataFilter?.content.length > 0) {
      filteredData = productDataFilter.content;
    }
    return filteredData;
  }, [
    newArray,
    searchQuery,
    columnFilters,
    sortColumn,
    sortOrder,
    selectedColumns,
    searchData,
    productDataFilter
  ]);

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

  //scroll logic
  let previousScrollLeft = 0;
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight, scrollLeft } =
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
      const debouncedHandleScroll = debounce(handleScroll, 200);
      container.addEventListener("scroll", debouncedHandleScroll);
      return () => container.removeEventListener("scroll", debouncedHandleScroll);
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
      setTempFilterValue(value);
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
      setFiltersApplied(true);
    } else {
      console.error("Filter condition or value missing");
    }
  };
  const handleApplyFilters = () => {
    if (tempFilterCondition && tempFilterValue && activeFilterColumn) {
      const filterValue = tempFilterCondition === "between" ? tempFilterValue : tempFilterValue;
      const newFilter = {
        column: activeFilterColumn,
        operator: tempFilterCondition,
        type: tempFilterCondition === "between" ? "date" : (typeof tempFilterValue === "number" ? "integer" : "string"),
        value: filterValue,
      };
      const updatedFilters = {
        ...localFilters,
        filter: [...localFilters.filter, newFilter],
      };
      setColumnFilters((prevFilters) => ({
        ...prevFilters,
        [activeFilterColumn]: {
          condition: tempFilterCondition,
          value: filterValue,
          column: activeFilterColumn,
          type: tempFilterCondition === "between" ? "date" : (typeof tempFilterValue === "number" ? "integer" : "string"),
        },
      }));
      setLocalFilters(updatedFilters);
      setFiltersApplied(true);
      setTempFilterCondition(null);
      setTempFilterValue("");
      setActiveFilterColumn(null);
      // refetchsalesproductdata();
    } else {
      console.error("Filter condition, value, or column is missing");
    }
  };
  const handleClick = () => {
    if (activeFilterColumn) {
      const columnType = activeFilterColumn;
      columnType.includes("SUM(")
        ? handleApplyFiltersSUM()
        : handleApplyFilters();
    }
    setTriggerFilter(true);
  };

  useEffect(() => {
    if (exportData) {
      exportToExcelDaterange(exportData);
    }
  }, [exportData])

  const exportToExcelDaterange = (data) => {
    import("xlsx").then((xlsx) => {
      const formattedData = data?.content?.map((item) => {
        const formattedItem = {};
        for (const key in item) {
          formattedItem[formatHeader(key)] = item[key];
        }
        return formattedItem;
      })
      const worksheet = xlsx.utils.json_to_sheet(formattedData);
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
  const exportToExcel = () => {
    import("xlsx").then((xlsx) => {
      const formattedData = filteredItems.map((item) => {
        const formattedItem = {};
        for (const key in item) {
          formattedItem[formatHeader(key)] = item[key];
        }
        return formattedItem;
      })
      const worksheet = xlsx.utils.json_to_sheet(formattedData);
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

  const handleGraphViewDrawer = () => {
    onOpenGraphAddDrawer();
    dispatch(handleGraphWise({ selectedWise: "sales-product-wise", reportType: 'sales' }));
  }

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
              background: "#dedede",
            }}
          />
          <Popover>
            {/* <PopoverTrigger>
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
            </PopoverTrigger> */}
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
              onClick={handleGraphViewDrawer}
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
              bg="transparent"
              border="1px solid gray"
              color="mainBlue"
              height="40px"
              width="40px"
              borderRadius="30px"
              _hover={{
                bg: "mainBlue",
                color: "white",
              }}
            >
              <FontAwesomeIcon icon={faGear} fontSize="20px" />
            </Button>
          </Tooltip>
          <Menu>
            <Tooltip label="Export" hasArrow>
              <MenuButton
                color="mainBlue"
                border="1px solid gray"
                padding="5px"
                height="40px"
                width="40px"
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
                          key={calendarVisible}
                          value={dates}
                          placeholder="Select date"
                          style={{
                            width: "50%",
                            height: "35px",
                            borderRadius: "5px",
                          }}
                          onChange={handleDateChange}
                          selectionMode="range"
                          readOnlyInput
                          hideOnRangeSelection
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
                      onClick={() => {
                        onCloseDownloadReportModal();
                        setDates()
                      }}
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
                      onClick={() => {
                        handleFilter();
                        onCloseDownloadReportModal();
                        setDates();
                      }}
                    >
                      Export
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
            <ModalContent minW="40%">
              <ModalHeader
                fontWeight="600"
                bg="mainBlue"
                color="white"
                fontSize="16px"
                padding="12px"
              >
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
                          mb="3px"
                        >
                          {formattedHeader}
                        </Text>
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
                  onClick={onCloseFilterModal}
                >
                  Reset
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
        </Box>
      </Box>
      <TableContainer
        ref={tableContainerRef}
        className="table-tableContainerRef"
        overflowY="auto"
        height="calc(100vh - 179px)"
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
                <Thead style={{ position: "sticky", top: 0 }}>
                  <Tr bg="#cfd8e1">
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
                            {/* A-Z Filter  */}
                            {formatHeader(column)}
                            {column !== "SL No" && !column.toLowerCase().includes("sum") && (
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
                                onClose={() => setActiveFilterColumn(null)}
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
                                          color: "slateblue",
                                          fontSize: "1.4rem",
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
                                          color: "slateblue",
                                          fontSize: "1.4rem",
                                        }}
                                      ></i>
                                    </Button>
                                  )}
                                </PopoverTrigger>
                                {activeFilterColumn === column && (
                                  <PopoverContent w="120%">
                                    <PopoverArrow />
                                    <PopoverCloseButton size="lg"
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
                                          <Box display="flex" flexDirection="column" gap="10px">
                                            <Select
                                              placeholder="Select condition"
                                              size="sm"
                                              fontSize="12px"
                                              h="35px"
                                              onChange={handleTempFilterConditionChange}
                                            >
                                              <option value="equal">Equal</option>
                                              <option value="notEqual">Not Equal</option>
                                              <option value="like">Like</option>
                                              <option value="notLike">Not Like</option>
                                              <option value="greaterThan">Greater Than</option>
                                              <option value="greaterThanOrEqual">Greater Than or Equal</option>
                                              <option value="lessThan">Less Than</option>
                                              <option value="lessThanOrEqual">Less Than or Equal</option>
                                              <option value="between">Between</option>
                                            </Select>

                                            {tempFilterCondition === "between" ? (
                                              <Box display="flex" gap="10px" flexDirection="column">
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
                                                    const formattedDates = e.value.map((date) => {
                                                      if (date) {
                                                        const adjustedDate = new Date(date);
                                                        adjustedDate.setMinutes(adjustedDate.getMinutes() - adjustedDate.getTimezoneOffset());
                                                        return adjustedDate.toISOString().split("T")[0];
                                                      }
                                                      return null;
                                                    });
                                                    setDates(e.value);
                                                    setTempFilterValue(formattedDates);
                                                    if (e.value[0] && e.value[1]) {
                                                      setCalendarVisible(false);
                                                    }
                                                  }}
                                                  selectionMode="range"
                                                  readOnlyInput
                                                  hideOnRangeSelection
                                                  visible={calendarVisible}
                                                  onVisibleChange={(e) => setCalendarVisible(e.visible)}
                                                />
                                              </Box>
                                            ) : (
                                              <Input
                                                h="35px"
                                                fontSize="12px"
                                                padding="6px"
                                                onChange={handleTempFilterValueChange}
                                                placeholder="Search by value"
                                                value={tempFilterValue}
                                                type={tempFilterCondition === "like" ? "string" : "integer"}
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
                              justifyItems="center"
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
                              {item[column] !== undefined ? item[column] : "-"}
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
                  {loading && (
                    <Tr>
                      <Td colSpan={selectedColumns.length} textAlign="center">
                        <Spinner size="lg" color="blue.500" />
                        <Text mt={2} fontSize="1.2rem" color="#4e4e4e">
                          Loading more data...
                        </Text>
                      </Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            )}
          </Droppable>
        </DragDropContext>
      </TableContainer>

      {/* Main body drawer */}
      <MainBodyDrawer
        isOpenGraphAddDrawer={isOpenGraphAddDrawer}
        onCloseGraphAddDrawer={onCloseGraphAddDrawer}
      />

      <Modal isOpen={isOpen} onClose={handleModalClose} size="xl" isCentered>
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
              gap="5px"
              sx={{
                "& .columnCheckBox:nth-of-type(odd)": {
                  bg: "borderGrayLight",
                },
              }}
            >
              {columnData?.content && columnData.content.length > 0
                ? Object.keys(columnData.content[0]).map((key) => ({
                  field: key,
                  header: key,
                }))
                  .map((column) => {
                    const formattedHeader = formatHeader(column.field || column.header);
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
                          defaultChecked={tempSelectedColumns.includes(
                            column.field
                          )}
                          isChecked={tempSelectedColumns.includes(column.field)}
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

      <Box></Box>
    </Box>
  );
};

export default CustomTable;
