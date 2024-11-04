
import { ResponsiveStream } from "@nivo/stream";
import { useSelector } from "react-redux";


const MyResponsiveStream = ({ data }) => {
    const colors = useSelector((state) => state.colors.colors);
    return (
      <ResponsiveStream
        data={data}
        keys={["Raoul", "Josiane", "Marcel", "René", "Paul", "Jacques"]}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendOffset: 36,
          truncateTickAt: 0,
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "",
          legendOffset: -40,
          truncateTickAt: 0,
        }}
        enableGridX={true}
        enableGridY={false}
        offsetType="silhouette"
        colors={colors}
        fillOpacity={0.85}
        borderColor={{ theme: "background" }}
        fill={[
          {
            match: {
              id: "Paul",
            },
            id: "dots",
          },
          {
            match: {
              id: "Marcel",
            },
            id: "squares",
          },
        ]}
        dotSize={8}
        dotColor={{ from: "color" }}
        dotBorderWidth={2}
        dotBorderColor={{
          from: "color",
          modifiers: [["darker", 0.7]],
        }}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            translateX: 100,
            itemWidth: 80,
            itemHeight: 20,
            itemTextColor: "#999999",
            symbolSize: 12,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000000",
                },
              },
            ],
          },
        ]}
      />
    );
}



export default MyResponsiveStream