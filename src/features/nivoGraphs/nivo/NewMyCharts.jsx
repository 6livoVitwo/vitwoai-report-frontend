import React, { useState } from 'react';
import BarChart from './BarChart';
import NivoPieChart from './PieChart';
import FunnelChart from './FunnelChart';
import LineChart from './LineChart';
import AreaBump from './AreaBump';
import BoxPlot from './BoxPlot';
import Bump from './Bump';
import Calendar from './Calendar';
import HeatMap from './HeatMap';
import Marimekko from './Marimekko';
import RadarChart from './Radar';
import RadialBarChart from './RadialBar';
import ScatterPlot from './ScatterPlot';
import Sunburst from './Sunburst';
import TreeChart from './TreeChart';
import TreeMap from './TreeMap';
import WaffleChart from './WaffleChart';

const chartComponents = {
	bar: BarChart,
	pie: NivoPieChart,
	funnel: FunnelChart,
	line: LineChart,
	areaBump: AreaBump,
	boxPlot: BoxPlot,
	bump: Bump,
	calendar: Calendar,
	heatmap: HeatMap,
	marimekko: Marimekko,
	radar: RadarChart,
	radialBar: RadialBarChart,
	scatterPlot: ScatterPlot,
	sunburst: Sunburst,
	tree: TreeChart,
	treeMap: TreeMap,
	waffle: WaffleChart,
};

const NewMyCharts = ({ chart = {} }) => {
	const { type, data = [] } = chart;	

	const ChartComponent = chartComponents[type];

	if (!ChartComponent) {
		return <div>No valid chart type provided</div>;
	}

	return <>
		<ChartComponent liveData={data} />
	</>;
};

export default NewMyCharts;
