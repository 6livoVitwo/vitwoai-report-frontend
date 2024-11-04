import React from 'react'
import BarChart from '../nivoCharts/BarChart'
import { Alert, Badge, Box, Card, Grid, IconButton, Text } from '@chakra-ui/react'
import { MdOutlineArrowBackIos } from "react-icons/md";

const GraphVariant = ({ singleGraphData, setIsVariant = () => { } }) => {
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <IconButton onClick={() => setIsVariant(false)} sx={{ color: 'mainBlue' }} aria-label='back' mr={2} icon={<MdOutlineArrowBackIos />} />
                <Text fontSize={'14px'} my={'24px'} fontWeight={'600'}>Graph Variants</Text>
            </Box>
            <Grid w='100%' h={'500px'} templateColumns='repeat(2, 1fr)' gap={6}>
                {
                    singleGraphData?.variants == null ? <Alert status='error' sx={{ fontSize: '12px', padding: '5px', borderRadius: '5px', height: '30px', px: '10px' }}>No variants found</Alert> : singleGraphData?.variants?.map((variant, index) => <Card key={index} sx={{ backgroundColor: 'white', padding: '15px', borderRadius: '8px', border: '1px solid #c4c4c4' }}><BarChart variant={variant} /></Card>)
                }
            </Grid>
        </Box>
    )
}

export default GraphVariant