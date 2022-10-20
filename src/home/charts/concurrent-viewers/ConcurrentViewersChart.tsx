import React from "react";
import { ResponsiveLine, Serie } from "@nivo/line";
import { useLineGenerator } from "../../../common/hooks";
import { ConcurrentViewersTooltip } from "../../../common/tooltip";

interface ConcurrentViewersChartProps {
  data: Serie[];
  maxAudience: Serie;
}

export const ConcurrentViewersChart: React.FC<ConcurrentViewersChartProps> = ({
  data,
  maxAudience,
}) => {
  const [MaxAudienceLine] = useLineGenerator(
    maxAudience,
    "maxAudience",
    "#7969ef"
  );
  return data.length ? (
    <ResponsiveLine
      data={data}
      layers={["axes", "lines", "crosshair", "slices", "mesh", MaxAudienceLine]}
      margin={{ top: 20, right: 20, bottom: 50, left: 100 }}
      enableGridX={false}
      enableGridY={false}
      xScale={{
        type: "time",
        format: "%Y-%m-%d-%H",
        useUTC: false,
        precision: "hour",
      }}
      xFormat="time:%Y-%m-%d-%H"
      yScale={{
        type: "linear",
      }}
      axisLeft={{
        legendOffset: 0,
        tickValues: 4,
        format: (value) => Number(value).toFixed(0),
      }}
      axisBottom={{
        format: "%b %d",
        tickValues: "every 1 days",
        legendOffset: -12,
      }}
      curve={"cardinal"}
      enablePoints={false}
      areaOpacity={0.8}
      useMesh={true}
      enableSlices={"x"}
      sliceTooltip={(sliceData) => (
        <ConcurrentViewersTooltip sliceData={sliceData} />
      )}
    />
  ) : null;
};
