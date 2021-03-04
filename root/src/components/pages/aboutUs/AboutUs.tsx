import React, { useState, lazy, Suspense } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import Header from "@bit/wasedatime.core.ts.ui.header";
import { Wrapper } from "@bit/wasedatime.core.ts.styles.wrapper";
import { Helmet } from "react-helmet";

import OurMission from "./OurMission";
import JoinUs from "./JoinUs";
const MeetOurTeam = lazy(() => import("./MeetOurTeam"));
import LoadingSpinner from "@bit/wasedatime.core.ts.ui.loading-spinner";

const AboutUsWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  flex: 67px;
`;

const AboutUsFlex = styled.div`
  flex: calc(100% - 67px);
  padding: 10px;
`;

const AboutUs = (props: { path: string }) => {
  const [activePage, setActivePage] = useState("our mission");
  const { t, i18n } = useTranslation();

  return (
    <AboutUsWrapper id="aboutus_wrapper">
      <Helmet>
        <title>WasedaTime -　About Us</title>
        <meta
          name="description"
          content="Introduce Wasedatime's mission and meet the team."
        />
        <meta property="og:title" content="WasedaTime - About Us" />
        <meta
          property="og:description"
          content="Introduce Wasedatime's mission and meet the team."
        />
        <meta property="og:site_name" content="WasedaTime - About Us" />
      </Helmet>
      <HeaderWrapper>
        <Header
          title={t("navigation.aboutus")}
          onInputChange={() => {}}
          placeholder={"Search course (in construction...)"}
          inputText={""}
          disabled={true}
          isBlur={false}
          changeLang={(lng) => i18n.changeLanguage(lng)}
        />
      </HeaderWrapper>
      <AboutUsFlex>
        <button
          className={`
          border-2 border-red-800 border-r-0 ${
            activePage === "our mission"
              ? "bg-red-800 text-white"
              : "bg-white text-red-800"
          } hover:bg-red-800 hover:text-white px-4 py-2 mx-0 outline-none focus:outline-none rounded-l-lg
        `}
          onClick={() =>
            activePage !== "our mission" && setActivePage("our mission")
          }
        >
          {t("aboutus.our mission")}
        </button>
        <button
          className={`
          border-2 border-red-800 border-l-0 border-r-0 ${
            activePage === "join us"
              ? "bg-red-800 text-white"
              : "bg-white text-red-800"
          } hover:bg-red-800 hover:text-white px-4 py-2 mx-0 outline-none focus:outline-none
        `}
          onClick={() => activePage !== "join us" && setActivePage("join us")}
        >
          {t("aboutus.join us")}
        </button>
        <button
          className={`
          border-2 border-red-800 border-l-0 ${
            activePage === "meet our team"
              ? "bg-red-800 text-white"
              : "bg-white text-red-800"
          } hover:bg-red-800 hover:text-white px-4 py-2 mx-0 outline-none focus:outline-none rounded-r-lg
        `}
          onClick={() =>
            activePage !== "meet our team" && setActivePage("meet our team")
          }
        >
          {t("aboutus.meet our team")}
        </button>

        {activePage === "our mission" && <OurMission />}
        {activePage === "join us" && <JoinUs />}
        {activePage === "meet our team" && (
          <Suspense
            fallback={
              <LoadingSpinner message={"Loading members information..."} />
            }
          >
            <MeetOurTeam />
          </Suspense>
        )}
      </AboutUsFlex>
    </AboutUsWrapper>
  );
};

export default AboutUs;
