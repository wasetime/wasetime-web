import React from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { withNamespaces } from "react-i18next";
// import smoothScroll from "smoothscroll";
import { media } from "../styled-components/utils";
import { Wrapper, WrapperWithBackground } from "../styled-components/Wrapper";
// import { InvisibleButton } from "../styled-components/Button";
import homeBackground from "../../img/home_background-lg.jpg";
import homeBackgroundPhone from "../../img/home_background-phone.jpg";
import Header from "./Header";
import logo from "../../img/logo.png";
import titleLogo from "../../img/title-logo.svg";

const HomeWrapper = styled(WrapperWithBackground)`
  min-height: calc(100vh - ${(props) => props.theme.headerHeight});
`;

const StyledArticle = styled("article")`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  text-align: center;
  padding-top: 67px;
  height: 100vh;
`;

const LogoWrapper = styled("div")`
  text-align: center;
  transform: translate(0, 6vh);
`;

const Logo = styled("img")`
  width: 120px;
  height: 120px;
  ${media.phone`width: 100px; height: 100px;`};
`;

const Introduction = styled("div")`
  text-align: center;
  max-width: 100%;
  transform: translate(0, 6vh);
`;

const MainHeading = styled("h1")`
  padding-top: 1em;
`;

const Description = styled("p")`
  font-size: 2.4rem;
  font-weight: 300;
  color: #ffffff;
  text-shadow: 0px 0px 3px #000000;
  ${media.phone`font-size: 2.2rem;`};
`;

const Home = ({ t }) => {
  return (
    <Wrapper>
      <Helmet>
        <title>WasedaTime - Home</title>
        <meta
          name="description"
          content="An unofficial app for Syllabus Searching, Classroom Usage Checking, and Shuttle Bus Arrival Time Checking at Waseda University."
        />
        <meta property="og:title" content="WasedaTime - Home" />
        <meta
          property="og:description"
          content="Non-profit, student-run, open-source app aiming to support and improve the campus lives of Waseda University students."
        />
        <meta property="og:site_name" content="WasedaTime - Home" />
      </Helmet>
      <HomeWrapper
        background={homeBackground}
        backgroundPhone={homeBackgroundPhone}
      >
        <Header
          placeholder="Search course (in construction...)"
          disabled={true}
          isBlur={true}
        />
        <StyledArticle>
          <LogoWrapper>
            <Logo src={logo} alt="WasedaTime Logo" />
          </LogoWrapper>
          <Introduction>
            <MainHeading>
              <img
                width="250"
                height="50"
                src={titleLogo}
                alt="WasedaTime Text Logo"
              />
            </MainHeading>
            <Description>{t("about.description")}</Description>
          </Introduction>
        </StyledArticle>
      </HomeWrapper>
    </Wrapper>
  );
};

export default withNamespaces("translation")(Home);
