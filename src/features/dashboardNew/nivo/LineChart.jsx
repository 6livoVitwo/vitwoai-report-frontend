import { ResponsiveLine } from "@nivo/line";
import React, { useEffect, useState } from "react";
import { lineChartData } from "../data/chartData";
import { format, parse } from "date-fns";
import { getAllDates } from "../../nivoGraphs/graphUtils/common";

const LineChart = ({ liveData = [], startDate = "", endDate = "", dynamicWidth = 1200, inputType = "" }) => {
  const [data, setData] = useState([]);
  console.log('imran', {liveData})
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
  console.log('filter data', JSON.stringify(data))

  return (
    <>
      {liveData.length > 0 ?
        <ResponsiveLine
          data={data}
          width={dynamicWidth}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          colors={{ scheme: "nivo" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "X Axis",
            legendOffset: 36,
            legendPosition: "middle",
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Y Axis",
            legendOffset: -40,
            legendPosition: "middle",
            truncateTickAt: 0,
          }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabel="data.yFormatted"
          pointLabelYOffset={-12}
          enableTouchCrosshair={true}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
        :
        <ResponsiveLine
          data={lineChartData}
          margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          colors={{ scheme: "purple_blue" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "X Axis",
            legendOffset: 36,
            legendPosition: "middle",
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Y Axis",
            legendOffset: -40,
            legendPosition: "middle",
            truncateTickAt: 0,
          }}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabel="data.yFormatted"
          pointLabelYOffset={-12}
          enableTouchCrosshair={true}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      }
    </>
  );
};

export default LineChart;