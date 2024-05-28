import { ResponsiveBar } from '@nivo/bar'
import React from 'react'

const data = [
    {
        "user": "Imran",
        "gain": 93,
        "gain2": 100,
        "loss": -20,
        "loss2": -60
    },
    {
        "user": "Raoul",
        "gain": 18,
        "gain2": 79,
        "loss": -25,
        "loss2": -40
    },
    {
        "user": "Jane",
        "gain": 11,
        "gain2": 70,
        "loss": -30,
        "loss2": -50
    },
    {
        "user": "Marcel",
        "gain": 11,
        "gain2": 56,
        "loss": -25,
        "loss2": -60
    },
    {
        "user": "Ibrahim",
        "gain": 18,
        "gain2": 82,
        "loss": -12,
        "loss2": -70
    },
    {
        "user": "Junko",
        "gain": 10,
        "gain2": 72,
        "loss": -12,
        "loss2": -70
    },
    {
        "user": "Lyu",
        "gain": 9,
        "gain2": 77,
        "loss": -9,
        "loss2": -60
    },
    {
        "user": "André",
        "gain": 30,
        "loss2": -60,
        "loss": -10,
        "gain2": 80
    },
    {
        "user": "Maki",
        "gain": 42,
        "loss2": -40,
        "loss": -18,
        "gain2": 90
    }
];

const DivergingStackedBarChart = () => {
    return (
        <>
            <ResponsiveBar
                data={data}
                keys={['gain1', 'gain2', 'loss1', 'loss2']}
                indexBy="user"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={({ id, data }) => {
                    if (id.includes('loss')) return 'rgb(245, 93, 84)';
                    return 'rgb(97, 205, 187)';
                }}
                // groupMode="grouped"
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'USERS',
                    legendPosition: 'middle',
                    legendOffset: 32,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: -40,
                    format: value => `${value}%`
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                labelFormat={d => `${d}%`}
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
                barAriaLabel={e => `${e.id}: ${e.formattedValue} in user: ${e.indexValue}`}
                theme={{
                    grid: {
                        line: {
                            stroke: '#62bf5e',  // Green color for the grid line (middle line)
                            strokeWidth: 2
                        }
                    }
                }}
                gridYValues={[0]}  // This will create a grid line at y=0
            />
        </>
    )
}

export default DivergingStackedBarChart