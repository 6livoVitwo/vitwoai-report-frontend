import React from 'react'
import { treeChartData } from '../data/chartData'
import { ResponsiveTree } from '@nivo/tree'

const TreeChart = ({ data = treeChartData }) => {
    return (
      <>
        <ResponsiveTree
          data={data}
          identity="name"
          activeNodeSize={24}
          inactiveNodeSize={12}
          nodeColor={{ scheme: "tableau10" }}
          fixNodeColorAtDepth={1}
          linkThickness={2}
          activeLinkThickness={8}
        //   colors={{ scheme: "blues" }}
          inactiveLinkThickness={2}
          linkColor={{
            from: "target.color",
            modifiers: [["opacity", 0.4]],
          }}
          margin={{ top: 90, right: 90, bottom: 90, left: 90 }}
          motionConfig="stiff"
          meshDetectionRadius={80}
        />
      </>
    );
}

export default TreeChart