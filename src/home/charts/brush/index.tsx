import React from "react";
import styled from "@emotion/styled";

import { BrushChart } from "./BrushChart";
import { Serie } from "@nivo/line";

interface BrushChartProps {
  brush: Serie[];
  from: number;
  to: number;
  updateFrom: (arg: number) => void;
  updateTo: (arg: number) => void;
}

export const Brush: React.FC<BrushChartProps> = ({
  brush,
  from,
  to,
  updateFrom,
  updateTo,
}) => {
  return (
    <BrushWrapper>
      <ChartWrapper /*TODO use onMouseDown and onPuseUp here !*/>
        <BrushChart
          data={brush}
          updateFrom={updateFrom}
          updateTo={updateTo}
          from={from}
          to={to}
        />
      </ChartWrapper>
    </BrushWrapper>
  );
};

const BrushWrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
`;

const ChartWrapper = styled.div`
  height: 15vh;
`;
