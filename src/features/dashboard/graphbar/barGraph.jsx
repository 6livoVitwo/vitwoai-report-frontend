// BarGraph.jsx
import React, { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const BarGraph = ({ id }) => {
  useEffect(() => {
    am5.ready(function () {
      var root = am5.Root.new(id);
      root.setThemes([am5themes_Animated.new(root)]);
      var chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX",
          pinchZoomX: true,
          paddingLeft: 0,
          paddingRight: 1,
        })
      );

      var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
      cursor.lineY.set("visible", false);

      var xRenderer = am5xy.AxisRendererX.new(root, {
        minGridDistance: 30,
        minorGridEnabled: true,
      });

      xRenderer.labels.template.setAll({
        rotation: -90,
        centerY: am5.p50,
        centerX: am5.p100,
        paddingRight: 15,
      });

      xRenderer.grid.template.setAll({
        location: 1,
      });

      var xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          maxDeviation: 0.3,
          categoryField: "country",
          renderer: xRenderer,
          tooltip: am5.Tooltip.new(root, {}),
        })
      );

      var yRenderer = am5xy.AxisRendererY.new(root, {
        strokeOpacity: 0.1,
      });

      var yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          maxDeviation: 0.3,
          renderer: yRenderer,
        })
      );

      var series = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          name: "Series 1",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          sequencedInterpolation: true,
          categoryXField: "country",
          tooltip: am5.Tooltip.new(root, {
            labelText: "{valueY}",
          }),
        })
      );

      series.columns.template.setAll({
        cornerRadiusTL: 5,
        cornerRadiusTR: 5,
        strokeOpacity: 0,
      });
      series.columns.template.adapters.add("fill", function (fill, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
      });

      series.columns.template.adapters.add("stroke", function (stroke, target) {
        return chart.get("colors").getIndex(series.columns.indexOf(target));
      });

      // Set data
      var data = [
        {
          country: "USA",
          value: 2025,
        },
        {
          country: "China",
          value: 1882,
        },
        {
          country: "Japan",
          value: 1809,
        },
        {
          country: "Germany",
          value: 1322,
        },
        {
          country: "UK",
          value: 1122,
        },
        {
          country: "France",
          value: 1114,
        },
        {
          country: "India",
          value: 984,
        },
        {
          country: "Spain",
          value: 711,
        },
        {
          country: "Netherlands",
          value: 665,
        },
        {
          country: "South Korea",
          value: 443,
        },
        {
          country: "Canada",
          value: 441,
        },
      ];

      xAxis.data.setAll(data);
      series.data.setAll(data);
      series.appear(1000);
      chart.appear(1000, 100);
    });
  }, [id]);

  return (
    <div className="card">
      <div id={id} style={{ width: "100%", height: "300px" }}></div>
    </div>
  );
};

export default BarGraph;
