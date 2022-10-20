import React, { useCallback } from "react";

export const useBrushDrawerGenerator = (
  height: number,
  from?: number,
  to?: number
): [
  ({ xScale, yScale }: any) => JSX.Element,
  React.RefObject<SVGPathElement>
] => {
  const ref = React.createRef<SVGPathElement>();
  const BrushDrawerGenerator = useCallback(
    ({ xScale, yScale }: any) => {
      return from && to ? (
        <rect
          x={Math.min(xScale(from), xScale(to))}
          y={yScale(0)}
          width={Math.abs(xScale(from) - xScale(from))}
          height={yScale(height)}
          fill="grey"
          stroke="black"
          opacity={0.2}
        />
      ) : (
        <></>
      );
    },
    [from, to, height]
  );

  return [BrushDrawerGenerator, ref];
};
