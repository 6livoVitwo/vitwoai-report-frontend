import { Box, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { ResponsiveAreaBump } from '@nivo/bump'
import React, { useEffect, useState } from 'react'
import { format, eachDayOfInterval, parseISO } from 'date-fns';

// const tempData = [
//   {
//     "id": "Engin Oil",
//     "data": [
//       {
//         "x": '2024-09-01',
//         "y": 1
//       },
//       {
//         "x": '2024-09-02',
//         "y": 2
//       },
//       {
//         "x": '2024-09-03',
//         "y": 1
//       },
//       {
//         "x": '2024-09-04',
//         "y": 2
//       },
//       {
//         "x": '2024-09-05',
//         "y": 3
//       },
//       {
//         "x": '2024-09-06',
//         "y": 2
//       }
//     ]
//   },
//   {
//     "id": "Gear Oil",
//     "data": [
//       {
//         "x": '2024-09-01',
//         "y": 2
//       },
//       {
//         "x": '2024-09-02',
//         "y": 2
//       },
//       {
//         "x": '2024-09-06',
//         "y": 1
//       }
//     ]
//   },
//   {
//     "id": "Tier",
//     "data": [
//       {
//         "x": '2024-09-01',
//         "y": 1
//       },
//       {
//         "x": '2024-09-04',
//         "y": 2
//       },
//       {
//         "x": '2024-09-06',
//         "y": 1
//       }
//     ]
//   },
//   {
//     "id": "Fork Oil",
//     "data": [
//       {
//         "x": '2024-09-01',
//         "y": 1
//       },
//       {
//         "x": '2024-09-06',
//         "y": 2
//       }
//     ]
//   },
//   {
//     "id": "Chain Oil",
//     "data": [
//       {
//         "x": '2024-09-01',
//         "y": 1
//       },
//       {
//         "x": '2024-09-06',
//         "y": 2
//       }
//     ]
//   }
// ]

const tempData = [
  {
    "id": "Lehenga - Karpasa",
    "data": [
      {
        "x": "2021",
        "y": 99880.0
      },
      {
        "x": "2022",
        "y": 0
      },
      {
        "x": "2023",
        "y": 0
      },
      {
        "x": "2024",
        "y": 81880.0
      }
    ]
  },
  {
    "id": "Chandrani Perls 22X50",
    "data": [
      {
        "x": "2021",
        "y": 0
      },
      {
        "x": "2022",
        "y": 91880.0
      },
      {
        "x": "2023",
        "y": 482
      },
      {
        "x": "2024",
        "y": 0
      }
    ]
  },
  {
    "id": "County Bluetooth Speaker with Built-in FM Radio - Black",
    "data": [
      {
        "x": "2021",
        "y": 99880.0
      },
      {
        "x": "2022",
        "y": 91880.0
      },
      {
        "x": "2023",
        "y": 0
      },
      {
        "x": "2024",
        "y": 81880.0
      }
    ]
  },
  {
    "id": "Portable Music Player with 5000 Preloaded Songs",
    "data": [
      {
        "x": "2021",
        "y": 99880.0
      },
      {
        "x": "2022",
        "y": 91880.0
      },
      {
        "x": "2023",
        "y": 0
      },
      {
        "x": "2024",
        "y": 81880.0
      }
    ]
  },
  {
    "id": "Walki Talki 500M Range",
    "data": [
      {
        "x": "2021",
        "y": 99880.0
      },
      {
        "x": "2022",
        "y": 91880.0
      },
      {
        "x": "2023",
        "y": 0
      },
      {
        "x": "2024",
        "y": 81880.0
      }
    ]
  },
  {
    "id": "Radio Servicing   /",
    "data": [
      {
        "x": "2021",
        "y": 99880.0
      },
      {
        "x": "2022",
        "y": 91880.0
      },
      {
        "x": "2023",
        "y": 0
      },
      {
        "x": "2024",
        "y": 81880.0
      }
    ]
  },
  {
    "id": "Keyboard - MWP Sample",
    "data": [
      {
        "x": "2021",
        "y": 99880.0
      },
      {
        "x": "2022",
        "y": 91880.0
      },
      {
        "x": "2023",
        "y": 0
      },
      {
        "x": "2024",
        "y": 81880.0
      }
    ]
  },
  {
    "id": "Carvaan Mobile Don Lite M23 Kannada - Classic Black (2.4)",
    "data": [
      {
        "x": "2021",
        "y": 250
      },
      {
        "x": "2022",
        "y": 91880.0
      },
      {
        "x": "2023",
        "y": 0
      },
      {
        "x": "2024",
        "y": 0
      }
    ]
  },
  {
    "id": "service sales",
    "data": [
      {
        "x": "2021",
        "y": 99880.0
      },
      {
        "x": "2022",
        "y": 0
      },
      {
        "x": "2023",
        "y": 250
      },
      {
        "x": "2024",
        "y": 81880.0
      }
    ]
  },
  {
    "id": "Invidia Graphics Card for Gamer 8X8 NOS",
    "data": [
      {
        "x": "2021",
        "y": 99880.0
      },
      {
        "x": "2022",
        "y": 91880.0
      },
      {
        "x": "2023",
        "y": 0
      },
      {
        "x": "2024",
        "y": 81880.0
      }
    ]
  }
]
const TestComp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [clickedData, setClickedData] = useState({})
  const [data, setData] = useState(tempData);
  const [dynamicWidth, setDynamicWidth] = useState(1200);
  const [startYear, setStartDate] = useState('2021');
  const [endYear, setEndDate] = useState('2024');

  return (
    <>
      <div>TestComp</div>
      <div style={{ width: "95%", overflowX: "scroll", height: "500px", border: "1px solid black", padding: 30, marginBottom: 20, marginTop: 20 }}>
        <ResponsiveAreaBump
          data={data}
          margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
          spacing={20}
          width={dynamicWidth}
          // onClick={(datum) => handleClicked(datum)}
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