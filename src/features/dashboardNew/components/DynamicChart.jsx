
import NivoPieChart from '../nivo/PieChart';
import FunnelChart from '../nivo/FunnelChart';
import LineChart from '../nivo/LineChart';
import AreaBump from '../nivo/AreaBump';
import BoxPlot from '../nivo/BoxPlot';
import Bump from '../nivo/Bump';
import Calendar from '../nivo/Calendar';
import HeatMap from '../nivo/HeatMap';
import Marimekko from '../nivo/Marimekko';
import RadarChart from '../nivo/Radar';
import RadialBarChart from '../nivo/RadialBar';
import ScatterPlot from '../nivo/ScatterPlot';
import Sunburst from '../nivo/Sunburst';
import TreeChart from '../nivo/TreeChart';
import TreeMap from '../nivo/TreeMap';
import WaffleChart from '../nivo/WaffleChart';
import BarChart from '../nivo/BarChart';

const DynamicChart = ({ chart = {} }) => {

	const { type, data } = chart;
	let chartData = null;

	if (type === 'bar') {
		chartData = <BarChart data={data} />;
	} else if (type === 'pie') {
		chartData = <NivoPieChart data={data} />;
	} else if (type === 'funnel') {
		chartData = <FunnelChart data={data} />;
	} else if (type === 'line') {
		chartData = <LineChart data={data} />;
	} else if (type === 'areaBump') {
		chartData = <AreaBump data={data} />;
	} else if (type === 'boxPlot') {
		chartData = <BoxPlot data={data} />;
	} else if (type === 'bump') {
		chartData = <Bump data={data} />;
	} else if (type === 'calendar') {
		chartData = <Calendar data={data} />;
	} else if (type === 'heatmap') {
		chartData = <HeatMap data={data} />;
	} else if (type === 'marimekko') {
		chartData = <Marimekko data={data} />;
	} else if (type === 'radar') {
		chartData = <RadarChart data={data} />;
	} else if (type === 'radialBar') {
		chartData = <RadialBarChart data={data} />;
	} else if (type === 'scatterPlot') {
		chartData = <ScatterPlot data={data} />;
	} else if (type === 'sunburst') {
		chartData = <Sunburst data={data} />;
	} else if (type === 'tree') {
		chartData = <TreeChart data={data} />;
	} else if (type === 'treeMap') {
		chartData = <TreeMap data={data} />;
	} else if (type === 'waffle') {
		chartData = <WaffleChart data={data} />;
	}

	return <>
	{chartData}
	</>;
};

export default DynamicChart;
