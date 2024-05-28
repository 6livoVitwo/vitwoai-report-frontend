import React from 'react'
import BarChart from '../nivoCharts/BarChart'
import { Box, Card, Grid, IconButton, Text } from '@chakra-ui/react'
import { MdOutlineArrowBackIos } from "react-icons/md";

const GraphVariant = ({ singleGraphData, setIsVariant=()=>{} }) => {
    console.log('variant chart =>>', singleGraphData)
    return (
        <Box>
            <Box sx={{display: 'flex', justifyContent:'flex-start', alignItems: 'center'}}>
                <IconButton onClick={() => setIsVariant(false)} sx={{color: 'mainBlue'}} aria-label='back' mr={2} icon={<MdOutlineArrowBackIos />} />
                <Text fontSize={'14px'} my={'24px'} fontWeight={'600'}>Graph Variants</Text>
            </Box>
            <Grid w='100%' h={'500px'} templateColumns='repeat(2, 1fr)' gap={6}>
                {
                    singleGraphData?.variants?.map((variant) => {
                        return <Card key={variant?.id} h='100%' w='100%' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px;' borderRadius='10px'>
                            <BarChart key={variant} data={singleGraphData?.data} variant={variant} />
                        </Card>
                    })
                }
            </Grid>
        </Box>
    )
}

export default GraphVariant