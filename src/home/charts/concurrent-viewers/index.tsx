import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

import { ConcurrentViewersChart } from "./ConcurrentViewersChart";
import { Serie } from "@nivo/line";
import { maxValue, generateSerie } from "../../../common/helpers";
import moment from "moment";

interface ConcurrentViewersProps {
  concurrentViewers: Serie[];
}

export const ConcurrentViewers: React.FC<ConcurrentViewersProps> = ({
  concurrentViewers,
}) => {
  const [maxAudience, setMaxAudience] = useState(generateSerie("maxAudience"));

  useEffect(() => {
    if (concurrentViewers.length) {
      setMaxAudience(buildMaxSerie(concurrentViewers[0]));
    }
  }, [concurrentViewers]);

  return (
    <ConcurrentViewersWrapper>
      <Title> Concurrent viewers </Title>
      <ChartWrapper>
        <ConcurrentViewersChart
          maxAudience={maxAudience}
          data={concurrentViewers}
        />
      </ChartWrapper>
    </ConcurrentViewersWrapper>
  );
};

const ConcurrentViewersWrapper = styled.div`
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
  generateSerie("maxAudience", [
    {
      x: moment(serie.data[0].x, "YYYY-MM-DD-hh").valueOf(),
      y: maxValue(serie, "y"),
    },
  ]);
