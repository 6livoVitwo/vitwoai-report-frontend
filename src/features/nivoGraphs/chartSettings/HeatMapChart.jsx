import React from "react";
import HeatMap from "../nivo/HeatMap";

const HeatMapChart = ({ liveData = [], dynamicWidth = 1200, dynamicHeight }) => {

  return (
    <>
      {liveData.length > 0 ? (
        <HeatMap data={liveData} dynamicWidth={dynamicWidth} dynamicHeight={dynamicHeight} />
      ) : (
        <HeatMap />
      )}
    </>
  );
};

export default HeatMapChart;
