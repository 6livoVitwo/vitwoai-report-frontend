import {
  barChartData,
  lineChartData,
  pieChartData,
  heatmapChartData,
} from "./chartData";

export const dashboardView = {
  title: "My Charts",
  charts: [
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
    },
    {
      id: "2",
      title: "Pie Chart",
      type: "pie",
      pinned: true,
      description: "This is Pie Chart",
      data: pieChartData,
    },
    {
      id: "3",
      title: "Line Chart",
      type: "line",
      pinned: false,
      description: "This is Line Chart",
      data: lineChartData,
    },
    {
      id: "4",
      title: "Heat Map",
      type: "heatmap",
      pinned: true,
      description: "This is Heat Map",
      data: heatmapChartData,
    },
  ],
};

export const chartsData = {
  title: "My Charts",
  charts: [
    {
      id: "1",
      chartName: "Bar Chart",
      title: "Bar Chart",
      type: "bar",
      group: "distributionComparison",
      pinned: true,
      description: "This is Bar Chart",
      data: barChartData,
      variants: [
        "stacked-vertical",
        "stacked-horizontal",
        "grouped-vertical",
        "grouped-horizontal",
      ],
    },
    {
      id: "2",
      chartName: "Pie Chart",
      title: "Pie Chart",
      type: "pie",
      group: "proportional",
      pinned: true,
      description: "This is Pie Chart",
      data: pieChartData,
    },
    {
      id: "3",
      chartName: "Line Chart",
      title: "Line Chart",
      type: "line",
      group: "timeSeriesSequence",
      pinned: false,
      description: "This is Line Chart",
      data: lineChartData,
    },
    		{
			id: '4',
			chartName: 'Heat Map',
			title: 'Heat Map',
			type: 'heatmap',
			group: 'heatDensity',
			pinned: true,
			description: 'This is Heat Map',
			data: heatmapChartData,
		},
  ],
};

export const chartGroup = [
  "distributionComparison",
  "relationalCorrelation",
  "hierarchical",
  "timeSeriesSequence",
  "proportional",
  "flowProcess",
  "geographical",
  "networkRelationship",
  "heatDensity",
  "specializedMiscellaneous",
];
