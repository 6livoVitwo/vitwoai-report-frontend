import React, { useState, useEffect } from 'react';
import { Box, Heading, Flex, Button } from '@chakra-ui/react';
import ReportsCards from '../dashboard/components/ReportsCards';
//Add lotifies dummy json
import purchaseProductWise from '../../asset/imgs/purchase-product-wise.json';
import purchaseVendorWise from '../../asset/imgs/purchase-vendor-wise.json';
import purchasePoWise from "../../asset/imgs/purchase-po-wise.json";
import salesProductWise from "../../asset/imgs/sales-product-wise.json";
import salesCustomerWise from "../../asset/imgs/sales-customer-wise.json";
import salesVerticalWise from '../../asset/imgs/sales-vertical-wise.json';
import salesSoWise from '../../asset/imgs/sales-so-wise.json';
import salesKamWise from '../../asset/imgs/sales-kam-wise.json';
import salesRegionWise from '../../asset/imgs/sales-region-wise.json';
import purchaseFunctionalWise from "../../asset/imgs/purchase-functional-Wise.json";
import { faArrowUpLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetAllReportsProductQuery } from "../allreports/slice/allreportsAPi";
import { useGetAllReportsVendorQuery } from "../allreports/slice/allreportsAPi";
import { useGetAllReportsSalesProductQuery } from "../allreports/slice/allreportsAPi";
import { useGetAllReportsSalesCustomerQuery } from "../allreports/slice/allreportsAPi";
import { useGetAllReportsSalesKamQuery } from "../allreports/slice/allreportsAPi";


