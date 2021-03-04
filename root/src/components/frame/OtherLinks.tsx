import React from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next";

const LinksWrapper = styled("div")`
  ${(props) => (props.expanded ? "width: 210px;" : "width: 100%;")}
  height: 120px;
  overflow-x: hidden;
  padding: 0px;
  margin-bottom: 0.1vh;
  font-size: 12px;
  text-align: center;
  color: ${(props) => props.theme.grey7};
  a {
    color: ${(props) => props.theme.grey7};
    font-size: 12px;
  }
  opacity: ${(props) => (props.expanded ? "1" : "0")};
  transition: ${(props) =>
    props.expanded ? "opacity 0.4s ease 0.2s" : "opacity 0.2s, width 0.2s"};

  // Solve 'OtherInfo covering Nav' problem in iphone X wide mode
  ${(window.innerWidth < 400 || window.innerHeight < 450) &&
  "line-height: 4vh;"}
`;

const SnsLink = styled("a")`
  margin: 0px 0.3em;
`;

interface Props {
  expanded: boolean;
}

const OtherLinks = ({ expanded }: Props) => {
  const { t } = useTranslation();

  return (
    <LinksWrapper expanded={expanded}>
      <Link to="/terms-of-service">{t("user.Terms of Service")}</Link>・
      <Link to="/privacy-policy">{t("user.Privacy Policy")}</Link>
      <br />
      <a
        href="https://github.com/wasedatime/wasedatime-web/blob/master/LICENSE.md"
        target="_blank"
        rel="noopener noreferrer"
      >
        Code Licensed MIT
      </a>
      <br />
      <SnsLink
        href="https://github.com/wasedatime/wasedatime-web"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub link"
      >
        <FontAwesomeIcon icon={faGithub} size="2x" transform="shrink-2" />
      </SnsLink>
      <SnsLink
        href="https://twitter.com/WasedaTime"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter link"
      >
        <FontAwesomeIcon icon={faTwitter} size="2x" transform="shrink-2" />
      </SnsLink>
      <SnsLink
        href="https://www.facebook.com/wasedatime"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook link"
      >
        <FontAwesomeIcon icon={faFacebook} size="2x" transform="shrink-2" />
      </SnsLink>
      <SnsLink
        href="https://www.instagram.com/wasedatime/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram link"
      >
        <FontAwesomeIcon icon={faInstagram} size="2x" transform="shrink-2" />
      </SnsLink>
      <br />
      Copyright © 2018-2021 WasedaTime
    </LinksWrapper>
  );
};

export default OtherLinks;
