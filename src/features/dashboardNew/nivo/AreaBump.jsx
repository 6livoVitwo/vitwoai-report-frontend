import React, { useEffect, useState } from "react";
import { ResponsiveAreaBump } from "@nivo/bump";
import { areaBumpData } from "../data/chartData";
import { format, parse } from 'date-fns';
import { getAllDates } from "../../../utils/graphs-utilitis";

const AreaBump = ({ liveData = [], startDate = "", endDate = "", dynamicWidth = 1200, inputType = "" }) => {
  const [data, setData] = useState([]);

  const allDates = getAllDates(inputType, startDate, endDate);

  useEffect(() => {
    let maxCount = 0;
    const updatedData = liveData?.map((d, i) => {
      const currentDates = d.data.map(item => item.x);
      maxCount = Math.max(maxCount, currentDates.length);

      const monthPlaceholders = allDates
        .filter(date => !currentDates.includes(format(date, 'MM-yyyy')))
        .map(missingDate => ({
          x: format(missingDate, 'MM-yyyy'),
          y: 0
        }));

      const yearPlaceholders = allDates
        .filter(date => !currentDates.includes(format(date, 'yyyy')))
        .map(missingDate => ({
          x: format(missingDate, 'yyyy'),
          y: 0
        }));

      const dayPlaceholders = allDates
        .filter(date => !currentDates.includes(date))
        .map(missingDate => ({
          x: missingDate,
          y: 0
        }));

      // Combine the original data with the placeholders
      return {
        ...d,
        data: inputType === "month" ? [...d.data, ...monthPlaceholders].sort((a, b) => {
          const dateA = parse(a.x, 'MM-yyyy', new Date());
          const dateB = parse(b.x, 'MM-yyyy', new Date());
          return dateA - dateB
        }) : inputType === "year"
          ? [...d.data, ...yearPlaceholders].sort((a, b) => parseInt(a.x) - parseInt(b.x)) : [...d.data, ...dayPlaceholders].sort((a, b) => new Date(a.x) - new Date(b.x))
      };
    });

    // Update the state
    if (JSON.stringify(updatedData) !== JSON.stringify(data)) {
      setData(updatedData);
    }
    console.log('Updated Data in the useeffect 🍃:', updatedData);
    console.log('liveData in the useeffect 🍃:', liveData);

  }, [startDate, endDate, dynamicWidth, liveData, inputType]);
console.log('area bump data', JSON.stringify(data))
  return (
    <>
      {liveData.length > 0 ? (
        <ResponsiveAreaBump
          data={data}
          margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
          spacing={20}
          width={dynamicWidth}
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
      )}
    </>
  );
};

export default AreaBump;
