import React, { useEffect } from "react";
import PropTypes from "prop-types";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const FunnelChart = ({ id }) => {
  useEffect(() => {
    if (!id) return; // Ensure id is defined

    let root = am5.Root.new(id);

    root.setThemes([am5themes_Animated.new(root)]);

    // Create chart
    let chart = root.container.children.push(
      am5percent.SlicedChart.new(root, {
        layout: root.verticalLayout,
      })
    );

    // Create series
    let series = chart.series.push(
      am5percent.FunnelSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        alignLabels: true,
      })
    );

    // Set data
    series.data.setAll([
      { category: "Stage 1", value: 1000 },
      { category: "Stage 2", value: 800 },
      { category: "Stage 3", value: 600 },
      { category: "Stage 4", value: 400 },
      { category: "Stage 5", value: 200 },
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

FunnelChart.propTypes = {
  id: PropTypes.string.isRequired,
};

export default FunnelChart;