const Allreports = () => {
	const [cardsData, setCardsData] = useState([
		{
			"card catagory": "Receivable",
			cards: [
				{
					id: "27",
					name: "Receivable",
					link: "/reports/receivable-customer/table-view",
					imgsrc: purchaseProductWise,
					description: "Receivable is the highest Receivable in last 30 days",
				},
			],
		},
		{
			"card catagory": "Purchase Register",
			cards: [
				{
					id: "9",
					name: "Product",
					link: "/reports/purchase-product-wise/table-view",
					imgsrc: purchaseProductWise,
					description: "",
				},
				{
					id: "10",
					name: "Vendor",
					link: "/reports/purchase-vendor-wise/table-view",
					imgsrc: purchaseVendorWise,
					description: "",
				},
				{
					id: "11",
					name: "Purchase Order",
					link: "/reports/purchase-po-wise/table-view",
					imgsrc: purchasePoWise,
					description: "TVSBIKE is the highest purchased order in last 30 days",
				},
				{
					id: "12",
					name: "Functional Area",
					link: "/reports/purchase-functional-wise/table-view",
					imgsrc: purchaseFunctionalWise,
					description: "TVSBIKE is the highest purchased functional area in last 30 days",
				},
				{
					id: "13",
					name: "Storage Location",
					link: "/reports/purchase-storage-location-wise/table-view",
					imgsrc: purchaseFunctionalWise,
					description: "TVSBIKE is the highest purchased functional area in last 30 days",
				},
				{
					id: "14",
					name: "Cost Center",
					link: "/reports/purchase-cost-center-wise/table-view",
					imgsrc: purchaseFunctionalWise,
					description: "TVSBIKE is the highest purchased functional area in last 30 days",
				},
			],
		},
		{
			"card catagory": "Sales Register",
			cards: [
				{
					id: "21",
					name: "Product",
					link: "/reports/sales-product-wise/table-view",
					imgsrc: salesProductWise,
					description: ""
				},
				{
					id: "22",
					name: "Customer",
					link: "/reports/sales-customer-wise/table-view",
					imgsrc: salesCustomerWise,
					description: ""
				},
				{
					id: "23",
					name: "Vertical",
					link: "/reports/sales-vertical-wise/table-view",
					imgsrc: salesVerticalWise,
					description: "TVSBIKE is the highest sales vaertical in last 30 days",
				},
				{
					id: "24",
					name: "Sales Order",
					link: "/reports/sales-so-wise/table-view",
					imgsrc: salesSoWise,
					description: "TVSBIKE is the highest sales order in last 30 days",
				},
				{
					id: "25",
					name: "Key Account Manager",
					link: "/reports/sales-kam-wise/table-view",
					imgsrc: salesKamWise,
					description: ""
				},
				{
					id: "26",
					name: "Region",
					link: "/reports/sales-region-wise/table-view",
					imgsrc: salesRegionWise,
					description: "TVSBIKE is the highest sales region in last 30 days",
				},
			],
		},
	]);

	// api call allReports product
	const { data: allReports } = useGetAllReportsProductQuery();
	// api call allReports vendor
	const { data: allReportsVendor } = useGetAllReportsVendorQuery();
	// api call allReports sales product
	const { data: allReportsSalesProduct } = useGetAllReportsSalesProductQuery();
	// api call allReports sales customer
	const { data: allReportsSalesCustomer } = useGetAllReportsSalesCustomerQuery();
	// api call allReports sales kam
	const { data: allReportsSalesKam } = useGetAllReportsSalesKamQuery();

	// Dynamically update descriptions Purchase Register
	useEffect(() => {
		if (allReports && allReportsVendor) {
			setCardsData((prevCardsData) =>
				prevCardsData.map((category) => {
					if (category["card catagory"] === "Purchase Register") {
						return {
							...category,
							cards: category.cards.map((card) => {
								if (card.name === "Product") {
									return {
										...card,
										description: allReports.desc,
									};
								}
								if (card.name === "Vendor") {
									return {
										...card,
										description: allReportsVendor.desc,
									};
								}
								return card;
							}),
						};
					}
					return category;
				})
			);
		}
	}, [allReports, allReportsVendor]);

	// // Dynamically update descriptions sales Register
	useEffect(() => {
		if (allReportsSalesProduct && allReportsSalesCustomer && allReportsSalesKam) {
			setCardsData((prevCardsData) =>
				prevCardsData.map((category) => {
					if (category["card catagory"] === "Sales Register") {
						return {
							...category,
							cards: category.cards.map((card) => {
								if (card.name === "Product") {
									return {
										...card,
										description: allReportsSalesProduct.desc,
									};
								}
								if (card.name === "Customer") {
									return {
										...card,
										description: allReportsSalesCustomer.desc,
									};
								}
								if (card.name === "Key Account Manager") {
									return {
										...card,
										description: allReportsSalesKam.desc,
									};
								}
								return card;
							}),
						};
					}
					return category;
				})
			);
		}
	}, [allReports, allReportsVendor]);



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
				justifyContent='center'
				bg='#ffffff'
				position='sticky'
				top='0'
				zIndex='1'
			>
				<Flex
					direction='row'
					align='center'
					maxW='800px'
					margin='2rem 0rem'
					overflowX='auto'>
					{cardsData.map((data, index) => {
						return (
							<Button
								key={`${index}-${data.name}`}
								size='md'
								fontSize='14px'
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
								textColor="#646262"
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
						)
					})}
				</Flex>
			</Box>

			{cardsData.map((data, index) => {
				return (
					<Box
						color='mainBlue'
						mb='50px'
						mt='20px'
						paddingLeft='10px'
						key={index}
						id={data['card catagory']}>
						<Box mb='15px'
							display='flex'
							justifyContent='space-between'
							gap='50px'
							height='55px'
							borderBottom={'1px solid #c4c4c475'}
							borderBottomRadius={'5px'}
							alignItems='center'
						>
							<Heading
								display='flex'
								alignItems='center'
								fontWeight='500'
								lineHeight='1.33'
								fontSize='22px'
								paddingLeft='2rem'>
								{data['card catagory']}
							</Heading>
							{data['card catagory'] !== 'Receivable' && (
								<Box
									display='flex'
								>
									<Box
										background="#a5e6b7fa"
										color="#0c8f3c"
										borderRadius="5px"
										height="30px"
										width="auto"
										p='6px'
										display="flex"
										alignItems="center"
										gap="4px"
									>
										<FontAwesomeIcon icon={faArrowUpLong} fontSize="14px" style={{
											marginBottom: "4px",
										}} />
										<span style={{ fontWeight: "600", fontSize: "14px" }} >40%</span>
									</Box>
									<Box
										p='5px'
										mr='25px'
										fontSize='12px'
									>
										<span>Increased compared to last month</span><br />
										<span style={{ fontWeight: "500" }}>Current month € 50,000</span>
									</Box>
								</Box>
							)}
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
