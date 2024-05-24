import { ResponsiveFunnel } from '@nivo/funnel'
import React from 'react'

const defaultData = [
    {
        "id": "step_sent",
        "value": 92834,
        "label": "Sent"
    },
    {
        "id": "step_viewed",
        "value": 57437,
        "label": "Viewed"
    },
    {
        "id": "step_clicked",
        "value": 37362,
        "label": "Clicked"
    },
    {
        "id": "step_add_to_card",
        "value": 27883,
        "label": "Add To Card"
    },
    {
        "id": "step_purchased",
        "value": 16818,
        "label": "Purchased"
    }
]

const FunnelChart = ({data = defaultData}) => {
    return (
        <>
            <ResponsiveFunnel
                data={data}
                margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
                valueFormat=">-.4s"
                colors={{ scheme: 'spectral' }}
                borderWidth={20}
                labelColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            3
                        ]
                    ]
                }}
                beforeSeparatorLength={100}
                beforeSeparatorOffset={20}
                afterSeparatorLength={100}
                afterSeparatorOffset={20}
                currentPartSizeExtension={10}
                currentBorderWidth={40}
                motionConfig="wobbly"
            />
        </>
    )
}

export default FunnelChart