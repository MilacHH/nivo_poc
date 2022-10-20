import React, { useCallback } from "react";
import { line } from "d3-shape";
import { Serie } from "@nivo/line";

export const useLineGenerator = (
  datasToShape: Serie,
  id: string,
  color: string = "#000000",
  dashed: boolean = true
): [
  ({ xScale, yScale }: any) => JSX.Element,
  React.RefObject<SVGPathElement>
] => {
  const ref = React.createRef<SVGPathElement>();
  const LineGenerator = useCallback(
    ({ xScale, yScale }: any) => {
      const lineGenerator = line()
        .x(({ x }: any) => xScale(x))
        .y(({ y }: any) => yScale(y));
      const generatedLine = lineGenerator(datasToShape.data as any);
      if (generatedLine) {
        return (
          <path
            ref={ref}
            key={id}
            d={generatedLine}
            fill={"#000000"}
            fillOpacity={0.1}
            stroke={color}
            strokeWidth={1}
            strokeDasharray={dashed ? "3,3" : "0"}
          />
        );
      } else {
        return (
          <path
            ref={ref}
            key={id}
            fill="none"
            stroke={color}
            strokeWidth={2}
            strokeDasharray={"3,3"}
          />
        );
      }
    },
    [datasToShape, id, color, ref, dashed]
  );

  return [LineGenerator, ref];
};
