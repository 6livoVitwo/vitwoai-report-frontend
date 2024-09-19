import AreaBump from "../../dashboardNew/nivo/AreaBump";

const DynamicChart = ({ chart = {} }) => {
  const { type, data } = chart;
  let chartData = null;

  if (type === "areaBump") {
    chartData = <AreaBump data={data} />;
  }

  return <>{chartData}</>;
};

export default DynamicChart;
