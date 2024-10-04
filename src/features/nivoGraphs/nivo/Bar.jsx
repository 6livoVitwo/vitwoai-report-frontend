import { ResponsiveBar } from '@nivo/bar';
import React from 'react';
import { barChartData } from '../data/chartData';

const Bar = ({ data = barChartData, variant = 'grouped-vertical' }) => {
console.log('🔴', {data})
  const dataKeys = Object.keys(data[0] || {});
  const keysCommaSeparated = dataKeys.join(',');
  const keys = keysCommaSeparated.split(',').filter(key => key !== 'xaxis');

  let groupMode = 'stacked';
  let layout = 'vertical';
  if (variant === 'grouped-horizontal') {
    groupMode = 'grouped';
    layout = 'horizontal';
  } else if (variant === 'grouped-vertical') {
    groupMode = 'grouped';
    layout = 'vertical';
  } else if (variant === 'stacked-horizontal') {
    groupMode = 'stacked';
    layout = 'horizontal';
  } else if (variant === 'stacked-vertical') {
    groupMode = 'stacked';
    layout = 'vertical';
  }

  return (
    <>
      <ResponsiveBar
        data={data}
        keys={keys}
        width={2000}
        indexBy="xaxis"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        groupMode={groupMode}
        layout={layout}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        onClick={(e) => alert(JSON.stringify(e, null, 2))}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) =>
          e.id + ": " + e.formattedValue + " in xaxis: " + e.indexValue
        }
      />
    </>
  );
};

export default Bar;

