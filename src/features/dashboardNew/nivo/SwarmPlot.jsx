import { ResponsiveSwarmPlot } from "@nivo/swarmplot";
import React from "react";
import { swarmPlotChartData } from "../data/chartData";

const SwarmPlot = ({ data = swarmPlotChartData }) => {
  return (
    <ResponsiveSwarmPlot
      data={data}
      groups={["group A", "group B", "group C"]}
      identity="id"
      value="price"
      valueFormat="$.2f"
      valueScale={{ type: "linear", min: 0, max: 500, reverse: false }}
      size={{
        key: "volume",
        values: [4, 20],
        sizes: [6, 20],
      }}
      forceStrength={4}
      simulationIterations={100}
      borderColor={{
        from: "color",
        modifiers: [
          ["darker", 0.6],
          ["opacity", 0.5],
        ],
      }}
      margin={{ top: 80, right: 100, bottom: 80, left: 100 }}
      axisTop={{
        orient: "top",
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: "group if vertical, price if horizontal",
        legendPosition: "middle",
        legendOffset: -46,
        truncateTickAt: 0,
      }}
      axisRight={{
        orient: "right",
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: "price if vertical, group if horizontal",
        legendPosition: "middle",
        legendOffset: 76,
        truncateTickAt: 0,
      }}
      axisBottom={{
        orient: "bottom",
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: "group if vertical, price if horizontal",
        legendPosition: "middle",
        legendOffset: 46,
        truncateTickAt: 0,
      }}
      axisLeft={{
        orient: "left",
        tickSize: 10,
        tickPadding: 5,
        tickRotation: 0,
        legend: "price if vertical, group if horizontal",
        legendPosition: "middle",
        legendOffset: -76,
        truncateTickAt: 0,
      }}
    />
  );
};

export default SwarmPlot;
