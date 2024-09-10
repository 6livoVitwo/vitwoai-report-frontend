import AreaBump from "../../dashboardNew/nivo/AreaBump";
import BarChart from "../../dashboardNew/nivo/BarChart";
import Bump from "../../dashboardNew/nivo/Bump";
import FunnelChart from "../../dashboardNew/nivo/FunnelChart";
import LineChart from "../../dashboardNew/nivo/LineChart";
import NivoPieChart from "../../dashboardNew/nivo/PieChart";

const DynamicChart = ({ chart = {} }) => {
  const { type, data } = chart;
  let chartData = null;

  if (type === "bar") {
    chartData = <BarChart data={data} />;
  } else if (type === "areaBump") {
    chartData = <AreaBump data={data} />;
  } else if (type === "pie") {
    chartData = <NivoPieChart data={data} />;
  } else if (type === "line") {
    chartData = <LineChart data={data} />;
  } else if (type === "bump") {
    chartData = <Bump data={data} />;
  } else if (type === "funnel") {
    chartData = <FunnelChart data={data} />;
  }

  return <>{chartData}</>;
};

export default DynamicChart;
