import React, { useState } from "react";
import styled from "styled-components";
import { WithTranslation, withTranslation } from "react-i18next";
import { media } from "@bit/wasedatime.core.ts.utils.responsive-utils";
import Header from "@bit/wasedatime.core.ts.ui.header";
import { Logo } from "@bit/wasedatime.core.ts.ui.logo";
import titleLogo from "../../assets/img/title-logo.svg";
import homeBackground from "../../assets/img/home_background-lg.jpg";
import { WrapperWithBackground } from "@bit/wasedatime.core.ts.styles.wrapper";
import WelcomeModal from "./WelcomeModal";
import { navigate } from "@reach/router";

const StyledWrapper = styled(WrapperWithBackground)`
  background-repeat: no-repeat;
  background-attachment: fixed;
  height: 100%;
  overflow-y: auto;
`;

const StyledArticle = styled("article")`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  text-align: center !important;
  align-item: center;
  padding-top: 67px;
  height: 100vh;
`;

const LogoWrapper = styled("div")`
  transform: translate(0, 5vh);
  img {
    text-align: center;
    margin: auto;
  }
`;

const Introduction = styled("div")`
  text-align: center;
  max-width: 100%;
`;

const MainHeading = styled("h1")`
  padding-top: 1em;
  img {
    margin: 1em auto 0px auto;
  }
`;

// to be imported from Bit
const Description = styled("p")`
  font-size: 1.5em;
  font-weight: 300;
  color: #ffffff;
  text-shadow: 0px 0px 3px #000000;
  ${media.phone`font-size: 1em;`};
`;

interface Props extends WithTranslation {
  path: string;
  showFeatures: boolean;
}

const Home = ({ showFeatures, t, i18n }: Props) => {
  if (localStorage.getItem("isFirstAccess") === null)
    localStorage.setItem("isFirstAccess", "false");
  const [modalOpen, setModalOpen] = useState(showFeatures);
  const closeModal = () => {
    setModalOpen(false);
    if (showFeatures) navigate("/courses/timetable");
  };

  return (
    <StyledWrapper background={homeBackground}>
      <Header
        title={""}
        onInputChange={() => {}}
        placeholder={"Search course (in construction...)"}
        inputText={""}
        disabled={true}
        isBlur={true}
        changeLang={(lng) => i18n.changeLanguage(lng)}
      />
      <StyledArticle>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <Introduction>
          <MainHeading>
            <img
              width="200"
              height="50"
              src={titleLogo}
              alt="WasedaTime Text Logo"
            />
          </MainHeading>
          <Description>{t("about.description")}</Description>
          <br />
          <button
            className="bg-red-800 rounded-lg text-white px-4 py-2 mx-2"
            onClick={() => setModalOpen(true)}
          >
            {t("welcome.newFeature")}
          </button>
        </Introduction>

        <WelcomeModal isModalOpen={modalOpen} closeModal={closeModal} />
      </StyledArticle>
    </StyledWrapper>
  );
};

export default withTranslation("translation")(Home);
