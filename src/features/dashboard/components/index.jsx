import React, { useEffect, useRef, useState } from "react";
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
	Button,
	Text,
	Badge,
	Stack,
} from '@chakra-ui/react';
import { IoMdAdd } from 'react-icons/io';
import GraphViewSettings from './graphViewSettings';
import { chartGroup, chartsData } from '../fakeData';
import MyCharts from '../nivoCharts/MyCharts';
import { MdBookmarkAdded } from 'react-icons/md';
import { FiPlus, FiSettings } from 'react-icons/fi';
import { camelCaseToReadable } from '../../../utils/common';

const Dashboard = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [localChartGroup, setLocalChartGroup] = useState(chartGroup);
	const [allCharts, setAllCharts] = useState(chartsData.charts || []);
	const [groupButton, setGroupButton] = useState('All');
	const [dashboardView, setDashboardView] = useState(chartsData.charts || []);
	const [singleGraphData, setSingleGraphData] = useState({});

  const {
    onOpen: onOpenGraphSettingsModal,
    onClose: onCloseGraphSettingsModal,
    isOpen: isOpenGraphSettingsModal,
  } = useDisclosure();

	const findChartsByGroup = (group) => {
		const filteredCharts = chartsData.charts.filter((chart) => chart.group === group);
		setAllCharts(filteredCharts || []);
	}
	const handleGroupButton = (group) => {
		findChartsByGroup(group)
		setGroupButton(group)
	}

	const handleAllButton = () => {
		setAllCharts(chartsData.charts || []);
		setGroupButton('All');
	}

	const handleToggleAddChart = (index, chart) => {	
		setAllCharts((prev) => {
			const foundIndex = prev.findIndex((item) => item.id === chart.id);

			if (foundIndex !== -1) {
				// Toggle the pinned state for the existing chart
				return prev.map((item, i) => {
					if (i === foundIndex) {
						return { ...item, pinned: !item.pinned };
					} else {
						return item;
					}
				});
			} else {
				// Add the new chart with pinned set to true
				return [
					...prev,
					{
						...chart,
						pinned: true,
					},
				];
			}
		});
		setDashboardView((prev) => {
			const foundIndex = prev.findIndex((item) => item.id === chart.id);

      if (foundIndex !== -1) {
        return prev.map((item, i) => {
          if (i === foundIndex) {
            return { ...item, pinned: !item.pinned };
          } else {
            return item;
          }
        });
      } else {
        return [
          ...prev,
          {
            ...chart,
            pinned: true,
          },
        ];
      }
    });
  };

	const handleGraphSettings = (chart) => {
		onOpenGraphSettingsModal();
		setSingleGraphData(chart);
	};
	return (
		<>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					'& button': {
						color: '#718296',
						padding: '20px 20px',
						fontSize: '14px',
						border: '1px solid #dee2e6',
						backgroundColor: 'white',
					},
					'& button:hover': {
						backgroundColor: 'rgb(0, 48, 96)',
						borderRadius: '5px',
					},
				}}
				mb={6}>
				<Text fontWeight='bold'>{dashboardView?.title}</Text>
				<Button
					type='button'
					variant='outlined'
					onClick={onOpen}
					sx={{
						display: 'flex',
						alignItems: 'center',
						gap: 1,
						_hover: {
							color: 'white',
						},
					}}>
					<FiPlus />
					Add Widgets
				</Button>
				<Drawer
					isOpen={isOpen}
					placement='right'
					onClose={onClose}
					size='xl'>
					<DrawerOverlay />
					<DrawerContent
						maxW='70vw'
						sx={{
							'& .stickyTop': {
								position: 'sticky',
								top: 0,
								zIndex: 1,
								backgroundColor: 'white',
							},
						}}
					>
						<DrawerCloseButton style={{ color: 'white' }} />
						<DrawerHeader
							style={{
								backgroundColor: '#003060',
								color: 'white',
							}}>
							Chart Configuration
						</DrawerHeader>
						<DrawerBody>
							<Box
								className='stickyTop'
								sx={{
									display: 'flex',
									justifyContent: 'space-between',
									alignItems: 'center',
									boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 4px',
									p: 2,
									my: 2,
									flexGrow: 1,
								}}
							>
								<Stack
									direction='row'
									align='center'
									display='flex'
									wrap='wrap'
									gap={2}
								>
									<Button
										sx={{
											border: groupButton === 'All' ? '1px solid #dee2e6' : '1px solid #dee2e6',
											bgColor: groupButton === 'All' && '#e05e5e',
											color: groupButton === 'All' && 'white',
										}}
										variant='solid'
										onClick={handleAllButton}
									>
										All
										<Badge
											ml='1'
											sx={{
												bgColor: groupButton === 'All' ? '#EDF2F7' : '#e05e5e',
												color: groupButton === 'All' ? '#e05e5e' : 'white',
												flexGrow: 1,
											}}
											variant='solid'
										>
											{chartsData.charts.length}
										</Badge>
									</Button>
									{Object.keys(localChartGroup).map((key) => (
										<Button
											sx={{
												border: groupButton === localChartGroup[key] ? '1px solid #dee2e6' : '1px solid #dee2e6',
												bgColor: groupButton === localChartGroup[key] && '#e05e5e',
												color: groupButton === localChartGroup[key] && 'white',
												flexGrow: 1,
											}}
											onClick={() => handleGroupButton(localChartGroup[key])}
											key={key}
											variant='solid'
										>
											{camelCaseToReadable(localChartGroup[key])}
											<Badge
												ml='1'
												sx={{
													bgColor: groupButton === localChartGroup[key] ? '#EDF2F7' : '#e05e5e',
													color: groupButton === localChartGroup[key] ? '#e05e5e' : 'white',
												}}
												variant='solid'
											>
												{chartsData.charts.filter((chart) => chart.group === localChartGroup[key]).length}
											</Badge>
										</Button>
									))}
								</Stack>
								{/* <Text
									fontWeight='bold'
									fontSize='14px'
									color={'#003060'}
									minWidth='80px'
									textAlign={'right'}
								>
									{' '}
									Count - {graphViewSettings?.length ||
										0}{' '}
								</Text> */}
							</Box>
							<Box
								display='flex'
								flexWrap='wrap'
								justifyContent='space-between'
							// marginTop='10px'
							>
								{allCharts?.map((chart, index) => {
									return (
										<Box
											key={index}
											width={{
												base: '100%',
												lg: '48%',
											}}
											mb={6}>
											<Box
												sx={{
													backgroundColor: 'white',
													padding: '15px',
													my: 5,
													borderRadius: '8px',
													border: '1px solid #c4c4c4',
												}}
												mb={3}>
												<Box
													sx={{
														display: 'flex',
														justifyContent:
															'flex-end',
														'& button': {
															color: '#718296',
															padding:
																'20px 20px',
															fontSize: '14px',
															border: '1px solid #dee2e6',
															backgroundColor:
																'white',
															borderRadius: '8px',
														},
														'& button:hover': {
															backgroundColor:
																'rgb(0, 48, 96)',
															borderRadius: '5px',
															color: 'white',
														},
													}}
													mb={6}>
													<Button
														type='button'
														variant='outlined'
														style={{
															display: 'flex',
															alignItems:
																'center',
															gap: 1,
															_hover: {
																color: 'white',
															},
														}}
														onClick={() =>
															handleGraphSettings(
																chart
															)
														}>
														<FiSettings
															sx={{
																mr: '6px',
															}}
														/>
														Configure
													</Button>
													{chart?.pinned ? (
														<Button
															onClick={() =>
																handleToggleAddChart(
																	index,
																	chart
																)
															}
															ml={3}>
															Added{' '}
															<MdBookmarkAdded color='green' />
														</Button>
													) : (
														<Button
															onClick={() =>
																handleToggleAddChart(
																	index,
																	chart
																)
															}
															ml={3}>
															Add <IoMdAdd />
														</Button>
													)}
												</Box>
												<Box
													sx={{
														width: '100%',
														height: '200px',
													}}>
													<MyCharts chart={chart} />
												</Box>
												<Badge
													colorScheme='blue'
													py={0}
													px={3}
													fontSize={9}>
													{chart?.title}
												</Badge>
											</Box>
										</Box>
									);
								})}
							</Box>
						</DrawerBody>

            <DrawerFooter>
              <Button
                variant="outline"
                style={{
                  padding: "20px 20px",
                  fontSize: "14px",
                  color: "#718296",
                }}
                mr={3}
                onClick={onClose}>
                Cancel
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Box>

			<Box display='flex' flexWrap='wrap' justifyContent='space-between'>
				{dashboardView?.map((chart, index) => {
					if (chart?.pinned === false) return null;
					return (
						<Box
							key={index}
							width={{
								base: '100%',
								lg: '49%',
							}}
							mb={6}>
							<Box
								sx={{
									backgroundColor: 'white',
									padding: '15px',
									my: 2.5,
									borderRadius: '8px',
									transition: 'box-shadow 0.3s ease-in-out',
									border: '1px solid #dee2e6',
									'&:hover': {
										boxShadow:
											'0 4px 4px rgba(0, 0, 0, 0.2)',
									},
								}}
								mb={3}
							>
								<Box
									display='flex'
									justifyContent='space-between'
									alignItems='center'
									mb={8}>
									<Box
										style={{
											padding: '10px',
											fontWeight: 600,
											color: 'black',
										}}>
										{chart.title}
										<Text
											sx={{
												color: '#718296',
												fontSize: '10px',
											}}>
											{chart.description}
										</Text>
									</Box>
									<Box
										style={{
											padding: '10px',
											fontWeight: 600,
											color: 'black',
										}}>
										<Button
											variant='outline'
											style={{
												padding: '15px 10px',
												fontSize: '12px',
												color: '#718296',
											}}
											mr={3}
											onClick={() =>
												handleGraphSettings(chart)
											}>
											<FiSettings
												style={{ marginRight: '6px' }}
											/>{' '}
											Settings
										</Button>
									</Box>
								</Box>
								<Box sx={{ height: '300px' }}>
									<MyCharts chart={chart} />
								</Box>
							</Box>
						</Box>
					);
				})}
			</Box>

      <GraphViewSettings
        isOpen={isOpenGraphSettingsModal}
        onClose={onCloseGraphSettingsModal}
        singleGraphData={singleGraphData}
      />
    </>
  );
};

export default Dashboard;
