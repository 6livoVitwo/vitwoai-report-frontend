import React from 'react'
import BarChart from './nivoGraph/barChart';
import AreaBump from './nivoGraph/areaBump';
import LineChart from './nivoGraph/lineChart';
import FunnelChart from "./nivoGraph/funnelGraph";
import TreeMap from './nivoGraph/treeMap';
import TreeChart from './nivoGraph/treeChart';
import CirclePacking from './nivoGraph/circlePacking';
import StreamGraph from "./nivoGraph/streamGraph";
import HeatMap from "./nivoGraph/heatMap";




const MyCharts = ({ chart }) => {
    const { type, data } = chart;

    let chartData = "";

    if (type === "bar") {
        chartData = <BarChart data={data} />;
    } else if (type === "areaBump") {
        chartData = <AreaBump data={data} />;
    } else if (type === "line") {
        chartData = <LineChart data={data} />;
    } else if (type === "funnel") {
        chartData = <FunnelChart data={data} />;
    } else if (type === "treeMap") {
      chartData = <TreeMap data={data} />;
    } else if (type === "tree") {
        chartData = <TreeChart data={data} />;
    } else if (type === "circlePacking") {
        chartData = <CirclePacking data={data} />;
    } else if (type === "stream") {
        chartData = <StreamGraph data={data} />;
    } else if (type === "heatmap") {
        chartData = <HeatMap data={data} />;
    } return <>{chartData}</>;
}

export default MyCharts