import { ResponsiveFunnel } from '@nivo/funnel';
import React from 'react';
import { funnelChartData } from "../jsonData/chartData";

const Funnel = ({ data = funnelChartData, dynamicWidth=1200 }) => {
	return (
		<>
			<ResponsiveFunnel
				data={data}
				// direction="horizontal"
				// width={dynamicWidth}
				// height={dynamicWidth}
				margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
				valueFormat='>-.4s'
				colors={{ scheme: 'spectral' }}
				borderWidth={20}
				labelColor={{
					from: 'color',
					modifiers: [['darker', 3]],
				}}
				beforeSeparatorLength={100}
				beforeSeparatorOffset={20}
				afterSeparatorLength={100}
				afterSeparatorOffset={20}
				currentPartSizeExtension={10}
				currentBorderWidth={40}
				motionConfig='wobbly'
			/>
		</>
	);
};

export default Funnel;