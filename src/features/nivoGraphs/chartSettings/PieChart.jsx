import React, { useEffect, useState } from "react";
import Pie from "../nivo/Pie";


const PieChart = ({ liveData = [], startDate = "", endDate = "", dynamicWidth = 1200, inputType = "" }) => {
  
  return (
    <>
      {liveData?.length > 0 ? (
        <Pie data={liveData} dynamicWidth={dynamicWidth} />
      ) : (
        <Pie />
      )}
    </>
  );
};

export default PieChart;
