import React, { useState, useEffect } from 'react';
import CustomTable from './salesCustomerWiseCustomTable';
import { Box, Spinner, Image } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useFetchSalesQuery } from '../slice/salesBySlice';
import NoDataFound from '../../../asset/images/nodatafound.png';

const SalesCustomerWiseTableView = () => {
	const authData = useSelector((state) => state.auth);
	const [page, setPage] = useState(1);
	const [individualItems, setIndividualItems] = useState([]);
	const {
		data: sales,
		isLoading,
		isFetching,
	} = useFetchSalesQuery({
		page,
		authDetails: authData.authDetails,
	});

	const salesData = sales?.content;

	// Extract relevant fields and flatten nested objects
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
		if (sales) {
			let items = [];

			salesData.forEach((invoice) => {
				const flattenedInvoice = flattenObject(invoice);
				if (invoice.items) {
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

	const extractFields = (item) => ({
		'Customer Code': item['customer.customer_code'],
		'Customer Name': item['customer.trade_name'],
		'Bill-Add': item['customer_billing_address'],
		'Ship-Add': item['customer_shipping_address'],
		'GST No': item['customer_gstin'],
		'State Name': '',
		'State Code': '',
		'Batch No': '',
		'Batch Date (Received Date)': '',
		'Item Code': item['item.itemCode'],
		'Item Name': item['item.itemName'],
		'Item Description': item['item.itemDesc'],
		'Item Group': item['item.goodsItems.goodsGroup.goodGroupName'] || '',
		Unit: item['item.uom.uomName'] || '',
		HSN: item['item.hsnCode'] || '',
		'GST%': item['tax'],
		MRP: item['item.unitPrice'] || '',
		'Trade Discount %': item['totalDiscount'],
		'Trade Discount Value': item['item.totalDiscountAmt'] || '',
		Currency: item['currency_name'] || '',
		'Quotation No': item['quotation_no'], // Need additional logic for quotation details
		'Quotation Date': item['posting_date'],
		'Quotation Qty': '',
		'Quotation Value': item['totalAmount'],
		'Quotation Created On': item['created_at'],
		'Quotation Created By': item['created_by_value'],
		'Quotation Accepted On': '',
		'SO No': '', // Need additional logic for sales order details
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
		'Invoice No': item['invoice_no'] || '',
		'Invoice Date': item['invoice_date'] || '',
		'Invoice Qty': '',
		'Invoice Rate': '',
		'Invoice Value': item['all_total_amt'] || '',
		'Invoice Created On': item['created_at'] || '',
		'Invoice Created By': item['created_by'] || '',
		'Collection Status': '',
		'Collection Mode': '',
		'Collect in Bank': '',
		'Collected On': '',
	});

	const newArray = individualItems.map(extractFields);
	console.log(newArray, 'newArray');

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
					individualItems={newArray}
					page={page}
					setPage={setPage}
					isFetching={isFetching}
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

export default SalesCustomerWiseTableView;
