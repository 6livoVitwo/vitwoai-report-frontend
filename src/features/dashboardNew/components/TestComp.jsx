import { Box, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { ResponsiveAreaBump } from '@nivo/bump'
import React, { useEffect, useState } from 'react'
import { format, eachDayOfInterval, parseISO } from 'date-fns';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { ResponsivePie } from '@nivo/pie';

const tempData = [
  {
    "id": "stylus",
    "label": "stylus",
    "value": 427,
    "color": "hsl(359, 70%, 50%)"
  },
  {
    "id": "lisp",
    "label": "lisp",
    "value": 130,
    "color": "hsl(69, 70%, 50%)"
  },
  {
    "id": "make",
    "label": "make",
    "value": 172,
    "color": "hsl(10, 70%, 50%)"
  },
  {
    "id": "java",
    "label": "java",
    "value": 431,
    "color": "hsl(2, 70%, 50%)"
  },
  {
    "id": "php",
    "label": "php",
    "value": 383,
    "color": "hsl(145, 70%, 50%)"
  }
]

const TestComp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [clickedData, setClickedData] = useState({})
  const [data, setData] = useState([
    {
      "quotation.totalAmount": 0,
      id: 'Service',
      label: 'Service',
      value:1770,
      "all_total_amt": 1770,
      "xaxis": "2",
      "salesOrder.totalAmount": 0,
      "salesPgi.totalAmount": 0,
      "salesPgi.salesDelivery.totalAmount": 0
    },
    {
      "quotation.totalAmount": 0,
      id: 'Assets 50',
      label: 'Assets 50',
      value:16468.1,
      "all_total_amt": 16468.1,
      "xaxis": "Assets",
      "salesOrder.totalAmount": 0,
      "salesPgi.totalAmount": 0,
      "salesPgi.salesDelivery.totalAmount": 0
    },
    {
      "quotation.totalAmount": 0,
      id: 'Assets 55',
      label: 'Assets 55',
      value:2100,
      "all_total_amt": 2100,
      "xaxis": "Assets55",
      "salesOrder.totalAmount": 0,
      "salesPgi.totalAmount": 0,
      "salesPgi.salesDelivery.totalAmount": 0
    }
  ]);

  return (
    <>
      <div>TestComp</div>
      <div style={{ width: "95%", overflowX: "scroll", height: "500px", border: "1px solid black", padding: 30, marginBottom: 20, marginTop: 20 }}>
        <ResponsivePie
          data={data}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          activeOuterRadiusOffset={8}
          borderWidth={1}
          borderColor={{
            from: 'color',
            modifiers: [
              [
                'darker',
                0.2
              ]
            ]
          }}
          arcLinkLabelsSkipAngle={10}
          arcLinkLabelsTextColor="#333333"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: 'color' }}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor={{
            from: 'color',
            modifiers: [
              [
                'darker',
                2
              ]
            ]
          }}
          defs={[
            {
              id: 'dots',
              type: 'patternDots',
              background: 'inherit',
              color: 'rgba(255, 255, 255, 0.3)',
              size: 4,
              padding: 1,
              stagger: true
            },
            {
              id: 'lines',
              type: 'patternLines',
              background: 'inherit',
              color: 'rgba(255, 255, 255, 0.3)',
              rotation: -45,
              lineWidth: 6,
              spacing: 10
            }
          ]}
          fill={[
            {
              match: {
                id: 'ruby'
              },
              id: 'dots'
            },
            {
              match: {
                id: 'c'
              },
              id: 'dots'
            },
            {
              match: {
                id: 'go'
              },
              id: 'dots'
            },
            {
              match: {
                id: 'python'
              },
              id: 'dots'
            },
            {
              match: {
                id: 'scala'
              },
              id: 'lines'
            },
            {
              match: {
                id: 'lisp'
              },
              id: 'lines'
            },
            {
              match: {
                id: 'elixir'
              },
              id: 'lines'
            },
            {
              match: {
                id: 'javascript'
              },
              id: 'lines'
            }
          ]}
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              translateX: 0,
              translateY: 56,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: '#999',
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 18,
              symbolShape: 'circle',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemTextColor: '#000'
                  }
                }
              ]
            }
          ]}
        />
      </div>
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