import { ResponsiveLine } from "@nivo/line";
import { useSelector } from "react-redux";
import React from "react";

const MyResponsiveLine = ({ data }) => {
  const colors = useSelector((state) => state.colors.colors);
  console.log("Real Data", data);

  const dataPoints = data[0]?.data.length || 0;
  const maxPointsForNoScroll = 10;
  const chartWidth = dataPoints > maxPointsForNoScroll ? "300%" : "100%"; 

  // Inline styles
  const containerStyle = {
    width: "100%",
    height: "100%",
    overflow: dataPoints > maxPointsForNoScroll ? "auto" : "hidden",
    position: "relative",
  };

  const chartStyle = {
    width: chartWidth,
    height: "100%",
  };

  return (
    <div style={containerStyle}>
      <div style={chartStyle}>
        <ResponsiveLine
          data={data}
          margin={{ top: 50, right: 160, bottom: 50, left: 42 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: true,
            reverse: false,
          }}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: 36,
            legendPosition: "middle",
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: -40,
            legendPosition: "middle",
            truncateTickAt: 0,
          }}
          pointSize={10}
          colors={colors}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabel="data.yFormatted"
          pointLabelYOffset={-12}
          enableTouchCrosshair={true}
          useMesh={true}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
};

export default MyResponsiveLine;
