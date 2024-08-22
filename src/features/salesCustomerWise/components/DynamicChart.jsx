import NivoPieChart from "../../dashboardNew/nivo/PieChart";
import BarChart from "../../dashboardNew/nivo/BarChart";
import LineChart from "../../dashboardNew/nivo/LineChart";
import HeatMap from "../../dashboardNew/nivo/HeatMap";


const DynamicChart = ({ chart = {} }) => {
  const { type, data } = chart;
  let chartData = null;

  if (type === "bar") {
    chartData = <BarChart data={data} />;
  } else if (type === "pie") {
    chartData = <NivoPieChart data={data} />;
  } else if (type === "line") {
    chartData = <LineChart data={data} />;
  } else if (type === "heatmap") {
    chartData = <HeatMap data={data} />;
  }
    
  return <>{chartData}</>;
};

export default DynamicChart;
