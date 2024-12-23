import { ResponsiveVoronoi } from "@nivo/voronoi";
import React from "react";
import { voronoiChartData } from "../data/chartData";


const VoronoiGraph = ({ data = voronoiChartData }) => {
  return (
    <ResponsiveVoronoi
      data={data}
      xDomain={[0, 100]}
      yDomain={[0, 100]}
      enableLinks={true}
      linkLineColor="#cccccc"
      cellLineColor="#c6432d"
      pointSize={6}
      pointColor="#c6432d"
      margin={{ top: 1, right: 1, bottom: 1, left: 1 }}
    />
  );
};

export default VoronoiGraph;
