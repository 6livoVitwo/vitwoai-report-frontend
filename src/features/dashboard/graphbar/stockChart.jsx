import React, { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5stock from "@amcharts/amcharts5/stock";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

const StockChart = ({ id }) => {
  useEffect(() => {
    let root = am5.Root.new(id);

    root.setThemes([am5themes_Animated.new(root)]);

    // Create a stock chart
    let stockChart = root.container.children.push(
      am5stock.StockChart.new(root, {})
    );

    // Create a main stock panel (chart)
    let mainPanel = stockChart.panels.push(
      am5stock.StockPanel.new(root, {
        wheelY: "zoomX",
        panX: true,
        panY: true,
      })
    );

    // Create a value axis
    let valueAxis = mainPanel.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Create a date axis
    let dateAxis = mainPanel.xAxes.push(
      am5xy.DateAxis.new(root, {
        maxDeviation: 0.2,
        baseInterval: {
          timeUnit: "day",
          count: 1,
        },
        renderer: am5xy.AxisRendererX.new(root, {}),
      })
    );

    // Create a series
    let series = mainPanel.series.push(
      am5xy.LineSeries.new(root, {
        name: "Price",
        valueYField: "value",
        valueXField: "date",
        xAxis: dateAxis,
        yAxis: valueAxis,
        tooltip: am5.Tooltip.new(root, {
          labelText: "{valueY}",
        }),
      })
    );

    // Set stock chart data
    let data = [
      { date: new Date(2023, 0, 1).getTime(), value: 100 },
      { date: new Date(2023, 0, 2).getTime(), value: 105 },
      { date: new Date(2023, 0, 3).getTime(), value: 102 },
      // Add more data points as needed
    ];

    series.data.setAll(data);

    // Add cursor
    let cursor = mainPanel.set("cursor", am5xy.XYCursor.new(root, {}));
    cursor.lineY.set("visible", false);

    // Add scrollbar
    let scrollbar = mainPanel.set(
      "scrollbarX",
      am5xy.XYChartScrollbar.new(root, {
        orientation: "horizontal",
        height: 50,
      })
    );
    let sbSeries = scrollbar.chart.series.push(
      am5xy.LineSeries.new(root, {
        valueYField: "value",
        valueXField: "date",
        xAxis: dateAxis,
        yAxis: valueAxis,
      })
    );
    sbSeries.data.setAll(data);

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

export default StockChart;
