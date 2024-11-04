import React from "react";
import LineChart from "./lineChart";

const MyChart = ({ chart }) => {
  const { type, data } = chart;

  let chartData = "";

  if (type === "line") {
    chartData = <LineChart data={data} />;
  }
  return <>{chartData}</>;
};

export default MyChart;
