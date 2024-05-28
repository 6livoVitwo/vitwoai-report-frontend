import { Box, Center, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

const Rootpage = ({ globalLayout }) => {
	const [refresh, setRefresh] = useState(false);
	const globalState = useSelector((state) => state.GlobalLoader);
	useEffect(() => {
		setRefresh(!refresh);
	}, []);
	useEffect(() => {
		globalLayout(false);
	}, [globalLayout]);
	// Mobile Responsive
	const flex = useBreakpointValue({
		base: '0 0 100%',
		sm: '0 0 100%',
		md: '0 0 100%',
		lg: '0 0 50%',
	});
	const width = useBreakpointValue({
		base: '100%',
		sm: '0 0 100%',
		md: '100%',
		lg: '50%',
	});
	return (
		<Box
			w='100vw'
			h={{ base: '100%', md: '100vh' }}
			background={
				globalState.darkMode
					? 'var(--chakra-colors-mainDarkModeBackgroundColor)'
					: '#F8FCFF'
			}
			ml={{
				base: '0',
				sm: '0',
				md: '12px',
			}}>
			<Flex
				direction='row'
				position='relative'
				height='100vh'
				width='100vw'>
				<Box
					className='rightFormSec'
					alignItems='center'
					flex={flex}
					width={width}
					right={{ base: 'unset', md: '0' }}
					left={{ base: '0', md: 'unset' }}
					position='absolute'
					zIndex='2'
					bg={
						globalState.darkMode
							? 'mainDarkModeBackgroundColor'
							: 'mainLightModeBackgroundColor'
					}>
					<Center
						h={{
							base: 'auto',
							md: 'auto',
							lg: '100vh',
						}}>
						<Flex
							direction='column'
							w={{
								base: '90%',
								sm: '90%',
								md: 'unset',
							}}>
							<Flex
								width={{
									base: '100%',
									sm: '100%',
									md: '320px',
									lg: '420px',
								}}
								h={{
									base: 'auto',
									md: '700px',
									lg: '600px',
								}}
								paddingTop='50px'
								direction='column'>
								<Outlet />
							</Flex>
						</Flex>
					</Center>
					<Box
						position={{ base: 'static', md: 'absolute' }}
						bottom='20px'
						width={{
							base: '90%',
							sm: '90%',
							md: '90%',
							lg: '96%',
						}}
						left='0'
						right={{
							base: '0',
							md: '0',
							lg: 'unset',
						}}
						margin={{
							base: '0 auto',
							md: '0 auto',
							lg: 'unset',
						}}>
						<Text
							as='p'
							alignSelf='flex-end'
							color={
								globalState.darkMode
									? 'white'
									: 'var(--chakra-colors-lfgPurpleColor)'
							}
							fontSize='1rem'
							lineHeight='1.2rem'
							fontWeight='500'
							mb='3px'
							textAlign={{
								base: 'center',
								sm: 'center',
								md: 'left',
							}}
							margin={{
								base: '0 auto',
								sm: '0 auto',
								md: 'unset',
							}}
							pt={{ base: '15px', lg: '0px' }}
							pb={{ base: '50px', lg: '0px' }}>
							<b>Notice</b>{' '}
							<Text as='i' fontWeight='600'>
								Unauthorized access to this computer system and
								software is prohibited by Title 18, United
								States Code, Section 1030, Fraud and Related
								Activity in Connection with Computers.
							</Text>{' '}
							This system is for the use of authorized users only.
							Individuals using this computer system without
							authority, or in excess of their authority, are
							subject to having all of their activities on this
							system monitored and recorded by system personnel.
							In the course of monitoring individuals improperly
							using this system, or in the case of system
							maintenance, the activities of authorized users may
							also be monitored.Anyone using this system expressly
							consents to such monitoring and is advised that if
							such monitoring reveals possible evidence of
							criminal activity, system personnel may provide the
							evidence of such monitoring to law enforcement
							officials.
						</Text>
					</Box>
				</Box>
			</Flex>
		</Box>
	);
};

export default React.memo(Rootpage);
