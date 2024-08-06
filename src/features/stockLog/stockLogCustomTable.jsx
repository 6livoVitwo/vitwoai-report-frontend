import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { MultiSelect } from 'primereact/multiselect';
import { CustomerService } from './service/CustomerService';
import styled from '@emotion/styled';
import { Box, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { InfoIcon } from '@chakra-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel, faFilePdf } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

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
  .p-datatable .p-sortable-column .p-column-title {
    font-size: 1.3rem;
  }
  .p-datatable .p-datatable-tbody > tr > td {
    font-size: 1.3rem;
    padding: 15px 10px;
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
    padding: 1px;
  }
  .p-datatable .p-datatable-header {
    border-top: none;
    background: white;
  }
  .p-datatable .p-datatable-thead > tr > th {
    background-color: #003060;
    color: white;
  }
  .p-datatable-tbody tr:nth-of-type(even) {
    background-color: #f0f3f5;
  }
  .p-input-icon-left > i:first-of-type {
    right: 0.75rem;
    color: #6b7280;
  }
  .p-datatable .p-datatable-thead > tr > th {
    text-wrap: nowrap;
    border-left: 1px solid white;
  }
  .p-datatable > .p-datatable-wrapper {
    overflow-x: scroll !important;
    height: calc(100vh - 325px);
    padding-right: 5px;
    margin-right: 5px;
  }
  .custom-sort-icon {
    color: white !important;
  }
`;

const StockLogCustomTable = () => {
  const [customers, setCustomers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [columns, setColumns] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState([]);
  const dataTable = useRef(null);

  useEffect(() => {
    setLoading(true);
    CustomerService.getCustomersMedium().then((data) => {
      setCustomers(getCustomers(data));
      setLoading(false);
      setColumns(getColumns(data));
      setVisibleColumns(getColumns(data)); // Set visibleColumns to include all columns initially
    });
  }, []);

  const getCustomers = (data) => {
    return [...(data || [])].map((d) => {
      const postingDate = new Date(d["Posting Date"]);
      const createdDate = new Date(d["Created Date"]);

      d["Posting Date"] = postingDate.toLocaleDateString("en-US");
      d["Created Date"] = createdDate.toLocaleDateString("en-US");

      return d;
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

  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    setVisibleColumns(selectedColumns);
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
  const exportToPdf = () => {
    const unit = "pt";
    const size = "A4";
    const orientation = "landscape";

    const doc = new jsPDF(orientation, unit, size);

    const table = document.getElementById("custom-table");
    doc.autoTable({ html: table });

    doc.save("customers.pdf");
  };

  const renderHeader = () => {
    return (
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box
          display="flex"
          gap="15px"
          sx={{
            "& .p-button-outlined": {
              color: "mainBlue",
              padding: "5px 10px",
              fontSize: "14px",
              border: "1px solid #003060",
            },
          }}>
          <Box
            border="1px solid var(--chakra-colors-borderGrayLight)"
            borderRadius="5px">
            <MultiSelect
              value={visibleColumns}
              options={columns}
              optionLabel="header"
              onChange={onColumnToggle}
              className="w-full sm:w-20rem"
              display="chip"
            />
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap="15px">
          <Box
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
              },
            }}>
            <i className="pi pi-search" />
            <InputText
              className="search_input"
              value={globalFilterValue}
              onChange={onGlobalFilterChange}
              placeholder="Keyword Search"
            />
          </Box>
          <Menu>
            <MenuButton
              color="#718296"
              padding="7px 10px"
              fontSize="14px"
              borderRadius="5px"
              border="1px solid #dee2e6"
              _hover={{
                bg: "rgb(0, 48, 96)",
                color: "#ffffff",
                borderRadius: "9px",
              }}>
              <InfoIcon w="30px" h="20px" /> Export File
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={exportToExcel}
                fontSize="13px"
                fontWeight="600">
                <Box minW="35px">
                  <FontAwesomeIcon icon={faFileExcel} />
                </Box>
                <Box as="span">Export Excel</Box>
              </MenuItem>
              <MenuItem fontSize="13px" fontWeight="600" onClick={exportToPdf}>
                <Box minW="35px">
                  <FontAwesomeIcon icon={faFilePdf} />
                </Box>
                <Box as="span">Export PDF</Box>
              </MenuItem>
            </MenuList>
          </Menu>

          <Box
            display="flex"
            gap="15px"
            sx={{
              "& .p-button-outlined": {
                color: "#718296",
                padding: "7px 10px",
                fontSize: "14px",
                border: "1px solid #dee2e6",
              },
              "&:hover": {
                bg: "rgb(0, 48, 96)",
                borderRadius: "9px",
              },
            }}>
            <Button
              type="button"
              icon="pi pi-filter-slash"
              label="Clear"
              outlined
              onClick={clearFilter}
            />
          </Box>
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

  return (
    <CssWrapper>
      <Box
        className="card"
        background="var(--chakra-colors-white)"
        style={{ width: "100%", overflowX: "auto" }}>
        <DataTable
          ref={dataTable}
          value={customers}
          paginator
          rows={10}
          loading={loading}
          dataKey="id"
          header={header}
          emptyMessage="No customers found."
          globalFilter={globalFilterValue}>
          {visibleColumns.map((col) => (
            <Column
              key={col.field}
              field={col.field}
              header={col.header}
              sortable
              style={{
                minWidth: "150px",
              }}
            />
          ))}
        </DataTable>
      </Box>
    </CssWrapper>
  );
};

export default StockLogCustomTable;
