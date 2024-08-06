import { Box, Button } from '@chakra-ui/react';
import { ResponsiveBar } from '@nivo/bar';
import React, { useEffect, useState } from 'react';

const BarChart = ({ variant = 'grouped-vertical' }) => {
	const [barData, setBarData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [formDate, setFormDate] = useState('2023-01-15');
	const [toDate, setToDate] = useState('2023-10-16');

	const [barBody, setBarBody] = useState({
		"xaxis": "items.goodsItems.goodsGroup.goodGroupName",
		"yaxis": [
			"salesPgi.salesDelivery.totalAmount",
			"salesPgi.totalAmount",
			"quotation.totalAmount",
			"salesOrder.totalAmount",
			"all_total_amt"
		],
		"groupBy": [
			"items.goodsItems.goodsGroup"
		],
		"valuetype": "count",
		"filter": [
			{
				"column": "company_id",
				"operator": "equal",
				"type": "Integer",
				"value": 1
			},
			{
				"column": "invoice_date",
				"operator": "between",
				"type": "date",
				"value": ["2023-01-15", "2023-10-16"]
			},
			{
				"column": "location_id",
				"operator": "equal",
				"type": "Integer",
				"value": 1
			},
			{
				"column": "branch_id",
				"operator": "equal",
				"type": "Integer",
				"value": 1
			}
		]
	})

	useEffect(() => {
		const fetchBarData = async () => {
			try {
				const response = await fetch('http://192.168.0.115:8080/sales/sales-graph-data', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
					},
					body: JSON.stringify(barBody),
				});

				if (!response.ok) {
					throw new Error('Something went wrong');
				}

				const result = await response.json();
				setBarData(result.content);
				setIsLoading(false);
				setIsError(false);
			} catch (err) {
				console.log(err);
				setIsLoading(false);
				setIsError(true);
			}
		}

		fetchBarData();
	}, [ barBody ]);

	console.log({ barData });

	const dataKeys = Object.keys(barData[0] || {});
	const keysCommaSeparated = dataKeys.join(',');
	// exclude xaxis key
	const keys = keysCommaSeparated.split(',').filter(key => key !== 'xaxis');
	// const keys = keysCommaSeparated.split(',');

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error loading data</div>;
	}

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

	const handleDateFilter = () => {
		console.log('handleDateFilter');
		console.log({ formDate, toDate });

		setBarBody({
			...barBody,
			"filter": [
				{
					"column": "invoice_date",
					"operator": "between",
					"type": "date",
					"value": [formDate, toDate]
				}
			]
		})
	}

	return (
		<>
			<ResponsiveBar
				data={barData}
				keys={keys}
				indexBy='xaxis'
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
					legend: 'xaxis',
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
					' in xaxis: ' +
					e.indexValue
				}
			/>
			<Box sx={{ border: '1px solid #dee2e6', mt: 0, py:1, bgColor: 'white' }}>
				{/* date */}
				<input style={{ border: '1px solid blue' }} placeholder='yyyy-mm-dd' type="text" onChange={(e) => setFormDate(e.target.value)} />
				between
				<input style={{ border: '1px solid blue' }} type="text" placeholder='yyyy-mm-dd' onChange={(e) => setToDate(e.target.value)} />
				<Button variant='solid' colorScheme='teal' onClick={handleDateFilter}>Filter</Button>
			</Box>
		</>
	);
};

export default BarChart;
