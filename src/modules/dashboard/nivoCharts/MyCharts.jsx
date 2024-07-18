import React from "react";
import BarChart from "./BarChart";
import NivoPieChart from "./PieChart";
import FunnelChart from "./FunnelChart";
import LineChart from "./LineChart";
import AreaBump from "./AreaBump";
import BoxPlot from "./BoxPlot";
import Bump from "./Bump";
import Calendar from "./Calendar";
import HeatMap from "./HeatMap";
import Marimekko from "./Marimekko";
import RadarChart from "./Radar";
import RadialBarChart from "./RadialBar";
import ScatterPlot from "./ScatterPlot";
import Sunburst from "./Sunburst";
import TreeChart from "./TreeChart";
import TreeMap from "./TreeMap";
import WaffleChart from "./WaffleChart";
import StreamChart from "./StreamChart";
import TimeRange from "./TimeRange";
import Sankey from "./Sankey";
import ChordChart from "./ChordChart";
import NetworkGraph from "./NetworkGraph";
import ParallelCoordinate from "./ParallelCoordinate";
import SwarmPlot from "./SwarmPlot";
import VoronoiGraph from "./VoronoiGraph";
import CirclePacking from "./CirclePacking";
import BulletGraph from "./BulletGraph";
import ChoroplethChart from "./ChoroplethChart"

const MyCharts = ({ chart }) => {
  const { type, data } = chart;

  let chartData = "";

  if (type === "bar") {
    chartData = <BarChart data={data} />;
  } else if (type === "pie") {
    chartData = <NivoPieChart data={data} />;
  } else if (type === "funnel") {
    chartData = <FunnelChart data={data} />;
  } else if (type === "line") {
    chartData = <LineChart data={data} />;
  } else if (type === "areaBump") {
    chartData = <AreaBump data={data} />;
  } else if (type === "boxPlot") {
    chartData = <BoxPlot data={data} />;
  } else if (type === "bump") {
    chartData = <Bump data={data} />;
  } else if (type === "calendar") {
    chartData = <Calendar data={data} />;
  } else if (type === "heatmap") {
    chartData = <HeatMap data={data} />;
  } else if (type === "marimekko") {
    chartData = <Marimekko data={data} />;
  } else if (type === "radar") {
    chartData = <RadarChart data={data} />;
  } else if (type === "radialBar") {
    chartData = <RadialBarChart data={data} />;
  } else if (type === "scatterPlot") {
    chartData = <ScatterPlot data={data} />;
  } else if (type === "sunburst") {
    chartData = <Sunburst data={data} />;
  } else if (type === "tree") {
    chartData = <TreeChart data={data} />;
  } else if (type === "treeMap") {
    chartData = <TreeMap data={data} />;
  } else if (type === "waffle") {
    chartData = <WaffleChart data={data} />;
  } else if (type === "stream") {
    chartData = <StreamChart data={data} />;
  } else if (type === "timeRange") {
    chartData = <TimeRange data={data} />;
  } else if (type === "sankey") {
    chartData = <Sankey data={data} />;
  } else if (type === "chord") {
    chartData = <ChordChart data={data} />;
  } else if (type === "network") {
    chartData = <NetworkGraph data={data} />;
  } else if (type === "parallelCoordinates") {
    chartData = <ParallelCoordinate data={data} />;
  } else if (type === "swarmPlot") {
    chartData = <SwarmPlot data={data} />;
  } else if (type === "voronoi") {
    chartData = <VoronoiGraph data={data} />;
  } else if (type === "circlePacking") {
    chartData = <CirclePacking data={data} />;
  } else if (type === "bullet") {
    chartData = <BulletGraph data={data} />;
  } else if (type === "choropleth") {
        chartData = <ChoroplethChart data={data} />;
      }

    return <>{chartData}</>;
};

export default MyCharts;
