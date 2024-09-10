import { Alert, Badge, Box, Button, Divider, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { FiPlus, FiSettings } from 'react-icons/fi'
import { IoMdAdd } from 'react-icons/io';
import BarChart from '../nivo/BarChart';
import { chartsData } from '../data/fakeData';
import ChartConfiguration from '../components/ChartConfiguration';
import { useSelector } from 'react-redux';
import MyCharts from '../../dashboard/nivoCharts/MyCharts';
import DynamicChart from '../components/DynamicChart';
import NewMyCharts from '../nivo/NewMyCharts';
import TestComp from '../components/TestComp';

const DashboardNew = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenGraphSettingsModal, onOpen: onOpenGraphSettingsModal, onClose: onCloseGraphSettingsModal } = useDisclosure();
    const [configureChart, setConfigureChart] = useState(null);
    const dashboardData = useSelector((state) => state.dashboard.widgets);

    const removeProperty = (object) => {
        // error handling
        if (!object) {
            return {};
        }
        const { data, id, ...rest } = object;
        return rest;
    }

    const handleConfigure = (chart) => {
        // error handling
        if (!chart) {
            return;
        }
        onOpenGraphSettingsModal();
        const filterData = removeProperty(chart);
        setConfigureChart(filterData);

    };

    console.log({ dashboardData })

    return (
        <>
        <Box height={300}>
            <TestComp />
        </Box>
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
                mb={6}
            >
                <Text fontWeight='bold'>Title</Text>
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
                    Add Widget
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
                                This a Navbar ({chartsData.charts.length})
                            </Box>
                            <Box
                                display='flex'
                                flexWrap='wrap'
                                justifyContent='space-between'
                            >
                                {chartsData.charts.map((chart, index) => {
                                    console.log('All Chart List', chart)
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
                                                        onClick={() => handleConfigure(chart)}
                                                    >
                                                        <FiSettings
                                                            sx={{
                                                                mr: '6px',
                                                            }}
                                                        />
                                                        Configure
                                                    </Button>
                                                    <Button
                                                        onClick={() => console.log('add+')}
                                                        ml={3}>
                                                        Add <IoMdAdd />
                                                    </Button>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        width: '100%',
                                                        height: '200px',
                                                    }}>
                                                    <DynamicChart chart={chart} />
                                                </Box>
                                                <Badge
                                                    colorScheme='blue'
                                                    py={0}
                                                    px={3}
                                                    fontSize={9}>
                                                    {chart.title}
                                                </Badge>
                                                <Text fontSize={8}>{chart.chartName}</Text>
                                            </Box>
                                        </Box>
                                    )
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
                {dashboardData && dashboardData?.length === 0 && <Alert status='error' sx={{ fontSize: '16px', padding: '5px', borderRadius: '5px', height: '30px', px: '10px' }}>No widget found</Alert>}
                {dashboardData && dashboardData?.map((chart, index) => {
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
                                        }}
                                    >
                                        {chart.chartName}
                                        <Text
                                            sx={{
                                                color: '#718296',
                                                fontSize: '10px',
                                            }}
                                        >
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
                                            onClick={() => handleConfigure(chart)}
                                        >
                                            <FiSettings
                                                style={{ marginRight: '6px' }}
                                            />{' '}
                                            Configure
                                        </Button>
                                    </Box>
                                </Box>
                                <Box sx={{ height: '300px' }}>
                                    <NewMyCharts chart={chart} />
                                </Box>
                            </Box>
                        </Box>
                    )
                })}
            </Box>

            <Box>
                <Drawer isCentered size='md' isOpen={isOpenGraphSettingsModal} onClose={onCloseGraphSettingsModal} >
                    <DrawerOverlay />
                    <DrawerContent maxW='70vw'>
                        <DrawerCloseButton color='white' size='lg' mt='8px' />
                        <DrawerHeader
                            color='white'
                            mb='4px'
                            fontSize='17px'
                            fontWeight='500'
                            padding='15px 15px'
                            backgroundColor='#003060'>
                            Graphical View Settings
                        </DrawerHeader>
                        <Divider orientation='horizontal' mb={6} />
                        <DrawerBody>
                            <ChartConfiguration configureChart={configureChart} />
                        </DrawerBody>
                        {/* <Divider orientation='horizontal' mt={2} mb={2} /> */}
                        {/* <DrawerFooter>
                            <Button
                                variant='outline'
                                style={{
                                    padding: '20px 20px',
                                    fontSize: '14px',
                                    color: 'white',
                                    backgroundColor: '#003060',
                                }}
                                mr={3}>
                                Save
                            </Button>
                            <Button
                                variant='outline'
                                style={{
                                    padding: '20px 20px',
                                    fontSize: '14px',
                                    color: '#718296',
                                }}
                                mr={3}>
                                Cancel
                            </Button>
                        </DrawerFooter> */}
                    </DrawerContent>
                </Drawer>
            </Box>
        </>
    )
}

export default DashboardNew