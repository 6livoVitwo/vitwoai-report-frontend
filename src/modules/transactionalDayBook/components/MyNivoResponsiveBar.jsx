import { Box } from '@chakra-ui/react'
import { ResponsiveBar } from '@nivo/bar'
import React from 'react'

const MyNivoResponsiveBar = () => {
    const data = [
        {
            "country": "AD",
            "hot dog": 180,
            "hot dogColor": "hsl(358, 70%, 50%)",
            "burger": 187,
            "burgerColor": "hsl(111, 70%, 50%)",
            "sandwich": 14,
            "sandwichColor": "hsl(16, 70%, 50%)",
            "kebab": 187,
            "kebabColor": "hsl(42, 70%, 50%)",
            "fries": 126,
            "friesColor": "hsl(278, 70%, 50%)",
            "donut": 42,
            "donutColor": "hsl(218, 70%, 50%)"
        },
        {
            "country": "AE",
            "hot dog": 41,
            "hot dogColor": "hsl(188, 70%, 50%)",
            "burger": 186,
            "burgerColor": "hsl(299, 70%, 50%)",
            "sandwich": 69,
            "sandwichColor": "hsl(280, 70%, 50%)",
            "kebab": 148,
            "kebabColor": "hsl(106, 70%, 50%)",
            "fries": 39,
            "friesColor": "hsl(289, 70%, 50%)",
            "donut": 7,
            "donutColor": "hsl(280, 70%, 50%)"
        },
        {
            "country": "AF",
            "hot dog": 82,
            "hot dogColor": "hsl(127, 70%, 50%)",
            "burger": 161,
            "burgerColor": "hsl(190, 70%, 50%)",
            "sandwich": 35,
            "sandwichColor": "hsl(224, 70%, 50%)",
            "kebab": 199,
            "kebabColor": "hsl(177, 70%, 50%)",
            "fries": 48,
            "friesColor": "hsl(11, 70%, 50%)",
            "donut": 149,
            "donutColor": "hsl(197, 70%, 50%)"
        },
        {
            "country": "AG",
            "hot dog": 24,
            "hot dogColor": "hsl(216, 70%, 50%)",
            "burger": 46,
            "burgerColor": "hsl(234, 70%, 50%)",
            "sandwich": 144,
            "sandwichColor": "hsl(259, 70%, 50%)",
            "kebab": 51,
            "kebabColor": "hsl(354, 70%, 50%)",
            "fries": 189,
            "friesColor": "hsl(185, 70%, 50%)",
            "donut": 106,
            "donutColor": "hsl(260, 70%, 50%)"
        },
        {
            "country": "AI",
            "hot dog": 119,
            "hot dogColor": "hsl(184, 70%, 50%)",
            "burger": 115,
            "burgerColor": "hsl(78, 70%, 50%)",
            "sandwich": 119,
            "sandwichColor": "hsl(209, 70%, 50%)",
            "kebab": 200,
            "kebabColor": "hsl(147, 70%, 50%)",
            "fries": 59,
            "friesColor": "hsl(358, 70%, 50%)",
            "donut": 91,
            "donutColor": "hsl(62, 70%, 50%)"
        },
        {
            "country": "AL",
            "hot dog": 124,
            "hot dogColor": "hsl(105, 70%, 50%)",
            "burger": 4,
            "burgerColor": "hsl(348, 70%, 50%)",
            "sandwich": 132,
            "sandwichColor": "hsl(300, 70%, 50%)",
            "kebab": 52,
            "kebabColor": "hsl(256, 70%, 50%)",
            "fries": 146,
            "friesColor": "hsl(326, 70%, 50%)",
            "donut": 1,
            "donutColor": "hsl(168, 70%, 50%)"
        },
        {
            "country": "AM",
            "hot dog": 185,
            "hot dogColor": "hsl(93, 70%, 50%)",
            "burger": 188,
            "burgerColor": "hsl(97, 70%, 50%)",
            "sandwich": 156,
            "sandwichColor": "hsl(231, 70%, 50%)",
            "kebab": 187,
            "kebabColor": "hsl(333, 70%, 50%)",
            "fries": 47,
            "friesColor": "hsl(294, 70%, 50%)",
            "donut": 107,
            "donutColor": "hsl(327, 70%, 50%)"
        }
    ]
    console.log('data', data, { ResponsiveBar })
    return (
        <Box sx={{ height: 500 }}>
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
                groupMode="grouped"
                valueScale={{ type: 'linear' }}
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
                role="application"
                ariaLabel="Nivo bar chart demo"
                barAriaLabel={e => e.id + ": " + e.formattedValue + " in country: " + e.indexValue}
            />
        </Box>
    )
}

export default MyNivoResponsiveBar