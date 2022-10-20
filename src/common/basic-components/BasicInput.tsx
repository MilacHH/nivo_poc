import React, { useState } from "react";
import styled from "@emotion/styled";

interface BasicInputProps {
  label: string;
  value: string;
  placeHolder: string;
  type: string;
  onChange: (newValue: any) => void;
}

export const BasicInput: React.FC<BasicInputProps> = ({
  label,
  value,
  placeHolder,
  type,
  onChange,
}) => {
  const [activeValue, setActiveValue] = useState(value);
  return (
    <BasicInputWrapper>
      <Label>{label}</Label>
      <InputBase
        type={type}
        placeholder={placeHolder}
        value={activeValue}
        onChange={(event) => {
          setActiveValue(event.target.value);
          onChange(event.target.value);
        }}
      />
    </BasicInputWrapper>
  );
};

const BasicInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  width: 100%;
`;

const Label = styled.label``;

const InputBase = styled.input`
  width: calc(100% - 15px);
  margin-bottom: 10px;
  border-radius: 3px;
  border-width: 1px;
  border-color: #282b33;
  height: 25px;
  font-size: 14px;
  padding-left: 10px;
`;
