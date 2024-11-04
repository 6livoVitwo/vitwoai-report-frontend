import React, { useEffect, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { LineChart, Line } from 'recharts';
import { Box, Button, Checkbox, Heading, Select, Stack } from '@chakra-ui/react';
import { customerKey, customerValue01, customers } from './service/fakeData';

const TransactionalDayBookChart01 = ({ chartView = {} }) => {
	const [chartDataState, setChartDataState] = useState(chartView?.chartData || customers);
	const [checkedKeys, setCheckedKeys] = useState('price,qty'.split(','));
	const [customerValueState, setCustomerValueState] = useState('shop');

	// generate rand light color code
	const lightColorCode = () => {
		// Define minimum value for each RGB component to ensure a light color
		const minComponentValue = 100;

		// Generate random values for each RGB component
		const red = Math.floor(Math.random() * (255 - minComponentValue) + minComponentValue);
		const green = Math.floor(Math.random() * (255 - minComponentValue) + minComponentValue);
		const blue = Math.floor(Math.random() * (255 - minComponentValue) + minComponentValue);

		// Convert RGB components to hexadecimal and concatenate them
		const colorCode = `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`;

		return colorCode;
	};

	// add if statement
	let chart = null
	if (chartView?.chartUi === "bar") {
		chart = <BarChart width={730} height={250} data={chartDataState}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="name" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Bar dataKey="qty" fill="#8884d8" />
		</BarChart>
	} else if (chartView?.chartUi === "line") {
		chart = <LineChart width={730} height={250} data={chartDataState}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey="name" />
			<YAxis />
			<Tooltip />
			<Legend />
			<Line type="monotone" dataKey="qty" stroke="#8884d8" />
		</LineChart>
	} else {
		chart = <BarChart width={730} height={250} data={chartDataState}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey={customerValueState} />
			<YAxis />
			<Tooltip />
			<Legend />
			{
				checkedKeys.map((key) => {
					return (
						<Bar dataKey={key} key={key} fill={`${lightColorCode()}`} />
					)
				})
			}
		</BarChart>
	}

	const handleChartView = (key, isChecked) => {
		if (isChecked) {
			setCheckedKeys([...checkedKeys, key])
		} else {
			setCheckedKeys(checkedKeys.filter((k) => k !== key))
		}
	};

	console.warn('checkedKeys =>', checkedKeys)
	return (
		<>
			<Heading>{chartView?.name || 'Chart View'}</Heading>
			{chart}
			<Select placeholder='Select one' value={customerValueState} onChange={(e) => setCustomerValueState(e.target.value)}>
				{
					customerValue01.map((key, index) => {
						return (
							<option key={index} value={key}>
								{key}
							</option>
						)
					})
				}
			</Select>

			<Stack spacing={[1, 5]} direction={['column', 'row']} mt={5}>
				{
					customerKey.map((key, index) => {
						return (
							<Checkbox
								key={index}
								size='md'
								colorScheme='green'
								isChecked={checkedKeys.includes(key)}
								onChange={(e) => handleChartView(key, e.target.checked)} // Pass the key and the checked status
							>
								{key}
							</Checkbox>

						)
					})
				}
			</Stack>
		</>
	);
};

export default TransactionalDayBookChart01;
