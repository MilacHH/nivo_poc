import React from "react";
import styled from "@emotion/styled";
import moment from "moment";
import { DataLine } from "./DataLine";

interface BrushTooltipProps {
  from: any;
  to?: any;
}

export const BrushTooltip: React.FC<BrushTooltipProps> = ({ from, to }) => {
  const colorFrom = "#7969ef";
  const colorTo = "#ea5a44";
  return (
    <ToolTipWrapper>
      <Results>
        <DataLine
          label={"From "}
          color={colorFrom}
          value={moment(from, "YYYY-MM-DD-HH").format(
            "dddd DD-MM-YYYY HH:mm (Z)"
          )}
          unit={""}
        />
        {to && !moment(from).isSame(moment(to)) ? (
          <DataLine
            label={"To"}
            color={colorTo}
            value={moment(to, "YYYY-MM-DD-HH").format(
              "dddd DD-MM-YYYY HH:mm (Z)"
            )}
            unit={" users"}
          />
        ) : null}
      </Results>
    </ToolTipWrapper>
  );
};

const ToolTipWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 2px;
  background-color: "white";
  padding: 15px;
  border: "1px solid #ccc";
  font-size: 13px;

  -webkit-box-shadow: 0px 1px 5px -1px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 1px 5px -1px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 1px 5px -1px rgba(0, 0, 0, 0.5);
`;

const Results = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 5px;
  padding-bottom: 10px;
`;
