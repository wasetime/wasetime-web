import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const LinksWrapper = styled("div")`
  ${(props) => (props.ishovered ? "width: 210px;" : "width: 100%;")}
  overflow-x: hidden;
  padding: 0px;
  margin-bottom: 0.5vh;
  font-size: 1rem;
  color: ${(props) => props.theme.grey7};
  a {
    color: ${(props) => props.theme.grey7};
  }
  opacity: ${(props) => (props.ishovered ? "1" : "0")};
  transition: ${(props) =>
    props.ishovered
      ? "opacity 0.4s ease 0.2s"
      : "opacity 0.15s ease, width 0.2s ease-out 0.15s"};

  // Solve 'OtherInfo covering Nav' problem in iphone X wide mode
  ${(window.innerWidth < 400 || window.innerHeight < 450) &&
  "line-height: 4vh;"}
`;

const OtherInfo = ({ isHovered }) => (
  <LinksWrapper ishovered={isHovered}>
    <a href="/terms-of-service">Terms of Service</a>・
    <a href="/privacy-policy">Privacy Policy</a>
    <br />
    <a
      href="https://github.com/wasedatime/wasedatime-web/blob/master/LICENSE.md"
      target="_blank"
      rel="noopener noreferrer"
    >
      Code Licensed MIT
    </a>
    <br />
    <a
      href="https://github.com/wasedatime/wasedatime-web"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={faGithub} size="2x" transform="shrink-2" />
    </a>
    <a
      href="https://twitter.com/WasedaTime"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={faTwitter} size="2x" transform="shrink-2" />
    </a>
    <a
      href="https://www.facebook.com/wasedatime"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={faFacebook} size="2x" transform="shrink-2" />
    </a>
    <a
      href="https://www.instagram.com/wasedatime/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={faInstagram} size="2x" transform="shrink-2" />
    </a>
    <br />
    Copyright © 2018-2021 WasedaTime
  </LinksWrapper>
);

export default OtherInfo;
