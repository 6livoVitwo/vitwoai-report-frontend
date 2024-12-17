import AreaBumpChart from "../chartSettings/AreaBumpChart";
import LineChart from "../chartSettings/LineChart";
import BumpChart from "../chartSettings/BumpChart";
import BarChart from "../chartSettings/BarChart";
import PieChart from "../chartSettings/PieChart";
import HeatMapChart from "../chartSettings/HeatMapChart";
import FunnelChart from "../chartSettings/FunnelChart";

const DynamicChart = ({ chart = {} }) => {
  const { type, data, startDate, endDate, inputType, dynamicWidth=600, dynamicHeight, skeleton= 'no' } = chart;
  let chartData = null;
  console.log('🔵',{ chart });
  if (type === "bar") {
    chartData = <BarChart liveData={data} startDate={startDate} endDate={endDate} {...(skeleton=== 'no' && {dynamicWidth:dynamicWidth})} inputType={inputType} />;
  } else if (type === "areaBump") {
    chartData = <AreaBumpChart liveData={data} startDate={startDate} endDate={endDate} dynamicWidth={dynamicWidth} inputType={inputType} />;
  } else if (type === "pie") {
    chartData = <PieChart liveData={data} startDate={startDate} endDate={endDate} dynamicWidth={dynamicWidth} inputType={inputType} />;
  } else if (type === "line") {
    chartData = <LineChart liveData={data} startDate={startDate} endDate={endDate} dynamicWidth={dynamicWidth} inputType={inputType} />;
  } else if (type === "bump") {
    chartData = <BumpChart liveData={data} startDate={startDate} endDate={endDate} dynamicWidth={dynamicWidth} inputType={inputType} />;
  } else if (type === "funnel") {
    chartData = <FunnelChart liveData={data} />;
  } else if(type === "heatmap") {
    chartData = <HeatMapChart liveData={data} dynamicWidth={dynamicWidth} dynamicHeight={dynamicHeight} />
  }

  return <>{chartData}</>;
};

export default DynamicChart;
