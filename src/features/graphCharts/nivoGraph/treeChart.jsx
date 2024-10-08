
import { ResponsiveTree } from "@nivo/tree";
import { useSelector } from "react-redux";

const MyResponsiveTree = ({ data }) => {
    const colors = useSelector((state) => state.colors.colors);
    return (
      <ResponsiveTree
        data={data}
        identity="name"
        colors={colors}
        activeNodeSize={24}
        inactiveNodeSize={12}
        nodeColor={(d) => {
          const colorIndex = d.depth % colors.length;
          return colors[colorIndex];
        }}
        fixNodeColorAtDepth={1}
        linkThickness={2}
        activeLinkThickness={8}
        inactiveLinkThickness={2}
        linkColor={{
          from: "target.color",
          modifiers: [["opacity", 0.4]],
        }}
        margin={{ top: 90, right: 90, bottom: 90, left: 90 }}
        motionConfig="stiff"
        meshDetectionRadius={80}
      />
    );
}



export default MyResponsiveTree;
