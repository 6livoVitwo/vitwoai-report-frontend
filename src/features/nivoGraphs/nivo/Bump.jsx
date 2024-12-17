import { ResponsiveBump } from '@nivo/bump'
import React from 'react'
import { bumpChartData } from "../jsonData/chartData";

const Bump = ({ data = bumpChartData, dynamicWidth }) => {
  console.log({ dynamicWidth })

  const colors = ['#E8C1A0', '#F47560', '#F1E15B', '#61CDBB', '#97E3D5']; // Example colors, match Nivo scheme
  return (
    <>
      <ResponsiveBump
        data={data}
        xPadding={0.55}
        {...(dynamicWidth > 1000 ? { width: dynamicWidth } : { width: 1000 })}
        xOuterPadding={0.4}
        yOuterPadding={0.3}
        colors={{ scheme: 'nivo' }}
        lineWidth={3}
        activeLineWidth={7}
        inactiveLineWidth={4}
        inactiveOpacity={0.4}
        endLabel={false}
        startLabelPadding={30}
        startLabelTextColor={{ from: 'color', modifiers: [] }}
        pointSize={10}
        activePointSize={16}
        inactivePointSize={0}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={3}
        activePointBorderWidth={3}
        pointBorderColor={{ from: 'serie.color' }}
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
          tickRotation: 45,
          legend: '',
          legendPosition: 'middle',
          legendOffset: 32,
          truncateTickAt: 0
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendPosition: 'middle',
          legendOffset: -40,
          truncateTickAt: 0
        }}
        margin={{ top: 40, right: 500, bottom: 40, left: 60 }}
        axisRight={null}
        legends={[
          {
            anchor: 'top-right', // Position the legend at the top-right corner
            direction: 'column', // Align items vertically
            translateX: 120, // Offset horizontally to ensure it's visible
            translateY: -20, // Adjust vertical positioning
            itemsSpacing: 10, // Space between each label
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            symbolSize: 12,
            symbolShape: 'circle',
            itemTextColor: '#000',
          },
        ]}
      />
      {/* Custom Legend */}
      <div style={{ padding: '20px', marginLeft: '20px' }}>
        <h4>Legend</h4>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {data.map((serie, index) => (
            <li
              key={serie.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px',
              }}
            >
              <span
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: colors[index % colors.length],
                  display: 'inline-block',
                  marginRight: '8px',
                }}
              ></span>
              {serie.id}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Bump