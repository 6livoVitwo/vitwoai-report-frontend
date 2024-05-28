import React, { useEffect } from 'react';
import {
	Box,
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	useDisclosure,
} from '@chakra-ui/react';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

const ChartDrawer = ({ graphData }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box
			display='flex'
			justifyContent='end'
			alignItems='center'
			padding='7px'
			gap='15px'
			mt='5px'
			bg='white'
			borderRadius='5px'
			border='1px solid #dee2e6'
			color='mainBlue'>
			<Box
				sx={{
					'& button': {
						color: '#718296',
						padding: '7px 10px',
						fontSize: '14px',
						border: '1px solid #dee2e6',
						bg: 'white',
					},
					'& button:hover': {
						bg: 'rgb(0, 48, 96)',
						borderRadius: '5px',
					},
					'& button:hover span': {
						color: 'white',
					},
				}}>
				<Button
					type='button'
					icon='pi pi-chart-line'
					label='Select Chart View'
					outlined
					onClick={onOpen}
					_hover={{
						color: 'white',
					}}
				/>
				<Drawer
					isOpen={isOpen}
					placement='right'
					onClose={onClose}
					size='xl'>
					<DrawerOverlay />
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerHeader>Select Your Chart</DrawerHeader>

						<DrawerBody></DrawerBody>

						<DrawerFooter>
							<Button variant='outline' mr={3} onClick={onClose}>
								Cancel
							</Button>
							<Button colorScheme='blue'>Save</Button>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</Box>
			<Link to='/reports/production-order-tracking/table-view'>
				<Box
					sx={{
						'& button': {
							color: '#718296',
							padding: '7px 10px',
							fontSize: '14px',
							border: '1px solid #dee2e6',
							bg: 'white',
						},
						'& button:hover': {
							bg: 'rgb(0, 48, 96)',
							borderRadius: '5px',
						},
						'& button:hover span': {
							color: 'white',
						},
					}}>
					<Button
						type='button'
						icon='pi pi-table'
						label='Table View'
						outlined
						_hover={{
							color: 'white',
						}}
					/>
				</Box>
			</Link>
		</Box>
	);
};

export default ChartDrawer;
