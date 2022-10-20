import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

import { Bandwidth } from "./bandwidth";
import { ConcurrentViewers } from "./concurrent-viewers";
import { useBandiwdth, useConcurrentViewers } from "../../common/hooks";

export const Charts: React.FC = () => {
  const [bandwidth] = useBandiwdth(15);
  const [currentBandwidth, setCurrentBandWidth] = useState(bandwidth);
  const [initBandwidth, setInitBandwidth] = useState(true);

  useEffect(() => {
    if (bandwidth.length && bandwidth[0].data.length && initBandwidth) {
      setCurrentBandWidth(bandwidth);
      setInitBandwidth(false);
    }
  }, [initBandwidth, bandwidth]);

  const [concurrentViewers] = useConcurrentViewers(15);
  const [currentConcurrentViewers, setCurrentConcurrentViewers] =
    useState(concurrentViewers);
  const [initConcurrentViewers, setInitConcurrentViewers] = useState(true);

  useEffect(() => {
    if (
      concurrentViewers.length &&
      concurrentViewers[0].data.length &&
      initConcurrentViewers
    ) {
      setCurrentConcurrentViewers(concurrentViewers);
      setInitConcurrentViewers(false);
    }
  }, [initConcurrentViewers, concurrentViewers]);

  return (
    <ChartsWrapper>
      <Bandwidth bandwidth={currentBandwidth} />
      <ConcurrentViewers concurrentViewers={currentConcurrentViewers} />
    </ChartsWrapper>
  );
};

const ChartsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  display: flex;
  padding: 20px;

  & > * {
    margin-bottom: 10px;
  }
`;
