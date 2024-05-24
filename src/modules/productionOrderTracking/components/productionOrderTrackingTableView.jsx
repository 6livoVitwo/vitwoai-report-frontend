import React, { useEffect } from 'react';
import CustomTable from './productionOrderTrackingCustomTable';
import { Box, Heading, Text } from '@chakra-ui/react';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';

const ProductionOrderTrackingTableView = () => {
	const dispatch = useDispatch();
	const authData = useSelector((state) => state.auth);
	const decoded = jwtDecode(authData.authDetails);

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
			<CustomTable />
		</Box>
	);
};

export default ProductionOrderTrackingTableView;
