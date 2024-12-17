import React, { useState, useEffect } from 'react';
import { Box, Heading, Flex, Button } from '@chakra-ui/react';
import { SkeletonText } from '@chakra-ui/react';
import ReportsCards from '../dashboard/components/ReportsCards';
//Add lotifies dummy json
import purchaseProductWise from '../../asset/imgs/purchase-product-wise.json';
import purchaseVendorWise from '../../asset/imgs/purchase-vendor-wise.json';
import purchasePoWise from "../../asset/imgs/purchase-po-wise.json";
import purchaseFunctionalWise from "../../asset/imgs/functional.json";
import purchaseStorageLocationWise from "../../asset/imgs/purchase-functional-Wise.json";
import salesProductWise from "../../asset/imgs/sales-product-wise.json";
import salesCustomerWise from "../../asset/imgs/sales-customer-wise.json";
import salesVerticalWise from '../../asset/imgs/sales-vertical-wise.json';
import salesSoWise from '../../asset/imgs/sales-so-wise.json';
import salesKamWise from '../../asset/imgs/sales-kam-wise.json';
import salesRegionWise from '../../asset/imgs/sales-region-wise.json';
import { faArrowUpLong, faArrowDownLong,faIndianRupeeSign} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetAllReportsProductQuery} from "../allreports/slice/allreportsAPi";
import { useGetAllReportsVendorQuery } from "../allreports/slice/allreportsAPi";
import { useGetAllReportsSalesProductQuery } from "../allreports/slice/allreportsAPi";
import { useGetAllReportsSalesCustomerQuery } from "../allreports/slice/allreportsAPi";
import { useGetAllReportsSalesKamQuery } from "../allreports/slice/allreportsAPi";
import { useGetAllReportsPoQuery } from "../allreports/slice/allreportsAPi";
import { useGetAllReportsSalesVerticalQuery } from "../allreports/slice/allreportsAPi";
import { useGetAllReportsSalesSoQuery } from "../allreports/slice/allreportsAPi";
import { useGetAllReportsSalesRegionQuery } from "../allreports/slice/allreportsAPi";
import { useGetAllReportsFunctionalQuery } from "../allreports/slice/allreportsAPi";
import { useGetAllReportsPurchasePercentageQuery } from "../allreports/slice/allreportsAPi";
import { useGetAllReportsSalesPercentageQuery } from "../allreports/slice/allreportsAPi"
import { current } from '@reduxjs/toolkit';


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
					description: "",
				},
				{
					id: "12",
					name: "Functional Area",
					link: "/reports/purchase-functional-wise/table-view",
					imgsrc: purchaseFunctionalWise,
					description: "",
				},
				{
					id: "13",
					name: "Storage Location",
					link: "/reports/purchase-storage-location-wise/table-view",
					imgsrc: purchaseStorageLocationWise,
					description: "",
				},
				{
					id: "14",
					name: "Cost Center",
					link: "/reports/purchase-cost-center-wise/table-view",
					imgsrc: purchaseFunctionalWise,
					description: "",
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
					description: "",
				},
				{
					id: "24",
					name: "Sales Order",
					link: "/reports/sales-so-wise/table-view",
					imgsrc: salesSoWise,
					description: "",
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
					description: "",
				},
			],
		},
	]);

	// api call allReports product
	const { data: allReports, isLoading: isLoadingProduct } = useGetAllReportsProductQuery();
	// api call allReports vendor
	const { data: allReportsVendor, isLoading: isLoadingVendor } = useGetAllReportsVendorQuery();
	// api call allReports purchase po
	const { data: allReportsPo, isLoading: isLoadingPo } = useGetAllReportsPoQuery();
	//api call allReports functional area
	const { data: allReportsFunctional, isLoading: isLoadingFunctional } = useGetAllReportsFunctionalQuery();

	// api call allReports sales product
	const { data: allReportsSalesProduct, isLoading: isLoadingSalesProduct } = useGetAllReportsSalesProductQuery();
	// api call allReports sales customer
	const { data: allReportsSalesCustomer, isLoading: isLoadingSalesCustomer } = useGetAllReportsSalesCustomerQuery();
	// api call allReports sales kam
	const { data: allReportsSalesKam, isLoading: isLoadingSalesKam } = useGetAllReportsSalesKamQuery();
	// api call allReports sales vertical
	const { data: allReportsSalesVertical, isLoading: isLoadingSalesVertical } = useGetAllReportsSalesVerticalQuery();
	//api call allReports sales so
	const { data: allReportsSalesSo, isLoading: isLoadingSalesSo } = useGetAllReportsSalesSoQuery();
	// //api call allReports sales region
	const { data: allReportsSalesRegion, isLoading: isLoadingSalesRegion } = useGetAllReportsSalesRegionQuery();

	// API hooks to fetch data Percentage 
	const { data: allReportsPurchasePercentage } = useGetAllReportsPurchasePercentageQuery();
	const { data: allReportsSalesPercentage } = useGetAllReportsSalesPercentageQuery();

	// Current month data
	const currentMonthAmountPurchase = allReportsPurchasePercentage?.currentMonth;
	const currentMonthAmountSales = allReportsSalesPercentage?.currentMonth;



	// Dynamically update descriptions Purchase Register
	useEffect(() => {
		const updateCardDescription = async (cardName, description) => {
			setCardsData((prevCardsData) =>
				prevCardsData.map((category) => {
					if (category["card catagory"] === "Purchase Register") {
						return {
							...category,
							cards: category.cards.map((card) => {
								if (card.name === cardName) {
									return { ...card, description };
								}
								return card;
							}),
						};
					}
					return category;
				})
			);
		};
		const updateSalesRegisterDescriptions = () => {
			updateCardDescription(
				"Product",
				isLoadingProduct ? <Box>
					<SkeletonText height="20px" spacing="3" />
				</Box> : allReports?.desc || ""
			);
			updateCardDescription(
				"Vendor",
				isLoadingVendor ? <Box>
					<SkeletonText height="20px" spacing="3" />
				</Box> : allReportsVendor?.desc || ""
			);
			updateCardDescription(
				"Purchase Order",
				isLoadingPo ? <Box>
					<SkeletonText height="20px" spacing="3" />
				</Box> : allReportsPo?.desc || ""
			);
			updateCardDescription(
				"Functional Area",
				isLoadingFunctional ? <Box>
					<SkeletonText height="20px" spacing="3" />
				</Box> : allReportsFunctional?.desc || ""
			);
		};
		updateSalesRegisterDescriptions();
	}, [allReports, allReportsVendor, allReportsPo, allReportsFunctional]);

	// // Dynamically update descriptions sales Register
	useEffect(() => {
		const updateCardDescription = async (cardName, description) => {
			setCardsData((prevCardsData) =>
				prevCardsData.map((category) => {
					if (category["card catagory"] === "Sales Register") {
						return {
							...category,
							cards: category.cards.map((card) => {
								if (card.name === cardName) {
									return { ...card, description };
								}
								return card;
							}),
						};
					}
					return category;
				})
			);
		};
		const updateSalesRegisterDescriptions = () => {
			updateCardDescription(
				"Product",
				isLoadingSalesProduct ? <Box>
					<SkeletonText height="20px" spacing="3" />
				</Box> : allReportsSalesProduct?.desc || ""
			);
			updateCardDescription(
				"Customer",
				isLoadingSalesCustomer ? <Box>
					<SkeletonText height="20px" spacing="3" />
				</Box> : allReportsSalesCustomer?.desc || ""
			);
			updateCardDescription(
				"Key Account Manager",
				isLoadingSalesKam ? <Box>
					<SkeletonText height="20px" spacing="3" />
				</Box> : allReportsSalesKam?.desc || ""
			);
			updateCardDescription(
				"Vertical",
				isLoadingSalesVertical ? <Box>
					<SkeletonText height="20px" spacing="3" />
				</Box> : allReportsSalesVertical?.desc || ""
			);
			updateCardDescription(
				"Sales Order",
				isLoadingSalesSo ? <Box>
					<SkeletonText height="20px" spacing="3" />
				</Box> : allReportsSalesSo?.desc || ""
			);
			updateCardDescription(
				"Region",
				isLoadingSalesRegion ? <Box>
					<SkeletonText height="20px" spacing="3" />
				</Box> : allReportsSalesRegion?.desc || ""
			);
		};
		// Call the function
		updateSalesRegisterDescriptions();
	}, [
		allReportsSalesProduct,
		allReportsSalesCustomer,
		allReportsSalesKam,
		allReportsSalesVertical,
		allReportsSalesSo,
		allReportsSalesRegion,
		isLoadingSalesRegion
	]);


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
				let categoryPercentage = 0;
				let categoryCurrentMonth = 0;

				if (data['card catagory'] === 'Purchase Register') {
					categoryPercentage = allReportsPurchasePercentage?.percentage || 0;
					categoryCurrentMonth = currentMonthAmountPurchase || 0;
				} else if (data['card catagory'] === 'Sales Register') {
					categoryPercentage = allReportsSalesPercentage?.percentage || 0;
					categoryCurrentMonth = currentMonthAmountSales || 0;
				}
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
										background={categoryPercentage > 0 ? "#e6f4ea" : "#fce8e6"}
										color={categoryPercentage > 0 ? "#137333" : "#a50e0e"}
										borderRadius="5px"
										height="30px"
										width="auto"
										p='6px'
										display="flex"
										alignItems="center"
										gap="4px"
									>
										{categoryPercentage > 0 ? (
											<FontAwesomeIcon icon={faArrowUpLong} fontSize="15px" style={{ transform: 'scale(1.2)' }} />
										) : (
											<FontAwesomeIcon icon={faArrowDownLong} fontSize="15px" style={{ transform: 'scale(1.2)' }} />
										)}
										<span style={{ fontWeight: "700", fontSize: "14px" }} >
											{categoryPercentage.toFixed(2)}%
										</span>
									</Box>
									<Box
										p='5px'
										mr='25px'
										fontSize='12px'
									>
										{categoryPercentage > 0 ? "Increased compared to last month" : "Decreased compared to last month"}<br/>
										<span style={{ fontWeight: "500"}}>Current month
											<FontAwesomeIcon icon={faIndianRupeeSign} style={{ padding: "0px 5px" }}/>
											<span style={{
												fontWeight: "700"
											}}>{categoryCurrentMonth}</span></span>
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
					</Box >
				);
			})}
		</>
	);
};

export default Allreports;
