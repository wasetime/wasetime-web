import React, { useState } from "react";
import { Link } from "@reach/router";
import styled, { ThemeProvider } from "styled-components";
import { normalTheme } from "@bit/wasedatime.core.ts.constants.theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SidebarWrapper from "@bit/wasedatime.core.ts.styles.sidebar-wrapper";
import { SmallLogo } from "@bit/wasedatime.core.ts.ui.logo";
import textLogo from "@bit/wasedatime.core.assets.text-logo";
import UserMenu from "../user/UserMenu";
import OtherLinks from "./OtherLinks";

const TextLogo = styled.img`
  height: 25px;
  margin: 0.5rem;
  overflow-x: hidden;
  opacity: ${(props) => (props.expanded ? "1" : "0")};
  transition: opacity 0.3s ease-out;
`;

const NavItemBlock = styled.div`
  display: flex;
  flex-direction: row;
  color: #fff;
  font-size: 18px;
  font-weight: 100;
  padding: 1vh 0px;
  width: 100%;
  text-align: center;
  padding-left: ${(props) => (props.expanded ? "40px" : "12px")};
  svg {
    width: 40px !important;
    height: 40px;
    text-align: center;
  }
  transition: padding-left 0.5s;
  &:hover {
    color: ${(props) => props.theme.colorPrimary};
  }
`;

const NavItemText = styled.span`
  overflow-x: hidden;
  margin-left: 1rem;
  text-align: left;
  color: #fff;
  margin: 0px;
  margin-left: 1rem;
  line-height: 2;
  height: 40px;
  opacity: ${(props) => (props.expanded ? "1" : "0")};
  width: ${(props) => (props.expanded ? "120px" : "0px")};
  transition: opacity 0.3s ease-out, width 0.5s;
`;

type Props = {
  navItems: {
    name: string;
    path: string;
    icon: any;
  }[];
  openSignInModal: () => void;
};

const Sidebar = ({ navItems, openSignInModal }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const expandSidebar = () => {
    if (!expanded) setExpanded(true);
  };

  const foldSidebar = () => {
    if (expanded) setExpanded(false);
  };

  return (
    <ThemeProvider theme={normalTheme}>
      <SidebarWrapper
        expanded={expanded}
        onMouseEnter={expandSidebar}
        onTouchStart={expandSidebar}
        onMouseLeave={foldSidebar}
      >
        <Link to={"/home"} className="flex flex-row items-center p-3">
          <SmallLogo />
          <TextLogo
            src={textLogo}
            alt="WasedaTime text logo"
            width="150"
            height="50"
            expanded={expanded}
          />
        </Link>
        <div style={{ width: "100%", margin: "0px" }}>
          {navItems.map((item) => (
            <Link
              to={item.path}
              key={item.name}
              onClick={() => {}}
              expanded={expanded ? 1 : 0}
            >
              <NavItemBlock expanded={expanded ? 1 : 0}>
                <FontAwesomeIcon
                  icon={item.icon}
                  size="2x"
                  transform="shrink-2"
                />
                <NavItemText expanded={expanded ? 1 : 0}>
                  {item.name}
                </NavItemText>
              </NavItemBlock>
            </Link>
          ))}
        </div>
        <div className="absolute bottom-60">
          <OtherLinks expanded={expanded} />
          <UserMenu
            openSignInModal={openSignInModal}
            isHovered={expanded}
            isMobileMode={false}
          />
        </div>
      </SidebarWrapper>
    </ThemeProvider>
  );
};

export default Sidebar;
