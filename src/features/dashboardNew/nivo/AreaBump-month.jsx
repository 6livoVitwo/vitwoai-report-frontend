import React, { useEffect, useState } from "react";
import { ResponsiveAreaBump } from "@nivo/bump";
import { areaBumpData } from "../data/chartData";
import { format, eachDayOfInterval, parseISO, eachMonthOfInterval, parse, startOfMonth, endOfMonth } from 'date-fns';
import { split } from "lodash";

const AreaBump = ({ liveData = [], startDate="", endDate="", dynamicWidth=1200 }) => {  
  const [data, setData] = useState([]);
  const startYear = (split(startDate, '-')[0] || '2024');
  const startMonth = (split(startDate, '-')[1] || '01');
  const endYear = (split(endDate, '-')[0] || '2024');
  const endMonth = (split(endDate, '-')[1] || '12');
  
  
  const allDates = eachMonthOfInterval({
    start: new Date(startYear, startMonth - 1),
    end: new Date(endYear, endMonth - 1)
  })

  useEffect(() => {
    // Generate all dates within the given range    
    let maxCount = 0; 
    const updatedData = liveData?.map((d, i) => {
      const currentDates = d.data.map(item => item.x); // Extract the current dates in the dataset
      
      maxCount = Math.max(maxCount, currentDates.length);
      const placeholders = allDates
        .filter(date => !currentDates.includes(format(date, 'MM-yyyy')))
        .map(missingDate => ({
          x: format(missingDate, 'MM-yyyy'),
          y: 0
        }));

      // Combine the original data with the placeholders
      return {
        ...d,
        data: [...d.data, ...placeholders].sort((a, b) => {
          const dateA = parse(a.x, 'MM-yyyy', new Date());
          const dateB = parse(b.x, 'MM-yyyy', new Date());
          return dateA - dateB
        }) // Sort by date
      };
    });

    // Update the state
    if (JSON.stringify(updatedData) !== JSON.stringify(data)) {
      setData(updatedData);
    }

  }, [startDate, endDate, dynamicWidth, liveData]);

  return (
    <>
      {liveData.length > 0 ? (
        <ResponsiveAreaBump
          data={data}
          margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
          spacing={20}
          width={1000}
          height={300}
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
      ) : (
        <div style={{ width: "100%", overflowX: "auto", height: "300px" }}>
          <ResponsiveAreaBump
            data={areaBumpData}
            margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
            spacing={8}
            colors={{ scheme: "blues" }}
            blendMode="multiply"
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "#38bcb2",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "#eed312",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            fill={[
              {
                match: {
                  id: "CoffeeScript",
                },
                id: "dots",
              },
              {
                match: {
                  id: "TypeScript",
                },
                id: "lines",
              },
            ]}
            startLabel="id"
            endLabel="id"
            axisTop={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "",
              legendPosition: "middle",
              legendOffset: -36,
              truncateTickAt: 0,
            }}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "",
              legendPosition: "middle",
              legendOffset: 32,
              truncateTickAt: 0,
            }}
          />
        </div>
      )}
    </>
  );
};

export default AreaBump;
