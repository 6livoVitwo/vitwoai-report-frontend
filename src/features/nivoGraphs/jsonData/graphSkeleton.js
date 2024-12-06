import {
  areaBumpData,
  barChartData,
  boxPlotChartData,
  bumpChartData,
  calendarChartData,
  funnelChartData,
  heatmapChartData,
  lineChartData,
  marimekkoChartData,
  pieChartData,
  radarChartData,
  radialBarChartData,
  scatterplotChartData,
  streamChartData,
  sunburstChartData,
  treeChartData,
  treeMapChartData,
  waffleChartData,
} from './chartData';

export const dashboardView = {
  title: "My Charts",
  charts: [
    {
      id: "5",
      title: "Area Bump",
      type: "areaBump",
      pinned: true,
      description: "This is Area Bump Chart",
      data: areaBumpData,
      skeleton: 'yes'
    },
    {
      id: "1",
      title: "Bar Chart",
      type: "bar",
      pinned: true,
      description: "This is Bar Chart",
      data: barChartData,
      variants: [
        "stacked-vertical",
        "stacked-horizontal",
        "grouped-vertical",
        "grouped-horizontal",
      ],
      skeleton: 'yes'
    },
    {
      id: "2",
      title: "Funnel Chart",
      type: "funnel",
      pinned: false,
      description: "This is Funnel Chart",
      data: funnelChartData,
      skeleton: 'yes'
    },
    {
      id: "3",
      title: "Pie Chart",
      type: "pie",
      pinned: true,
      description: "This is Pie Chart",
      data: pieChartData,
      skeleton: 'yes'
    },
    {
      id: "4",
      title: "Line Chart",
      type: "line",
      pinned: false,
      description: "This is Line Chart",
      data: lineChartData,
      skeleton: 'yes'
    },
    {
      id: "6",
      title: "Box Plot",
      type: "boxPlot",
      pinned: true,
      description: "This is Box Plot",
      data: boxPlotChartData,
      skeleton: 'yes'
    },
    {
      id: "7",
      title: "Bump Chart",
      type: "bump",
      pinned: true,
      description: "This is Bump Chart",
      data: bumpChartData,
      skeleton: 'yes'
    },
    {
      id: "8",
      title: "Calendar",
      type: "calendar",
      pinned: true,
      description: "This is Calendar",
      data: calendarChartData,
      skeleton: 'yes'
    },
    {
      id: "9",
      title: "Heat Map",
      type: "heatmap",
      pinned: true,
      description: "This is Heat Map",
      data: heatmapChartData,
      skeleton: 'yes'
    },
    {
      id: "10",
      title: "Marimekko",
      type: "marimekko",
      pinned: false,
      description: "This is Marimekko Chart",
      data: marimekkoChartData,
      skeleton: 'yes'
    },
    {
      id: "11",
      title: "Radar",
      type: "radar",
      pinned: false,
      description: "This is Radar Chart",
      data: radarChartData,
      skeleton: 'yes'
    },
    {
      id: "12",
      title: "Radial Bar",
      type: "radialBar",
      pinned: false,
      description: "This is Radial Bar Chart",
      data: radialBarChartData,
      skeleton: 'yes'
    },
    {
      id: "13",
      title: "Scatter Plot",
      type: "scatterPlot",
      pinned: false,
      description: "This is Scatter Plot Chart",
      data: scatterplotChartData,
      skeleton: 'yes'
    },
    {
      id: "14",
      title: "sunburst",
      type: "sunburst",
      pinned: false,
      description: "This is Sunburst Chart",
      data: sunburstChartData,
      skeleton: 'yes'
    },
    {
      id: "15",
      title: "Tree Chart",
      type: "tree",
      pinned: true,
      description: "This is Tree Chart",
      data: treeChartData,
      skeleton: 'yes'
    },
    {
      id: "16",
      title: "Tree Map",
      type: "treeMap",
      pinned: true,
      description: "This is Tree Map Chart",
      data: treeMapChartData,
      skeleton: 'yes'
    },
    {
      id: "17",
      title: "Waffle",
      type: "waffle",
      pinned: true,
      description: "This is Waffle Chart",
      data: waffleChartData,
      skeleton: 'yes'
    },
    {
      id: "20",
      title: "Stream",
      type: "Stream",
      pinned: true,
      description: "This is Waffle Chart",
      data: streamChartData,
      skeleton: 'yes'
    },
  ],
};

export const chartsData = {
  title: 'My Charts',
  charts: [
    {
      id: '5',
      chartName: 'Area Bump',
      title: 'Area Bump',
      type: 'areaBump',
      group: 'timeSeriesSequence',
      pinned: true,
      description: 'This is Area Bump Chart',
      data: areaBumpData,
      skeleton: 'yes'
    },
    {
      id: '1',
      chartName: 'Bar Chart',
      title: 'Bar Chart',
      type: 'bar',
      group: 'distributionComparison',
      pinned: true,
      description: 'This is Bar Chart',
      data: barChartData,
      variants: [
        'stacked-vertical',
        'stacked-horizontal',
        'grouped-vertical',
        'grouped-horizontal',
      ],
      skeleton: 'yes'
    },
    {
      id: '3',
      chartName: 'Pie Chart',
      title: 'Pie Chart',
      type: 'pie',
      group: 'proportional',
      pinned: true,
      description: 'This is Pie Chart',
      data: pieChartData,
      skeleton: 'yes'
    },
    {
      id: '4',
      chartName: 'Line Chart',
      title: 'Line Chart',
      type: 'line',
      group: 'timeSeriesSequence',
      pinned: false,
      description: 'This is Line Chart',
      data: lineChartData,
      skeleton: 'yes'
    },
    {
      id: '7',
      chartName: 'Bump Chart',
      title: 'Bump Chart',
      type: 'bump',
      group: 'specializedMiscellaneous',
      pinned: true,
      description: 'This is Bump Chart',
      data: bumpChartData,
      skeleton: 'yes'
    },
    {
			id: '9',
			chartName: 'Heat Map',
			title: 'Heat Map',
			type: 'heatmap',
			group: 'heatDensity',
			pinned: true,
			description: 'This is Heat Map',
			data: heatmapChartData,
      skeleton: 'yes'
		},
    {
			id: '2',
			chartName: 'Funnel Chart',
			title: 'Funnel Chart',
			type: 'funnel',
			group: 'flowProcess',
			pinned: false,
			description: 'This is Funnel Chart',
			data: funnelChartData,
      skeleton: 'yes'
		}
  ],
};

export const chartGroup = [
  'distributionComparison',
  'relationalCorrelation',
  'hierarchical',
  'timeSeriesSequence',
  'proportional',
  'flowProcess',
  'geographical',
  'networkRelationship',
  'heatDensity',
  'specializedMiscellaneous',
];
