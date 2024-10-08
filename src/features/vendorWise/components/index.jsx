import { Box } from '@chakra-ui/react';
import React from 'react';
import { Outlet } from 'react-router-dom';

const VendorWise = () => {
	return (
		<Box>
			<Outlet />
		</Box>
	);
};

export default VendorWise;
