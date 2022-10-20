import React, { useState } from "react";
import styled from "@emotion/styled";

import { ReactComponent as LogoSvg } from "./../common/images/graph.svg";
import { BasicInput } from "../common/basic-components";
import { useHistory } from "react-router-dom";
import { useAuth } from "../common/hooks";

export const Login: React.FC = () => {
  const history = useHistory();
  const { login } = useAuth();
  const [identifiant, setIdentifiant] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>();

  return (
    <Wrapper>
      <Logo />
      <AppName> CDN Graphs Explorer </AppName>
      <LoginForm
        onSubmit={async (event) => {
          try {
            event.preventDefault();
            await login(identifiant, password);
            history.replace("/charts");
          } catch (e) {
            setError("User not found");
          }
        }}
      >
        <WelcomeText>
          Hello guys! <br /> Let's explore those graphs. But first login!
        </WelcomeText>
        <InputsWrapper>
          <BasicInput
            type="text"
            label="Username"
            value=""
            placeHolder="WonderStream"
            onChange={(newValue) =>
              setIdentifiant(String(newValue).toLocaleLowerCase())
            }
          />
          <BasicInput
            type="password"
            label="Password"
            value=""
            placeHolder="Type your secret"
            onChange={(newValue) => setPassword(newValue)}
          />
        </InputsWrapper>
        {error ? <Error> {error} </Error> : null}
        <LoginButton> Connexion </LoginButton>
      </LoginForm>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #4761ac;
  @media only screen and (min-width: 768px) {
    justify-content: center;
    height: 100%;
  }
  @media only screen and (max-width: 767px) {
    justify-content: start;
  }
`;

const Logo = styled(LogoSvg)`
  @media only screen and (min-width: 768px) {
    width: 300px;
  }
  @media only screen and (max-width: 767px) {
    width: 200px;
  }
`;

const AppName = styled.h1`
  color: #ffffff;
  margin-bottom: 30px;
`;

const LoginForm = styled.form`
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border-radius: 3px;
  padding: 20px;

  @media only screen and (min-width: 768px) {
    width: 400px;
  }
  @media only screen and (max-width: 767px) {
    width: 300px;
  }
  -webkit-box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.5);
`;

const WelcomeText = styled.p`
  font-weight: bold;
`;

const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const Error = styled.p`
  color: #e54b4b;
`;

const LoginButton = styled.button`
  background-color: #54c2ef;
  color: #ffffff;
  border: none;
  padding: 15px 30px;
  text-decoration: none;
  margin-top: 10px;
  font-size: 16px;
  cursor: pointer;
`;
