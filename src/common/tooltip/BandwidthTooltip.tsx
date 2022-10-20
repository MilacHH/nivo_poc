import React from "react";
import styled from "@emotion/styled";
import { SliceTooltipProps, Serie } from "@nivo/line";
import moment from "moment";
import { DataLine } from "./DataLine";

interface BandwidthTooltipProps {
  sliceData: SliceTooltipProps;
  maxCdn: Serie;
  maxP2p: Serie;
}

export const BandwidthTooltip: React.FC<BandwidthTooltipProps> = ({
  sliceData,
  maxP2p,
  maxCdn,
}) => {
  const p2pData = {
    color: sliceData.slice.points[0].color,
    value: round(Number(sliceData.slice.points[0].data.y)),
  };

  const httpData = {
    color: sliceData.slice.points[1].color,
    value: round(Number(sliceData.slice.points[1].data.y)),
  };

  maxCdn.color = "#7969ef";
  maxP2p.color = "#ea5a44";

  const cumulated = round(
    Number(sliceData.slice.points[0].data.y) +
      Number(sliceData.slice.points[1].data.y)
  );

  const gain = round(
    (Number(sliceData.slice.points[0].data.y) * 100) / cumulated
  );

  return (
    <ToolTipWrapper>
      <Date>
        {moment(sliceData.slice.points[0].data.x).format(
          "dddd DD-MM-YYYY HH:mm (Z)"
        )}
      </Date>
      <Stats>
        <DataLine
          label={"P2P"}
          color={p2pData.color}
          value={p2pData.value}
          unit={"Gbps"}
        />
        <DataLine
          label={"Max P2P"}
          color={maxP2p.color}
          value={round(maxP2p.data[0].y as number)}
          unit={"Gbps"}
        />
        <DataLine
          label={"Http"}
          color={httpData.color}
          value={httpData.value}
          unit={"Gbps"}
        />
        {maxCdn.data.length ? (
          <DataLine
            label={"Max http"}
            color={maxCdn.color}
            value={round(maxCdn.data[0].y as number)}
            unit={"Gbps"}
          />
        ) : null}
      </Stats>
      <Results>
        <DataLine
          label={"Total"}
          color={"#00b76b"}
          value={cumulated}
          unit={"Gbps"}
        />
        <DataLine
          label={"Spike reduction"}
          color={p2pData.color}
          value={gain}
          unit={"%"}
        />
      </Results>
    </ToolTipWrapper>
  );
};

const round = (value: number) =>
  Number((Math.round(Number(value)) / (10 * 1000 * 1000 * 1000)).toFixed(2));

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

const Date = styled.div`
  font-weight: bold;
  border-bottom-width: 1px;
  border-bottom-style: solid;
`;

const Stats = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 5px;
  padding-bottom: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-bottom-width: 1px;
  border-bottom-style: solid;
`;

const Results = styled.div``;
