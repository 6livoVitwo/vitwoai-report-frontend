import FunnelChart from "../../dashboardNew/nivo/FunnelChart";

const DynamicChart = ({ chart = {} }) => {
  const { type, data } = chart;
  let chartData = null;

  if (type === "funnel") {
    chartData = <FunnelChart data={data} />;
  }
  return <>{chartData}</>;
};

export default DynamicChart;
