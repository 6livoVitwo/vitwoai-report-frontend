import React, { useEffect } from 'react';
import CustomTable from './profitAndLossCustomTable';
import { Box, Heading, Text } from '@chakra-ui/react';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';

const ProfitAndLossTableView = () => {
	const dispatch = useDispatch();
	const authData = useSelector((state) => state.auth);
	const decoded = jwtDecode(authData.authDetails);

	return (
		<Box>
			<Box m='15px 0px'>
				<Heading
					textTransform='capitalize'
					color='mainBlue'
					pb='5px'
					fontWeight='700'
					fontSize='15px'>
					{decoded.data.companyName}
				</Heading>
				<Text fontWeight='600' fontSize='11px' color='textGray'>
					Location - {decoded.data.locationName}
				</Text>
			</Box>
			<CustomTable />
		</Box>
	);
};

export default ProfitAndLossTableView;
