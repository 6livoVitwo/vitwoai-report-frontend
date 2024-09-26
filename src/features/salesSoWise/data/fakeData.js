import {
    funnelChartData
  } from "./chartData";
  
  export const dashboardView = {
    title: "My Charts",
    charts: [
        {
            id: "1",
            title: "Funnel Chart",
            type: "funnel",
            pinned: false,
            description: "This is Funnel Chart",
            data: funnelChartData,
          },
    ],
  };
  
  export const chartsData = {
    title: "My Charts",
    charts: [
        {
			id: '1',
			chartName: 'Funnel Chart',
			title: 'Funnel Chart',
			type: 'funnel',
			group: 'flowProcess',
			pinned: false,
			description: 'This is Funnel Chart',
			data: funnelChartData,
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
  