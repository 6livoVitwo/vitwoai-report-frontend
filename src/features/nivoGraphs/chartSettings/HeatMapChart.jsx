import React from "react";
import HeatMap from "../nivo/HeatMap";

const HeatMapChart = ({ liveData = [], dynamicWidth = 1200 }) => {

  return (
    <>
      {liveData.length > 0 ? (
        <HeatMap data={liveData} dynamicWidth={dynamicWidth} />
      ) : (
        <HeatMap dynamicWidth={dynamicWidth} />
      )}
    </>
  );
};

export default HeatMapChart;
