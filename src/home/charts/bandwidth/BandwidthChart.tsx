import React from "react";
import { ResponsiveLine, Serie } from "@nivo/line";
import { useLineGenerator } from "../../../common/hooks";
import { BandwidthTooltip } from "../../../common/tooltip";

interface BandwidthChartProps {
  data: Serie[];
  maxCdn: Serie;
  maxP2p: Serie;
}

export const BandwidthChart: React.FC<BandwidthChartProps> = ({
  data,
  maxP2p,
  maxCdn,
}) => {
  const [MaxCdnLine] = useLineGenerator(maxCdn, "maxCdn", "#7969ef");
  const [MaxP2pGeneratedLine] = useLineGenerator(maxP2p, "maxP2P", "#ea5a44");
  return data.length ? (
    <ResponsiveLine
      data={data}
      layers={[
        "axes",
        "areas",
        "crosshair",
        "slices",
        "mesh",
        "legends",
        MaxP2pGeneratedLine,
        MaxCdnLine,
      ]}
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
        format: (value) =>
          (Number(value) / (10 * 1000 * 1000 * 1000)).toFixed(1) + "Gbps",
      }}
      axisBottom={{
        format: "%b %d",
        tickValues: "every 1 days",
        legendOffset: -12,
      }}
      curve={"cardinal"}
      enablePoints={false}
      enableArea={true}
      areaOpacity={0.8}
      useMesh={true}
      enableSlices={"x"}
      sliceTooltip={(sliceData) => (
        <BandwidthTooltip
          maxCdn={maxCdn}
          maxP2p={maxP2p}
          sliceData={sliceData}
        />
      )}
      legends={[
        {
          anchor: "bottom-right",
          direction: "row",
          justify: false,
          translateX: -160,
          translateY: 50,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  ) : null;
};
