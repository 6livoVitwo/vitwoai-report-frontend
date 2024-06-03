import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Text,
  Select,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Heading,
} from "@chakra-ui/react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
// import { InputText } from "primereact/inputtext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import { Button } from "primereact/button";
import { CustomerService } from "./service/CustomerService";
import styled from "@emotion/styled";
import { saveAs } from "file-saver";
// import jsPDF from "jspdf";
import "jspdf-autotable";
import { DownloadIcon } from "@chakra-ui/icons";
import { Skeleton } from "primereact/skeleton";
// import { Link } from "react-router-dom";
import { Calendar } from "primereact/calendar";

const CssWrapper = styled.div`
  .p-datatable-wrapper::-webkit-scrollbar {
    width: 10px;
  }
  .p-datatable-wrapper::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }
  .p-datatable-wrapper::-webkit-scrollbar-thumb {
    background: var(--chakra-colors-mainBlue);
    border-radius: 10px;
  }
  .p-datatable-emptymessage .p-datatable .p-datatable-tbody > tr > td {
    text-align: center;
  }
  .p-datatable .p-datatable-tbody > tr:hover {
    background-color: #ebebeb;
  }
  .p-datatable .p-sortable-column .p-column-title {
    font-size: 1.2rem;
    font-weight: 600;
  }
  .p-datatable .p-datatable-tbody > tr > td {
    font-size: 1.2rem;
    color: var(--chakra-colors-textBlack);
  }
  .p-paginator {
    padding: 15px 10px;
  }
  .p-component {
    font-size: 1.3rem;
  }
  .p-dropdown-label {
    display: flex;
    align-items: center;
  }
  .p-datatable .p-column-header-content {
    justify-content: center;
  }
  .p-paginator .p-paginator-pages .p-paginator-page {
    font-size: 1.3rem;
  }
  .p-paginator .p-dropdown .p-dropdown-label {
    font-size: 1.3rem;
  }
  .p-datatable .p-datatable-tbody > tr > td {
    text-align: center;
    padding: 15px 15px;
  }
  .p-datatable .p-datatable-header {
    border-top: none;
    background: white;
  }
  .p-datatable .p-datatable-thead > tr > th {
    background-color: #f0f3f5;
    border: 1px solid #e3e3e3;
    color: var(--chakra-colors-mainBluemedium);
  }
  .p-datatable-tbody tr:nth-of-type(even) {
    border-bottom: 1px solid #e3e3e3;
    border-top: 1px solid #e3e3e3;
    // border: 1px solid #ccc;
  }
  .p-input-icon-left > i:first-of-type {
    right: 0.75rem;
    color: #6b7280;
  }
  .p-datatable .p-datatable-thead > tr > th :first-letter {
    text-transform: uppercase;
  }
  .p-datatable .p-datatable-thead > tr > th {
    text-wrap: nowrap;
    background-color: #003060;
    color: white !important;
    font-weight: 600;
    text-transform: lowercase;
    padding: 10px 15px;
  }

  .p-datatable > .p-datatable-wrapper {
    height: calc(100vh - 175px);
    padding-right: 5px;
    margin-right: 5px;
  }
  .custom-sort-icon {
    color: white !important;
  }
  .p-button-label {
    font-weight: 400;
  }
`;

