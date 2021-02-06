import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { media } from "../../styled-components/utils";
import styled from "styled-components";
import {
  faFacebook,
  faTwitter,
  faGithub,
  faInstagram,
  faWeibo,
  faLink,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import oscar from "../../../img/contributors/oscar.jpg";
import mei from "../../../img/contributors/mei.jpg";
import hao from "../../../img/contributors/hao.jpg";
import austin from "../../../img/contributors/austin.jpg";
import kong from "../../../img/contributors/kong.JPG";

const Wrapper = styled("div")`
  display: flex;
  flex-direction: row;
`;

const Introduction = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Name = styled("span")`
  font-size: 1.2em;
`;

const Bio = styled("span")`
  font-size: 0.9em;
  margin-top: 0.2em;
  color: #444;
`;

const Position = styled("span")`
  font-size: 0.9em;
  color: #444;
`;

const StyledAvatar = styled(Avatar)`
  margin: 10px;
  width: 80px !important;
  height: 80px !important;
  ${media.phone`
    width: 60px !important;
    height: 60px !important;
  `};
`;

const StyledIcon = styled("a")`
  color: black;
  text-decoration: none;
  margin: 0 0.1em;
`;

const Developers = ({ t }) => {
  return (
    <div>
      <Wrapper>
        <StyledAvatar alt="Oscar" src={oscar} />
        <Introduction>
          <Name>
            Oscar
            <StyledIcon href="https://twitter.com/OscarWang114" target="_blank">
              <FontAwesomeIcon
                icon={faTwitter}
                size="1x"
                transform="shrink-2"
              />
            </StyledIcon>
            <StyledIcon
              href="https://www.facebook.com/haohaowang.oscar"
              target="_blank"
            >
              <FontAwesomeIcon
                icon={faFacebook}
                size="1x"
                transform="shrink-2"
              />
            </StyledIcon>
            <StyledIcon href="https://github.com/OscarWang114" target="_blank">
              <FontAwesomeIcon icon={faGithub} size="1x" transform="shrink-2" />
            </StyledIcon>
          </Name>

          <Position>{t("welcome.Founder")}</Position>
          <Bio />
        </Introduction>
      </Wrapper>
      <Wrapper>
        <StyledAvatar alt="Mei" src={mei} />
        <Introduction>
          <Name>
            Mei
            <StyledIcon href="https://twitter.com/Rimei9623" target="_blank">
              <FontAwesomeIcon
                icon={faTwitter}
                size="1x"
                transform="shrink-2"
              />
            </StyledIcon>
            <StyledIcon
              href="https://www.instagram.com/limengmmmm/"
              target="_blank"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                size="1x"
                transform="shrink-2"
              />
            </StyledIcon>
            <StyledIcon
              href="https://www.weibo.com/u/5000065316/home"
              target="_blank"
            >
              <FontAwesomeIcon icon={faWeibo} size="1x" transform="shrink-2" />
            </StyledIcon>
          </Name>
          <Position>{t("welcome.Frontendtranslation")}</Position>
          <Bio>
            <i>Join us and let’s think!</i>
          </Bio>
        </Introduction>
      </Wrapper>
      <Wrapper>
        <StyledAvatar alt="Hao" src={hao} />
        <Introduction>
          <Name>
            Hao
            <StyledIcon href="https://www.facebook.com/hao8711" target="_blank">
              <FontAwesomeIcon
                icon={faFacebook}
                size="1x"
                transform="shrink-2"
              />
            </StyledIcon>
          </Name>
          <Position>{t("welcome.Frontend")}</Position>
          <Bio>
            <i>{t("welcome.May WasedaTime be with you")}</i>
          </Bio>
        </Introduction>
      </Wrapper>
      <Wrapper>
        <StyledAvatar alt="Austin" src={austin} />
        <Introduction>
          <Name>
            Austin
            <StyledIcon
              href="https://www.instagram.com/austinzhu123/"
              target="_blank"
            >
              <FontAwesomeIcon
                icon={faInstagram}
                size="1x"
                transform="shrink-2"
              />
            </StyledIcon>
            <StyledIcon href="https://austinzhu.dev/" target="_blank">
              <FontAwesomeIcon icon={faLink} size="1x" transform="shrink-2" />
            </StyledIcon>
          </Name>
          <Position>{t("welcome.Frontend")}</Position>
          <Bio>
            <i>
              WasedaTime is gonna be legendary!
              {/* t("welcome.WasedaTime is gonna be legendary") */}
            </i>
          </Bio>
        </Introduction>
      </Wrapper>
      <Wrapper>
        <StyledAvatar alt="Kong" src={kong} />
        <Introduction>
          <Name>
            Kong
            {/* <StyledIcon href="" target="_blank">
              <FontAwesomeIcon
                icon={}
                size="1x"
                transform="shrink-2"
              />
            </StyledIcon> */}
          </Name>
          <Position>{t("welcome.Frontend")}</Position>
          <Bio>
            <i>{/* t("welcome.not provided yet") */}</i>
          </Bio>
        </Introduction>
      </Wrapper>
    </div>
  );
};

export default Developers;
