import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt, faLink } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookSquare,
  faTwitterSquare,
  faLinkedin,
  faLine,
  faWhatsappSquare,
} from "@fortawesome/free-brands-svg-icons";
import { InvisibleButton } from "@bit/wasedatime.core.ts.styles.button";
import Popup from "semantic-ui-react/dist/commonjs/modules/Popup";
import { withTranslation } from "react-i18next";

const ShareButtons = ({ courseId, t }) => {
  const shareLink = `https://${window.location.hostname}${window.location.pathname}?courseId=${courseId}`;
  const shareText = t("syllabus.Share text");

  const twitterButton = (
    <a
      className="twitter-share-button"
      href={`https://twitter.com/intent/tweet?url=${shareLink}&text=${shareText}&hashtags=wasedatime,waseda`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon
        icon={faTwitterSquare}
        size="2x"
        style={{
          color: "#00ACEE",
        }}
      />{" "}
    </a>
  );

  const facebookButton = (
    <a
      className="facebook-share-button"
      href={`https://www.facebook.com/sharer/sharer.php?title=&u=${shareLink}&quote=${shareText}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon
        icon={faFacebookSquare}
        size="2x"
        style={{ color: "#3B5998" }}
      />{" "}
    </a>
  );

  const linkedinButton = (
    <a
      className="linkedin-share-button"
      href={`http://www.linkedin.com/shareArticle?mini=true&url=${shareLink}&title=${shareText}&summary=${shareText}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon
        icon={faLinkedin}
        size="2x"
        style={{ color: "#0E76A8" }}
      />{" "}
    </a>
  );

  const lineButton = (
    <a
      className="line-share-button"
      href={`http://line.me/R/msg/text/?${shareText} ${shareLink}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={faLine} size="2x" style={{ color: "#00B400" }} />{" "}
    </a>
  );

  const whatappButton = (
    <a
      className="whatapp-share-button"
      href={`https://wa.me/?text=${shareText} ${shareLink}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon
        icon={faWhatsappSquare}
        size="2x"
        style={{ color: "#4FCE5D" }}
      />{" "}
    </a>
  );

  const copyClipboardButton = (
    <CopyToClipboard text={shareLink}>
      <InvisibleButton>
        <Popup
          basic
          content="Link Copied!"
          on="click"
          trigger={
            <FontAwesomeIcon
              icon={faLink}
              size="2x"
              style={{ color: "#8B8" }}
            />
          }
        />
      </InvisibleButton>
    </CopyToClipboard>
  );

  return (
    <span>
      <p style={{ marginBottom: "0px" }}>Share this course:</p>
      {facebookButton}
      {linkedinButton}
      {twitterButton}
      {whatappButton}
      {lineButton}
      {copyClipboardButton}
    </span>
  );
};

export default withTranslation("translation")(ShareButtons);
