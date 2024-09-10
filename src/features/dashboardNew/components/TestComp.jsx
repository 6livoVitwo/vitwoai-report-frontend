import { Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, useDisclosure } from '@chakra-ui/react'
import { ResponsiveAreaBump } from '@nivo/bump'
import React, { useState } from 'react'

const data = [
  {
    "id": "Engin Oil",
    "data": [
      {
        "x": 'Jan',
        "y": 30
      },
      {
        "x": 'Feb',
        "y": 26
      },
      {
        "x": 'Mar',
        "y": 14
      },
      {
        "x": 'Apr',
        "y": 26
      },
      {
        "x": 'May',
        "y": 18
      },
      {
        "x": 'Jun',
        "y": 20
      }
    ]
  },
  {
    "id": "Gear Oil",
    "data": [
      {
        "x": 'Jan',
        "y": 14
      },
      {
        "x": 'Feb',
        "y": 29
      },
      {
        "x": 'Mar',
        "y": 13
      },
      {
        "x": 'Apr',
        "y": 12
      },
      {
        "x": 'May',
        "y": 18
      },
      {
        "x": 'Jun',
        "y": 20
      }
    ]
  },
  {
    "id": "Tier",
    "data": [
      {
        "x": 'Jan',
        "y": 12
      },
      {
        "x": 'Feb',
        "y": 28
      },
      {
        "x": 'Mar',
        "y": 21
      },
      {
        "x": 'Apr',
        "y": 18
      },
      {
        "x": 'May',
        "y": 18
      },
      {
        "x": 'Jun',
        "y": 20
      }
    ]
  },
  {
    "id": "Chain Set",
    "data": [
      {
        "x": 'Jan',
        "y": 12
      },
      {
        "x": 'Feb',
        "y": 28
      },
      {
        "x": 'Mar',
        "y": 21
      },
      {
        "x": 'Apr',
        "y": 18
      },
      {
        "x": 'May',
        "y": 18
      },
      {
        "x": 'Jun',
        "y": 20
      }
    ]
  },
  {
    "id": "Speedometer",
    "data": [
      {
        "x": 'Jan',
        "y": 12
      },
      {
        "x": 'Feb',
        "y": 28
      },
      {
        "x": 'Mar',
        "y": 21
      },
      {
        "x": 'Apr',
        "y": 18
      },
      {
        "x": 'May',
        "y": 18
      },
      {
        "x": 'Jun',
        "y": 20
      }
    ]
  },
  {
    "id": "Start Switch",
    "data": [
      {
        "x": 'Jan',
        "y": 42
      },
      {
        "x": 'Feb',
        "y": 28
      },
      {
        "x": 'Mar',
        "y": 21
      },
      {
        "x": 'Apr',
        "y": 18
      },
      {
        "x": 'May',
        "y": 18
      },
      {
        "x": 'Jun',
        "y": 20
      }
    ]
  },
  {
    "id": "Front Fork",
    "data": [
      {
        "x": 'Jan',
        "y": 29
      },
      {
        "x": 'Feb',
        "y": 28
      },
      {
        "x": 'Mar',
        "y": 21
      },
      {
        "x": 'Apr',
        "y": 28
      },
      {
        "x": 'May',
        "y": 18
      },
      {
        "x": 'Jun',
        "y": 60
      }
    ]
  }
]
const TestComp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [clickedData, setClickedData] = useState({})
  const handleClicked = (data) => {
    setClickedData(data)
    onOpen();
  }

  console.log({ clickedData })

  return (
    <>
      <div>TestComp</div>
      <ResponsiveAreaBump
        data={data}
        margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
        spacing={8}
        onClick={(datum) => handleClicked(datum)}
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