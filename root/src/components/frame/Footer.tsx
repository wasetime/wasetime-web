import React from "react";
import { navigate } from "@reach/router";
import { WithTranslation, withTranslation } from "react-i18next";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

// to be imported from Bit
const FooterWrapper = styled("footer")`
  text-align: center;
  color: #a9a9a9;
  background-color: #222222;
  font-weight: 300;
  z-index: 900;
  padding: 0.5rem 0px;
`;

const StyledLink = styled("a")`
  text-decoration: none;
  color: #ffffff;
`;

const Footer = ({ t }: WithTranslation) => {
  return (
    <FooterWrapper>
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
      .{" "}
      <StyledLink href="#" onClick={() => navigate("/terms-of-service")}>
        Terms of Service
      </StyledLink>
      .{" "}
      <StyledLink href="#" onClick={() => navigate("/privacy-policy")}>
        Privacy Policy
      </StyledLink>
    </FooterWrapper>
  );
};

export default withTranslation("translation")(Footer);
