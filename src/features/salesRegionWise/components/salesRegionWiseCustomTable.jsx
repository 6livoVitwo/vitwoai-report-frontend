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
  Tooltip,
  Drawer, DrawerCloseButton, DrawerHeader, DrawerOverlay, DrawerContent, DrawerBody, Badge, Divider, Alert
} from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import debounce from "lodash/debounce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGear,
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
import { useRegionWiseSalesQuery } from "../slice/salesRegionWiseApi";
import { useGetselectedDistWiseQuery } from "../slice/salesRegionWiseApi";
import { useGetselectedCityWiseQuery } from "../slice/salesRegionWiseApi";
import { useGetselectedCountryWiseQuery } from "../slice/salesRegionWiseApi";
import { useGetselectedPincodeWiseQuery } from "../slice/salesRegionWiseApi";
import { useGetselectedStateWiseQuery } from "../slice/salesRegionWiseApi";
import { set, sortBy } from "lodash";
import DynamicChart from "../../nivoGraphs/chartConfigurations/DynamicChart";
import { handleGraphWise } from "../../nivoGraphs/chartConfigurations/graphSlice";
import NewMyCharts from "../../dashboardNew/nivo/NewMyCharts";
import { chartsData } from "../../nivoGraphs/jsonData/graphSkeleton"
import ChartConfiguration from "../../nivoGraphs/chartConfigurations/ChartConfiguration";
import { FiPlus, FiSettings } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const CustomTable = ({
  setPage,
  newArray,
  alignment,
  filters,
  setFilters
}) => {
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
  const [sortColumn, setSortColumn] = useState("customer.customerAddress.customer_address_pin_code");
  const [sortOrder, setSortOrder] = useState("asc");
  const [tempFilterCondition, setTempFilterCondition] = useState("");
  const [tempFilterValue, setTempFilterValue] = useState("");
  const [activeFilterColumn, setActiveFilterColumn] = useState(null);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [localFilters, setLocalFilters] = useState({ ...filters });
  const [currentPage, setCurrentPage] = useState(0); // Default page is 0
  const [selectedRegion, setSelectedRegion] = useState("state"); // Track selected region
  const [placeholder, setPlaceholder] = useState("District");
  const [columns, setColumns] = useState([]);
  const [tableData, setTableData] = useState([]); // Store the fetched table data
  const [isUpdated, setIsUpdated] = useState(false); // Force re-render when needed
  const [configureChart, setConfigureChart] = useState({});
  const salesCustomerWise = useSelector((state) => state.salescustomer.widgets);
  const dispatch = useDispatch();
  const [tempSelectedColumns, setTempSelectedColumns] = useState([]);



  //API Calling sorting
  const { data: kamData, refetch: refetchKamWiseSales } = useRegionWiseSalesQuery({
    filters: {
      ...filters,
      sortBy: sortColumn,
      sortOrder: sortOrder,
    },
    page: currentPage,
  });

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
    onOpen: onOpenGraphSettingDrawer,
    onClose: onCloseGraphSettingDrawer,
    isOpen: isOpenGraphSettingDrawer,
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

  //..........Api calling for dropdown for district-wise ............
  const { data: DistrictWiseData, refetch: refetchDistrict } =
    useGetselectedDistWiseQuery(filters);


  //..........Api calling for dropdown for city-wise ............
  const { data: CityWiseData, refetch: refetchcity } =
    useGetselectedCityWiseQuery(filters);


  //..........Api calling for dropdown for pincode-wise ............
  const { data: CountryWiseData, refetch: refetchcountry } =
    useGetselectedCountryWiseQuery(filters);


  //..........Api calling for dropdown for pincode-wise ............
  const { data: PincodeWiseData, refetch: refetchpincode } =
    useGetselectedPincodeWiseQuery(filters);


  //..........Api calling for dropdown for state-wise ............
  const { data: StateWiseData, refetch: refetchstate } =
    useGetselectedStateWiseQuery(filters);

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

    switch (selectedValue) {
      case 'district':
        setActiveRegionData(DistrictWiseData);
        break;
      case 'city':
        setActiveRegionData(CityWiseData);
        break;
      case 'country':
        setActiveRegionData(CountryWiseData);
        break;
      case 'pin_code':
        setActiveRegionData(PincodeWiseData);
        break;
      default:
        setActiveRegionData(StateWiseData);
    }
    toast({
      title: `Region changed to ${selectedLabel}`,
      description: "Your filter has been updated.",
      status: "success",
      duration: 2000,
      isClosable: true,
      containerStyle: {
        width: "400px",
        height: "100px",
      },
    });
  };
  // useEffect(() => {
  //   setActiveRegionData(StateWiseData);
  // }, [StateWiseData]);
  useEffect(() => {
    if (selectedRegion === "state" && StateWiseData) {
      setActiveRegionData(StateWiseData);
    }
  }, [StateWiseData]);


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

    // Toggle selection based on the selectAll state
    if (selectAll) {
      setTempSelectedColumns([]);
    } else {
      setTempSelectedColumns(uniqueColumns);
    }
    setSelectAll(!selectAll);
  };
  // Updated useEffect to refetch data when filters or region type changes
  useEffect(() => {
    refetchcity();
    refetchDistrict();
    refetchcountry();
    refetchpincode();
    refetchstate();
    setIsUpdated(false);
  }, [filters, selectedRegion, refetchcity, refetchDistrict, refetchcountry, refetchpincode, refetchstate]);

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
    setActiveFilterColumn((prev) => (prev === column ? null : column)); // Toggle column
    // setActiveFilterColumn(column);
  };

  const debouncedSearchQuery = useMemo(() => debounce(setSearchQuery, 10), []);

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

  const clearAllFilters = () => {
    setColumnFilters({});
    // setSearchQuery("");
    // setInputValue("");
    // setSortColumn("");
    // setSortOrder("asc");
    window.location.reload();
  };

  // sort asc desc
  const handleSort = (column) => {
    const newSortOrder =
      sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    // Update sort state
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };
  // // Trigger the API call when sortColumn or sortOrder changes
  useEffect(() => {
    refetchKamWiseSales({
      filters: {
        ...filters,
        sortBy: sortColumn,
        sortDir: sortOrder,
      },
      page: currentPage,
    });
  }, [sortColumn, sortOrder, refetchKamWiseSales]);


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
    // Return only selected columns
    return filteredData.map((item) => {
      const filteredItem = {};
      selectedColumns.forEach((col) => {
        filteredItem[col] = item[col];
      });
      return filteredItem;
    });
    // return filteredData;
  }, [
    data,
    searchQuery,
    //   searchData,
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

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollRight } =
      tableContainerRef.current;

    if (
      scrollRight === 0 &&
      scrollTop + clientHeight >= scrollHeight - 5 &&
      !loading
    ) {
      loadMoreData();
    }
  };

  useEffect(() => {
    const container = tableContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
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
      setFiltersApplied(true);
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

  const handleGraphAddDrawer = () => {
    onOpenGraphSettingDrawer();
    dispatch(handleGraphWise({ selectedWise: "sales-region-wise", reportType: 'sales' }));
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
        }}>
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
            }}>
            <i
              className="pi pi-search"
              style={{ fontSize: "2rem", opacity: "0.8" }}></i>
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
          }}>
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
              }}>
              <i
                className="pi pi-filter-slash"
                style={{ fontSize: "1.5rem" }}></i>
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

          {/* wise report */}
          <Dropdown
            options={RerionType}
            optionLabel="label"
            placeholder={"Region"}
            value={selectedRegion}
            onChange={handleRegionChange}
            style={{
              width: "100px",
              background: "#dedede",
            }}
          />

          {/* Graph view  */}
          <Button
            aria-label="Graph View"
            onClick={onOpenGraphAddDrawer}
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
            }}>
            <FontAwesomeIcon icon={faChartLine} fontSize="20px" />
          </Button>

          <Button
            onClick={onOpen}
            padding="15px"
            bg="transparent"
            border="1px solid gray"
            h="40px"
            w="40px"
            rounded="30px"
            color="mainBlue"
            _hover={{
              bg: "mainBlue",
              color: "white",
            }}>
            {/* <FontAwesomeIcon icon={faChartSimple} fontSize="20px" /> */}
            <FontAwesomeIcon icon={faGear} fontSize="20px" />
          </Button>
          <Menu>
            <MenuButton
              // bg="mainBlue"
              border="1px solid gray"
              color="mainBlue"
              padding="5px"
              h="40px"
              w="40px"
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
              <DownloadIcon fontSize="20px" />
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
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        padding="5px"
                        alignItems="center">
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
                <Thead
                  style={{
                    position: "sticky",
                    top: 0,
                  }}
                >
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
                                        color: "slateblue",
                                        fontSize: "1.4rem",
                                      }}></i>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              {activeFilterColumn === column && (
                                // .........Only show popover for the active column..........
                                <PopoverContent w="120%">
                                  <PopoverArrow />
                                  <PopoverCloseButton size="lg" />
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
                                            // value={
                                            //   columnFilters[column]
                                            //     ?.condition || ""
                                            // }
                                            // onChange={(e) =>
                                            //   handleTempFilterConditionChange(
                                            //     column,
                                            //     e.target.value
                                            //   )
                                            // }
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
                                            <option value="between">
                                              Between
                                            </option>
                                          </Select>
                                          <Input
                                            h="35px"
                                            fontSize="12px"
                                            padding="6px"
                                            // value={
                                            //   columnFilters[column]?.value || ""
                                            // }
                                            // onChange={(e) =>
                                            //   handleTempFilterValueChange(
                                            //     column,
                                            //     e.target.value
                                            //   )
                                            // }
                                            onChange={
                                              handleTempFilterValueChange
                                            }
                                            // placeholder={`Filter ${column}`}
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
                                      onClick={handleClick}>
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

      {/* Main Drawer  */}
      <Drawer
        isOpen={isOpenGraphAddDrawer}
        placement="right"
        onClose={onCloseGraphAddDrawer}
        size="xl">
        <DrawerOverlay />
        <DrawerContent
          maxW="88vw"
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
            Sales Region Wise
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
                              Configure 88
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
                    Total Graph ({chartsData.charts.filter((chart) => chart.type !== "funnel").length})
                  </Box>
                  <Box
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="space-between">
                    {chartsData.charts.map((chart, index) => {
                      if (chart.type === "funnel") return null;
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
                </DrawerBody>
              </DrawerContent>
            </Drawer>

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
