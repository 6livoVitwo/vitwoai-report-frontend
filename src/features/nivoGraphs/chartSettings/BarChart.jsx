import React from "react";
import Bar from "../nivo/Bar";

const BarChart = ({ liveData = [], startDate = "", endDate = "", dynamicWidth, inputType = "" }) => {
  
  return (
    <>
      {liveData.length > 0 ? (
        <Bar data={liveData} dynamicWidth={dynamicWidth} />
      ) : (
        <Bar />
      )}
    </>
  );
};

export default BarChart;
