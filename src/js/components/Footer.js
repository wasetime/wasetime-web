import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { withNamespaces } from "react-i18next";

const StyledFooter = styled("footer")`
  display: block;
  text-align: center;
  color: #a9a9a9;
  background-color: #222222;
  font-size: 1.4rem;
  font-weight: 300;
  z-index: 300;
  padding-top: 0.5rem;
`;

const StyledLink = styled("a")`
  text-decoration: none;
  color: #ffffff;
`;

const Footer = ({ t, lng }) => {
  return (
    <StyledFooter>
      <StyledLink
        href="https://github.com/wasedatime/wasedatime-web"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faGithub} size="2x" transform="shrink-2" />
      </StyledLink>
      <StyledLink
        href="https://twitter.com/WasedaTime"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faTwitter} size="2x" transform="shrink-2" />
      </StyledLink>
      <StyledLink
        href="https://www.facebook.com/wasedatime"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faFacebook} size="2x" transform="shrink-2" />
      </StyledLink>
      <StyledLink
        href="https://www.instagram.com/wasedatime/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FontAwesomeIcon icon={faInstagram} size="2x" transform="shrink-2" />
      </StyledLink>
      <br />
      Copyright © 2018-2021 WasedaTime
      <br />
      {t("footer.licensed")}
      <StyledLink
        href="https://github.com/wasedatime/wasedatime-web/blob/master/LICENSE.md"
        target="_blank"
        rel="noreferrer"
      >
        MIT
      </StyledLink>
      . <StyledLink href="/terms-of-service">Terms of Service</StyledLink>.{" "}
      <StyledLink href="/privacy-policy">Privacy Policy</StyledLink>
    </StyledFooter>
  );
};

export default withNamespaces("translation")(Footer);

Footer.propTypes = {
  t: PropTypes.func.isRequired,
  lng: PropTypes.string.isRequired,
};
