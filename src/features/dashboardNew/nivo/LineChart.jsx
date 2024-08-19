import { ResponsiveLine } from "@nivo/line";
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

const LineChart = ({ data = [], liveData = [] }) => {
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
    <ResponsiveLine
      data={chartData}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
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
  );
};


export default LineChart;
