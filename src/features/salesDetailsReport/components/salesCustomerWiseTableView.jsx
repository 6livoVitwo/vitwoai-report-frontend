import React, { useState, useEffect } from 'react';
import CustomTable from './salesCustomerWiseCustomTable';
import { Box, Spinner, Image } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useCustomerDetailSalesQuery } from '../slice/salesCustomerDetailsApi';
import NoDataFound from '../../../asset/images/nodatafound.png';

const SalesDetailedTableView = () => {
	const authData = useSelector((state) => state.auth);
	const [page, setPage] = useState(1);
	const [filters, setFilters] = useState([
		// { column: 'company_id', operator: 'equal', type: 'integer', value: 1 },
		// { column: 'branch_id', operator: 'equal', type: 'integer', value: 1 },
		// { column: 'location_id', operator: 'equal', type: 'integer', value: 1 },
	]);
	
	const [dateRange, setDateRange] = useState();
	const [individualItems, setIndividualItems] = useState([]);
	const {
		data: sales,
		isLoading,
		isFetching,
	} = useCustomerDetailSalesQuery({
		filters,
		page,
		authDetails: authData.authDetails,
	});

	const salesData = sales?.content;
	const pageInfo = sales?.lastPage;

	const flattenObject = (obj, prefix = '') => {
		let result = {};
		for (let key in obj) {
			if (typeof obj[key] === 'object' && obj[key] !== null) {
				if (Array.isArray(obj[key])) {
					obj[key].forEach((item, index) => {
						Object.assign(
							result,
							flattenObject(item, `${prefix}${key}[${index}].`)
						);
					});
				} else {
					Object.assign(
						result,
						flattenObject(obj[key], `${prefix}${key}.`)
					);
				}
			} else {
				result[`${prefix}${key}`] = obj[key];
			}
		}
		return result;
	};

	useEffect(() => {
		if (salesData) {
			let items = [];

			salesData.forEach((invoice) => {
				const flattenedInvoice = flattenObject(invoice);
				if (invoice.items && invoice.items.length > 0) {
					invoice.items.forEach((item) => {
						const flattenedItem = flattenObject(item, 'item.');
						items.push({ ...flattenedInvoice, ...flattenedItem });
					});
				} else {
					items.push(flattenedInvoice);
				}
			});

			setIndividualItems(items);
		}
	}, [sales]);

	const extractFields = (data) => ({
		'SO InvoiceId': data.soInvoiceId,
		'Customer Code': data.customer_code,
		'Customer Name': data.trade_name,
		'Bill-Add': data.customer_billing_address,
		'Ship-Add': data.customer_shipping_address,
		'GST No': data.customer_gstin,
		'State Name': data.customer_address_state,
		'State Code': data.customer_address_state_code,
		'Batch No': '',
		'Batch Date (Received Date)': '',
		'Item Code': data.item?.itemCode,
		'Item Name': data.item?.itemName,
		'Item Description': data.itemDesc,
		'Item Group': data.goodGroupName || '',
		Unit: data.uomName || '',
		HSN: data.hsnCode || '',
		'GST %': data.tax,
		MRP: data.unitPrice || '',
		'Trade Discount %': data.totalDiscount,
		'Trade Discount Value': data.totalDiscountAmt || '',
		Currency: data.currency_name || '',
		'Quotation No': data.quotation_no,
		'Quotation Date': data.posting_date,
		'Quotation Qty': '',
		'Quotation Value': data.totalAmount,
		'Quotation Created On': data.created_at,
		'Quotation Created By': data.created_by_value,
		'Quotation Accepted On': '',
		'SO No': '',
		'SO Date': '',
		'SO Qty': '',
		'SO Rate': '',
		'SO Value': '',
		'SO Created On': '',
		'SO Created By': '',
		'PGI No': '', // Need additional logic for PGI details
		'PGI Date': '',
		'PGI Created On': '',
		'PGI Created By': '',
		'Delivery No': '', // Need additional logic for delivery details
		'Delivery Date': '',
		'Delivery Qty': '',
		'Delivery Value': '',
		'Delivery Created On': '',
		'Delivery Created By': '',
		'Delivery Remarks': '',
		'Invoice No': data.invoice_no || '',
		'Invoice Date': data.invoice_date || '',
		'Invoice Qty': '',
		'Invoice Rate': '',
		'Invoice Value': data.all_total_amt || '',
		'Invoice Created On': data.created_at || '',
		'Invoice Created By': data.created_by || '',
		'Collection Status': '',
		'Collection Mode': '',
		'Collect in Bank': '',
		'Collected On': '',
	});

	const newArray = individualItems.map(extractFields);

	return (
		<Box>
			{isLoading ? (
				<Box
					height='calc(100vh - 75px)'
					width='100%'
					display='flex'
					alignItems='center'
					justifyContent='center'>
					<Spinner
						thickness='4px'
						speed='0.65s'
						emptyColor='gray.200'
						color='blue.500'
						size='xl'
					/>
				</Box>
			) : individualItems.length > 0 ? (
				<CustomTable
					newArray={newArray}
					page={page}
					dateRange={dateRange}
					setDateRange={setDateRange}
					setPage={setPage}
					isFetching={isFetching}
					pageInfo={pageInfo}
				/>
			) : (
				<Box
					bg='white'
					width='100%'
					height='calc(100vh - 103px)'
					display='flex'
					alignItems='center'
					justifyContent='center'>
					<Image src={NoDataFound} alt='No Data Available' />
				</Box>
			)}
		</Box>
	);
};

export default SalesDetailedTableView;