const CustomTable = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [columns, setColumns] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState([]);
  const dataTable = useRef(null);
  const [lazyLoading, setLazyLoading] = useState(false);
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [columnFilters, setColumnFilters] = useState({});
  const [dates, setDates] = useState(null);
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
    onOpen: onOpenCustomManageModal,
    onClose: onCloseCustomManageModal,
    isOpen: isOpenCustomManageModal,
  } = useDisclosure();

  const {
    onOpen: onOpenGraphViewModal,
    onClose: onCloseGraphViewModal,
    isOpen: isOpenGraphViewModal,
  } = useDisclosure();

  useEffect(() => {
    setLoading(true);
    CustomerService.getCustomersMedium().then((data) => {
      setCustomers(getCustomers(data));
      setTotalRecords(data.length);
      setLoading(false);
      setColumns(getColumns(data));
      setVisibleColumns(getColumns(data).slice(0, 8));
    });
  }, []);

  const getCustomers = (data) => {
    return [...(data || [])].map((d, index) => {
      const postingDate = new Date(d["Posting Date"]);
      const createdDate = new Date(d["Created Date"]);
      d["Posting Date"] = postingDate.toLocaleDateString("en-US");
      d["Created Date"] = createdDate.toLocaleDateString("en-US");
      return { ...d, id: index };
    });
  };

  const getColumns = (data) => {
    if (!data || data.length === 0) {
      return [];
    }

    const sampleItem = data[0];
    return Object.keys(sampleItem).map((key) => ({
      field: key,
      header: key,
    }));
  };
  const onColumnToggle = (index) => {
    const updatedColumns = [...columns];
    updatedColumns[index] = {
      ...updatedColumns[index],
      selected: !updatedColumns[index].selected,
    };
    setColumns(updatedColumns);
    const selectedColumns = updatedColumns.filter((col) => col.selected);
    setVisibleColumns(selectedColumns);
  };

  const areAllColumnsSelected = () => {
    return columns.every((column) => column.selected);
  };

  const handleCheckAll = () => {
    const allSelected = areAllColumnsSelected();
    const updatedColumns = columns.map((column) => ({
      ...column,
      selected: !allSelected,
    }));
    setColumns(updatedColumns);
    setVisibleColumns(updatedColumns.filter((col) => col.selected));
  };

  const exportToExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(customers);
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
    if (typeof value !== "string" || value === undefined) {
      value = "";
    } else {
      value = value.trim();
    }
    setColumnFilters((prevFilters) => ({
      ...prevFilters,
      [field]: {
        ...prevFilters[field],
        value,
      },
    }));
  };

  const getFilteredCustomers = () => {
    let filteredData = customers;

    filteredData = filteredData.filter((customer) =>
      Object.values(customer).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(globalFilterValue.toLowerCase())
      )
    );

    Object.entries(columnFilters).forEach(([field, { condition, value }]) => {
      if (value && value.trim() !== "") {
        switch (condition) {
          case "contains":
            filteredData = filteredData.filter(
              (customer) =>
                typeof customer[field] === "string" &&
                customer[field].toLowerCase().includes(value.toLowerCase())
            );
            break;
          case "equal":
            filteredData = filteredData.filter(
              (customer) =>
                typeof customer[field] === "string" &&
                customer[field].toLowerCase() === value.toLowerCase()
            );
            break;
          case "notEqual":
            filteredData = filteredData.filter(
              (customer) =>
                typeof customer[field] === "string" &&
                customer[field].toLowerCase() !== value.toLowerCase()
            );
            break;
          default:
            break;
        }
      }
    });

    return filteredData;
  };

  const renderHeader = () => {
    return (
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Heading
            textTransform="capitalize"
            color="mainBlue"
            pb="5px"
            fontWeight="700"
            fontSize="15px">
            SAREGAMA INDIA LIMITED
          </Heading>
          <Text fontWeight="600" fontSize="11px" color="textGray">
            Location - Karnataka Virgo Nagar{" "}
          </Text>
        </Box>
        {/* <Box>SAREGAMA INDIA LIMITED</Box> */}
        {/* <Box>Location - Karnataka Virgo Nagar</Box> */}
        {/* <Box
          sx={{
            "& button": {
              color: "#fff",
              padding: "7px 10px",
              fontSize: "14px",
              backgroundColor: "#003060",
            },
            "& button:hover": {
              bg: "rgb(0, 48, 96)",
              borderRadius: "5px",
            },
            "& button:hover span": {
              color: "white",
            },
          }}>
          <Button
            type="button"
            icon="pi pi-filter"
            label="Manage Column"
            outlined
            onClick={onOpenCustomManageModal}
            _hover={{
              color: "white",
            }}
          />
          <Modal
            isCentered
            isOpen={isOpenCustomManageModal}
            onClose={onCloseCustomManageModal}>
            <ModalOverlay backdropFilter="brightness(0.7) blur(4px)" />
            <ModalContent maxW="56rem">
              <ModalCloseButton color="#2c3038" size="lg" mt="8px" />
              <ModalHeader
                color="#2c3038"
                mb="4px"
                fontSize="17px"
                fontWeight="500"
                padding="15px 15px">
                Detailed View Column Settings
              </ModalHeader>
              <Divider orientation="horizontal" mb={6} />
              <ModalBody>
                <Box
                  style={{
                    marginBottom: "15px",
                  }}>
                  <Checkbox
                    isChecked={areAllColumnsSelected()}
                    onChange={handleCheckAll}>
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: 600,
                      }}>
                      Check All
                    </span>
                  </Checkbox>
                </Box>
                <Box
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                  }}>
                  {columns?.map((column, index) => (
                    <Box
                      key={index}
                      style={{
                        flex: "0 0 48%",
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#f7f7f7",
                        padding: "8px",
                        marginRight: "10px",
                        borderRadius: "5px",
                      }}>
                      <Box style={{ display: "flex", alignItems: "center" }}>
                        <Checkbox
                          isChecked={column.selected}
                          onChange={() => onColumnToggle(index)}
                          style={{
                            marginRight: "10px",
                          }}
                        />
                        <span>{column.header}</span>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </ModalBody>
              <Divider orientation="horizontal" mt={2} mb={2} />
              <ModalFooter>
                <Box
                  display="flex"
                  gap="9px"
                  sx={{
                    "& button": {
                      color: "#fff",
                      padding: "7px 10px",
                      fontSize: "14px",
                      fontWeight: "400px",
                    },
                  }}>
                  <Button
                    onClick={onCloseCustomManageModal}
                    type="button"
                    style={{
                      backgroundColor: "#dc3545",
                    }}>
                    Close
                  </Button>
                </Box>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box> */}
        <Box display="flex" alignItems="center" gap="15px">
          {/* <Box
              as="span"
              border="1px solid var(--chakra-colors-borderGrayLight)"
              borderRadius="5px"
              position="relative"
              sx={{
                "& .pi.pi-search": {
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                },
                "& .search_input": {
                  padding: "7px",
                  // width: "465px", // Set width here
                },
              }}>
              <i className="pi pi-search" />
              <InputText
                className="search_input"
                value={globalFilterValue}
                onChange={onGlobalFilterChange}
                placeholder="Keyword Search"
              />
            </Box> */}
          <Box
            sx={{
              "& button": {
                color: "#fff",
                padding: "7px 10px",
                fontSize: "14px",
                backgroundColor: "#003060",
              },
              "& button:hover": {
                bg: "rgb(0, 48, 96)",
                borderRadius: "5px",
              },
              "& button:hover span": {
                color: "white",
              },
            }}>
            <Button
              type="button"
              icon="pi pi-filter"
              label="Manage Column"
              outlined
              onClick={onOpenCustomManageModal}
              _hover={{
                color: "white",
              }}
            />
            <Modal
              isCentered
              isOpen={isOpenCustomManageModal}
              onClose={onCloseCustomManageModal}>
              <ModalOverlay backdropFilter="brightness(0.7) blur(4px)" />
              <ModalContent maxW="56rem">
                <ModalCloseButton color="#2c3038" size="lg" mt="8px" />
                <ModalHeader
                  color="#2c3038"
                  mb="4px"
                  fontSize="17px"
                  fontWeight="500"
                  padding="15px 15px">
                  Detailed View Column Settings
                </ModalHeader>
                <Divider orientation="horizontal" mb={6} />
                <ModalBody>
                  <Box
                    style={{
                      marginBottom: "15px",
                    }}>
                    <Checkbox
                      isChecked={areAllColumnsSelected()}
                      onChange={handleCheckAll}>
                      <span
                        style={{
                          fontSize: "15px",
                          fontWeight: 600,
                        }}>
                        Check All
                      </span>
                    </Checkbox>
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                    }}>
                    {columns?.map((column, index) => (
                      <Box
                        key={index}
                        style={{
                          flex: "0 0 48%",
                          marginBottom: "10px",
                          display: "flex",
                          alignItems: "center",
                          backgroundColor: "#f7f7f7",
                          padding: "8px",
                          marginRight: "10px",
                          borderRadius: "5px",
                        }}>
                        <Box style={{ display: "flex", alignItems: "center" }}>
                          <Checkbox
                            isChecked={column.selected}
                            onChange={() => onColumnToggle(index)}
                            style={{
                              marginRight: "10px",
                            }}
                          />
                          <span>{column.header}</span>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </ModalBody>
                <Divider orientation="horizontal" mt={2} mb={2} />
                <ModalFooter>
                  <Box
                    display="flex"
                    gap="9px"
                    sx={{
                      "& button": {
                        color: "#fff",
                        padding: "7px 10px",
                        fontSize: "14px",
                        fontWeight: "400px",
                      },
                    }}>
                    <Button
                      onClick={onCloseCustomManageModal}
                      type="button"
                      style={{
                        backgroundColor: "#dc3545",
                      }}>
                      Close
                    </Button>
                  </Box>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>

          <Menu>
            <MenuButton
              color="#000"
              padding="7px 10px"
              fontSize="14px"
              borderRadius="5px"
              backgroundColor="#e4e4e4"
              _hover={{
                bg: "rgb(0, 48, 96)",
                color: "#ffffff",
                borderRadius: "5px",
              }}>
              <DownloadIcon w="20px" h="15px" /> Download Report
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
                <Box as="span">Download Table Report</Box>
              </MenuItem>
              <MenuItem
                fontSize="13px"
                fontWeight="600"
                height="35px"
                onClick={onOpenDownloadReportModal}>
                <Box minW="25px">
                  <FontAwesomeIcon icon={faFileExcel} />
                </Box>
                <Box as="span">Download Report By Date</Box>
              </MenuItem>
              <Modal
                isCentered
                size="xl"
                isOpen={isOpenDownloadReportModal}
                onClose={onCloseDownloadReportModal}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader
                    bg="var(--chakra-colors-mainBlue)"
                    color="white"
                    mb="10px"
                    fontSize="15px"
                    fontWeight="500"
                    padding="15px 15px">
                    Download Report by Date Range
                  </ModalHeader>
                  <ModalCloseButton color="white" size="lg" mt="8px" />
                  <ModalBody>
                    <Box
                      display="flex"
                      flexDirection="column"
                      sx={{
                        "& .p-calendar": {
                          border: "1px solid #ccc",
                          width: "100%",
                          borderRadius: "5px",
                        },
                        "& .p-calendar input": {
                          height: "30px",
                        },
                      }}>
                      <Text fontWeight="600" mb="5px" fontSize="14px">
                        Select Your Date - Range
                      </Text>
                      <Calendar
                        value={dates}
                        onChange={(e) => setDates(e.value)}
                        selectionMode="range"
                        readOnlyInput
                        hideOnRangeSelection
                      />
                    </Box>
                  </ModalBody>

                  <ModalFooter>
                    <button
                      colorScheme="blue"
                      mr={3}
                      onClick={onCloseDownloadReportModal}>
                      Close
                    </button>
                    <button variant="ghost">Secondary Action</button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </MenuList>
          </Menu>

          <Box
            sx={{
              "& button": {
                color: "#000",
                padding: "7px 10px",
                fontSize: "14px",
                backgroundColor: "#e4e4e4",
              },
              "& button:hover": {
                bg: "rgb(0, 48, 96)",
                borderRadius: "5px",
              },
              "& button:hover span": {
                color: "white",
              },
            }}>
            <Button
              type="button"
              icon="pi pi-filter-slash"
              label="Clear"
              outlined
              onClick={clearFilter}
              _hover={{
                color: "white",
              }}
            />
          </Box>
          <Box
            sx={{
              "& button": {
                color: "#fff",
                padding: "7px 10px",
                fontSize: "14px",
                backgroundColor: "#003060",
              },
              "& button:hover": {
                bg: "rgb(0, 48, 96)",
                borderRadius: "5px",
              },
              "& button:hover span": {
                color: "white",
              },
            }}>
            <Button
              type="button"
              icon="pi pi-filter"
              label="Advanced Search"
              outlined
              onClick={onOpenFilterModal}
              _hover={{
                color: "white",
              }}
            />
            <Modal
              isCentered
              isOpen={isOpenFilterModal}
              onClose={onCloseFilterModal}>
              <ModalOverlay backdropFilter="brightness(0.7) blur(4px)" />
              <ModalContent maxW="56rem">
                <ModalCloseButton color="#2c3038" size="lg" mt="8px" />
                <ModalHeader
                  color="#2c3038"
                  mb="4px"
                  fontSize="17px"
                  fontWeight="500"
                  padding="15px 15px">
                  Advanced Filter
                </ModalHeader>
                <Divider orientation="horizontal" mb={6} />
                <ModalBody>
                  {visibleColumns.map((column, index) => (
                    <Box
                      key={column.field}
                      sx={{
                        backgroundColor: index % 2 === 0 ? "#e7ebef" : "white",
                        padding: "4px 13px",
                      }}>
                      <Box
                        display="flex"
                        gap="20px"
                        alignItems="center"
                        sx={{
                          "& button": {
                            color: "#003060",
                            padding: "3px 5px",
                            backgroundColor: "#00306026",
                          },
                        }}>
                        <Button
                          icon="pi pi-heart"
                          rounded
                          severity="help"
                          aria-label="Favorite"
                        />
                        <Text
                          color="var(--chakra-colors-textBlack)"
                          fontWeight="400"
                          fontSize="14px"
                          mt="15px"
                          mb="5px"
                          flex="1">
                          {column.header}
                        </Text>
                        <Select
                          placeholder="Select option"
                          size="lg"
                          fontSize="14px"
                          h="35px"
                          flex="1"
                          border="1px solid rgb(201 201 201)"
                          borderRadius="8px"
                          value={columnFilters[column.field]?.condition || ""}
                          onChange={(e) =>
                            handleColumnFilterConditionChange(
                              column.field,
                              e.target.value
                            )
                          }>
                          <option value="contains">Contains</option>
                          <option value="equal">Equal</option>
                          <option value="notEqual">Not Equal</option>
                        </Select>
                        <Input
                          h="35px"
                          fontSize="14px"
                          padding="10px 10px"
                          flex="1"
                          borderRadius="8px"
                          border="1px solid rgb(201 201 201)"
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
                  ))}
                </ModalBody>
                <Divider orientation="horizontal" mt={2} mb={2} />
                <ModalFooter>
                  <Box
                    display="flex"
                    gap="9px"
                    sx={{
                      "& button": {
                        color: "#fff",
                        padding: "7px 10px",
                        fontSize: "14px",
                        fontWeight: "400px",
                        backgroundColor: "#003060",
                      },
                    }}>
                    <Button type="button" onClick={onCloseFilterModal}>
                      Reset
                    </Button>

                    <Button type="button">Search</Button>
                  </Box>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
          {/* <Box
            sx={{
              "& button": {
                color: "#000",
                padding: "7px 10px",
                fontSize: "14px",
                backgroundColor: "#e4e4e4",
              },
              "& button:hover": {
                bg: "rgb(0, 48, 96)",
                borderRadius: "5px",
              },
              "& button:hover span": {
                color: "white",
              },
            }}>
            <Button
              type="button"
              icon="pi pi-chart-bar"
              label="Graph View"
              onClick={onOpenGraphViewModal}
              outlined
              _hover={{
                color: "white",
              }}
            />
            <Drawer
              isOpen={isOpenGraphViewModal}
              placement="right"
              onClose={onCloseGraphViewModal}
              size="xl">
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Graph Setting</DrawerHeader>

                <DrawerBody></DrawerBody>

                <DrawerFooter>
                  <Button
                    variant="outline"
                    mr={3}
                    onClick={onCloseGraphViewModal}>
                    Cancel
                  </Button>
                  <Button colorScheme="blue">Save</Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Box> */}
          <Box position="fixed" bottom="30px" right="30px" zIndex="9999">
            <Box padding="8px">
              <Box
                sx={{
                  "& button": {
                    color: "#fff",
                    padding: "10px",
                    fontSize: "18px",
                    backgroundColor: "#003060",
                    borderRadius: "50%",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    border: "none",
                    cursor: "pointer",
                  },
                  "& button:hover": {
                    backgroundColor: "#001f3f",
                  },
                  "& button:hover span": {
                    color: "white",
                  },
                }}>
                <Button
                  type="button"
                  icon="pi pi-chart-bar"
                  aria-label="Graph View"
                  _hover={{
                    color: "white",
                  }}
                  onClick={onOpenGraphViewModal}
                />
                <Drawer
                  isOpen={isOpenGraphViewModal}
                  placement="right"
                  onClose={onCloseGraphViewModal}
                  size="xl">
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Graph Setting</DrawerHeader>

                    <DrawerBody></DrawerBody>

                    <DrawerFooter>
                      <Button
                        variant="outline"
                        mr={3}
                        onClick={onCloseGraphViewModal}>
                        Cancel
                      </Button>
                      <Button colorScheme="blue">Save</Button>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </Box>
            </Box>
          </Box>

          {/* <Link to="/reports/profit-and-loss/graph-view">
            <Box
              sx={{
                "& button": {
                  color: "#000",
                  padding: "7px 10px",
                  fontSize: "14px",
                  backgroundColor: "#e4e4e4",
                },
                "& button:hover": {
                  bg: "rgb(0, 48, 96)",
                  borderRadius: "5px",
                },
                "& button:hover span": {
                  color: "white",
                },
              }}>
              <Button
                type="button"
                icon="pi pi-chart-bar"
                label="Graph View"
                outlined
                _hover={{
                  color: "white",
                }}
              />
            </Box>
          </Link> */}
        </Box>
      </Box>
    );
  };

  const clearFilter = () => {
    setGlobalFilterValue("");
  };

  const onGlobalFilterChange = (e) => {
    setGlobalFilterValue(e.target.value);
    dataTable.current.filter(e.target.value, "contains");
  };

  const header = renderHeader();

  const loadCarsLazy = (event) => {
    if (!customers) return;
    const { first } = event;
    setFirst(first);
    const remainingRows = totalRecords - first;
    const loadMoreRows = Math.min(remainingRows, 10);
    setRows(loadMoreRows);
    setLazyLoading(true);
    setTimeout(() => {
      setLazyLoading(false);
    }, Math.random() * 1000 + 250);
  };
  const loadingTemplate = (options) => {
    return (
      <div
        className="flex align-items-center"
        style={{
          height: "17px",
          flexGrow: "1",
          overflow: "hidden",
          justifyContent: "center",
        }}>
        <Skeleton
          width={
            options.cellEven
              ? options.field === "year"
                ? "30%"
                : "40%"
              : "60%"
          }
          height="1rem"
        />
      </div>
    );
  };

  return (
    <CssWrapper>
      <Box
        className="card"
        background="var(--chakra-colors-white)"
        style={{
          width: "100%",
          overflowX: "auto",
          borderRadius: "12px",
          padding: "9px",
        }}>
        <DataTable
          ref={dataTable}
          value={getFilteredCustomers()}
          first={first}
          rows={rows}
          loading={loading}
          // dataKey='id'
          header={renderHeader()}
          scrollable
          virtualScrollerOptions={{
            lazy: true,
            onLazyLoad: loadCarsLazy,
            itemSize: 46,
            delay: 200,
            showLoader: true,
            loading: lazyLoading,
            loadingTemplate,
          }}
          tableStyle={{ minWidth: "50rem"}}
          emptyMessage="No customers found."
          globalFilter={globalFilterValue}>
          {visibleColumns.map((col) => (
            <Column
              key={col.field}
              field={col.field}
              header={col.header.toUpperCase()}
              sortable
              style={{
                minWidth: "150px",
                color: col.field === "Branch" && "#0771da",
              }}
            />
          ))}
        </DataTable>
      </Box>
    </CssWrapper>
  );
};

export default CustomTable;
