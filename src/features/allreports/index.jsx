import React, { useState } from 'react';
import { Box, Heading, Flex, Button } from '@chakra-ui/react';
import ReportsCards from '../dashboard/components/ReportsCards';
import TransactionalDayBookImage from '../../asset/images/Transactional-Day-Book.png';
import BalanceSheet from '../../asset/images/google-sheets.png';
import ProfitLoss from '../../asset/images/profit&loss.png';
import TrialBalance from '../../asset/images/trial-balance.png';
import Receivable from '../../asset/images/receivable.png';
import Payable from '../../asset/images/payable.png';
import InventoryAgeingIssue from '../../asset/images/Inventory-Ageing(IssueDate).png';
import InventoryAgeingReceived from '../../asset/images/Inventory-Ageing (ReceivedDate).png';
import ProductWise from '../../asset/images/products-wise.png';
import VendorWise from '../../asset/images/vendor-wise.png';
import PoWise from '../../asset/images/po-wise.png';
import ProductionOrder from '../../asset/images/product-order.png';
import ProductionOrderTracking from '../../asset/images/product-order-tracking.png';
import TdsSectionWise from '../../asset/images/section-wise.png';
import TdsVendorWise from '../../asset/images/tds-vendor-wise.png';
import TdsReturn from '../../asset/images/tds-return.png';
import ExceptionReport from '../../asset/images/exception-reports.png';
import InventorystockReport from '../../asset/images/stock-report.png';
import InventoryStocklog from '../../asset/images/stock-log.png';
import SpentAnalysis from '../../asset/images/spent-analysis.png';
import SalesproductWise from '../../asset/images/sales-product-wise.png';
import SalesCustomerWise from '../../asset/images/sales-customer-wise.png';
import SalesVerticalWise from '../../asset/images/sales-vertical-wise.png';
import SalesSoWise from '../../asset/images/sales-so-wise.png';

