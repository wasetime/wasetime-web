import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faMapMarkerAlt,
  faYenSign,
  faCalendarWeek,
  faBriefcase,
  faSearchLocation,
} from "@fortawesome/free-solid-svg-icons";
import { withNamespaces } from "react-i18next";
import "./CareerInternCard.css";

/*
  {

    URL: "https://bit.ly/2YzPmUS",
    Payment: 0,
    Description:
      "【面向工程师的医疗行业实习】 【时薪1,300~1,800日元】 【可远程工作】",
  },

*/

const CareerCard = ({ careerInformation, t }) => {
  const [browserWidth, setBrowserWidth] = useState(document.body.clientWidth);
  const [showElem, setShowElem] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", handleBrowserWidth);
    return () => {
      window.removeEventListener("resize", handleBrowserWidth);
    };
  }, [browserWidth]);

  const handleBrowserWidth = () => {
    setBrowserWidth(document.body.clientWidth);
  };

  return (
    <div className="ui segment">
      <div
        className={
          document.body.clientWidth > 600
            ? "company-image-large-width"
            : "company-image-short-width"
        }
      >
        <img
          alt="company"
          src="https://static.careerbaito.com/picture/corporation/2796/708_472/ZpKQ0P4d.jpg"
        />
      </div>
      <div className="company-detail">
        <div className="ui list">
          <h3 style={{ fontSize: "17px" }}>{careerInformation.Title}</h3>

          <div>
            <div className="company detail">
              <table>
                <tbody>
                  <tr>
                    <td>
                      <span style={{ fontWeight: "bold", marginRight: "50px" }}>
                        {t("career.Corporation")}
                      </span>
                    </td>
                    <td className="company name">
                      <span>{careerInformation.Corporation}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span style={{ fontWeight: "bold" }}>
                        {t("career.Field")}
                      </span>
                    </td>
                    <td className="company field">
                      <span>{careerInformation.Field}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span style={{ fontWeight: "bold" }}>
                        {t("career.Language")}
                      </span>
                    </td>
                    <td className="language">
                      <span>{careerInformation.Language}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span style={{ fontWeight: "bold" }}>
                        {t("career.Request")}
                      </span>
                    </td>
                    <td className="request">
                      <span>{careerInformation.Request}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span style={{ fontWeight: "bold" }}>
                        {t("career.Deadline")}
                      </span>
                    </td>
                    <td className="deadline">
                      <span>{careerInformation.DEADLINE}</span>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span style={{ fontWeight: "bold" }}>
                        {t("career.Payment")}
                      </span>
                    </td>
                    <td className="deadline">
                      <span>{careerInformation.Payment}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              {showElem ? (
                <div>
                  <span
                    style={{
                      fontWeight: "bold",
                      marginRight: "50px",
                    }}
                  >
                    {t("career.Description")}
                  </span>
                  <p style={{ display: "inline" }}>
                    {careerInformation.Description}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="ui section divider"></div>
      <div className="job-button">
        <button
          onClick={() => {
            setShowElem(!showElem);
          }}
          className="ui primary button"
          style={{ fontSize: "12px" }}
        >
          {showElem ? t("career.Hide") : t("career.viewMore")}
        </button>
        <button
          onClick={() => window.open(careerInformation.URL)}
          className="ui primary button"
          style={{ fontSize: "12px" }}
        >
          {t("career.Entry")}
        </button>
      </div>
    </div>
  );
};

export default withNamespaces("translation")(CareerCard);
