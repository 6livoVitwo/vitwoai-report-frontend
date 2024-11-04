import React from "react";
import { ResponsiveTreeMap } from "@nivo/treemap";
import { useSelector } from "react-redux";

const MyResponsiveTreeMap = ({ data }) => {
    const colors = useSelector((state) => state.colors.colors);

    return (
      <ResponsiveTreeMap
        data={data}
        colors={colors}
        identity="name"
        value="loc"
        valueFormat=".02s"
        margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
        labelSkipSize={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.2]],
        }}
        parentLabelPosition="left"
        parentLabelTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.1]],
        }}
      />
    );
}



export default MyResponsiveTreeMap;