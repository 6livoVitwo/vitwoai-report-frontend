import React, { useEffect, useState } from "react";
import { format, parse } from 'date-fns';
import { getAllDates } from "../graphUtils/common";
import Bar from "../nivo/Bar";

const BarChart = ({ liveData = [], startDate = "", endDate = "", dynamicWidth = 1200, inputType = "" }) => {  
console.log('🔵🟢',{liveData})
  return (
    <>
      {liveData.length > 0 ? (
        <Bar data={liveData} dynamicWidth={dynamicWidth} />
      ) : (
        <Bar dynamicWidth={dynamicWidth} />
      )}
    </>
  );
};

export default BarChart;
