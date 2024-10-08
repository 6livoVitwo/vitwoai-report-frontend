import { ResponsiveHeatMap } from '@nivo/heatmap'
import React from "react";
import { heatmapChartData } from '../data/chartData';

const HeatMap = ({ data = heatmapChartData, dynamicWidth, dynamicHeight }) => {

  const maxValueOfEachArray = data.map((d) => {
    const maxValue = Math.max(...d['data'].map((w) => w.y));
    return maxValue;
  })

  const maxValue = Math.max(...maxValueOfEachArray);

  return (
    <ResponsiveHeatMap
      data={data}
      {...(dynamicHeight > 0 && { height: dynamicHeight })}
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
        minValue: -maxValue,
        maxValue: maxValue
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

