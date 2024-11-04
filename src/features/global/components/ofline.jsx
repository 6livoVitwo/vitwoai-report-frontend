import React, { useState, useEffect } from 'react';
import { Box, useToast } from '@chakra-ui/react';
import { Detector } from 'react-detect-offline';

const DetectOffline = ({ showOverlay, showToast, children }) => {
	const [showOnMount, setShowOnMount] = useState(() => false);
	const [checkOnline, setOnline] = useState(() => false);
	const [time] = useState(() =>
		process.env.REACT_APP_OFFLINE_TIMEOUT
			? parseInt(process.env.REACT_APP_OFFLINE_TIMEOUT, 10)
			: 3e3
	);
	const toast = useToast();

	const check = (stat) => {
		if (stat) {
			setTimeout(() => {
				setOnline(false);
			}, time);
		} else {
			setOnline(true);
		}
	};

	useEffect(() => {
		if (showOnMount) {
			if (showToast) {
				if (checkOnline) {
					toast.close('online');
					toast({
						id: 'offline',
						description: 'You are currently Offline',
						status: 'warning',
						duration: time * 12e2, // set timeout for 1 hour
						isClosable: false,
					});
				} else {
					toast.close('offline');
					toast({
						id: 'online',
						description: `You are currently Online`,
						status: 'success',
						duration: time,
						isClosable: false,
					});
				}
			}
		}
		setShowOnMount(true);
		// showOnMount should not be part of useEffect dependency otherwise it will show online status for first time on mount
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [checkOnline, showToast, time, toast]);

	return (
		<Detector
			polling={{
				enabled: false,
				url: 'favicon.ico',
				interval: 10000,
				timeout: time,
			}}
			onChange={check}
			// render={() => null}
			render={({ online }) => {
				if (showOverlay) {
					if (checkOnline) {
						return (
							<Box
								w='100vw'
								h='100vh'
								pos='absolute'
								bg='var(--chakra-colors-boxShadowDeepBlackColor)'
								zIndex={9}>
								{children || null}
							</Box>
						);
					}
					if (!online) {
						return null;
					}
				}
				return null;
			}}
		/>
	);
};

DetectOffline.defaultProps = {
	showToast: true,
	children: undefined,
};

export default DetectOffline;
