import {
  lineChartData,

} from "./chartData";

export const dashboardView = {
  title: "My Charts",
  charts: [
    {
      id: "4",
      title: "Line Chart",
      type: "line",
      pinned: false,
      description: "This is Line Chart",
      data: lineChartData,
    }
  ],
};

export const chartsData = {
  title: "My Charts",
  charts: [
    {
      id: "4",
      title: "Line Chart",
      type: "line",
      group: "timeSeriesSequence",
      pinned: false,
      description: "This is Line Chart",
      data: lineChartData,
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
