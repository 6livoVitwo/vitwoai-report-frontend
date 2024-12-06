import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Box, Button, useDisclosure, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Modal, ModalOverlay, Heading, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Checkbox, Input, Text, Select, useToast, Menu, MenuButton, MenuList, MenuItem, Popover, PopoverTrigger, PopoverContent, PopoverBody, PopoverArrow, PopoverCloseButton, Tooltip, Spinner } from "@chakra-ui/react";
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
import { useGetselectedDistWiseQuery } from "../slice/salesRegionWiseApi";
import { useGetselectedCityWiseQuery } from "../slice/salesRegionWiseApi";
import { useGetselectedCountryWiseQuery } from "../slice/salesRegionWiseApi";
import { useGetselectedPincodeWiseQuery } from "../slice/salesRegionWiseApi";
import { useGetselectedStateWiseQuery } from "../slice/salesRegionWiseApi";
import { handleGraphWise } from "../../nivoGraphs/chartConfigurations/graphSlice";
import ChartConfiguration from "../../nivoGraphs/chartConfigurations/ChartConfiguration";
import { useDispatch } from "react-redux";
import { useGetGlobalsearchStateQuery} from "../slice/salesRegionWiseApi";
import MainBodyDrawer from "../../nivoGraphs/drawer/MainBodyDrawer";
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
  const [selectedReport, setSelectedReport] = useState(null);
  const [sortColumn, setSortColumn] = useState("customer.customerAddress.customer_address_pin_code");
  const [sortOrder, setSortOrder] = useState("asc");
  const [tempFilterCondition, setTempFilterCondition] = useState("");
  const [tempFilterValue, setTempFilterValue] = useState("");
  const [activeFilterColumn, setActiveFilterColumn] = useState(null);
  const [localFilters, setLocalFilters] = useState({ ...filters });
  const [selectedRegion, setSelectedRegion] = useState("state");
  const [placeholder, setPlaceholder] = useState("District");
  const [isUpdated, setIsUpdated] = useState(false);
  const [configureChart, setConfigureChart] = useState({});
  const dispatch = useDispatch();
  const [tempSelectedColumns, setTempSelectedColumns] = useState([]);
  const [skipDistrict, setSkipDistrict] = useState(true);
  const [skipCity, setSkipCity] = useState(true);
  const [skipCountry, setSkipCountry] = useState(true);
  const [skipPincode, setSkipPincode] = useState(true);
  const [skipGlobalSearch, setSkipGlobalSearch] = useState(true);
  const [skipGlobalSearchPincode, setSkipGlobalSearchPincode] = useState(true);
  const [skipGlobalSearchDist, setSkipGlobalSearchDist] = useState(true);
  const [skipGlobalSearchCountry, setSkipGlobalSearchCountry] = useState(true);
  const [skipGlobalSearchCity, setSkipGlobalSearchCity] = useState(true);
  const toast = useToast();
  const tableContainerRef = useRef(null);
  const { onOpen: onOpenDownloadReportModal, onClose: onCloseDownloadReportModal, isOpen: isOpenDownloadReportModal } = useDisclosure();
  const { onOpen: onOpenGraphAddDrawer, onClose: onCloseGraphAddDrawer, isOpen: isOpenGraphAddDrawer } = useDisclosure();
  const { onOpen: onOpenGraphSettingsModal } = useDisclosure();
  const { isOpen: isOpenGraphDetailsView, onOpen: onOpenGraphDetailsView, onClose: onCloseGraphDetailsView } = useDisclosure();
  const [initialized, setInitialized] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [isDatesInvalid, setIsDatesInvalid] = useState(false);
  const [dates, setDates] = useState(null);
  const [selectdate, setSelectdate] = useState([]);
  const [localFiltersdate, setLocalFiltersdate] = useState(null);
  const [triggerApiCall, setTriggerApiCall] = useState(false);


  const navigate = useNavigate();

  const getColumnStyle = (header) => ({
    textAlign: alignment[header] || "left",
  });

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


  //global search....
  const { data: GlobalSearch, isLoading } = useGetGlobalsearchStateQuery(filters, { skip: skipGlobalSearch })

  //..........Api calling for dropdown for district-wise ............
  const { data: DistrictWiseData } = useGetselectedDistWiseQuery(filters, { skip: skipDistrict });

  //..........Api calling for dropdown for city-wise ............
  const { data: CityWiseData } = useGetselectedCityWiseQuery(filters, { skip: skipCity });

  //..........Api calling for dropdown for pincode-wise ............
  const { data: CountryWiseData } = useGetselectedCountryWiseQuery(filters, { skip: skipCountry });

  //..........Api calling for dropdown for pincode-wise ............
  const { data: PincodeWiseData } = useGetselectedPincodeWiseQuery(filters, { skip: skipPincode });

  //..........Api calling for dropdown for state-wise ............
  const { data: StateWiseData } = useGetselectedStateWiseQuery(filters);

  const [activeRegionData, setActiveRegionData] = useState(null);

  const RerionType = [
    { label: "State", value: "state" },
    { label: "District", value: "district" },
    { label: "City", value: "city" },
    { label: "Country", value: "country" },
    { label: "Pincode", value: "pin_code" },
  ];

  //...Handle dropdown region-type change....
  const handleRegionChange = (e) => {
    const selectedValue = e.value;
    const selectedLabel = RerionType.find(item => item.value === selectedValue)?.label || "State";
    setPlaceholder(selectedLabel);
    setSelectedColumns([...defaultColumns]);


    const updatedFilters = {
      ...filters,
      data: filters.data.map((key) => {
        if (key.includes("customer.customerAddress.customer_address_")) {
          return `customer.customerAddress.customer_address_${selectedValue}`;
        }
        return key;
      }),
      groupBy: filters.groupBy.map((group) => {
        if (group.includes("customer.customerAddress.customer_address_")) {
          return `customer.customerAddress.customer_address_${selectedValue}`;
        }
        return group;
      }),
      sortBy: `customer.customerAddress.customer_address_${selectedValue}`,
    };

    setFilters(updatedFilters);
    setSelectedRegion(selectedValue);
    setIsUpdated(true);
    setSkipDistrict(true);
    setSkipCity(true);
    setSkipCountry(true);
    setSkipPincode(true);
    setSkipGlobalSearch(true);
    setSkipGlobalSearchPincode(true);
    setSkipGlobalSearchDist(true);
    setSkipGlobalSearchCountry(true);
    setSkipGlobalSearchCity(true);

    switch (selectedValue) {
      case 'district':
        setSkipDistrict(false);
        setActiveRegionData(DistrictWiseData);
        break;
      case 'city':
        setSkipCity(false);
        setActiveRegionData(CityWiseData);
        break;
      case 'country':
        setSkipCountry(false);
        setActiveRegionData(CountryWiseData);
        break;
      case 'pin_code':
        setSkipPincode(false);
        setActiveRegionData(PincodeWiseData);
        break;
      default:
        setActiveRegionData(StateWiseData);
    }
  };
  useEffect(() => {
    switch (selectedRegion) {
      case "state":
        if (StateWiseData) setActiveRegionData(StateWiseData);
        break;
      case "district":
        if (DistrictWiseData) setActiveRegionData(DistrictWiseData);
        break;
      case "city":
        if (CityWiseData) setActiveRegionData(CityWiseData);
        break;
      case "country":
        if (CountryWiseData) setActiveRegionData(CountryWiseData);
        break;
      case "pin_code":
        if (PincodeWiseData) setActiveRegionData(PincodeWiseData);
        break;
      default:
        setActiveRegionData(null);
    }
  }, [selectedRegion, StateWiseData, DistrictWiseData, CityWiseData, CountryWiseData, PincodeWiseData]);



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
  const toggleColumn = (field) => {
    setTempSelectedColumns((prev) =>
      prev.includes(field)
        ? prev.filter((col) => col !== field)
        : [...prev, field]
    );
  };
  const handleSelectAllToggle = () => {
    const regionData = {
      state: StateWiseData,
      district: DistrictWiseData,
      city: CityWiseData,
      country: CountryWiseData,
      pin_code: PincodeWiseData,
    }[selectedRegion];

    const allColumns = regionData
      ? Object.keys(regionData?.content[0] || {}).map((key) => ({
        field: key,
        listName: regionData.content[0][key]?.listName || key,
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
    const regionData = {
      state: StateWiseData,
      district: DistrictWiseData,
      city: CityWiseData,
      country: CountryWiseData,
      pin_code: PincodeWiseData,
    }[selectedRegion];

    let updatedSelectedColumns = Array.from(
      new Set(
        tempSelectedColumns.map((col) => {
          const matchingColumn = regionData?.content[0][col];
          return matchingColumn ? matchingColumn.listName || col : col;
        })
      )
    );

    // Remove "Customer State" if it exists in updatedSelectedColumns
    updatedSelectedColumns = updatedSelectedColumns.filter((col) => col !== "Customer State");

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
    onClose();
    toast({
      title: "Columns Applied Successfully",
      status: "success",
      isClosable: true,
    });
  };

  useEffect(() => {
    if (isOpen) {
      const filteredColumns = StateWiseData?.content[0]
        ? Object.keys(StateWiseData.content[0]).filter((key) =>
          selectedColumns.includes(StateWiseData.content[0][key]?.listName)
        )
        : [];
      setTempSelectedColumns(filteredColumns);
    }
  }, [isOpen, selectedColumns, StateWiseData]);


  const handlePopoverClick = (column) => {
    setActiveFilterColumn((prev) => (prev === column ? null : column));
    // setActiveFilterColumn(column);
  };

  const debouncedSearchQuery = useMemo(() => debounce(setSearchQuery, 10), []);
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

    switch (selectedRegion) {
      case 'pin_code':
        setSkipGlobalSearchPincode(false);
        break;
      case 'country':
        setSkipGlobalSearchCountry(false);
        break;
      case 'city':
        setSkipGlobalSearchCity(false);
        break;
      case 'district':
        setSkipGlobalSearchDist(false);
        break;
      default:
        setSkipGlobalSearch(false);
    }

  };

  const clearAllFilters = () => {
    setColumnFilters({});
    setSearchQuery("");
    setInputValue("");
    window.location.reload();
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
              style={{ width: "300px", height: "80px", }}
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
        groupBy: ["kam.kamName", "kam.kamCode"],
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


  // sort asc desc
  const handleSort = (column) => {
    const newSortOrder =
      sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    // Update sort state
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  const filteredItems = useMemo(() => {
    let filteredData = [...newArray];

    // Apply filters
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
    // Global search
    if (GlobalSearch?.content && GlobalSearch?.content.length > 0) {
      filteredData = GlobalSearch.content;
    }
    // Apply sorting
    else if (sortColumn) {
      filteredData = [...filteredData].sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortOrder === "asc" ? -1 : 1;
        if (a[sortColumn] > b[sortColumn]) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }
    return filteredData;
  }, [
    GlobalSearch,
    newArray,
    columnFilters,
    sortColumn,
    sortOrder,
    selectedColumns,
    tempFilterCondition,
  ]);

  const formatHeader = (column) => {
    const dataSources = [StateWiseData, DistrictWiseData, CityWiseData, CountryWiseData, PincodeWiseData];

    for (const dataSource of dataSources) {
      if (dataSource && dataSource.content && dataSource.content[0]) {
        const apiContent = dataSource.content[0];
        for (const key in apiContent) {
          if (apiContent[key].listName === column) {
            return key;
          }
        }
      }
    }
    return column;
  };

  // ...Handle scroll...
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
      container.addEventListener("scroll", handleScroll, 200);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [loading]);

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

      // This will trigger the query
    } else {
      console.error("Filter condition or value missing");
    }
  };
  const handleApplyFilters = () => {
    if (tempFilterCondition && tempFilterValue && activeFilterColumn) {
      // Create a new filter object
      const newFilter = {
        column: activeFilterColumn,
        operator: tempFilterCondition,
        type: typeof tempFilterValue === "number" ? "integer" : "string",
        value: tempFilterValue,
      };
      // Update localFilters state
      const updatedFilters = {
        ...localFilters,
        filter: [...localFilters.filter, newFilter],
      };
      setColumnFilters((prevFilters) => ({
        ...prevFilters,
        [activeFilterColumn]: {
          condition: tempFilterCondition,
          value: tempFilterValue,
          column: activeFilterColumn,
          type: typeof tempFilterValue === "number" ? "integer" : "string",
        },
      }));
      // Update local filters state
      setLocalFilters(updatedFilters);
      // Clear temporary values
      setTempFilterCondition(null);
      setTempFilterValue("");
      setActiveFilterColumn(null);
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
    dispatch(handleGraphWise({ selectedWise: "sales-region-wise", reportType: 'sales' }));
  }

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
            Sales Ragion Table View
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
              placeholder={reportOptions.length > 0 ? reportOptions[5].label : ""}
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
              onClick={handleGraphViewDrawer}
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
                            background="#cfd8e1a6"
                          >
                            {formatHeader(column)}
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
                            <Popover
                              isOpen={activeFilterColumn === column}
                              onClose={() => setActiveFilterColumn(null)}>
                              <PopoverTrigger>
                                <Button
                                  bg="transparent"
                                  onClick={() => handlePopoverClick(column)} // Set the clicked column as active
                                >
                                  {columnFilters[column] ? (
                                    <i
                                      className="pi pi-filter-slash"
                                      style={{
                                        color: "slateblue",
                                        fontSize: "1.4rem",
                                      }}></i>
                                  ) : (
                                    <i
                                      className="pi pi-filter"
                                      style={{
                                        color: "#003060",
                                        fontWeight: "bold",
                                        fontSize: "1.3rem",
                                        position: "relative",
                                        top: "-2px",
                                      }}></i>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              {activeFilterColumn === column && (
                                // .........Only show popover for the active column..........
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
                                          mb="5px">
                                          {formatHeader(column)}
                                        </Text>
                                        <Box
                                          display="flex"
                                          flexDirection="column"
                                          gap="10px">
                                          <Select
                                            placeholder="Select condition"
                                            size="sm"
                                            fontSize="12px"
                                            h="35px"
                                            onChange={
                                              handleTempFilterConditionChange
                                            }>
                                            <option value="equal">Equal</option>
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
                                          </Select>
                                          <Input
                                            h="35px"
                                            fontSize="12px"
                                            padding="6px"
                                            onChange={
                                              handleTempFilterValueChange
                                            }
                                            placeholder=" Search by value"
                                          />
                                        </Box>
                                      </Box>
                                    </Box>
                                  </PopoverBody>
                                  <Box
                                    display="flex"
                                    justifyContent="flex-end"
                                    width="90%"
                                    ml="8px"
                                    mb="10px">
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
                                        setActiveFilterColumn(null);
                                      }}>
                                      Apply
                                    </Button>
                                  </Box>
                                </PopoverContent>
                              )}
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
                            padding="7px 15px"
                            borderBottom="1px solid #e1e1e1"
                            borderTop="1px solid #e1e1e1"
                            style={getColumnStyle(column)}>
                            <Text
                              fontSize="1.4rem"
                              justifyItems="center"
                              whiteSpace="nowrap"
                              color="#4e4e4e"
                              width={
                                column === "description"
                                  ? "300px"
                                  : column === "name"
                                    ? "250px"
                                    : "auto"
                              }
                              overflow="hidden"
                              textOverflow="ellipsis">
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

      {/* Main Drawer  */}
      <MainBodyDrawer
        isOpenGraphAddDrawer={isOpenGraphAddDrawer}
        onCloseGraphAddDrawer={onCloseGraphAddDrawer}
      />

      {/* sales graph view details */}
      <Modal
        onClose={onCloseGraphDetailsView}
        isOpen={isOpenGraphDetailsView}
        size="full">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            style={{
              backgroundColor: "#003060",
              color: "white",
            }}>
            Sales Customer Detail Graph View
          </ModalHeader>
          <ModalCloseButton style={{ color: "white" }} />
          <ModalBody>
            <ChartConfiguration configureChart={configureChart} />
          </ModalBody>
        </ModalContent>
      </Modal>

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
              {activeRegionData?.content && activeRegionData.content.length > 0
                ? Object.keys(activeRegionData.content[0]).map((key) => ({
                  field: key,
                  header: key,
                }))
                  .map((column) => {
                    const formattedHeader = formatHeader(column.field || column.header);
                    return (
                      <Box
                        // key={`${column.field || column.header}-${index}`}
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
                          isChecked={tempSelectedColumns.includes(column.field)}
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
