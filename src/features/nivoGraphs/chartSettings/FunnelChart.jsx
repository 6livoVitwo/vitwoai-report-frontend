import React from "react";
import Funnel from "../nivo/Funnel";

const FunnelChart = ({ liveData = [], dynamicWidth = 1200 }) => {
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