const Allreports = () => {
	const cardsData = [
		{
			'card catagory': 'Accounting Reports',
			cards: [
				{
					id: '1',
					name: 'Transactional Day Book',
					link: '/reports/transactional-day-book/table-view',
					imgsrc: TransactionalDayBookImage,
				},
				{
					id: '2',
					name: 'Balance Sheet',
					link: '/reports/balance-sheet/table-view',
					imgsrc: BalanceSheet,
				},
				{
					id: '3',
					name: 'Profit and Loss',
					link: '/reports/profit-and-loss/table-view',
					imgsrc: ProfitLoss,
				},
				{
					id: '4',
					name: 'Trial Balance',
					link: '/reports/trial-balance/table-view',
					imgsrc: TrialBalance,
				},
			],
		},
		{
			'card catagory': 'Ageing Analysis',
			cards: [
				{
					id: '5',
					name: 'Receivable',
					link: '/reports/receivable/table-view',
					imgsrc: Receivable,
				},
				{
					id: '6',
					name: 'Payable',
					link: '/reports/payable/table-view',
					imgsrc: Payable,
				},
				{
					id: '7',
					name: 'Inventory Ageing (Issue Date)',
					link: '/reports/inventory-ageing-issue-date/table-view',
					imgsrc: InventoryAgeingIssue,
				},
				{
					id: '8',
					name: 'Inventory Ageing (Received Date)',
					link: '/reports/inventory-ageing-received-date/table-view',
					imgsrc: InventoryAgeingReceived,
				},
			],
		},
		{
			'card catagory': 'Purchase Register',
			cards: [
				{
					id: '9',
					name: 'Product Wise',
					link: '/reports/product-wise/table-view',
					imgsrc: ProductWise,
				},
				{
					id: '10',
					name: 'Vendor Wise',
					link: '/reports/vendor-wise/table-view',
					imgsrc: VendorWise,
				},
				{
					id: '11',
					name: 'PO Wise',
					link: '/reports/po-wise/table-view',
					imgsrc: PoWise,
				},
			],
		},

		{
			'card catagory': 'Production Report',
			cards: [
				{
					id: '12',
					name: 'Production Order',
					link: '/reports/production-order/table-view',
					imgsrc: ProductionOrder,
				},
				{
					id: '13',
					name: 'Production Order Tracking',
					link: '/reports/production-order-tracking/table-view',
					imgsrc: ProductionOrderTracking,
				},
			],
		},
		{
			'card catagory': 'TDS Report',
			cards: [
				{
					id: '14',
					name: 'Section Wise',
					link: '/reports/section-wise/table-view',
					imgsrc: TdsSectionWise,
				},
				{
					id: '15',
					name: 'Vendor Wise',
					link: '/reports/vendor-wise/table-view',
					imgsrc: TdsVendorWise,
				},
				{
					id: '16',
					name: 'TDS Return',
					link: '/reports/tds-return/table-view',
					imgsrc: TdsReturn,
				},
			],
		},
		{
			'card catagory': 'Exception Report',
			cards: [
				{
					id: '17',
					name: 'Exception Report',
					link: '/reports/exception-report/table-view',
					imgsrc: ExceptionReport,
				},
			],
		},
		{
			'card catagory': 'Inventory Report',
			cards: [
				{
					id: '18',
					name: 'Stock Report',
					link: '/reports/stock-report/table-view',
					imgsrc: InventorystockReport,
				},
				{
					id: '19',
					name: 'Stock Log',
					link: '/reports/stock-log/table-view',
					imgsrc: InventoryStocklog,
				},
			],
		},
		{
			'card catagory': 'Spent Analysis',
			cards: [
				{
					id: '20',
					name: 'Spent Analysis',
					link: '/reports/spent-analysis/table-view',
					imgsrc: SpentAnalysis,
				},
			],
		},
		{
			'card catagory': 'Sales Register',
			cards: [
				{
					id: '21',
					name: 'Product Wise',
					link: '/reports/sales-product-wise/table-view',
					imgsrc: SalesproductWise,
				},
				{
					id: '22',
					name: 'Customer Wise',
					link: '/reports/sales-customer-wise/table-view',
					imgsrc: SalesCustomerWise,
				},
				{
					id: '23',
					name: 'Vertical Wise',
					link: '/reports/sales-vertical-wise/table-view',
					imgsrc: SalesVerticalWise,
				},
				{
					id: '24',
					name: 'So Wise',
					link: '/reports/sales-so-wise/table-view',
					imgsrc: SalesSoWise,
				},
			],
		},
	];

	// *****************scrollbar types button**********************
	const handleButtonClick = (index, category) => {
		setActiveButton(index);
		const targetElement = document.getElementById(category);
		if (targetElement) {
			targetElement.scrollIntoView({ behavior: 'smooth' });
		}
	};
	const [activeButton, setActiveButton] = useState(null);
	return (
		<>
			<Box
				overflowX='auto'
				width='100%'
				display='flex'
				justifyContent='center'>
				<Flex
					direction='row'
					align='center'
					maxW='800px'
					overflowX='auto'>
					{cardsData.map((data, index) => (
						<Button
							key={index}
							size='md'
							fontSize='11px'
							fontWeight='normal'
							padding='15px 65px'
							borderRadius='md'
							borderColor={
								activeButton === index ? '#003060' : '#CBD5E0'
							}
							color={
								activeButton === index ? '#003060' : '#c6c6c6'
							}
							bg='transparent'
							borderWidth='1px'
							_hover={{
								bg:
									activeButton === index
										? '#003060'
										: '#f3f3f3',
								color:
									activeButton === index
										? '#ffffff'
										: '#003060',
								borderColor: '#b9b9b9',
							}}
							_focus={{
								boxShadow: 'none',
								borderColor: '#b9b9b9',
							}}
							onClick={() =>
								handleButtonClick(index, data['card catagory'])
							}
							mr='3'
							mb={6}>
							{data['card catagory']}
						</Button>
					))}
				</Flex>
			</Box>

			{cardsData.map((data, index) => {
				return (
					<Box
						color='mainBlue'
						mb='50px'
						mt='20px'
						key={index}
						id={data['card catagory']}>
						<Box mb='15px'>
							<Heading
								fontWeight='500'
								lineHeight='1.33'
								marginBottom='10px'
								fontSize='12px'
								color='rgb(184 182 182)'
								paddingBottom='5px'
								fontFamily='Montserrat, sans-serif'>
								{data['card catagory']}
							</Heading>
						</Box>
						<Box
							display='flex'
							width='100%'
							flexWrap='wrap'
							gap='15px'>
							<ReportsCards cards={data.cards} />
						</Box>
					</Box>
				);
			})}
		</>
	);
};

export default Allreports;
