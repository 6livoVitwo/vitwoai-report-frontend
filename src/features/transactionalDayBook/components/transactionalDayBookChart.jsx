import React, { useEffect, useState } from 'react';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, RadialBar, RadialBarChart, ScatterChart, ZAxis } from 'recharts';
import { LineChart, Line } from 'recharts';
import { Box, Button, Checkbox, Heading, Select, Stack } from '@chakra-ui/react';
import { customerKey, customerValue, customers } from './service/fakeData';
import { Scatter } from '@mui/x-charts';
import MyNivoResponsiveBar from './MyNivoResponsiveBar';

const TransactionalDayBookChart = ({ chartView = {} }) => {
	const [chartDataState, setChartDataState] = useState(chartView?.chartData || customers);
	const [customerValueState, setCustomerValueState] = useState(customerValue);
	const [selectValue, setSelectValue] = useState(Object.keys(customerValue)[0]);
	const [checkedKeys, setCheckedKeys] = useState(customerValueState[selectValue] || []);

	// Function to generate dynamic color codes based on index value
	function generateColor(index, length) {
		const hue = (60560 / length) * index;
		const saturation = 50;
		const lightness = 50;
		return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
	}

	// add if statement
	let chart = null
	if (chartView?.chartUi === "bar") {
		chart = <BarChart width={730} height={260} data={chartDataState}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey={selectValue} />
			<YAxis />
			<Tooltip />
			<Legend />
			{
				checkedKeys?.length > 0 &&
				checkedKeys?.map((key, index) => {
					return <Bar dataKey={key} fill={generateColor(index, checkedKeys?.length)} key={index} />
				})
			}
		</BarChart>
	} else if (chartView?.chartUi === "line") {
		chart = <LineChart width={730} height={250} data={chartDataState}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey={selectValue} />
			<YAxis />
			<Tooltip />
			<Legend />
			{
				checkedKeys?.length > 0 &&
				checkedKeys?.map((key, index) => {
					return <Line dataKey={key} stroke={generateColor(index, checkedKeys?.length)} key={index} />
				})
			}
		</LineChart>
	} else if (chartView?.chartUi === "radar") {
		chart = <RadarChart outerRadius={90} width={730} height={250} data={chartDataState}>
			<PolarGrid />
			<PolarAngleAxis dataKey={selectValue} />
			<PolarRadiusAxis angle={30} domain={[0, 150]} />
			<Tooltip />
			{
				checkedKeys?.length > 0 &&
				checkedKeys?.map((key, index) => {
					return <Radar name={key} dataKey={key} stroke={generateColor(index, checkedKeys?.length)} fill={generateColor(index, checkedKeys?.length)} fillOpacity={0.6} key={index} />
				})
			}
			<Legend />
		</RadarChart>
	} else {
		chart = <BarChart width={730} height={250} data={chartDataState}>
			<CartesianGrid strokeDasharray="3 3" />
			<XAxis dataKey={selectValue} />
			<YAxis />
			<Tooltip />
			<Legend />
			{
				checkedKeys?.length > 0 &&
				checkedKeys?.map((key, index) => {
					return <Bar dataKey={key} fill={generateColor(index, checkedKeys?.length)} key={index} />
				})
			}
		</BarChart>
	}

	const handleCheckbox = (key, isChecked) => {
		if (isChecked) {
			setCheckedKeys([...checkedKeys, key])
		} else {
			setCheckedKeys(checkedKeys.filter((k) => k !== key))
		}
	};

	const handleSelect = (value) => {
		setSelectValue(value)
		setCheckedKeys(customerValueState[value])
	}

	console.warn('customerValueState =>', customerValueState);
	console.warn('customerValueState[selectValue] =>', customerValueState[selectValue]);
	return (
		<>
			<Heading>{chartView?.name || 'Chart View'}</Heading>
			{chart}
			<Select placeholder='Select one' value={selectValue} onChange={(e) => handleSelect(e.target.value)}>
				{
					Object.keys(customerValueState).map((key, index) => {
						return <option key={index} value={key}>{key}</option>
					})
				}
			</Select>

			<Stack spacing={[1, 5]} direction={['column', 'row']} mt={5}>
				{
					customerValueState[selectValue] &&
					Object.keys(customerValueState[selectValue]).map((key, index) => {
						const value = customerValueState[selectValue][key];

						return <Checkbox
							key={index}
							isChecked={checkedKeys.includes(value)}
							onChange={(e) => handleCheckbox(value, e.target.checked)}
						>
							{customerValueState[selectValue][key]}
						</Checkbox>
					})
				}
			</Stack>
			{/* <MyNivoResponsiveBar /> */}
		</>

			)}


export default TransactionalDayBookChart;
