import React, { useState } from 'react'
import { chartGroup, chartsData } from './fakeData'
import { Badge, Box, Button, Card, HStack, Stack, Tag, TagCloseButton, TagLabel, TagRightIcon, Text, useDisclosure } from '@chakra-ui/react'
import MyCharts from './nivoCharts/MyCharts';
import { FiSettings } from 'react-icons/fi';
import GraphViewSettings from './components/graphViewSettings';
import { camelCaseToReadable } from '../../utils/common';
import { CheckIcon } from '@chakra-ui/icons';

const AllCharts = () => {
    const [localChartGroup, setLocalChartGroup] = useState(chartGroup);
    const [allCharts, setAllCharts] = useState(chartsData);
    const [singleGraphData, setSingleGraphData] = useState({});
    // const [groupWiseChartCount, setGroupWiseChartCount] = useState();
    const [groupButton, setGroupButton] = useState('All');

    const findChartsByGroup = (group) => {
        const filteredCharts = chartsData.charts.filter((chart) => chart.group === group);
        setAllCharts((prev) => ({ ...prev, charts: filteredCharts }));
    }
    const handleGroupButton = (group) => {
        findChartsByGroup(group)
        setGroupButton(group)
    }

    const handleAllButton = () => {
        setAllCharts(chartsData);
        setGroupButton('All');
    }

    const {
        onOpen: onOpenGraphSettingsModal,
        onClose: onCloseGraphSettingsModal,
        isOpen: isOpenGraphSettingsModal,
    } = useDisclosure();

    const handleGraphSettings = (chart) => {
        onOpenGraphSettingsModal();
        setSingleGraphData(chart);
    };

    return (
        <Box>
            <Text fontWeight={'600'}>{allCharts.title}</Text>

            <Stack direction='row' spacing={4} my={4} align='center'>
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

            {/* <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {allCharts.charts.map((chart) => (
                    <Card key={chart.id} sx={{
                        backgroundColor: 'white',
                        padding: '15px',
                        borderRadius: '8px',
                        minWidth: '200px',
                        flexGrow: '1',
                    }}>
                        <Text>{chart.title}</Text>
                        <Text fontSize={'8px'}>{chart.description}</Text>
                        <Badge colorScheme='green'>{chart.group}</Badge>
                    </Card>
                ))}
            </Box> */}

            {/* ******************************************************* */}
            <Box display='flex' flexWrap='wrap' justifyContent='space-between' mt={10}>
                {allCharts?.charts?.map((chart, index) => {
                    // if (chart?.pinned === false) return null;
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
                                    border: '1px solid #dee2e6',
                                    transition: 'box-shadow 0.3s ease-in-out',
                                    '&:hover': {
                                        boxShadow:
                                            '0 4px 4px rgba(0, 0, 0, 0.2)',
                                    },
                                }}
                                mb={3}>
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
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                        }}>
                                        <Button
                                            variant='outline'
                                            style={{
                                                padding: '15px 10px',
                                                fontSize: '12px',
                                                color: '#718296',
                                            }}
                                            mr={3}
                                            onClick={() => handleGraphSettings(chart)}>
                                            <FiSettings
                                                style={{ marginRight: '6px' }}
                                            />{' '}
                                            Settings
                                        </Button>
                                        <HStack spacing={4}>
                                            <Tag
                                                size='sm'
                                                borderRadius='full'
                                                variant='solid'
                                                colorScheme='green'
                                            >
                                                <TagLabel>{camelCaseToReadable(chart.group)}</TagLabel>
                                                {/* <TagCloseButton /> */}
                                                <TagRightIcon as={CheckIcon} />
                                            </Tag>
                                        </HStack>
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
        </Box>
    )
}

export default AllCharts