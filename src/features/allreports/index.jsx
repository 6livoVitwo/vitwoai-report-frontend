import React, { useState } from 'react';
import { Box, Heading, Flex, Button } from '@chakra-ui/react';
import ReportsCards from '../dashboard/components/ReportsCards';
import SalesVerticalWise from '../../asset/images/sales-vertical-wise.png';
import SalesSoWise from '../../asset/images/sales-so-wise.png';
import loadingImg from '../../asset/imgs/Loading.json'; 
// import loadingImg from '../../asset/imgs/Loading.json'; 
// import productWise from '../../asset/imgs/Product Wise.json';
// import vendorWise from '../../asset/imgs/Vendor Wise.json';
// import poWise from '../../asset/imgs/PO Wise.json';

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

const Allreports = () => {
	const cardsData = [
    {
      "card catagory": "Purchase Register",
      cards: [
        {
          id: "9",
          name: "Product Wise",
          link: "/reports/purchase-product-wise/table-view",
          imgsrc: purchaseProductWise,
        },
        {
          id: "10",
          name: "Vendor Wise",
          link: "/reports/purchase-vendor-wise/table-view",
          imgsrc: purchaseVendorWise,
        },
        {
          id: "11",
          name: "PO Wise",
          link: "/reports/purchase-po-wise/table-view",
          imgsrc: purchasePoWise,
        },
        {
          id: "11",
          name: "Functional Wise",
          link: "/reports/purchase-po-wise/table-view",
          imgsrc: purchasePoWise,
        },
      ],
    },
    {
      "card catagory": "Sales Register",
      cards: [
        {
          id: "21",
          name: "Product Wise",
          link: "/reports/sales-product-wise/table-view",
          imgsrc: salesProductWise,
        },
        {
          id: "22",
          name: "Customer Wise",
          link: "/reports/sales-customer-wise/table-view",
          imgsrc: salesCustomerWise,
        },
        {
          id: "23",
          name: "Vertical Wise",
          link: "/reports/sales-vertical-wise/table-view",
          imgsrc: salesVerticalWise,
        },
        {
          id: "24",
          name: "So Wise",
          link: "/reports/sales-so-wise/table-view",
          imgsrc: salesSoWise,
        },
        {
          id: "25",
          name: "Kam Wise",
          link: "/reports/sales-kam-wise/table-view",
          imgsrc: salesKamWise,
        },
        {
          id: "26",
          name: "Region Wise",
          link: "/reports/sales-region-wise/table-view",
          imgsrc: salesRegionWise,
        },
      ],
    },
	{
		"card catagory": "Receivable",
		cards: [
		  {
			id: "27",
			name: "Receivable Customer",
			link: "/reports/receivable-customer/table-view",
			imgsrc: purchaseProductWise,
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
								paddingBottom='5px'>
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
