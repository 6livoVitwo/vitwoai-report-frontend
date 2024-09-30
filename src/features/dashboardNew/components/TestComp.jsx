import { Box, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { ResponsiveAreaBump } from '@nivo/bump'
import React, { useEffect, useState } from 'react'
import { format, eachDayOfInterval, parseISO } from 'date-fns';
import { ResponsiveHeatMap } from '@nivo/heatmap';

const tempData = [
  {
    "id": "Test Service",
    "data": [
      {
        "x": "Salim",
        "y": "-60000.00"
      },
      {
        "x": "Rachhel",
        "y": "100000"
      },
      {
        "x": "Ramen",
        "y": "50000.00"
      }
    ]
  },
  {
    "id": "Lehenga - Karpasa",
    "data": [
      {
        "x": "Salim",
        "y": "99880.00"
      },
      {
        "x": "Rachhel",
        "y": "5000"
      },
      {
        "x": "Ramen",
        "y": "20000"
      }
    ]
  },
  {
    "id": "Stock item test",
    "data": [
      {
        "x": "Salim",
        "y": "889.88"
      },
      {
        "x": "Rachhel",
        "y": "1522"
      },
      {
        "x": "Ramen",
        "y": "1522"
      }
    ]
  },
  {
    "id": "Radio Tarang",
    "data": [
      {
        "x": "Salim",
        "y": "2100.00"
      },
      {
        "x": "Rachhel",
        "y": "1522"
      },
      {
        "x": "Ramen",
        "y": "420.00"
      }
    ]
  },
  {
    "id": "Lens 28MP",
    "data": [
      {
        "x": "Salim",
        "y": "46000.00"
      },
      {
        "x": "Rachhel",
        "y": "88900.00"
      },
      {
        "x": "Ramen",
        "y": "1522"
      }
    ]
  },
  {
    "id": "Classic Rock",
    "data": [
      {
        "x": "Salim",
        "y": "1680.00"
      },
      {
        "x": "Rachhel",
        "y": "2744.00"
      },
      {
        "x": "Ramen",
        "y": "112.00"
      }
    ]
  }
]


const TestComp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [clickedData, setClickedData] = useState({})
  const [data, setData] = useState(tempData);

  return (
    <>
      <div>TestComp</div>
      <div style={{ width: "95%", overflowX: "scroll", height: "500px", border: "1px solid black", padding: 30, marginBottom: 20, marginTop: 20 }}>
        <ResponsiveHeatMap
          data={data}
          margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
          valueFormat=">-.2s"
          axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -90,
            legend: '',
            legendOffset: 46,
            truncateTickAt: 0
          }}
          axisRight={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: 70,
            truncateTickAt: 0
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'country',
            legendPosition: 'middle',
            legendOffset: -72,
            truncateTickAt: 0
          }}
          colors={{
            type: 'diverging',
            scheme: 'red_yellow_blue',
            divergeAt: 0.5,
            minValue: -100000,
            maxValue: 100000
          }}
          emptyColor="#555555"
          legends={[
            {
              anchor: 'bottom',
              translateX: 0,
              translateY: 30,
              length: 400,
              thickness: 8,
              direction: 'row',
              tickPosition: 'after',
              tickSize: 3,
              tickSpacing: 4,
              tickOverlap: false,
              tickFormat: '>-.2s',
              title: 'Value →',
              titleAlign: 'start',
              titleOffset: 4
            }
          ]}
        />
      </div>
      {/* <Box sx={{ display: 'flex' }}>
        <Stack spacing={4} width={320} bg={'yellow.300'} p={4}>
          <Text>From Date</Text>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </Stack>
        <Stack spacing={4} width={320} bg={'yellow.300'} p={4}>
          <Text>To Date</Text>
          <input type="date" value={endDate} onChange={(e) => handleToDate(e.target.value)} />
        </Stack>
      </Box> */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen} size='lg'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>{clickedData.id}</DrawerHeader>
          <DrawerBody>
            <textarea style={{ width: '100%', height: '100%' }}>
              {JSON.stringify(clickedData.data, null, 2)}
            </textarea>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default TestComp