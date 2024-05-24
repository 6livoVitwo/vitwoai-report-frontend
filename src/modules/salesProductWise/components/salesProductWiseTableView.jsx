import React, { useState } from 'react';
import CustomTable from './salesProductWiseCustomTable';
import { Box, Heading, Spinner, Text } from '@chakra-ui/react';
import { jwtDecode } from 'jwt-decode';
import { useSelector } from 'react-redux';
import { useFetchSalesQuery } from '../slice/salesBySlice';

const SalesProductWiseTableView = () => {
	const authData = useSelector((state) => state.auth);
	const decoded = jwtDecode(authData.authDetails);
	const [first, setFirst] = useState(0);
	const {
		data: sales,
		error,
		isLoading,
	} = useFetchSalesQuery({ first, authDetails: authData.authDetails });

	const salesData = sales?.content;
	function flattenObject(obj) {
		const result = {};

		function flatten(obj, prefix = '') {
			for (let key in obj) {
				if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
					flatten(obj[key], `${prefix}${key}.`);
				} else if (Array.isArray(obj[key])) {
					obj[key].forEach((item, index) => {
						flatten(item, `${prefix}${key}[${index}].`);
					});
				} else {
					result[`${prefix}${key}`] = obj[key];
				}
			}
		}

		flatten(obj);
		return result;
	}

	let individualItems = [];
	salesData?.forEach((invoice) => {
		invoice.items.forEach((item) => {
			const flattenedItem = flattenObject(item);
			individualItems.push(flattenedItem);
		});
	});

	return (
		<Box>
			<Box m='15px 0px' textAlign='center'>
				<Heading
					textTransform='capitalize'
					color='mainBlue'
					pb='5px'
					fontWeight='700'
					fontSize='22px'>
					{decoded.data.companyName}
				</Heading>
				<Text fontWeight='600' fontSize='13px' color='textGray'>
					Location - {decoded.data.locationName}
				</Text>
			</Box>

			{isLoading ? (
				<Box
					height='calc(100vh - 150px)'
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
			) : (
				<CustomTable
					first={first}
					setFirst={setFirst}
					individualItems={individualItems}
				/>
			)}
		</Box>
	);
};

export default SalesProductWiseTableView;
