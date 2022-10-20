import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

import { BandwidthChart } from "./BandwidthChart";
import { Serie } from "@nivo/line";
import { maxValue, generateSerie } from "../../../common/helpers";
import moment from "moment";

interface BandwidthProps {
  bandwidth: Serie[];
}

export const Bandwidth: React.FC<BandwidthProps> = ({ bandwidth }) => {
  const [maxCdn, setMaxCdn] = useState(generateSerie("maxCdn"));
  const [maxP2p, setMaxP2p] = useState(generateSerie("maxCdn"));

  useEffect(() => {
    if (bandwidth.length) {
      setMaxCdn(buildMaxSerie(bandwidth[0]));
      setMaxP2p(buildMaxSerie(bandwidth[1]));
    }
  }, [bandwidth]);

  return (
    <BandwidthWrapper>
      <Title> Capacity offload </Title>
      <ChartWrapper>
        <BandwidthChart maxCdn={maxCdn} maxP2p={maxP2p} data={bandwidth} />
      </ChartWrapper>
    </BandwidthWrapper>
  );
};

const BandwidthWrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
`;

const ChartWrapper = styled.div`
  height: 30vh;
`;

const Title = styled.h2`
  margin-left: 20px;
`;

const buildMaxSerie = (serie: Serie) =>
  generateSerie("maxCdn", [
    {
      x: moment(serie.data[0].x, "YYYY-MM-DD-hh").valueOf(),
      y: maxValue(serie, "y"),
    },
    {
      x: moment(serie.data[serie.data.length - 1].x, "YYYY-MM-DD-hh").valueOf(),
      y: maxValue(serie, "y"),
    },
  ]);
