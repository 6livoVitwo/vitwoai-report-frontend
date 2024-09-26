import { ResponsiveHeatMap } from '@nivo/heatmap'
import React from "react";

const transformLiveData = (data) => {
  const seriesMap = {};

  data.forEach((item) => {
    const { xaxis, all_total_amt } = item;

    if (!seriesMap[xaxis]) {
      seriesMap[xaxis] = {
        id: xaxis,
        color: "hsl(" + Math.floor(Math.random() * 360) + ", 70%, 50%)",
        data: [],
      };
    }

    seriesMap[xaxis].data.push({
      x: xaxis,
      y: all_total_amt || 0,
    });
  });

  return Object.values(seriesMap);
};

const HeatMap = ({ data = [], liveData = [] }) => {
  const transformedLiveData = transformLiveData(liveData);

  console.log("Raw liveData", liveData);
  console.log("Transformed liveData", transformedLiveData);

  const chartData = (liveData.length > 0 ? transformedLiveData : data).filter(
    (item) => item.data.every((d) => d.x != null && d.y != null)
  );

  console.log("Filtered chartData", chartData);
  console.log(
    "Data source used:",
    liveData.length > 0 ? "liveData" : "static data"
  );

  if (chartData.length === 0) {
    return <div>No data available to display.</div>;
  }

  return (
    <ResponsiveHeatMap
          data={chartData}
          margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
          valueFormat=">-.2s"
          axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -90,
            legend: "",
            legendOffset: 46,
            truncateTickAt: 0,
          }}
          axisRight={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "country",
            legendPosition: "middle",
            legendOffset: 70,
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "country",
            legendPosition: "middle",
            legendOffset: -72,
            truncateTickAt: 0,
          }}
          colors={{
            type: "diverging",
            scheme: "red_yellow_blue",
            divergeAt: 0.5,
            minValue: -100000,
            maxValue: 100000,
          }}
          emptyColor="#555555"
          legends={[
            {
              anchor: "bottom",
              translateX: 0,
              translateY: 30,
              length: 400,
              thickness: 8,
              direction: "row",
              tickPosition: "after",
              tickSize: 3,
              tickSpacing: 4,
              tickOverlap: false,
              tickFormat: ">-.2s",
              title: "Value →",
              titleAlign: "start",
              titleOffset: 4,
            },
          ]}
        />
  );
};

export default HeatMap;

