import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

import { Bandwidth } from "./bandwidth";
import { useBandiwdth } from "../../common/hooks";
import { ConcurrentViewers } from "./concurrent-viewers";
import { useConcurrentViewers } from "../../common/hooks";
import { Brush } from "./brush";

export const Charts: React.FC = () => {
  const [concurrentViewers] = useConcurrentViewers(15);
  const [currentConcurrentViewers, setCurrentConcurrentViewers] =
    useState(concurrentViewers);
  const [initConcurrentViewers, setInitConcurrentViewers] = useState(true);

  const [bandwidth] = useBandiwdth(15);
  const [currentBandwidth, setCurrentBandWidth] = useState(bandwidth);
  const [initBandwidth, setInitBandwidth] = useState(true);

  const [from, setFrom] = useState<number>(0);
  const [to, setTo] = useState<number>(Number.MAX_SAFE_INTEGER);

  useEffect(() => {
    if (bandwidth.length && bandwidth[0].data.length && initBandwidth) {
      // reset to
      if (to === from) {
        setTo(bandwidth[0].data.length - 1);
      }
      // filter data with brush range
      setCurrentBandWidth(
        bandwidth.map((data) => {
          return {
            ...data,
            data: data.data.slice(
              from,
              Math.min(to, bandwidth[0].data.length - 1)
            ),
          };
        })
      );
      setInitBandwidth(false);
    }
  }, [initBandwidth, bandwidth, from, to]);

  useEffect(() => {
    if (
      concurrentViewers.length &&
      concurrentViewers[0].data.length &&
      initConcurrentViewers
    ) {
      // reset to
      if (to === from) {
        setTo(concurrentViewers[0].data.length - 1);
      }
      // filter data with brush range
      console.log(concurrentViewers);
      setCurrentConcurrentViewers(
        concurrentViewers.map((data) => {
          return {
            ...data,
            data: data.data.slice(
              from,
              Math.min(to, concurrentViewers[0].data.length - 1)
            ),
          };
        })
      );
      // setCurrentConcurrentViewers(concurrentViewers);
      setInitConcurrentViewers(false);
    }
  }, [initConcurrentViewers, concurrentViewers, from, to]);

  return (
    <ChartsWrapper>
      <Bandwidth bandwidth={currentBandwidth} />
      <ConcurrentViewers concurrentViewers={currentConcurrentViewers} />
      <Brush
        brush={concurrentViewers}
        updateFrom={setFrom}
        updateTo={setTo}
        from={from}
        to={to}
      />
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
