import { ResponsivePie } from "@nivo/pie";
import React from "react";

// Transform live data to include all sections for the pie chart
const transformLiveData = (data) => {
  // Flatten the data and ensure unique IDs for each data section
  return data.flatMap((item, index) => [
    {
      id: `${item.xaxis}-AllTotalAmount-${index}`,
      label: "All Total Amount",
      value: item.all_total_amt || 0,
    },
    {
      id: `${item.xaxis}-QuotationAmount-${index}`,
      label: "Quotation Amount",
      value: item.quotation?.totalAmount || 0,
    },
    {
      id: `${item.xaxis}-SalesOrderAmount-${index}`,
      label: "Sales Order Amount",
      value: item.salesOrder?.totalAmount || 0,
    },
    {
      id: `${item.xaxis}-SalesPGIDeliveryAmount-${index}`,
      label: "Sales PGI Delivery Amount",
      value: item.salesPgi?.salesDelivery?.totalAmount || 0,
    },
    {
      id: `${item.xaxis}-SalesPGIAmount-${index}`,
      label: "Sales PGI Amount",
      value: item.salesPgi?.totalAmount || 0,
    },
  ]);
};


const NivoPieChart = ({
  data = [],
  liveData = [],
  variant = "grouped-vertical",
}) => {
  // Use transformed live data if available, otherwise fallback to static data
  const transformedLiveData = transformLiveData(liveData);

  console.log("Raw liveData", liveData);
  console.log("Transformed liveData", transformedLiveData);

  // Filter out any data points with value of 0
  const chartData = (liveData.length > 0 ? transformedLiveData : data).filter(
    (item) => item.value > 0
  );

  console.log("Filtered chartData", chartData);
  console.log(
    "Data source used:",
    liveData.length > 0 ? "liveData" : "static data"
  );

  // Handle cases where there's no valid data to display
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
