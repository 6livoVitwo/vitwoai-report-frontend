import { ResponsiveBump } from '@nivo/bump'
import React, { useEffect, useState } from 'react'
import { bumpChartData } from '../data/chartData'
import { getAllDates } from '../../../utils/graphs-utilitis';
import { format, parse } from 'date-fns';

const Bump = ({ liveData = [], startDate = "", endDate = "", dynamicWidth = 1200, inputType = "" }) => {
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

  }, [startDate, endDate, dynamicWidth, liveData, inputType]);
  
  return (
    <>
      {liveData.length > 0 ?
        <ResponsiveBump
        data={data}
        xPadding={0.55}
        width={dynamicWidth}
        xOuterPadding={0.4}
        yOuterPadding={0.3}
        colors={{ scheme: 'nivo' }}
        lineWidth={3}
        activeLineWidth={7}
        inactiveLineWidth={4}
        inactiveOpacity={0.4}
        startLabelPadding={30}
        startLabelTextColor={{ from: 'color', modifiers: [] }}
        pointSize={10}
        activePointSize={16}
        inactivePointSize={0}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={3}
        activePointBorderWidth={3}
        pointBorderColor={{ from: 'serie.color' }}
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
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'ranking',
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0
        }}
        margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
        axisRight={null}
    />
        :
        <ResponsiveBump
          data={bumpChartData}
          colors={{ scheme: "blues" }}
          lineWidth={3}
          activeLineWidth={6}
          inactiveLineWidth={3}
          inactiveOpacity={0.15}
          pointSize={10}
          activePointSize={16}
          inactivePointSize={0}
          pointColor={{ theme: "background" }}
          pointBorderWidth={3}
          activePointBorderWidth={3}
          pointBorderColor={{ from: "serie.color" }}
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
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "ranking",
            legendPosition: "middle",
            legendOffset: -40,
            truncateTickAt: 0,
          }}
          margin={{ top: 40, right: 100, bottom: 40, left: 60 }}
          axisRight={null}
        />
      }
    </>
  );
}

export default Bump