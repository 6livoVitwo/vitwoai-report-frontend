import FunnelChart from "../../dashboardNew/nivo/FunnelChart";
import NivoPieChart from "../../dashboardNew/nivo/PieChart";
import AreaBump from "../nivo/AreaBump";
import Bar from "../nivo/Bar";
import Bump from "../nivo/Bump";
import HeatMap from "../nivo/HeatMap";
import Line from "../nivo/Line";

const DynamicChart = ({ chart = {} }) => {
  const { type, data } = chart;
  let chartData = null;

  if (type === "bar") {
    chartData = <Bar data={data} />;
  } else if (type === "areaBump") {
    chartData = <AreaBump data={data} />;
  } else if (type === "pie") {
    chartData = <NivoPieChart data={data} />;
  } else if (type === "line") {
    chartData = <Line data={data} />;
  } else if (type === "bump") {
    chartData = <Bump data={data} />;
  } else if (type === "funnel") {
    chartData = <FunnelChart data={data} />;
  } else if(type === "heatmap") {
    chartData = <HeatMap data={data} />
  }

  return <>{chartData}</>;
};

export default DynamicChart;
