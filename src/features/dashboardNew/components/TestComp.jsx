import { Box, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { ResponsiveAreaBump } from '@nivo/bump'
import React, { useEffect, useState } from 'react'
import { format, eachDayOfInterval, parseISO } from 'date-fns';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { ResponsivePie } from '@nivo/pie';


const TestComp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [clickedData, setClickedData] = useState({})
  const [data, setData] = useState([
    {
        "id": "Chocolate Bar",
        "data": [
            {
                "x": "01-2024",
                "y": 96
            },
            {
                "x": "02-2024",
                "y": 0
            },
            {
                "x": "03-2024",
                "y": 0
            },
            {
                "x": "04-2024",
                "y": 0
            },
            {
                "x": "05-2024",
                "y": 0
            },
            {
                "x": "06-2024",
                "y": 0
            },
            {
                "x": "07-2024",
                "y": 0
            },
            {
                "x": "08-2024",
                "y": 0
            },
            {
                "x": "09-2024",
                "y": 0
            },
            {
                "x": "10-2024",
                "y": 0
            },
            {
                "x": "11-2024",
                "y": 0
            },
            {
                "x": "12-2024",
                "y": 0
            }
        ]
    },
    {
        "id": "HAIR SYSTEM AMPOLLE",
        "data": [
            {
                "x": "01-2024",
                "y": 96
            },
            {
                "x": "02-2024",
                "y": 0
            },
            {
                "x": "03-2024",
                "y": 0
            },
            {
                "x": "04-2024",
                "y": 0
            },
            {
                "x": "05-2024",
                "y": 0
            },
            {
                "x": "06-2024",
                "y": 0
            },
            {
                "x": "07-2024",
                "y": 0
            },
            {
                "x": "08-2024",
                "y": 0
            },
            {
                "x": "09-2024",
                "y": 0
            },
            {
                "x": "10-2024",
                "y": 0
            },
            {
                "x": "11-2024",
                "y": 0
            },
            {
                "x": "12-2024",
                "y": 0
            }
        ]
    },
    {
        "id": "Stainless steel (1)",
        "data": [
            {
                "x": "01-2024",
                "y": 0
            },
            {
                "x": "02-2024",
                "y": 98
            },
            {
                "x": "03-2024",
                "y": 0
            },
            {
                "x": "04-2024",
                "y": 0
            },
            {
                "x": "05-2024",
                "y": 0
            },
            {
                "x": "06-2024",
                "y": 0
            },
            {
                "x": "07-2024",
                "y": 0
            },
            {
                "x": "08-2024",
                "y": 0
            },
            {
                "x": "09-2024",
                "y": 0
            },
            {
                "x": "10-2024",
                "y": 0
            },
            {
                "x": "11-2024",
                "y": 0
            },
            {
                "x": "12-2024",
                "y": 0
            }
        ]
    },
    {
        "id": "Carvaan Mini",
        "data": [
            {
                "x": "01-2024",
                "y": 0
            },
            {
                "x": "02-2024",
                "y": 0
            },
            {
                "x": "03-2024",
                "y": 0
            },
            {
                "x": "04-2024",
                "y": 0
            },
            {
                "x": "05-2024",
                "y": 0
            },
            {
                "x": "06-2024",
                "y": 992
            },
            {
                "x": "07-2024",
                "y": 0
            },
            {
                "x": "08-2024",
                "y": 0
            },
            {
                "x": "09-2024",
                "y": 0
            },
            {
                "x": "10-2024",
                "y": 0
            },
            {
                "x": "11-2024",
                "y": 0
            },
            {
                "x": "12-2024",
                "y": 0
            }
        ]
    },
    {
        "id": "high-density polyethylene (HDPE)3",
        "data": [
            {
                "x": "01-2024",
                "y": 0
            },
            {
                "x": "02-2024",
                "y": 0
            },
            {
                "x": "03-2024",
                "y": 0
            },
            {
                "x": "04-2024",
                "y": 0
            },
            {
                "x": "05-2024",
                "y": 0
            },
            {
                "x": "06-2024",
                "y": 0
            },
            {
                "x": "07-2024",
                "y": 0
            },
            {
                "x": "08-2024",
                "y": 990
            },
            {
                "x": "09-2024",
                "y": 0
            },
            {
                "x": "10-2024",
                "y": 0
            },
            {
                "x": "11-2024",
                "y": 0
            },
            {
                "x": "12-2024",
                "y": 0
            }
        ]
    },
    {
        "id": "polyethylene terephthalate (PET)3",
        "data": [
            {
                "x": "01-2024",
                "y": 0
            },
            {
                "x": "02-2024",
                "y": 0
            },
            {
                "x": "03-2024",
                "y": 0
            },
            {
                "x": "04-2024",
                "y": 0
            },
            {
                "x": "05-2024",
                "y": 0
            },
            {
                "x": "06-2024",
                "y": 0
            },
            {
                "x": "07-2024",
                "y": 0
            },
            {
                "x": "08-2024",
                "y": 990
            },
            {
                "x": "09-2024",
                "y": 0
            },
            {
                "x": "10-2024",
                "y": 0
            },
            {
                "x": "11-2024",
                "y": 0
            },
            {
                "x": "12-2024",
                "y": 0
            }
        ]
    },
    {
        "id": "9 Watt Bulb",
        "data": [
            {
                "x": "01-2024",
                "y": 0
            },
            {
                "x": "02-2024",
                "y": 0
            },
            {
                "x": "03-2024",
                "y": 0
            },
            {
                "x": "04-2024",
                "y": 0
            },
            {
                "x": "05-2024",
                "y": 0
            },
            {
                "x": "06-2024",
                "y": 96
            },
            {
                "x": "07-2024",
                "y": 0
            },
            {
                "x": "08-2024",
                "y": 0
            },
            {
                "x": "09-2024",
                "y": 0
            },
            {
                "x": "10-2024",
                "y": 0
            },
            {
                "x": "11-2024",
                "y": 0
            },
            {
                "x": "12-2024",
                "y": 0
            }
        ]
    },
    {
        "id": "HAIR SYSTEM AMPOLLE (5DA 5ML)",
        "data": [
            {
                "x": "01-2024",
                "y": 96
            },
            {
                "x": "02-2024",
                "y": 0
            },
            {
                "x": "03-2024",
                "y": 0
            },
            {
                "x": "04-2024",
                "y": 0
            },
            {
                "x": "05-2024",
                "y": 0
            },
            {
                "x": "06-2024",
                "y": 0
            },
            {
                "x": "07-2024",
                "y": 0
            },
            {
                "x": "08-2024",
                "y": 0
            },
            {
                "x": "09-2024",
                "y": 0
            },
            {
                "x": "10-2024",
                "y": 0
            },
            {
                "x": "11-2024",
                "y": 0
            },
            {
                "x": "12-2024",
                "y": 0
            }
        ]
    }
]);

  return (
    <>
      <div>TestComp</div>
      <div style={{ width: "95%", overflowX: "scroll", height: "500px", border: "1px solid black", padding: 30, marginBottom: 20, marginTop: 20 }}>
      <ResponsiveAreaBump
        data={data}
        margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
        spacing={20}
        colors={{ scheme: 'nivo' }}
        blendMode="multiply"
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
          }
        ]}
        fill={[
          {
            match: {
              id: 'CoffeeScript'
            },
            id: 'dots'
          },
          {
            match: {
              id: 'TypeScript'
            },
            id: 'lines'
          }
        ]}
        startLabel="id"
        endLabel="id"
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: -36,
          truncateTickAt: 0
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: 32,
          truncateTickAt: 0
        }}
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