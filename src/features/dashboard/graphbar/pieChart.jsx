import React, { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const PieChart = ({ id }) => {
  useEffect(() => {
    let root = am5.Root.new(id);

    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    // Create series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        alignLabels: true,
      })
    );

    // Set data
    series.data.setAll([
      { category: "Category 1", value: 40 },
      { category: "Category 2", value: 30 },
      { category: "Category 3", value: 20 },
      { category: "Category 4", value: 10 },
    ]);

    // Animate chart
    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [id]);

  return (
    <div className="card">
      <div id={id} style={{ width: "100%", height: "300px" }}></div>
    </div>
  );
};

export default PieChart;
