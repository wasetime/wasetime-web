import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Grid } from "semantic-ui-react";

import MobileNav from "./MobileNav";
import LanguangeMenu from "./LanguageMenu";
import UserMenu from "./user/UserMenu";
import logo from "../../img/logo.png";

const StyledHeader = styled("header")`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.3rem 1rem;
  height: ${(props) => props.theme.headerHeight};
  background: ${(props) => props.theme.grey2};
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 400;
`;

const StyledLink = styled(Link)`
  display: flex;
  margin-right: 0.5rem;
`;

const Logo = styled("img")`
  width: 50px;
  height: 50px;
`;

const StyledGrid = styled(Grid)`
  width: calc(100vw - 70px) !important;
`;

const StyledGridColumn = styled(Grid.Column)`
  padding: 0.5rem !important;
`;

const StyledNavWrapper = styled(StyledGridColumn)`
  padding: 0px 0.5rem !important;
`;

const MobileHeader = ({ userInfo, signOut, toggleSignInModal }) => {
  return (
    <StyledHeader>
      <StyledLink to="/about">
        <Logo src={logo} alt="WasedaTime logo" width="50" height="50" />
      </StyledLink>

      <StyledGrid>
        <StyledNavWrapper width={12} floated="left">
          <MobileNav />
        </StyledNavWrapper>
        <StyledGridColumn width={2} floated="right">
          <LanguangeMenu isMobileMode={true} />
        </StyledGridColumn>
        <StyledGridColumn width={2} floated="right">
          <UserMenu
            userInfo={userInfo}
            signOut={signOut}
            openSignInModal={toggleSignInModal}
            isHovered={false}
            isMobileMode={true}
          />
        </StyledGridColumn>
      </StyledGrid>
    </StyledHeader>
  );
};

export default MobileHeader;
