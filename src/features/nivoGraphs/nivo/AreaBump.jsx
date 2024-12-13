import React from "react";
import { ResponsiveAreaBump } from "@nivo/bump";
import { areaBumpData } from "../jsonData/chartData";

const AreaBump = ({ data = areaBumpData, dynamicWidth }) => {

  const truncateLabel = (label, maxLength = 10) => {
    if (label?.length > maxLength) {
      return label.slice(0, maxLength) + '...'; // truncate and append '...'
    }
    return label;
  };

  return (
    <>
      <ResponsiveAreaBump
        data={data}
        margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
        spacing={20}
        {...(dynamicWidth > 600 ? { width: dynamicWidth } : { width: 600 })}
        colors={{ scheme: 'nivo' }}
        blendMode="multiply"
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10
          }
        ]}
        fill={[
          {
            match: {
              id: 'CoffeeScript'
            },
            id: 'dots'
          },
          {
            match: {
              id: 'TypeScript'
            },
            id: 'lines'
          }
        ]}
        startLabel={(d) => truncateLabel(d.id)}
        endLabel={(d) => truncateLabel(d.id)}
        axisTop={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: -36,
          truncateTickAt: 0
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: 32,
          truncateTickAt: 0
        }}
        animate={true}
      />
    </>
  );
};

export default AreaBump;
