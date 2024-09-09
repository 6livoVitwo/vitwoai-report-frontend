import { areaBumpData } from "./chartData";

export const dashboardView = {
  title: "My Charts",
  charts: [
    {
      id: "1",
      title: "Area Bump",
      type: "areaBump",
      pinned: true,
      description: "This is Area Bump Chart",
      data: areaBumpData,
    },
  ],
};

export const chartsData = {
  title: "My Charts",
  charts: [
    {
      id: "1",
      chartName: "Area Bump",
      title: "Area Bump",
      type: "areaBump",
      group: "timeSeriesSequence",
      pinned: true,
      description: "This is Area Bump Chart",
      data: areaBumpData,
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
