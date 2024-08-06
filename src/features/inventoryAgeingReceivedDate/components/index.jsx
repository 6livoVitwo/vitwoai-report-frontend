import { Box } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';

const InventoryAgeingReceivedDate = () => {
	return (
		<Box>
			<Outlet />
		</Box>
	);
};

export default InventoryAgeingReceivedDate;
