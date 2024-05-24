import { ResponsiveLine } from '@nivo/line'
import React from 'react'

const defaultData = [
    {
        "id": "japan",
        "color": "hsl(18, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 277
            },
            {
                "x": "helicopter",
                "y": 99
            },
            {
                "x": "boat",
                "y": 86
            },
            {
                "x": "train",
                "y": 87
            },
            {
                "x": "subway",
                "y": 187
            },
            {
                "x": "bus",
                "y": 124
            },
            {
                "x": "car",
                "y": 41
            },
            {
                "x": "moto",
                "y": 182
            },
            {
                "x": "bicycle",
                "y": 111
            },
            {
                "x": "horse",
                "y": 217
            },
            {
                "x": "skateboard",
                "y": 299
            },
            {
                "x": "others",
                "y": 287
            }
        ]
    },
    {
        "id": "france",
        "color": "hsl(34, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 185
            },
            {
                "x": "helicopter",
                "y": 214
            },
            {
                "x": "boat",
                "y": 14
            },
            {
                "x": "train",
                "y": 56
            },
            {
                "x": "subway",
                "y": 166
            },
            {
                "x": "bus",
                "y": 270
            },
            {
                "x": "car",
                "y": 57
            },
            {
                "x": "moto",
                "y": 18
            },
            {
                "x": "bicycle",
                "y": 220
            },
            {
                "x": "horse",
                "y": 184
            },
            {
                "x": "skateboard",
                "y": 89
            },
            {
                "x": "others",
                "y": 178
            }
        ]
    },
    {
        "id": "us",
        "color": "hsl(327, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 138
            },
            {
                "x": "helicopter",
                "y": 182
            },
            {
                "x": "boat",
                "y": 236
            },
            {
                "x": "train",
                "y": 242
            },
            {
                "x": "subway",
                "y": 71
            },
            {
                "x": "bus",
                "y": 62
            },
            {
                "x": "car",
                "y": 166
            },
            {
                "x": "moto",
                "y": 254
            },
            {
                "x": "bicycle",
                "y": 28
            },
            {
                "x": "horse",
                "y": 103
            },
            {
                "x": "skateboard",
                "y": 224
            },
            {
                "x": "others",
                "y": 215
            }
        ]
    },
    {
        "id": "germany",
        "color": "hsl(119, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 259
            },
            {
                "x": "helicopter",
                "y": 270
            },
            {
                "x": "boat",
                "y": 223
            },
            {
                "x": "train",
                "y": 212
            },
            {
                "x": "subway",
                "y": 149
            },
            {
                "x": "bus",
                "y": 246
            },
            {
                "x": "car",
                "y": 152
            },
            {
                "x": "moto",
                "y": 97
            },
            {
                "x": "bicycle",
                "y": 130
            },
            {
                "x": "horse",
                "y": 149
            },
            {
                "x": "skateboard",
                "y": 132
            },
            {
                "x": "others",
                "y": 98
            }
        ]
    },
    {
        "id": "norway",
        "color": "hsl(295, 70%, 50%)",
        "data": [
            {
                "x": "plane",
                "y": 174
            },
            {
                "x": "helicopter",
                "y": 75
            },
            {
                "x": "boat",
                "y": 48
            },
            {
                "x": "train",
                "y": 121
            },
            {
                "x": "subway",
                "y": 231
            },
            {
                "x": "bus",
                "y": 275
            },
            {
                "x": "car",
                "y": 194
            },
            {
                "x": "moto",
                "y": 57
            },
            {
                "x": "bicycle",
                "y": 96
            },
            {
                "x": "horse",
                "y": 139
            },
            {
                "x": "skateboard",
                "y": 153
            },
            {
                "x": "others",
                "y": 150
            }
        ]
    }
]

const LineChart = ({data = defaultData}) => {
    return (
        <>
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false
                }}
                yFormat=" >-.2f"
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'transportation',
                    legendOffset: 36,
                    legendPosition: 'middle',
                    truncateTickAt: 0
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'count',
                    legendOffset: -40,
                    legendPosition: 'middle',
                    truncateTickAt: 0
                }}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabel="data.yFormatted"
                pointLabelYOffset={-12}
                enableTouchCrosshair={true}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </>
    )
}

export default LineChart