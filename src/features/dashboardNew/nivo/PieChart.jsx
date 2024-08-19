import { ResponsivePie } from "@nivo/pie";
import React from "react";

const transformLiveData = (data) => {
  return data.map((item, index) => ({
    id: `${item.xaxis || "unknown"}-${index}`,
    value: item.all_total_amt || 0,
  }));
};

const NivoPieChart = ({
  data = [],
  liveData = [],
  variant = "grouped-vertical",
}) => {
  const transformedLiveData = transformLiveData(liveData);

  console.log("Raw liveData", liveData);
  console.log("Transformed liveData", transformedLiveData);

  const chartData = (liveData.length > 0 ? transformedLiveData : data).filter(
    (item) => {
      console.log(`Checking item: ${JSON.stringify(item)}`);
      return item.value !== undefined && item.value > 0;
    }
  );

  console.log("Filtered chartData", chartData);
  console.log(
    "Data source used:",
    liveData.length > 0 ? "liveData" : "static data"
  );

  if (chartData.length === 0) {
    console.warn("chartData is empty or has no valid data to display.");
    return <div>No data available to display.</div>;
  }

  return (
    <ResponsivePie
      data={chartData}
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      colors={{ scheme: "blues" }}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
    />
  );
};

export default NivoPieChart;
