import React from "react";
import styled from "styled-components";
import { WithTranslation, withTranslation } from "react-i18next";
import reviewsImg from "../../assets/img/reviews-example.png";
import timetableImg1 from "../../assets/img/timetable-example-1.png";
import timetableImg2 from "../../assets/img/timetable-example-2.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import { Logo } from "@bit/wasedatime.core.ts.ui.logo";
import Modal from "@bit/wasedatime.core.ts.ui.modal";

const modalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: "1001",
    background: "rgba(153, 153, 153, 0.5)",
  },
  content: {
    position: "absolute",
    top: "10vh",
    bottom: "10vh",
    left: "10vw",
    right: "10vw",
    background: "#fff",
    overflowY: "auto",
    overflowScrolling: "touch",
    WebkitOverflowScrolling: "touch",
    outline: "none",
    fontSize: "16px",
    borderRadius: "20px",
  },
};

const LogoWrapper = styled("div")`
  transform: translate(0, 5vh);
  img {
    text-align: center;
    margin: auto;
  }
`;

interface Props extends WithTranslation {
  isModalOpen: boolean;
  closeModal: () => void;
}

const WelcomeModal = ({ isModalOpen, closeModal, t, i18n }) => (
  <Modal isOpen={isModalOpen} style={modalStyle} onRequestClose={closeModal}>
    <LogoWrapper style={{ transform: "none" }}>
      <Logo />
    </LogoWrapper>

    <h3 className="text-center">{t("welcome.welcome")}</h3>

    <div className="text-center my-4">
      <button
        className={`border-2 border-red-700 rounded-lg px-4 mx-2 ${
          i18n.language === "en" ? "bg-red-700 text-white" : "text-red-700"
        }`}
        onClick={() => i18n.changeLanguage("en")}
      >
        English
      </button>
      <button
        className={`border-2 border-red-700 rounded-lg px-4 mx-2 ${
          i18n.language === "ja" ? "bg-red-700 text-white" : "text-red-700"
        }`}
        onClick={() => i18n.changeLanguage("ja")}
      >
        日本語
      </button>
    </div>

    <br />
    <div className="grid grid-cols-4 mb-6">
      <div className="col-span-1">
        <hr className="my-4" />
      </div>
      <div className="col-span-2">
        <h5 className="text-center col-span-2">{t("welcome.newFeature")}</h5>
      </div>
      <div className="col-span-1">
        <hr className="my-4" />
      </div>
    </div>

    <div className="grid grid-cols-3 gap-4">
      <h4 className="col-span-1 m-0 px-1 py-6 xl:pl-4 2xl:py-8 2xl:pl-8">
        {t("welcome.userLogin")}
      </h4>
      <div className="col-span-2">
        {t("welcome.loginExplain1")}
        <FontAwesomeIcon icon={faUserCircle} size="2x" />
        {t("welcome.loginExplain2")}
        <br />
        {t("welcome.useWasedaGmail1")}
        <b style={{ color: "#b51e36" }}>{t("welcome.Waseda Gmail")}</b>
        {t("welcome.useWasedaGmail2")}
        <br />( ***@***.waseda.jp )
      </div>
    </div>

    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-20 mt-10">
      <div>
        <hr className="mb-4" />
        <h4>{t("welcome.writeReviews")}</h4>
        {t("welcome.writeReviewsExplain1")}
        <br />
        {t("welcome.writeReviewsExplain2")}
        <br />
        <img
          src={reviewsImg}
          alt="reviews example"
          width="100%"
          height="100%"
        />
      </div>

      <div>
        <hr className="mb-4" />
        <h4>{t("welcome.timetableSync")}</h4>
        {t("welcome.timetableSyncExplain")}
        <br />
        {t("welcome.timetableDisplayCredits")}
        <div className="grid grid-cols-8">
          <div className="col-span-5">
            <img
              src={timetableImg1}
              alt="timetable example 1"
              width="100%"
              height="100%"
            />
          </div>
          <div style={{ padding: "0px", paddingTop: "20%" }}>
            <FontAwesomeIcon icon={faExchangeAlt} size="2x" />
          </div>
          <div className="col-span-2">
            <img
              src={timetableImg2}
              alt="timetable example 2"
              width="100%"
              height="100%"
            />
          </div>
        </div>
      </div>
    </div>

    <div className="text-center">
      <button
        className="border-2 border-red-700 text-red-700 rounded-lg px-4 hover:bg-red-700 hover:text-white"
        onClick={closeModal}
      >
        OK
      </button>
    </div>
  </Modal>
);

export default withTranslation("translation")(WelcomeModal);
