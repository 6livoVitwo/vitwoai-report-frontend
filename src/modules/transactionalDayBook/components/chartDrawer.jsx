import React from 'react';
import {
	Box,
	Button as ButtonChakra,
	Drawer,
	DrawerBody,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	Divider,
	useDisclosure,
	Card,
	CardHeader,
	Grid,
	CardBody,
	Heading,
	Image,
	CardFooter,
} from '@chakra-ui/react';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import barChart from '../../../asset/images/_desktop_preview_1654643912258.png';
import lineChart from '../../../asset/images/lineChart.png';
import radarChart from '../../../asset/images/radarCapture.png';

const ChartDrawer = ({graphData}) => {
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
						<DrawerHeader sx={{ color: 'mainBlue' }}>
							Select Your Chart
						</DrawerHeader>
						<Divider sx={{ bgColor: 'mainBlue' }} />
						<DrawerBody>
							<Grid templateColumns='repeat(2, 1fr)' gap={4}>
								{
									graphData.map((item, index) => {
										return (
											<Card key={index}>
												<CardHeader>
													<Heading size='md'> {item.name} ({item.chartUi})</Heading>
												</CardHeader>
												<CardBody>
													{item.chartUi === 'line' && <Image src={lineChart} />}
													{item.chartUi === 'bar' && <Image src={barChart} />}
													{item.chartUi === 'radar' && <Image src={radarChart} />}
												</CardBody>
												<CardFooter>
													{/* <ButtonChakra variant='solid' onClick={() => handleChartView(item)}>View</ButtonChakra> */}
												</CardFooter>
											</Card>
										);
									})
								}
							</Grid>
						</DrawerBody>
						<DrawerBody></DrawerBody>
						<Divider sx={{ bgColor: 'mainBlue' }} />
						<DrawerFooter>
							<ButtonChakra
								colorScheme='red'
								variant='solid'
								mr={3}
								width={'100%'}
								onClick={onClose}>
								Cancel
							</ButtonChakra>
							<ButtonChakra
								colorScheme='blue'
								variant='solid'
								width={'100%'}>
								Save
							</ButtonChakra>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</Box>
			<Link to='/reports/transactional-day-book/table-view'>
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
