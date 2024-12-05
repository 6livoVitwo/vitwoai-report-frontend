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
  Badge,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Alert,
  Tooltip,
  Divider,
  Spinner,
  Heading,

} from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import debounce from "lodash/debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
  faChartLine,
  faArrowUpWideShort,
  faArrowDownShortWide,
  faArrowRightArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { saveAs } from "file-saver";
import { useDispatch } from "react-redux";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { DownloadIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { chartsData } from "../../nivoGraphs/jsonData/graphSkeleton";
import DynamicChart from "../../nivoGraphs/chartConfigurations/DynamicChart";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { Dropdown } from "primereact/dropdown";
import { handleGraphWise } from "../../nivoGraphs/chartConfigurations/graphSlice";
import NewMyCharts from "../../dashboardNew/nivo/NewMyCharts";
import { FiPlus, FiSettings } from "react-icons/fi";
import ChartConfiguration from "../../nivoGraphs/chartConfigurations/ChartConfiguration";
import { Calendar } from "primereact/calendar";
import { useGetSelectedColumnsVerticalQuery } from "../slice/salesVerticalWiseApi";
import { useGetGlobalsearchVerticalQuery } from "../slice/salesVerticalWiseApi";
import { useVerticalWiseSalesQuery } from "../slice/salesVerticalWiseApi";
import { useGetexportdataSalesVerticalQuery } from "../slice/salesVerticalWiseApi"
import styled from "@emotion/styled";
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
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [configureChart, setConfigureChart] = useState({});
  const [tempSelectedColumns, setTempSelectedColumns] = useState([]);
  const {
    onOpen: onOpenGraphSettingDrawer,
    onClose: onCloseGraphSettingDrawer,
    isOpen: isOpenGraphSettingDrawer,
  } = useDisclosure();
  const dispatch = useDispatch();
  const salesCustomerWise = useSelector((state) => state.graphSlice.widgets);
  const [tempFilterCondition, setTempFilterCondition] = useState("");
  const [tempFilterValue, setTempFilterValue] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(0);
  const [activeFilterColumn, setActiveFilterColumn] = useState(null);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [localFilters, setLocalFilters] = useState({ ...filters });
  const [dates, setDates] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [triggerFilter, setTriggerFilter] = useState(false);
  const [triggerSort, setTriggerSort] = useState(false);
  const [initialized, setInitialized] = useState(false);
  const [localFiltersdate, setLocalFiltersdate] = useState(null);
  const [triggerApiCall, setTriggerApiCall] = useState(false);
  const [selectdate, setSelectdate] = useState([]);
  const [isDatesInvalid, setIsDatesInvalid] = useState(false);
  const isSumColumn = (column) => column.startsWith("SUM(");


  const btnRef = React.useRef();

  //......Advanced Filtering....
  const { data: advancedFilterVertical, refetch: refetchVerticalfilter } = useVerticalWiseSalesQuery(
    { filters: localFilters },
    { skip: !triggerFilter }
  );

  const handlePopoverClick = (column) => {
    setActiveFilterColumn(column);
  }

  // ...Export API CALL...
  const { data: exportData } = useGetexportdataSalesVerticalQuery(localFiltersdate || {}, { skip: !triggerApiCall },
    { setLoading: true }
  );

  //.........Api call drop down selected columns.......
  const { data: selectedColumnsData, refetch: refetchSelectedColumns } = useGetSelectedColumnsVerticalQuery();


  //.........Api call to get global search.......
  const { data: searchData, isLoading } = useGetGlobalsearchVerticalQuery({
    ...filters,
    sortBy: sortColumn,
    sortDir: sortOrder,
  },
    {
      skip: !searchQuery,
    });

  //API Calling sorting
  const { data: vertical, refetch: refetchVertical } =
    useVerticalWiseSalesQuery({
      filters: {
        ...filters,
        sortBy: sortColumn,
        sortDir: sortOrder,
      },
      page: currentPage,
    }, { skip: !triggerSort });

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
  const {
    onOpen: onOpenGraphAddDrawer,
    onClose: onCloseGraphAddDrawer,
    isOpen: isOpenGraphAddDrawer,
  } = useDisclosure();
  const {
    isOpen: isOpenGraphSettingsModal,
    onOpen: onOpenGraphSettingsModal,
    onClose: onCloseGraphSettingsModal,
  } = useDisclosure();

  const {
    isOpen: isOpenGraphDetailsView,
    onOpen: onOpenGraphDetailsView,
    onClose: onCloseGraphDetailsView,
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
    }
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

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const newColumnsOrder = Array.from(selectedColumns);
    const [removed] = newColumnsOrder.splice(result.source.index, 1);
    newColumnsOrder.splice(result.destination.index, 0, removed);
    setSelectedColumns(newColumnsOrder);
  };

  const clearPreviousColumnData = () => {

  };
  const toggleColumn = (field) => {
    setTempSelectedColumns((prev) =>
      prev.includes(field)
        ? prev.filter((col) => col !== field)
        : [...prev, field]
    );
  };
  const handleSelectAllToggle = () => {
    const allColumns = selectedColumnsData
      ? Object.keys(selectedColumnsData?.content[0] || {}).map((key) => ({
        field: key,
        listName: selectedColumnsData.content[0][key]?.listName || key,
      }))
      : [];

    // const uniqueColumns = Array.from(
    //   new Set(allColumns.map((col) => col.listName))
    // );
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
          const matchingColumn = selectedColumnsData?.content[0][col];
          return matchingColumn ? matchingColumn.listName || col : col;
        })
      )
    )
    setFilters((prevFilters) => ({
      ...prevFilters,
      data: updatedSelectedColumns,

    }));
    setSelectedColumns(updatedSelectedColumns);
    refetchSelectedColumns({ columns: updatedSelectedColumns });
    onClose();
    localStorage.setItem("selectedColumnSalesVertical", JSON.stringify(updatedSelectedColumns));
    toast({
      title: "Columns Applied Successfully",
      status: "success",
      isClosable: true,
    });
  };
  // Load selected columns from localStorage 
  useEffect(() => {
    const savedColumns = localStorage.getItem("selectedColumnSalesVertical");
    if (savedColumns) {
      setSelectedColumns(JSON.parse(savedColumns));
    }
  }, []);
  useEffect(() => {
    if (isOpen) {
      const filteredColumns = selectedColumnsData?.content[0]
        ? Object.keys(selectedColumnsData.content[0]).filter((key) =>
          selectedColumns.includes(selectedColumnsData.content[0][key]?.listName)
        )
        : [];
      setTempSelectedColumns(filteredColumns);
    }
  }, [isOpen, selectedColumns, selectedColumnsData]);


  const debouncedSearchQuery = useMemo(() => debounce(setSearchQuery, 300), []);
  useEffect(() => {
    return () => {
      debouncedSearchQuery.cancel();
    };
  }, [debouncedSearchQuery]);
  useEffect(() => {
    if (isLoading) {
      toast({
        title: "Loading...",
        description: "Fetching data, please wait.",
        status: "info",
        duration: null,
        isClosable: true,
        position: "top",
        render: () => (
          <div style={{ display: "flex", alignItems: "center", padding: "10px" }}>
            <Spinner size="sm" color="blue.500" mr="10px" />

            <span>Loading...</span>
          </div>
        ),
      });
    } else {
      toast.closeAll();
    }
  }, [isLoading, toast]);

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
    setTempFilterCondition({});
    setTempFilterValue("");
    window.location.reload();
  };
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
    // refetchVerticalfilter();
  };

  // function date expoet Calling for date filter
  const handleFilter = () => {
    if (!dates || dates.length === 0) {
      setIsDatesInvalid(true);
      return;
    }
    setIsDatesInvalid(false);
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
        groupBy: ["companyFunction.functionalities_name"],
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



  //sort asc desc
  const handleSort = (column) => {
    const newSortOrder =
      sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    // Update sort state
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
    else if (advancedFilterVertical?.content && advancedFilterVertical?.content.length > 0) {
      filteredData = advancedFilterVertical.content;
    }
    return filteredData;
  }, [
    newArray,
    searchQuery,
    columnFilters,
    sortColumn,
    sortOrder,
    searchData,
    advancedFilterVertical,
  ]);
  useEffect(() => {
    if (advancedFilterVertical?.content && advancedFilterVertical.content.length === 0) {
      toast({
        title: " No Results Found ",
        description: "You search did not match any data.",
        status: "warning",
        isClosable: true,
        duration: 4000,
        render: () => (
          <Box
            p={3}
            bg="orange.300"
            borderRadius="md"
            style={{ width: "300px", height: "70px" }}
          >
            <Box fontWeight="bold">No Results Found</Box>
            <Box>You search did not match any data.</Box>
          </Box>
        ),
      });
    }
  }, [advancedFilterVertical, toast]);

  useEffect(() => {
    if (searchData?.content && searchData.content.length === 0) {
      toast({
        title: " No Results Found ",
        description: "You search did not match any data.",
        status: "warning",
        isClosable: true,
        duration: 4000,
        render: () => (
          <Box
            p={3}
            mb={9}
            bg="rgba(255, 195, 0, 0.2)"
            backdropFilter="blur(4px)"
            borderRadius="md"
            style={{ width: "400px", height: "70px" }}
          >
            <Box fontWeight="bold" ml={5}>No Results Found</Box>
            <Box ml={5}>You search did not match any data.</Box>
          </Box>
        ),
      });
      setLastPage(true);
    }
  }, [searchData, toast]);

  const removeProperty = (object) => {
    if (!object) {
      return {};
    }
    const { data, id, ...rest } = object;
    return rest;
  };

  const handleConfigure = (chart) => {
    if (!chart) {
      return;
    }
    onOpenGraphSettingsModal();
    const filterData = removeProperty(chart);
    setConfigureChart(filterData);
  };

  const handleView = (chart) => {
    if (!chart) {
      return;
    }
    onOpenGraphDetailsView();
    const filterData = removeProperty(chart);
    setConfigureChart(filterData);
  };

  const formatHeader = (column) => {
    if (selectedColumnsData && selectedColumnsData.content) {
      const apiContent = selectedColumnsData.content[0];
      for (const key in apiContent) {
        if (apiContent[key].listName === column) {
          return key;
        }
      }
    }
    return column;
  };

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
      container.addEventListener("scroll", handleScroll);
      // handleScroll();
      return () => container.removeEventListener("scroll", handleScroll);
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
      // refetchVerticalfilter();
    } else {
      console.error("Filter condition, value, or column is missing");
    }
  };
  const handleClick = useCallback(() => {
    if (activeFilterColumn) {
      handleApplyFilters();
    }
    setTriggerFilter(true);
  }, [activeFilterColumn, handleApplyFilters]);
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

  const handleGraphAddDrawer = () => {
    onOpenGraphSettingDrawer();
    dispatch(handleGraphWise({ selectedWise: "sales-customer-wise", reportType: 'sales' }));
  };


  return (
    <Box bg="white" padding="0px 10px" borderRadius="5px">
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
        }}>
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
              }}>
              <i
                className="pi pi-search"
                style={{ fontSize: "2rem", opacity: "0.8" }}></i>
            </button>
          </Box>
          <CssWrapper>
            <Dropdown
              value={selectedReport}
              options={reportOptions}
              onChange={(e) => {
                handleReportChange(e);
              }}
              optionLabel="label"
              placeholder={reportOptions.length > 0 ? reportOptions[2].label : ""}
              panelStyle={{ margin: "0", padding: "0.75rem 1.25rem" }}
              style={{
                width: "175px",
                border: "1px solid #00000061",
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
          <Tooltip
            label="Clear All"
            hasArrow
            bg="gray.400"
            color="white"
            fontSize="1.2rem"
            p="5px 10px"
            borderRadius="7px"
          >
            <Button
              borderRadius="5px"
              onClick={clearAllFilters}
              w="30px"
              h="30px"
              bg="#0d3a6833"
              _hover={{
                bg: "mainBlue",
                color: "white",
              }}>
              <i
                className="pi pi-filter-slash"
                style={{ fontSize: "1.5rem" }}></i>
            </Button>
          </Tooltip>
          {/* Graph view  */}
          <Tooltip
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
              }}>
              <FontAwesomeIcon icon={faChartLine} fontSize="20px" />
            </Button>
          </Tooltip>
          <Tooltip
            label="Select Columns to Show"
            hasArrow
            bg="gray.400"
            color="white"
            fontSize="1.2rem"
            p="5px 10px"
            borderRadius="7px">
            <Button
              onClick={onOpen}
              fontSize="0.9rem"
              height="30px"
              color="mainBlue"
              width="30px"
              borderRadius="5px"
              bg="#0d3a6833"
              _hover={{
                bg: "mainBlue",
                color: "white",
              }}>
              <FontAwesomeIcon icon={faGear} fontSize="1.8rem" />
            </Button>
          </Tooltip>

          <Menu zIndex="1000" >
            <Tooltip
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
                }}>
                <DownloadIcon fontSize="1.8rem" />
              </MenuButton>
            </Tooltip>
            <MenuList padding="8px" borderRadius="7px" borderColor="#e4e4e499" boxShadow="rgba(0, 0, 0, 0.15) 0px 14px 34px -14px;" position="relative" zIndex="999">
              <MenuItem
                onClick={exportToExcel}
                fontSize="1.2rem" height="35px" padding="10px" borderRadius="7px">
                <Box minW="25px" margin="3px 7px" display="flex" alignItems="center" justifyContent="flex-start">
                  <FontAwesomeIcon icon={faFileExcel}
                    fontSize="1.8rem" color="#003a73c9" />
                </Box>
                <Box as="span">Export Report</Box>
              </MenuItem>
              <MenuItem
                fontSize="1.2rem"
                height="35px"
                padding="10px"
                borderRadius="7px"
                onClick={onOpenDownloadReportModal}>
                <Box minW="25px" margin="3px 7px" display="flex" alignItems="center" justifyContent="flex-start">
                  <FontAwesomeIcon icon={faFileExcel}
                    fontSize="1.8rem" color="#003a73c9"
                  />
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
                  <ModalCloseButton mt="5px" color="white" size="lg"
                  // onClick={() => {
                  //   setTempFilterCondition("");
                  //   setTempFilterValue("");
                  //   setDates();
                  // }}
                  />
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
                            padding: "1px",
                            border: isDatesInvalid ? "2px solid red" : "1px solid #ccc",
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
                        onCloseDownloadReportModal()
                        setDates()
                      }}>
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
                        // onCloseDownloadReportModal();
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
        </Box>
      </Box>

      <TableContainer
        ref={tableContainerRef}
        className="table-tableContainerRef"
        margin="0 auto"
        overflowY="auto"
        height="calc(100vh - 179px)"
        width="calc(100vw - 115px)"
        border="1px solid #ebebeb"
      >
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="droppable" direction="horizontal">
            {(provided) => (
              <Table
                {...provided.droppableProps}
                ref={provided.innerRef}
                variant="simple">
                <Thead style={{ position: "sticky", top: 0 }}>
                  <Tr bg="#ffffff">
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
                            padding="7px 15px"
                            fontSize="1.35rem"
                            fontWeight="500"
                            textTransform="capitalize"
                            fontFamily="Poppins, sans-serif"
                            color="black"
                            letterSpacing="0"
                            background="#cfd8e1a6">
                            {formatHeader(column)}

                            {/* sort A to Z */}
                            {column !== "SL No" && !column.toLowerCase().includes("sum") && (
                              <Button
                                className="A_to_Z"
                                bg="none"
                                _hover={{ bg: "none" }}
                                onClick={() => handleSort(column)}>
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
                            )}
                            {(!column === "SL No" || !column.toLowerCase().includes("sum")) && (
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
                                      onClick={() => {
                                        handlePopoverClick(column)
                                        setCalendarVisible(false);
                                        setTempFilterCondition("");
                                        setTempFilterValue("");
                                        setDates();
                                      }}
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
                                    <PopoverCloseButton size="lg"
                                      onClick={() => {
                                        setTempFilterCondition("");
                                        setTempFilterValue("");
                                        setActiveFilterColumn("");
                                        setDates();
                                        setCalendarVisible(false);
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
                                              {(column === "invoice_date") && (
                                                <option value="between">Between</option>
                                              )}
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
                            padding="12px 15px"
                            borderBottom="1px solid #e1e1e1"
                            borderTop="1px solid #e1e1e1"
                            style={getColumnStyle(column)}>
                            <Text
                              fontSize="1.4rem"
                              justifyItems="center"
                              fontWeight={column === "companyFunction.functionalities_name" ? "600" : "400"}
                              whiteSpace="nowrap"
                              color="#4e4e4e"
                              width={
                                column === "description"
                                  ? "300px"
                                  : column === "companyFunction.functionalities_name"
                                    ? "250px"
                                    : "auto"
                              }
                              overflow="hidden"
                              textOverflow="ellipsis"
                              title={column === "companyFunction.functionalities_name" ? item[column] : undefined}
                              textAlign={isSumColumn(column) ? "right" : "left"}
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

      <Drawer
        isOpen={isOpenGraphAddDrawer}
        placement="right"
        onClose={onCloseGraphAddDrawer}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent maxW="88vw">
          <DrawerCloseButton style={{ color: "white" }} />
          <DrawerHeader
            style={{
              backgroundColor: "#003060",
              color: "white",
            }}>
            Sales Customer Wise
          </DrawerHeader>
          <DrawerBody>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                "& button": {
                  color: "#718296",
                  padding: "20px 20px",
                  fontSize: "14px",
                  border: "1px solid #dee2e6",
                  backgroundColor: "white",
                },
                "& button:hover": {
                  backgroundColor: "rgb(0, 48, 96)",
                  borderRadius: "5px",
                },
              }}
              mb={6}>
              <Text fontWeight="bold">Sales Wise Graph View</Text>
              <Button
                ref={btnRef}
                type="button"
                variant="outlined"
                onClick={handleGraphAddDrawer}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  _hover: {
                    color: "white",
                  },
                }}>
                <FiPlus />
                Add Graph
              </Button>
            </Box>

            {/* Update sales graph details report */}
            <Box display="flex" flexWrap="wrap" justifyContent="space-between">
              {salesCustomerWise && salesCustomerWise?.length === 0 && (
                <Alert
                  status="error"
                  sx={{
                    fontSize: "16px",
                    padding: "5px",
                    borderRadius: "5px",
                    height: "30px",
                    px: "10px",
                  }}>
                  No Sales Graph are there
                </Alert>
              )}
              {salesCustomerWise &&
                salesCustomerWise?.map((chart, index) => {
                  return (
                    <Box
                      key={index}
                      width={{
                        base: "100%",
                        lg: "49%",
                      }}
                      mb={6}>
                      <Box
                        sx={{
                          backgroundColor: "white",
                          padding: "15px",
                          my: 2.5,
                          borderRadius: "8px",
                          transition: "box-shadow 0.3s ease-in-out",
                          border: "1px solid #dee2e6",
                          "&:hover": {
                            boxShadow: "0 4px 4px rgba(0, 0, 0, 0.2)",
                          },
                        }}
                        mb={3}>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          mb={8}>
                          <Box
                            style={{
                              padding: "10px",
                              fontWeight: 600,
                              color: "black",
                            }}>
                            {chart.chartName}
                            <Text
                              sx={{
                                color: "#718296",
                                fontSize: "10px",
                              }}>
                              {chart.description}
                            </Text>
                          </Box>
                          <Box
                            style={{
                              padding: "10px",
                              fontWeight: 600,
                              color: "black",
                            }}>
                            <Button
                              variant="outline"
                              style={{
                                padding: "15px 10px",
                                fontSize: "12px",
                                color: "#718296",
                              }}
                              mr={3}
                              onClick={() => handleConfigure(chart)}>
                              <FiSettings style={{ marginRight: "6px" }} />{" "}
                              Configure
                            </Button>

                            <Button
                              variant="outline"
                              style={{
                                padding: "15px 10px",
                                fontSize: "12px",
                                color: "#718296",
                              }}
                              mr={3}
                              onClick={() => handleView(chart)}>
                              <FiSettings style={{ marginRight: "6px" }} /> View
                              Graph
                            </Button>
                          </Box>
                        </Box>
                        <Box sx={{ height: "300px" }}>
                          <NewMyCharts chart={chart} />
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
            </Box>
            {/* //sales-customer-wise graph settings */}
            <Drawer
              isOpen={isOpenGraphSettingDrawer}
              placement="right"
              onClose={onCloseGraphSettingDrawer}
              size="xl">
              <DrawerOverlay />
              <DrawerContent
                maxW="87vw"
                sx={{
                  "& .stickyTop": {
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    backgroundColor: "white",
                  },
                }}>
                <DrawerCloseButton style={{ color: "white" }} />
                <DrawerHeader
                  style={{
                    backgroundColor: "#003060",
                    color: "white",
                  }}>
                  Choose Data Wise Graph
                </DrawerHeader>
                <DrawerBody>
                  <Box
                    className="stickyTop"
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 4px",
                      p: 2,
                      my: 2,
                      flexGrow: 1,
                    }}>
                    Total Graph (
                    {
                      chartsData.charts.filter(
                        (chart) =>
                          chart.type !== "heatmap" && chart.type !== "funnel" && chart.type !== "line" && chart.type !== "areaBump" && chart.type !== "bump"
                      ).length
                    }
                    )
                  </Box>
                  <Box
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="space-between">
                    {chartsData.charts.map((chart, index) => {
                      if (chart.type === "heatmap" || chart.type === "funnel" || chart.type === "line" || chart.type === "areaBump" || chart.type === "bump") return null;
                      return (
                        <Box
                          key={index}
                          width={{
                            base: "100%",
                            lg: "49.4%",
                          }}
                          mb={6}>
                          <Box
                            sx={{
                              backgroundColor: "white",
                              padding: "15px",
                              my: 5,
                              borderRadius: "8px",
                              border: "1px solid #c4c4c4",
                            }}
                            mb={3}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                                "& button": {
                                  color: "#718296",
                                  padding: "20px 20px",
                                  fontSize: "14px",
                                  border: "1px solid #dee2e6",
                                  backgroundColor: "white",
                                  borderRadius: "8px",
                                },
                                "& button:hover": {
                                  backgroundColor: "rgb(0, 48, 96)",
                                  borderRadius: "5px",
                                  color: "white",
                                },
                              }}
                              mb={6}>
                              <Button
                                type="button"
                                variant="outlined"
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                  _hover: {
                                    color: "white",
                                  },
                                }}
                                onClick={() => handleConfigure(chart)}>
                                <FiSettings
                                  sx={{
                                    mr: "6px",
                                  }}
                                />
                                Select
                              </Button>
                            </Box>
                            <Box
                              sx={{
                                width: "100%",
                                height: "200px",
                              }}>
                              <DynamicChart chart={chart} />
                            </Box>
                            <Badge
                              colorScheme="blue"
                              py={0}
                              px={3}
                              fontSize={9}>
                              {chart.title}
                            </Badge>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>

                  <Drawer
                    isCentered
                    size="md"
                    isOpen={isOpenGraphSettingsModal}
                    onClose={onCloseGraphSettingsModal}>
                    <DrawerOverlay />
                    <DrawerContent maxW="86vw">
                      <DrawerCloseButton color="white" size="lg" mt="8px" />
                      <DrawerHeader
                        color="white"
                        mb="4px"
                        fontSize="17px"
                        fontWeight="500"
                        padding="15px 15px"
                        backgroundColor="#003060">
                        Graphical View Settings
                      </DrawerHeader>
                      <Divider orientation="horizontal" mb={6} />
                      <DrawerBody>
                        <ChartConfiguration configureChart={configureChart} />
                      </DrawerBody>
                    </DrawerContent>
                  </Drawer>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Modal isOpen={isOpen} onClose={handleModalClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent minW="40%">
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
              {selectedColumnsData?.content && selectedColumnsData.content.length > 0
                ? Object.keys(selectedColumnsData.content[0]).map((key) => ({
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
                        width="48%">
                        <Checkbox
                          size="lg"
                          display="flex"
                          padding="5px"
                          borderColor="mainBluemedium"
                          key={column.field}
                          defaultChecked={tempSelectedColumns.includes(column.field)}
                          isChecked={tempSelectedColumns.includes(column.field)}
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
