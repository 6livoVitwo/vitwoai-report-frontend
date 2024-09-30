import React, { useEffect, useState } from "react";
import { format, parse } from 'date-fns';
import { getAllDates } from "../../../utils/graphs-utilitis";
import Funnel from "../nivo/Funnel";

const FunnelChart = ({ liveData = [], startDate = "", endDate = "", dynamicWidth = 1200, inputType = "" }) => {
 console.log('🟢🔴🔵🧨',{liveData})
  return (
    <>
      {liveData.length > 0 ? (
        <Funnel data={liveData} dynamicWidth={dynamicWidth} />
      ) : (
        <Funnel dynamicWidth={dynamicWidth} />
      )}
    </>
  );
};

export default FunnelChart;
