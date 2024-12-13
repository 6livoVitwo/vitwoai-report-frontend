import { Box, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { ResponsiveAreaBump } from '@nivo/bump'
import React, { useEffect, useState } from 'react'
import { format, eachDayOfInterval, parseISO } from 'date-fns';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';


const TestComp = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [clickedData, setClickedData] = useState({})
    const [data, setData] = useState([
        {
            "country": null,
            "grnTotalCgst": 0,
            "grnSubTotal": 0,
            "grnTotalAmount": 0,
            "grnTotalIgst": 0
        },
        {
            "country": "Carvaan Mini",
            "grnTotalCgst": 1,
            "grnSubTotal": 1,
            "grnTotalAmount": 1,
            "grnTotalIgst": 1
        },
        {
            "country": "Wire",
            "grnTotalCgst": 1,
            "grnSubTotal": 1,
            "grnTotalAmount": 1,
            "grnTotalIgst": 1
        },
        {
            "country": "monitor",
            "grnTotalCgst": 2,
            "grnSubTotal": 2,
            "grnTotalAmount": 2,
            "grnTotalIgst": 2
        },
        {
            "country": " lead",
            "grnTotalCgst": 5,
            "grnSubTotal": 5,
            "grnTotalAmount": 5,
            "grnTotalIgst": 5
        },
        {
            "country": "Flexy Plastic",
            "grnTotalCgst": 3,
            "grnSubTotal": 3,
            "grnTotalAmount": 3,
            "grnTotalIgst": 3
        },
        {
            "country": "Ribbon",
            "grnTotalCgst": 5,
            "grnSubTotal": 5,
            "grnTotalAmount": 5,
            "grnTotalIgst": 5
        },
        {
            "country": "Stainless Steel Pipe",
            "grnTotalCgst": 2,
            "grnSubTotal": 2,
            "grnTotalAmount": 2,
            "grnTotalIgst": 2
        },
        {
            "country": "Rubber Finials ",
            "grnTotalCgst": 1,
            "grnSubTotal": 1,
            "grnTotalAmount": 1,
            "grnTotalIgst": 1
        },
        {
            "country": "Paper Tube",
            "grnTotalCgst": 1,
            "grnSubTotal": 1,
            "grnTotalAmount": 1,
            "grnTotalIgst": 1
        }
    ]);

    return (
        <>
            <div>TestComp</div>
            <div style={{ width: "95%", overflowX: "scroll", height: "500px", border: "1px solid black", padding: 30, marginBottom: 20, marginTop: 20 }}>
                <ResponsiveBar
                    data={data}
                    width={2000}
                    keys={[
                        'grnTotalCgst',
                        'grnSubTotal',
                        'grnTotalAmount',
                        'grnTotalIgst'
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
            </div>
        </>
    )
}

export default TestComp