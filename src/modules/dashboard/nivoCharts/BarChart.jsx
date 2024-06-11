import { Box } from '@chakra-ui/react';
import { ResponsiveBar } from '@nivo/bar';
import React from 'react';
import { barChartData } from '../chartData';

const BarChart = ({ data = barChartData, variant = 'grouped-vertical' }) => {
	let groupMode = 'grouped';
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
				keys={[
					'hot dog',
					'burger',
					'sandwich',
					'kebab',
					'fries',
					'donut',
				]}
				indexBy='country'
				margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
				padding={0.3}
				groupMode={groupMode}
				layout={layout}
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
						stagger: true,
					},
					{
						id: 'lines',
						type: 'patternLines',
						background: 'inherit',
						color: '#eed312',
						rotation: -45,
						lineWidth: 6,
						spacing: 10,
					},
				]}
				fill={[
					{
						match: {
							id: 'fries',
						},
						id: 'dots',
					},
					{
						match: {
							id: 'sandwich',
						},
						id: 'lines',
					},
				]}
				borderColor={{
					from: 'color',
					modifiers: [['darker', 1.6]],
				}}
				axisTop={null}
				axisRight={null}
				axisBottom={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: 'country',
					legendPosition: 'middle',
					legendOffset: 32,
					truncateTickAt: 0,
				}}
				axisLeft={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: 'food',
					legendPosition: 'middle',
					legendOffset: -40,
					truncateTickAt: 0,
				}}
				labelSkipWidth={12}
				labelSkipHeight={12}
				labelTextColor={{
					from: 'color',
					modifiers: [['darker', 1.6]],
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
									itemOpacity: 1,
								},
							},
						],
					},
				]}
				onClick={(e) => alert(JSON.stringify(e, null, 2))}
				role='application'
				ariaLabel='Nivo bar chart demo'
				barAriaLabel={(e) =>
					e.id +
					': ' +
					e.formattedValue +
					' in country: ' +
					e.indexValue
				}
			/>
		</>
	);
};

export default BarChart;
