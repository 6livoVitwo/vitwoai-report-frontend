import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import styled from '@emotion/styled';

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
		font-size: 1.2rem;
		font-weight: 600;
	}
	.p-datatable .p-datatable-tbody > tr > td {
		font-size: 1.2rem;
		color: var(--chakra-colors-textBlack);
		padding: 10px !important;
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
		background-color: #f0f3f5;
		color: var(--chakra-colors-mainBluemedium);
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
		border: 1px solid #ccc;
	}
	.p-datatable > .p-datatable-wrapper {
		height: calc(100vh - 275px);
		padding-right: 5px;
		margin-right: 5px;
	}
	.custom-sort-icon {
		color: white !important;
	}
`;

const CustomTable = () => {
	const [sales] = useState([
		{
			product: 'AVG LOGISTIC LTD',
			'INVOICE COUNT': 51,
			SALES: 40,
			'SALES WITH TAX': 54406,
		},
		{
			product: 'Charoen Pokhand Seeds Pvt LTD',
			'INVOICE COUNT': 83,
			SALES: 9,
			'SALES WITH TAX': 423132,
		},
		{
			product: 'Delhi Freight Pvt Ltd',
			'INVOICE COUNT': 38,
			SALES: 5,
			'SALES WITH TAX': 12321,
		},
		{
			product: 'Dobari Stone Crystal Plant',
			'INVOICE COUNT': 49,
			SALES: 22,
			'SALES WITH TAX': 745232,
		},
		{
			product: 'INDIGRID LIMITED',
			'INVOICE COUNT': 17,
			SALES: 79,
			'SALES WITH TAX': 643242,
		},
		{
			product: 'Logisticsnow Private Limited',
			'INVOICE COUNT': 52,
			SALES: 65,
			'SALES WITH TAX': 421132,
		},
	]);

	const invoiceCountBodyTemplate = (rowData) => {
		return `${rowData['INVOICE COUNT']}%`;
	};

	const salesTemplate = (rowData) => {
		return `${rowData.SALES}%`;
	};
	const salesWithTaxBodyTemplate = (rowData) => {
		return `${rowData['SALES WITH TAX']}%`;
	};

	const headerGroup = (
		<ColumnGroup>
			<Row>
				<Column header='Name' rowSpan={3} />
			</Row>
			<Row>
				<Column header='MAR 04 - MAR 10' colSpan={3} />
				<Column header='MAR 11 - MAR 17' colSpan={3} />
				<Column header='MAR 18 - MAR 20' colSpan={3} />
			</Row>
			<Row>
				<Column header='INVOICE COUNT' sortable field='lastYearSale' />
				<Column header='SALES' sortable field='thisYearSale' />
				<Column
					header='SALES WITH TAX'
					sortable
					field='lastYearProfit'
				/>
				<Column header='INVOICE COUNT' sortable field='lastYearSale' />
				<Column header='SALES' sortable field='thisYearSale' />
				<Column
					header='SALES WITH TAX'
					sortable
					field='lastYearProfit'
				/>
				<Column header='INVOICE COUNT' sortable field='lastYearSale' />
				<Column header='SALES' sortable field='thisYearSale' />
				<Column
					header='SALES WITH TAX'
					sortable
					field='lastYearProfit'
				/>
			</Row>
		</ColumnGroup>
	);

	const footerGroup = (
		<ColumnGroup>
			<Row>
				<Column
					footer='Totals:'
					colSpan={10}
					footerStyle={{ textAlign: 'right' }}
				/>
			</Row>
		</ColumnGroup>
	);

	return (
		<CssWrapper>
			<div className='card'>
				<DataTable
					value={sales}
					headerColumnGroup={headerGroup}
					footerColumnGroup={footerGroup}
					tableStyle={{ minWidth: '50rem' }}>
					<Column field='product' />
					<Column
						field='lastYearSale'
						body={invoiceCountBodyTemplate}
					/>
					<Column field='thisYearSale' body={salesTemplate} />
					<Column
						field='lastYearProfit'
						body={salesWithTaxBodyTemplate}
					/>
					<Column
						field='lastYearSale'
						body={invoiceCountBodyTemplate}
					/>
					<Column field='thisYearSale' body={salesTemplate} />
					<Column
						field='lastYearProfit'
						body={salesWithTaxBodyTemplate}
					/>
					<Column
						field='lastYearSale'
						body={invoiceCountBodyTemplate}
					/>
					<Column field='thisYearSale' body={salesTemplate} />
					<Column
						field='lastYearProfit'
						body={salesWithTaxBodyTemplate}
					/>
				</DataTable>
			</div>
		</CssWrapper>
	);
};

export default CustomTable;
