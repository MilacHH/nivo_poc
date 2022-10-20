import React from "react";
import styled from "@emotion/styled";

import { Header } from "./Header";
import { Charts } from "./charts";

export const Home: React.FC = () => (
  <HomeWrapper>
    <Header />
    <Charts />
  </HomeWrapper>
);

const HomeWrapper = styled.div``;
