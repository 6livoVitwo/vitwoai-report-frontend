import React from 'react';
import { Center, Portal } from '@chakra-ui/react';
import HashLoader from 'react-spinners/HashLoader';

const PortalForLayout = (props) => {
	const { portalId, globalLayout, children } = props;

	if (globalLayout) {
		return <Portal containerRef={portalId}>{children}</Portal>;
	}
	return (
		<div className='hasNoGlobalLayout'>
			<Center h='100vh'>
				<HashLoader color='#105380' size={20} speedMultiplier={1} />
			</Center>
		</div>
	);
};

export default PortalForLayout;
