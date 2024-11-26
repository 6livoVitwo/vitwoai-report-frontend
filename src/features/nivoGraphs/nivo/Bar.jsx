import { ResponsiveBar } from '@nivo/bar';
import React from 'react';
import { barChartData } from "../jsonData/chartData";

const Bar = ({ data = barChartData, dynamicWidth }) => {
  
  const dataKeys = Object.keys(data[0] || {});
  const keysCommaSeparated = dataKeys.join(',');
  const keys = keysCommaSeparated.split(',').filter(key => key !== 'xaxis');

  return (
    <>
      <ResponsiveBar
        data={data}
        // {...(dynamicWidth > 0 && { height: 600 })}
        {...(dynamicWidth > 0 && { width: dynamicWidth })}
        {...(dynamicWidth > 0 ? { keys: keys } : {
          keys: [
            'hot dog',
            'burger',
            'sandwich',
            'kebab',
            'fries',
            'donut'
          ]
        })}
        {...(dynamicWidth > 0 ? { indexBy: 'xaxis' } : { indexBy: 'country' })}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode="grouped"
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'blues' }}
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
              id: 'fries'
            },
            id: 'dots'
          },
          {
            match: {
              id: 'sandwich'
            },
            id: 'lines'
          }
        ]}
        borderColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              1.6
            ]
          ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: dynamicWidth > 0 ? 'xaxis' : 'country',
          legendPosition: 'middle',
          legendOffset: 32,
          truncateTickAt: 0
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'food',
          legendPosition: 'middle',
          legendOffset: -40,
          truncateTickAt: 0
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: 'color',
          modifiers: [
            [
              'darker',
              1.6
            ]
          ]
        }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e => e.id + ": " + e.formattedValue + ` in ${dynamicWidth > 0 ? 'xaxis' : 'country'}: ` + e.indexValue}
      />
    </>
  );
};

export default Bar;

