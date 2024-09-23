import { Box, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { ResponsiveAreaBump } from '@nivo/bump'
import React, { useEffect, useState } from 'react'
import { format, eachDayOfInterval, parseISO } from 'date-fns';

const tempData = [
  {
    "id": "Engin Oil",
    "data": [
      {
        "x": '2024-09-01',
        "y": 1
      },
      {
        "x": '2024-09-02',
        "y": 2
      },
      {
        "x": '2024-09-03',
        "y": 1
      },
      {
        "x": '2024-09-04',
        "y": 2
      },
      {
        "x": '2024-09-05',
        "y": 3
      },
      {
        "x": '2024-09-06',
        "y": 2
      }
    ]
  },
  {
    "id": "Gear Oil",
    "data": [
      {
        "x": '2024-09-01',
        "y": 2
      },
      {
        "x": '2024-09-02',
        "y": 2
      },
      {
        "x": '2024-09-06',
        "y": 1
      }
    ]
  },
  {
    "id": "Tier",
    "data": [
      {
        "x": '2024-09-01',
        "y": 1
      },
      {
        "x": '2024-09-04',
        "y": 2
      },
      {
        "x": '2024-09-06',
        "y": 1
      }
    ]
  },
  {
    "id": "Fork Oil",
    "data": [
      {
        "x": '2024-09-01',
        "y": 1
      },
      {
        "x": '2024-09-06',
        "y": 2
      }
    ]
  },
  {
    "id": "Chain Oil",
    "data": [
      {
        "x": '2024-09-01',
        "y": 1
      },
      {
        "x": '2024-09-06',
        "y": 2
      }
    ]
  }
]
// const tempData = [
//   {
//     "id": "Engin Oil",
//     "data": [
//       {
//         "x": 'Jan',
//         "y": 30
//       },
//       {
//         "x": 'Mar',
//         "y": 14
//       },
//       {
//         "x": 'Apr',
//         "y": 26
//       },
//       {
//         "x": 'May',
//         "y": 18
//       },
//       {
//         "x": 'Jun',
//         "y": 20
//       }
//     ]
//   },
//   {
//     "id": "Gear Oil",
//     "data": [
//       {
//         "x": 'Jan',
//         "y": 14
//       },
//       {
//         "x": 'Feb',
//         "y": 29
//       },
//       {
//         "x": 'Mar',
//         "y": 13
//       },
//       {
//         "x": 'Apr',
//         "y": 12
//       },
//       {
//         "x": 'May',
//         "y": 18
//       },
//       {
//         "x": 'Jun',
//         "y": 20
//       }
//     ]
//   },
//   {
//     "id": "Tier",
//     "data": [
//       {
//         "x": 'Jan',
//         "y": 12
//       },
//       {
//         "x": 'Feb',
//         "y": 28
//       },
//       {
//         "x": 'Mar',
//         "y": 21
//       },
//       {
//         "x": 'Apr',
//         "y": 18
//       },
//       {
//         "x": 'May',
//         "y": 18
//       },
//       {
//         "x": 'Jun',
//         "y": 20
//       }
//     ]
//   },
//   {
//     "id": "Chain Set",
//     "data": [
//       {
//         "x": 'Jan',
//         "y": 12
//       },
//       {
//         "x": 'Feb',
//         "y": 28
//       },
//       {
//         "x": 'Mar',
//         "y": 21
//       },
//       {
//         "x": 'Apr',
//         "y": 18
//       },
//       {
//         "x": 'May',
//         "y": 18
//       },
//       {
//         "x": 'Jun',
//         "y": 20
//       }
//     ]
//   },
//   {
//     "id": "Speedometer",
//     "data": [
//       {
//         "x": 'Jan',
//         "y": 12
//       },
//       {
//         "x": 'Feb',
//         "y": 28
//       },
//       {
//         "x": 'Mar',
//         "y": 21
//       },
//       {
//         "x": 'Apr',
//         "y": 18
//       },
//       {
//         "x": 'May',
//         "y": 18
//       },
//       {
//         "x": 'Jun',
//         "y": 20
//       },
//       {
//         "x": 'Jul',
//         "y": 20
//       },
//       {
//         "x": 'Aug',
//         "y": 20
//       },
//       {
//         "x": 'Sep',
//         "y": 20
//       },
//       {
//         "x": 'Oct',
//         "y": 20
//       },
//       {
//         "x": 'Nov',
//         "y": 80
//       }
//     ]
//   },
//   {
//     "id": "Start Switch",
//     "data": [
//       {
//         "x": 'Jan',
//         "y": 42
//       },
//       {
//         "x": 'Feb',
//         "y": 28
//       },
//       {
//         "x": 'Mar',
//         "y": 21
//       },
//       {
//         "x": 'Apr',
//         "y": 18
//       },
//       {
//         "x": 'May',
//         "y": 18
//       },
//       {
//         "x": 'Jun',
//         "y": 20
//       }
//     ]
//   },
//   {
//     "id": "Front Fork",
//     "data": [
//       {
//         "x": 'Jan',
//         "y": 29
//       },
//       {
//         "x": 'Feb',
//         "y": 28
//       },
//       {
//         "x": 'Mar',
//         "y": 21
//       },
//       {
//         "x": 'Apr',
//         "y": 28
//       },
//       {
//         "x": 'May',
//         "y": 18
//       },
//       {
//         "x": 'Jun',
//         "y": 60
//       },
//       {
//         "x": 'Jul',
//         "y": 20
//       }
//     ]
//   }
// ]
const TestComp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [clickedData, setClickedData] = useState({})
  const [data, setData] = useState(tempData);
  const [dynamicWidth, setDynamicWidth] = useState(1200);
  const [startDate, setStartDate] = useState('2024-08-30');
  const [endDate, setEndDate] = useState('2024-09-10');

  const getDateDifference = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    // Difference in milliseconds
    const differenceInTime = endDate - startDate;
    // Convert milliseconds to days (1 day = 24 * 60 * 60 * 1000 milliseconds)
    const differenceInDays = differenceInTime / (1000 * 60 * 60 * 24);
    return differenceInDays;
  };

  // const startMonth = 'Jan';
  // const endMonth = 'Oct';
  // const monthToDate = (month) => `2024-${month}-03`;
  // const generateMonthRange = (start, end) => {
  //   const startDate = parse(monthToDate(start), 'yyyy-MMM-dd', new Date());
  //   const endDate = parse(monthToDate(end), 'yyyy-MMM-dd', new Date());
  //   const months = eachMonthOfInterval({ start: startOfMonth(startDate), end: endOfMonth(endDate) });
  //   return months.map(date => format(date, 'MMM'));
  // };

  // useEffect(() => {
  //   const allMonths = generateMonthRange(startMonth, endMonth);

  //   const updatedData = tempData.map((d) => {
  //     const currentMonths = d.data.map(item => item.x);

  //     // Create placeholders for missing months
  //     const placeholders = allMonths
  //       .filter(month => !currentMonths.includes(month))
  //       .map(missingMonth => ({
  //         x: missingMonth,
  //         y: 0
  //       }));

  //     // Combine the original data with the placeholders
  //     return {
  //       ...d,
  //       data: [...d.data, ...placeholders].sort((a, b) => {
  //         const aDate = new Date(`2024-${a.x}-01`);
  //         const bDate = new Date(`2024-${b.x}-01`);
  //         return aDate - bDate;
  //       })
  //     };
  //   });

  //   // Update the state
  //   setData(updatedData);
  //   console.log('Updated Data:', updatedData);

  // }, [tempData]);
  // #######################################################
  // Generate all dates between start and end date

  const generateDateRange = (start, end) => {
    const parsedStart = parseISO(start);
    const parsedEnd = parseISO(end);
    const dates = eachDayOfInterval({ start: parsedStart, end: parsedEnd });
    return dates.map(date => {
      return format(date, 'yyyy-MM-dd');
    });
  };

  useEffect(() => {
    // Generate all dates within the given range
    const allDates = generateDateRange(startDate, endDate);
    let maxCount = 0;
    const updatedData = tempData.map((d, i) => {
      const currentDates = d.data.map(item => {
        console.log('hello_imran',{ item })
        return item.x;
      }); // Extract the current dates in the dataset
      console.log('hello_imran59059', {currentDates})
      // Find the maximum count of dates in the current data
      maxCount = Math.max(maxCount, currentDates.length);

      // Create placeholders for missing dates
      const placeholders = allDates
        .filter(date => !currentDates.includes(date)) // Find dates not in the current data
        .map(missingDate => ({
          x: missingDate,
          y: 0 // Default y value for the missing dates
        }));

      // Combine the original data with the placeholders
      return {
        ...d,
        data: [...d.data, ...placeholders].sort((a, b) => new Date(a.x) - new Date(b.x)) // Sort by date
      };
    });
    console.log({maxCount})

    // Update the state
    setData(updatedData);
    console.log('Updated Data:', updatedData);

  }, [startDate, endDate, dynamicWidth]);

  const handleToDate = (data) => {
    setEndDate(data);
    const count = getDateDifference(startDate, data);
    setDynamicWidth(200 * count);
    console.log({ count })
  }

  console.log({ dynamicWidth })

  const handleClicked = (data) => {
    setClickedData(data)
    onOpen();
  }

  console.log({ clickedData })

  return (
    <>
      <div>TestComp</div>
      <div style={{ width: "95%", overflowX: "scroll", height: "500px", border: "1px solid black", padding: 30, marginBottom: 20, marginTop: 20 }}>
        <ResponsiveAreaBump
          data={data}
          margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
          spacing={20}
          width={dynamicWidth}
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
      </div>
      <Box sx={{ display: 'flex' }}>
        <Stack spacing={4} width={320} bg={'yellow.300'} p={4}>
          <Text>From Date</Text>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </Stack>
        <Stack spacing={4} width={320} bg={'yellow.300'} p={4}>
          <Text>To Date</Text>
          <input type="date" value={endDate} onChange={(e) => handleToDate(e.target.value)} />
        </Stack>
      </Box>
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