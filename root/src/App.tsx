import React, { useEffect, lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
import { Hub } from "@aws-amplify/core";
import { Router, Redirect, navigate } from "@reach/router";
const TermsOfService = lazy(() => import("./components/pages/TermsOfService"));
const PrivacyPolicy = lazy(() => import("./components/pages/PrivacyPolicy"));
const AboutUs = lazy(() => import("./components/pages/aboutUs/AboutUs"));
const Home = lazy(() => import("./components/pages/Home"));
import RedirectPage from "./components/user/RedirectPage";
import LoadingSpinner from "@bit/wasedatime.core.ts.ui.loading-spinner";
import Footer from "./components/frame/Footer";
import MediaQuery from "react-responsive";
import { sizes } from "@bit/wasedatime.core.ts.utils.responsive-utils";
import { useTranslation } from "react-i18next";
import CommonStyle from "./common-style";

const App = () => {
  Hub.listen("auth", ({ payload: { event, data } }) => {
    switch (event) {
      case "customOAuthState":
        navigate(data);
        break;
      default:
        break;
    }
  });

  const { i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("wasedatime-lng"));
  }, []);

  return (
    <React.Fragment>
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
      <CommonStyle />
      <Suspense fallback={<LoadingSpinner message={"Loading..."} />}>
        {localStorage.getItem("isFirstAccess") === null ? (
          <Home path="/" showFeatures={true} />
        ) : (
          <Router>
            <TermsOfService path="/terms-of-service" />
            <PrivacyPolicy path="/privacy-policy" />
            <AboutUs path="/aboutus" />
            <RedirectPage path="/verify" />
            <Home path="/home" showFeatures={false} />
            <Redirect from="/" to="/courses/timetable" noThrow />
            <Redirect from="/" to="/courses/timetable" noThrow />
            <Redirect from="/timetable" to="/courses/timetable" noThrow />
            <Redirect from="/syllabus" to="/courses/syllabus" noThrow />
          </Router>
        )}
      </Suspense>
      <MediaQuery maxWidth={sizes.tablet}>
        {(matches) => matches && <Footer />}
      </MediaQuery>
    </React.Fragment>
  );
};

export default App;
