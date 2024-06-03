import React from 'react'
import BarChart from './BarChart';
import NivoPieChart from './PieChart';
import FunnelChart from './FunnelChart';
import LineChart from './LineChart';

const MyCharts = ({ chart }) => {

    const { type, data } = chart;
    console.log({ type, data })

    let chartData = "";

    if (type === "bar") {
        chartData = <BarChart data={data} />
    } else if (type === "pie") {
        chartData = <NivoPieChart data={data} />
    } else if (type === "funnel") {
        chartData = <FunnelChart data={data} />
    } else if(type === "line") {
        chartData = <LineChart data={data} />    
    }
    return (
        <>
            {chartData}
        </>
    )
}

export default MyCharts