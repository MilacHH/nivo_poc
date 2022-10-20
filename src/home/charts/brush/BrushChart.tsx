import React, { useState } from "react";
import { ResponsiveLine, Serie } from "@nivo/line";
import { BrushTooltip } from "../../../common/tooltip";
import { useBrushDrawerGenerator } from "../../../common/hooks";

interface BrushChartProps {
  data: Serie[];
  updateFrom?: (arg: number) => void;
  updateTo?: (arg: number) => void;
  from: number;
  to: number;
}

export const BrushChart: React.FC<BrushChartProps> = ({
  data,
  from,
  to,
  updateFrom = () => {},
  updateTo = () => {},
}) => {
  const height = 200; // TODO define optimum height
  const [BrushDrawer] = useBrushDrawerGenerator(height, from, to);
  const [firstClick, setFirstClick] = useState<boolean>(true);

  return data.length ? (
    <ResponsiveLine
      data={data}
      layers={["areas", "slices", BrushDrawer]}
      margin={{ top: 5, right: 10, bottom: 5, left: 10 }}
      enableGridX={false}
      enableGridY={false}
      curve={"cardinal"}
      colors="green"
      enablePoints={false}
      enableArea={true}
      areaOpacity={0.8}
      useMesh={false}
      enableSlices={"x"}
      sliceTooltip={(sliceData) => (
        <BrushTooltip
          from={from ? data[0].data[from] : sliceData.slice.points[0].data.x}
          to={to ? data[0].data[to] : undefined}
        />
      )}
      onClick={(handler) => {
        // TODO find a way to use onMouseDown and onMouseUp
        if (firstClick) {
          // FIXME state is not updated
          updateTo(handler.index);
          updateFrom(handler.index);
          setFirstClick(false);
        } else {
          updateTo(handler.index);
          setFirstClick(true);
        }
      }}
    />
  ) : null;
};
