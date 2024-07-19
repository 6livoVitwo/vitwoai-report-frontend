import { ResponsiveParallelCoordinates } from "@nivo/parallel-coordinates";
import React from "react";
import { parallelCoordinatesChartData } from "../chartData";


const ParallelCoordinate = ({ data = parallelCoordinatesChartData }) => {
  return (
    <ResponsiveParallelCoordinates
      data={data}
      variables={[
        {
          id: "temp",
          label: "temperature",
          value: "temp",
          min: "auto",
          max: "auto",
          ticksPosition: "before",
          legendPosition: "start",
          legendOffset: 20,
        },
        {
          id: "cost",
          value: "cost",
          min: 0,
          max: "auto",
          ticksPosition: "before",
          legendPosition: "start",
          legendOffset: 20,
        },
        {
          id: "weight",
          value: "weight",
          min: "auto",
          max: "auto",
          legendPosition: "start",
          legendOffset: -20,
        },
        {
          id: "volume",
          value: "volume",
          min: 0,
          max: "auto",
          legendPosition: "start",
          legendOffset: -20,
        },
      ]}
      margin={{ top: 50, right: 120, bottom: 50, left: 60 }}
      lineWidth={3}
      legends={[
        {
          anchor: "right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 60,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default ParallelCoordinate;
