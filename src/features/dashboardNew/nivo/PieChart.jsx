import { ResponsivePie } from "@nivo/pie";
import React from "react";

// Utility function to access nested values
const getNestedValue = (obj, path) => {
  return path.split(".").reduce((acc, key) => acc && acc[key], obj);
};

// Transform live data function
const transformLiveData = (data) => {
  return data.flatMap((item, index) => [
    {
      id: `all_total_amt_${item.xaxis}_${index}`,
      value: item.all_total_amt || 0,
    },
    {
      id: `quotation_totalAmount_${item.xaxis}_${index}`,
      value: getNestedValue(item, "quotation.totalAmount") || 0,
    },
    {
      id: `salesOrder_totalAmount_${item.xaxis}_${index}`,
      value: getNestedValue(item, "salesOrder.totalAmount") || 0,
    },
    {
      id: `salesPgi_salesDelivery_totalAmount_${item.xaxis}_${index}`,
      value: getNestedValue(item, "salesPgi.salesDelivery.totalAmount") || 0,
    },
    {
      id: `salesPgi_totalAmount_${item.xaxis}_${index}`,
      value: getNestedValue(item, "salesPgi.totalAmount") || 0,
    },
  ]);
};

// Nivo Pie Chart Component
const NivoPieChart = ({
  data = [],
  liveData = [],
  variant = "grouped-vertical",
}) => {
  const transformedLiveData = transformLiveData(liveData);

  const chartData = (liveData.length > 0 ? transformedLiveData : data).filter(
    (item) => item.value > 0
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
