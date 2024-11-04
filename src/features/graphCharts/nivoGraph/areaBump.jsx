import { ResponsiveAreaBump } from "@nivo/bump";
import { useSelector } from "react-redux";

const MyResponsiveAreaBump = ({ data }) => {
  const colors = useSelector((state) => state.colors.colors);
  return (
    <ResponsiveAreaBump
      data={data}
      margin={{ top: 40, right: 100, bottom: 40, left: 100 }}
      spacing={8}
      colors={colors}
      blendMode="multiply"
      startLabel="id"
      endLabel="id"
      axisTop={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: -36,
        truncateTickAt: 0,
      }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: 32,
        truncateTickAt: 0,
      }}
    />
  );
}


export default MyResponsiveAreaBump;