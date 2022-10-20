import React, { useState } from "react";

import styled from "@emotion/styled";
import css from "@emotion/css";

import { ReactComponent as UserSvg } from "./../common/images/user.svg";
import { ReactComponent as LogoSvg } from "./../common/images/graph.svg";
import { useHistory } from "react-router-dom";
import { useAuth } from "../common/hooks";

export const Header: React.FC = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const history = useHistory();
  const { logout } = useAuth();

  return (
    <HeaderWrapper>
      <LogoIcon />
      <UserIcon onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)} />
      {isProfileMenuOpen ? (
        <ActiveBackground
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
        />
      ) : null}
      <Popup isOpen={isProfileMenuOpen}>
        <MenuTitle isOpen={isProfileMenuOpen}>Profile</MenuTitle>
        <MenuElement
          isOpen={isProfileMenuOpen}
          onClick={() => logout().then(() => history.replace("/login"))}
        >
          Logout
        </MenuElement>
      </Popup>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  background-color: #4761ac;
  height: 8vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;

const UserIcon = styled(UserSvg)`
  width: 50px;
  height: 8vh;
  cursor: pointer;
`;

const LogoIcon = styled(LogoSvg)`
  width: 50px;
  height: 8vh;
`;

const ActiveBackground = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;

  z-index: 1;
`;

const Popup = styled.div<{ isOpen: boolean }>`
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  background-color: #ffffff;
  color: #4761ac;
  position: absolute;
  top: 8.1vh;
  right: 15px;
  font-size: 13px;
  border-radius: 3px;

  z-index: 2;

  padding: ${({ isOpen }) => (isOpen ? "10px" : "0px")};
  width: ${({ isOpen }) => (isOpen ? "140px" : "0px")};
  height: ${({ isOpen }) => (isOpen ? "70px" : "0px")};
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.3);
  -webkit-transition: opacity 0.2s ease-in 0s, width 0.2s ease-in 0s,
    height 0.2s ease-in 0s;
  -moz-transition: opacity 0.2s ease-in 0s, width 0.2s ease-in 0s,
    height 0.2s ease-in 0s;
  -ms-transition: opacity 0.2s ease-in 0s, width 0.2s ease-in 0s,
    height 0.2s ease-in 0s;
  -o-transition: opacity 0.2s ease-in 0s, width 0.2s ease-in 0s,
    height 0.2s ease-in 0s;
  transition: opacity 0.2s ease-in 0s, width 0.2s ease-in 0s,
    height 0.2s ease-in 0s;
  white-space: nowrap;
  overflow: hidden;
`;

const MenuTitle = styled.div<{ isOpen: boolean }>`
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  font-size: 15px;
  margin-bottom: 10px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  -webkit-transition: ${({ isOpen }) =>
    isOpen ? css`opacity 0.1s ease-in 0.2s` : css`opacity 0s ease-in 0s`};
  -moz-transition: ${({ isOpen }) =>
    isOpen ? css`opacity 0.1s ease-in 0.2s` : css`opacity 0s ease-in 0s`};
  -ms-transition: ${({ isOpen }) =>
    isOpen ? css`opacity 0.1s ease-in 0.2s` : css`opacity 0s ease-in 0s`};
  -o-transition: ${({ isOpen }) =>
    isOpen ? css`opacity 0.1s ease-in 0.2s` : css`opacity 0s ease-in 0s`};
  transition: ${({ isOpen }) =>
    isOpen ? css`opacity 0.1s ease-in 0.2s` : css`opacity 0s ease-in 0s`};
`;

const MenuElement = styled.div<{ isOpen: boolean }>`
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  margin-bottom: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  -ms-transition: ${({ isOpen }) =>
    isOpen ? css`opacity 0.1s ease-in 0.2s` : css`opacity 0s ease-in 0s`};
  -o-transition: ${({ isOpen }) =>
    isOpen ? css`opacity 0.1s ease-in 0.2s` : css`opacity 0s ease-in 0s`};
  transition: ${({ isOpen }) =>
    isOpen ? css`opacity 0.1s ease-in 0.2s` : css`opacity 0s ease-in 0s`};
  -webkit-transition: ${({ isOpen }) =>
    isOpen ? css`opacity 0.1s ease-in 0.2s` : css`opacity 0s ease-in 0s`};
  -moz-transition: ${({ isOpen }) =>
    isOpen ? css`opacity 0.1s ease-in 0.2s` : css`opacity 0s ease-in 0s`};
  :hover {
    background-color: #4761ac30;
  }
`;
