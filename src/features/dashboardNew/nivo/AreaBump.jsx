import React from "react";
import { ResponsiveAreaBump } from "@nivo/bump";
import { parseISO, format } from "date-fns";
import { areaBumpData } from "../data/chartData";

const transformAreaBumpData = (data) => {
  if (!data || !Array.isArray(data)) {
    console.error("Invalid data format:", data);
    return [];
  }

  console.log("Original Data:", data);

  // Only take the first 2 items from the data array
  const limitedData = data.slice(0, 10);

  const transformedData = limitedData
    .map((item) => {
      if (!item.id || !Array.isArray(item.data)) {
        console.warn("Invalid item structure:", item);
        return null;
      }

      const transformedItem = {
        id: item.id,
        data: item.data
          .map((entry) => {
            if (
              entry &&
              typeof entry.x !== "undefined" &&
              !isNaN(Date.parse(entry.x))
            ) {
              return {
                x: new Date(entry.x).getTime(),
                y: parseFloat(entry.y),
              };
            } else {
              console.warn("Invalid entry:", entry);
              return { x: 0, y: 0 };
            }
          })
          .filter((entry) => entry.x && entry.y > 0),
      };

      if (transformedItem.data.length === 0) {
        console.warn("Transformed item has no valid data:", transformedItem);
        return null;
      }

      return transformedItem;
    })
    .filter((item) => item !== null);

  console.log("Transformed Chart Data:", transformedData);

  return transformedData;
};

const AreaBump = ({ liveData = [] }) => {
  console.log("Received liveData:", liveData);
  const chartData = transformAreaBumpData(liveData);

  return (
    <>
      {chartData.length > 0 ? (
        <ResponsiveAreaBump
          data={chartData}
          margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
          spacing={8}
          colors={{ scheme: "blues" }}
          blendMode="multiply"
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "#38bcb2",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "#eed312",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={[
            {
              match: {
                id: "CoffeeScript",
              },
              id: "dots",
            },
            {
              match: {
                id: "TypeScript",
              },
              id: "lines",
            },
          ]}
          startLabel="id"
          endLabel="id"
          axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: -36,
            truncateTickAt: 0,
          }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: 32,
            format: (value) => format(new Date(value), "MM/dd/yyyy"), // Format timestamp to date
            truncateTickAt: 0,
          }}
        />
      ) : (
        <ResponsiveAreaBump
          data={areaBumpData}
          margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
          spacing={8}
          colors={{ scheme: "blues" }}
          blendMode="multiply"
          defs={[
            {
              id: "dots",
              type: "patternDots",
              background: "inherit",
              color: "#38bcb2",
              size: 4,
              padding: 1,
              stagger: true,
            },
            {
              id: "lines",
              type: "patternLines",
              background: "inherit",
              color: "#eed312",
              rotation: -45,
              lineWidth: 6,
              spacing: 10,
            },
          ]}
          fill={[
            {
              match: {
                id: "CoffeeScript",
              },
              id: "dots",
            },
            {
              match: {
                id: "TypeScript",
              },
              id: "lines",
            },
          ]}
          startLabel="id"
          endLabel="id"
          axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: -36,
            truncateTickAt: 0,
          }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "",
            legendPosition: "middle",
            legendOffset: 32,
            truncateTickAt: 0,
          }}
          />
      )}
    </>
  );
};

export default AreaBump;
