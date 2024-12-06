import { Box, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Stack, Text, useDisclosure } from '@chakra-ui/react'
import { ResponsiveAreaBump } from '@nivo/bump'
import React, { useEffect, useState } from 'react'
import { format, eachDayOfInterval, parseISO } from 'date-fns';
import { ResponsiveHeatMap } from '@nivo/heatmap';
import { ResponsivePie } from '@nivo/pie';


const TestComp = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [clickedData, setClickedData] = useState({})
    const [data, setData] = useState([
        {
            "id": "SP1001Testing3Assets553",
            "data": [
                {
                    "x": "Rachhel",
                    "y": "9450.0000"
                },
                {
                    "x": "Shubham Ghosh",
                    "y": "0"
                },
                {
                    "x": "Ramen",
                    "y": "0"
                },
                {
                    "x": "Salim",
                    "y": "0"
                }
            ]
        },
        {
            "id": "Hero cycle",
            "data": [
                {
                    "x": "Rachhel",
                    "y": "9440.0000"
                },
                {
                    "x": "Shubham Ghosh",
                    "y": "0"
                },
                {
                    "x": "Ramen",
                    "y": "0"
                },
                {
                    "x": "Salim",
                    "y": "0"
                }
            ]
        },
        {
            "id": "GraphTesting Service",
            "data": [
                {
                    "x": "Ramen",
                    "y": "945.0000"
                },
                {
                    "x": "Shubham Ghosh",
                    "y": "0"
                },
                {
                    "x": "Rachhel",
                    "y": "0"
                },
                {
                    "x": "Salim",
                    "y": "0"
                }
            ]
        },
        {
            "id": "LADOO",
            "data": [
                {
                    "x": "Rachhel",
                    "y": "99960.0000"
                },
                {
                    "x": "Shubham Ghosh",
                    "y": "0"
                },
                {
                    "x": "Ramen",
                    "y": "0"
                },
                {
                    "x": "Salim",
                    "y": "0"
                }
            ]
        },
        {
            "id": "Freight ",
            "data": [
                {
                    "x": "Salim",
                    "y": "9658.0000"
                },
                {
                    "x": "Shubham Ghosh",
                    "y": "0"
                },
                {
                    "x": "Rachhel",
                    "y": "0"
                },
                {
                    "x": "Ramen",
                    "y": "0"
                }
            ]
        },
        {
            "id": "Canon m50 markII",
            "data": [
                {
                    "x": "Rachhel",
                    "y": "94080.0000"
                },
                {
                    "x": "Shubham Ghosh",
                    "y": "0"
                },
                {
                    "x": "Ramen",
                    "y": "0"
                },
                {
                    "x": "Salim",
                    "y": "0"
                }
            ]
        },
        {
            "id": "Transaction Charges",
            "data": [
                {
                    "x": "Ramen",
                    "y": "94100.3100"
                },
                {
                    "x": "Shubham Ghosh",
                    "y": "0"
                },
                {
                    "x": "Rachhel",
                    "y": "0"
                },
                {
                    "x": "Salim",
                    "y": "0"
                }
            ]
        },
        {
            "id": "County Bluetooth Speaker with Built-in FM Radio - Black",
            "data": [
                {
                    "x": "Shubham Ghosh",
                    "y": "9428.2000"
                },
                {
                    "x": "Rachhel",
                    "y": "0"
                },
                {
                    "x": "Ramen",
                    "y": "0"
                },
                {
                    "x": "Salim",
                    "y": "0"
                }
            ]
        },
        {
            "id": "CFO SERVICE",
            "data": [
                {
                    "x": "Ramen",
                    "y": "944000.0000"
                },
                {
                    "x": "Shubham Ghosh",
                    "y": "0"
                },
                {
                    "x": "Rachhel",
                    "y": "0"
                },
                {
                    "x": "Salim",
                    "y": "0"
                }
            ]
        },
        {
            "id": "Bullet",
            "data": [
                {
                    "x": "Ramen",
                    "y": "937860.0000"
                },
                {
                    "x": "Shubham Ghosh",
                    "y": "0"
                },
                {
                    "x": "Rachhel",
                    "y": "0"
                },
                {
                    "x": "Salim",
                    "y": "0"
                }
            ]
        }
    ]);

    return (
        <>
            <div>TestComp</div>
            <div style={{ width: "95%", overflowX: "scroll", height: "500px", border: "1px solid black", padding: 30, marginBottom: 20, marginTop: 20 }}>
                <ResponsiveHeatMap
                    data={data}
                    margin={{ top: 60, right: 90, bottom: 60, left: 90 }}
                    valueFormat=">-.2s"
                    axisTop={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: -90,
                        legend: '',
                        legendOffset: 46,
                        truncateTickAt: 0
                    }}
                    axisRight={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'country',
                        legendPosition: 'middle',
                        legendOffset: 70,
                        truncateTickAt: 0
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'country',
                        legendPosition: 'middle',
                        legendOffset: -72,
                        truncateTickAt: 0
                    }}
                    colors={{
                        type: 'diverging',
                        scheme: 'sinebow',
                        divergeAt: 0.5,
                        minValue: -100000,
                        maxValue: 100000
                    }}
                    emptyColor="#555555"
                    legends={[
                        {
                            anchor: 'bottom',
                            translateX: 0,
                            translateY: 30,
                            length: 400,
                            thickness: 8,
                            direction: 'row',
                            tickPosition: 'after',
                            tickSize: 3,
                            tickSpacing: 4,
                            tickOverlap: false,
                            tickFormat: '>-.2s',
                            title: 'Value →',
                            titleAlign: 'start',
                            titleOffset: 4
                        }
                    ]}
                />
            </div>
        </>
    )
}

export default TestComp