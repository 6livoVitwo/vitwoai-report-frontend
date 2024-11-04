import React, { useState } from "react";
import { Box, Heading, Flex, Button } from "@chakra-ui/react";
import ReportsCards from "../dashboard/components/ReportsCards";
import ProductWise from "../../asset/images/products-wise.png";
import VendorWise from "../../asset/images/vendor-wise.png";
import PoWise from "../../asset/images/po-wise.png";
import SalesproductWise from "../../asset/images/sales-product-wise.png";
import SalesCustomerWise from "../../asset/images/sales-customer-wise.png";
import SalesVerticalWise from "../../asset/images/sales-vertical-wise.png";
import SalesSoWise from "../../asset/images/sales-so-wise.png";
import SalesDetailedReport from "../salesDetailsReport/components";
import PurchaseDetailedReport from "../purchaseDetailsReport/components";
import { Link } from "react-router-dom";

const ReportDetails = () => {

	const cardsData = [
		{
		  "card catagory": "Details Report",
		  cards: [
			{
			  id: "1",
			  name: "Sales Details",
			  link: "/reports-details/sales-details-report",
			//   imgsrc: ProductWise,
			},
			{
			  id: "2",
			  name: "Purchase Details",
			  link: "/reports-details/purchase-details-report",
			//   imgsrc: VendorWise,
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

export default ReportDetails;
