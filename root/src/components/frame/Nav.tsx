import React, { useState, useEffect, lazy, Suspense } from "react";
import MediaQuery from "react-responsive";
import { sizes } from "@bit/wasedatime.core.ts.utils.responsive-utils";
import {
  faCalendarAlt,
  faBook,
  faMapMarkedAlt,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
const Sidebar = lazy(() => import("./Sidebar"));
const MobileNav = lazy(() => import("./MobileNav"));
const SignInModal = lazy(
  () => import("@bit/wasedatime.core.ts.ui.sign-in-modal")
);
import { useTranslation } from "react-i18next";

const Nav = () => {
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    window.onstorage = () => {
      i18n.changeLanguage(localStorage.getItem("wasedatime-lng"));
    };
  }, []);

  const navItems = [
    {
      name: t("navigation.timetable"),
      path: "/courses/timetable",
      icon: faCalendarAlt,
    },
    {
      name: t("navigation.syllabus"),
      path: "/courses/syllabus",
      icon: faBook,
    },
    {
      name: t("navigation.campus"),
      path: "/campus",
      icon: faMapMarkedAlt,
    },
    {
      name: t("navigation.aboutus"),
      path: "/aboutus",
      icon: faStar,
    },
  ];

  return (
    <Suspense fallback={""}>
      <MediaQuery maxWidth={sizes.tablet}>
        {(matches) =>
          matches ? (
            <MobileNav
              navItems={navItems}
              openSignInModal={() => setSignInModalOpen(true)}
            />
          ) : (
            <Sidebar
              navItems={navItems}
              openSignInModal={() => setSignInModalOpen(true)}
            />
          )
        }
      </MediaQuery>
      <SignInModal
        isModalOpen={isSignInModalOpen}
        closeModal={() => setSignInModalOpen(false)}
      />
    </Suspense>
  );
};

export default Nav;
