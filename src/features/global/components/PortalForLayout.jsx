import React from 'react';
import { Center, Portal } from '@chakra-ui/react';
import HashLoader from 'react-spinners/HashLoader';
import Loader from '../../analyticloader/components/Loader';

const PortalForLayout = (props) => {
	const { portalId, globalLayout, children } = props;

	if (globalLayout) {
		return <Portal containerRef={portalId}>{children}</Portal>;
	}
	return (
		<div className='hasNoGlobalLayout'>
			<Center h='100vh'>
			<Loader width={150} height={150} objectFit={"contain"}/> 
				{/* <HashLoader color='red' size={20} speedMultiplier={1} /> */}
			</Center>
		</div>
	);
};

export default PortalForLayout;
