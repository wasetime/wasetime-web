import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withNamespaces } from "react-i18next";
import { withRouter } from "react-router";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faBook,
  faBus,
  faVirus,
  // faStar,
} from "@fortawesome/free-solid-svg-icons";

import { media } from "../styled-components/utils";

const StyledNav = styled("nav")`
  display: flex;
  align-items: left;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: auto;
  width: 100%;
`;

const StyledLink = styled(Link)`
  ${media.phone`padding: 0.2em 0.4em 0 0.4em;`};
  text-align: left;
  text-decoration: none;
  font-size: 1.1em;
  font-weight: 330;
  padding: 1vh 0px;
  ${window.innerHeight < 450 && "padding: 0.5vh 0px;"}
  padding-left: ${(props) => (props.ishovered ? "35px" : "12px")};
  width: ${(props) => (props.ishovered ? "210px" : "67px")};
  &:hover {
    color: ${(props) => props.theme.colorPrimary};
    button {
      color: ${(props) => props.theme.colorPrimary};
    }
  }
  transition: padding-left 0.5s;
`;

const StyledButton = styled("button")`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: none;
  outline: none;
  padding: 0;
  margin: 0;
  background-color: inherit;
  color: ${(props) =>
    props.isClicked ? props.theme.colorPrimary : props.theme.white};

  svg {
    width: 40px !important;
    text-align: center !important;
  }
`;

const StyledSpan = styled("span")`
  width: 120px;
  text-align: left;
  font-size: 1em;
  font-weight: 100;
  margin-left: 1rem;
  color: #fff;
  opacity: ${(props) => (props.ishovered ? "1" : "0")};
  transition: opacity 0.3s;
`;

const Navigation = ({ isHovered, t }) => {
  const pathname = window.location.pathname;
  const navItems = [
    {
      name: t("navigation.timetable"),
      path: "/timetable",
      icon: faCalendarAlt,
    },
    {
      name: t("navigation.syllabus"),
      path: "/syllabus",
      icon: faBook,
    },
    {
      name: t("navigation.corona-info"),
      path: "/corona-info",
      icon: faVirus,
    },
    // {
    //   name: t("navigation.career"),
    //   path: "/career",
    //   icon: faBriefcase,
    // },
    // {
    //   name: t("navigation.joinus"),
    //   path: "/joinus",
    //   icon: faStar,
    // },
    {
      name: t("navigation.bus"),
      path: "/bus",
      icon: faBus,
    },
  ];
  const styledLinks = navItems.map((item) => {
    const itemName = item["name"];
    const itemPath = item["path"];
    const itemIcon = item["icon"];
    const fontBase = (
      <FontAwesomeIcon icon={itemIcon} size="2x" transform="shrink-2" />
    );
    return (
      <StyledLink to={itemPath} key={itemPath} ishovered={isHovered}>
        <StyledButton isClicked={pathname === itemPath}>
          {fontBase}
          <StyledSpan ishovered={isHovered}>{itemName}</StyledSpan>
        </StyledButton>
      </StyledLink>
    );
  });

  return <StyledNav>{styledLinks}</StyledNav>;
};

export default withRouter(withNamespaces("translation")(Navigation));

Navigation.propTypes = {
  location: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

StyledButton.propTypes = {
  isClicked: PropTypes.bool.isRequired,
};
