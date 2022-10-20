import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";

import { Bandwidth } from "./bandwidth";
import { useBandiwdth } from "../../common/hooks";

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

  return (
    <ChartsWrapper>
      <Bandwidth bandwidth={currentBandwidth} />
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
