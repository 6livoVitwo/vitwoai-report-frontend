import { Box } from '@chakra-ui/react'
import { ResponsiveBar } from '@nivo/bar'
import React from 'react'

const defaultData = [
    {
        "country": "AD",
        "hot dog": 154,
        "hot dogColor": "hsl(178, 70%, 50%)",
        "burger": 174,
        "burgerColor": "hsl(22, 70%, 50%)",
        "sandwich": 121,
        "sandwichColor": "hsl(163, 70%, 50%)",
        "kebab": 184,
        "kebabColor": "hsl(123, 70%, 50%)",
        "fries": 12,
        "friesColor": "hsl(109, 70%, 50%)",
        "donut": 0,
        "donutColor": "hsl(98, 70%, 50%)"
    },
    {
        "country": "AE",
        "hot dog": 133,
        "hot dogColor": "hsl(133, 70%, 50%)",
        "burger": 182,
        "burgerColor": "hsl(137, 70%, 50%)",
        "sandwich": 46,
        "sandwichColor": "hsl(168, 70%, 50%)",
        "kebab": 142,
        "kebabColor": "hsl(297, 70%, 50%)",
        "fries": 121,
        "friesColor": "hsl(283, 70%, 50%)",
        "donut": 170,
        "donutColor": "hsl(198, 70%, 50%)"
    },
    {
        "country": "AF",
        "hot dog": 157,
        "hot dogColor": "hsl(2, 70%, 50%)",
        "burger": 137,
        "burgerColor": "hsl(100, 70%, 50%)",
        "sandwich": 40,
        "sandwichColor": "hsl(74, 70%, 50%)",
        "kebab": 94,
        "kebabColor": "hsl(311, 70%, 50%)",
        "fries": 125,
        "friesColor": "hsl(22, 70%, 50%)",
        "donut": 25,
        "donutColor": "hsl(76, 70%, 50%)"
    },
    {
        "country": "AG",
        "hot dog": 96,
        "hot dogColor": "hsl(171, 70%, 50%)",
        "burger": 77,
        "burgerColor": "hsl(114, 70%, 50%)",
        "sandwich": 38,
        "sandwichColor": "hsl(192, 70%, 50%)",
        "kebab": 122,
        "kebabColor": "hsl(6, 70%, 50%)",
        "fries": 21,
        "friesColor": "hsl(143, 70%, 50%)",
        "donut": 34,
        "donutColor": "hsl(54, 70%, 50%)"
    },
    {
        "country": "AI",
        "hot dog": 32,
        "hot dogColor": "hsl(201, 70%, 50%)",
        "burger": 87,
        "burgerColor": "hsl(272, 70%, 50%)",
        "sandwich": 140,
        "sandwichColor": "hsl(34, 70%, 50%)",
        "kebab": 129,
        "kebabColor": "hsl(313, 70%, 50%)",
        "fries": 171,
        "friesColor": "hsl(265, 70%, 50%)",
        "donut": 52,
        "donutColor": "hsl(17, 70%, 50%)"
    },
    {
        "country": "AL",
        "hot dog": 199,
        "hot dogColor": "hsl(279, 70%, 50%)",
        "burger": 169,
        "burgerColor": "hsl(339, 70%, 50%)",
        "sandwich": 196,
        "sandwichColor": "hsl(347, 70%, 50%)",
        "kebab": 22,
        "kebabColor": "hsl(97, 70%, 50%)",
        "fries": 5,
        "friesColor": "hsl(135, 70%, 50%)",
        "donut": 153,
        "donutColor": "hsl(257, 70%, 50%)"
    },
    {
        "country": "AM",
        "hot dog": 5,
        "hot dogColor": "hsl(79, 70%, 50%)",
        "burger": 85,
        "burgerColor": "hsl(139, 70%, 50%)",
        "sandwich": 121,
        "sandwichColor": "hsl(252, 70%, 50%)",
        "kebab": 116,
        "kebabColor": "hsl(33, 70%, 50%)",
        "fries": 169,
        "friesColor": "hsl(82, 70%, 50%)",
        "donut": 98,
        "donutColor": "hsl(27, 70%, 50%)"
    }
]

const BarChart = ({ data = defaultData, variant = 'grouped-vertical' }) => {
    let groupMode = 'grouped';
    let layout = 'vertical';
    if(variant === 'grouped-horizontal') {
        groupMode = 'grouped';
        layout = 'horizontal';
    }else if(variant === 'grouped-vertical') {
        groupMode = 'grouped';
        layout = 'vertical';
    }else if(variant === 'stacked-horizontal') {
        groupMode = 'stacked';
        layout = 'horizontal';
    }else if(variant === 'stacked-vertical') {
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
                    'donut'
                ]}
                indexBy="country"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                groupMode={groupMode}
                layout={layout}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'nivo' }}
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
                    legend: 'country',
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
                onClick={(e) => alert(JSON.stringify(e, null, 2))}
                role="application"
                ariaLabel="Nivo bar chart demo"
                barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
            />
        </>
    )
}

export default BarChart