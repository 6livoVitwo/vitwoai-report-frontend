
import { ResponsiveFunnel } from "@nivo/funnel";
import { useSelector } from "react-redux";

const MyResponsiveFunnel = ({ data }) => {
    const colors = useSelector((state) => state.colors.colors);
    return (
      <ResponsiveFunnel
    data={data}
    margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
    valueFormat=">-.4s"
    colors={colors}
    borderWidth={20}
    labelColor={{
      from: "color",
      modifiers: [["darker", 3]],
    }}
    beforeSeparatorLength={100}
    beforeSeparatorOffset={20}
    afterSeparatorLength={100}
    afterSeparatorOffset={20}
    currentPartSizeExtension={10}
    currentBorderWidth={40}
    motionConfig="wobbly"
  />
)
}

export default MyResponsiveFunnel;
