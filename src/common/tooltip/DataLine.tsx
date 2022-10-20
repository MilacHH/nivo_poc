import React from "react";
import styled from "@emotion/styled";

interface DataLineProps {
  value: number | string;
  label: string;
  unit: string;
  color?: string | undefined;
}

export const DataLine: React.FC<DataLineProps> = ({
  value,
  label,
  color = "#000000",
  unit,
}) => (
  <DataLineWrapper>
    <Legend backgroundColor={color} />
    <Data>
      <Name> {label}: </Name>
      <Value textColor={color}>{value + unit}</Value>
    </Data>
  </DataLineWrapper>
);

const DataLineWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Legend = styled.div<{ backgroundColor: string }>`
  width: 13px;
  height: 13px;
  margin-right: 5px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const Data = styled.div``;

const Name = styled.span``;

const Value = styled.span<{ textColor: string }>`
  color: ${({ textColor }) => textColor};
`;
