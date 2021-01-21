import React from "react";
import styled from "styled-components";
import MediaQuery from "react-responsive";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt, faLink } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookSquare,
  faTwitterSquare,
  faLinkedin,
  faLine,
  faWhatsappSquare,
  //faWeixin,
  //faFacebookMessenger,
} from "@fortawesome/free-brands-svg-icons";
import { Manager, Reference, Popper } from "react-popper";
import { InvisibleButton } from "../../styled-components/Button";
import { Popup } from "semantic-ui-react";
import { withNamespaces } from "react-i18next";
//import { element } from "prop-types";

//Popper Style -----
const PopperBox = styled("div")`
  display: box;
  border-radius: 5px;
  padding: 0.4em;
  text-align: center;
`;

//ShareButton Style -----
const ShareButtonBarWrapper = styled("div")`
  flex: 1 0 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.9em;
`;

const ShareButtonBar = styled("button")`
  display: block;
  background-color: rgb(86, 162, 146);
  border: 0px;
  border-radius: 5px;
  color: #fff;
  padding: 5px 1rem;
  margin-bottom: 4px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: rgba(86, 162, 146, 0.3);
    color: rgb(86, 162, 146);
  }
  &:focus {
    outline: none;
  }
`; // Case of large Screen

const ShareButtonIcon = styled("i")`
  display: block;
  background-color: #fff;
  border-left: 0px;
  color: rgb(86, 162, 146);
  text-decoration: none;
  padding: 1px 0px;

  &:focus {
    outline: none;
  }
`; // Case of Small Screen

const ShareButton = ({
  display,
  shareLink,
  sizesDesktop,
  isDetailDisplayed,
  isPopperOpen,
  handleToggleSharePopper,
  needLineBreak,
  t,
}) => {
  const shareText = t("syllabus.Share text");
  const shareButtonBar = ( // Share Button Function for large page
    <MediaQuery minWidth={sizesDesktop}>
      {(matches) => {
        if (matches && isDetailDisplayed && display === "bar") {
          return (
            <Reference>
              {({ ref }) => (
                <ShareButtonBarWrapper>
                  <Popup
                    position="top right"
                    content={t("syllabus.Share popup message")}
                    on="hover"
                    trigger={
                      <ShareButtonBar
                        innerRef={ref}
                        onClick={handleToggleSharePopper}
                        style={{
                          fontSize:
                            needLineBreak !== undefined && needLineBreak
                              ? "0.9em"
                              : "1em",
                        }}
                      >
                        <FontAwesomeIcon icon={faShareAlt} />
                        {needLineBreak !== undefined && needLineBreak
                          ? " " + t("syllabus.Share")
                          : " " + t("syllabus.Share!")}
                      </ShareButtonBar>
                    }
                  />
                </ShareButtonBarWrapper>
              )}
            </Reference>
          );
        } else {
          return "";
        }
      }}
    </MediaQuery>
  );

  const shareButtonIcon = ( // Share Button Function for small page
    <MediaQuery maxWidth={sizesDesktop}>
      {(matches) => {
        if (matches && isDetailDisplayed && display === "icon") {
          return (
            <Reference>
              {({ ref }) => (
                <ShareButtonIcon
                  innerRef={ref}
                  onClick={handleToggleSharePopper}
                >
                  <FontAwesomeIcon
                    icon={faShareAlt}
                    size="2x"
                    transform="shrink-2"
                  />{" "}
                </ShareButtonIcon>
              )}
            </Reference>
          );
        } else {
          return "";
        }
      }}
    </MediaQuery>
    //<MediaQuery maxWidth={sizes.phone || sizes.tablet}></MediaQuery>
  );

  //Social Button part ---------------------------------------------------
  const twitterButton = (
    <MediaQuery maxWidth={sizesDesktop}>
      {() => {
        /* Share Button */
        return (
          <a
            className="twitter-share-button"
            href={`https://twitter.com/intent/tweet?url=${shareLink}&text=${shareText}&hashtags=wasedatime,waseda`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faTwitterSquare}
              size="lg" // lg = slight large than 1x
              style={{
                color: "#00ACEE",
                // backgroundColor: "#fff",
              }}
            />{" "}
          </a>
        );
      }}
    </MediaQuery>
  );

  const facebookButton = (
    <MediaQuery maxWidth={sizesDesktop}>
      {() => {
        /* Share Button */
        return (
          <a
            className="facebook-share-button"
            href={`https://www.facebook.com/sharer/sharer.php?title=&u=${shareLink}&quote=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faFacebookSquare}
              size="lg" // lg = slight large than 1x
              style={{ color: "#3B5998" }}
            />{" "}
          </a>
        );
      }}
    </MediaQuery>
  );

  const linkedinButton = (
    <MediaQuery maxWidth={sizesDesktop}>
      {() => {
        return (
          <a
            className="linkedin-share-button"
            href={`http://www.linkedin.com/shareArticle?mini=true&url=${shareLink}&title=${shareText}&summary=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faLinkedin}
              size="lg" // lg = slight large than 1x
              style={{ color: "#0E76A8" }}
            />{" "}
          </a>
        );
      }}
    </MediaQuery>
  );

  const lineButton = (
    <MediaQuery maxWidth={sizesDesktop}>
      {() => {
        return (
          <a
            className="line-share-button"
            href={`http://line.me/R/msg/text/?${shareText} ${shareLink}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faLine}
              size="lg" // lg = slight large than 1x
              style={{ color: "#00B400" }}
            />{" "}
          </a>
        );
      }}
    </MediaQuery>
  );

  const whatappButton = (
    <MediaQuery maxWidth={sizesDesktop}>
      {() => {
        return (
          <a
            className="whatapp-share-button"
            href={`https://wa.me/?text=${shareText} ${shareLink}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faWhatsappSquare}
              size="lg" // lg = slight large than 1x
              style={{ color: "#4FCE5D" }}
            />{" "}
          </a>
        );
      }}
    </MediaQuery>
  );

  const copyClipboardButton = (
    <MediaQuery maxWidth={sizesDesktop}>
      {() => {
        return (
          <CopyToClipboard text={window.location.href}>
            <InvisibleButton>
              <Popup
                basic
                content="Link Copied!"
                on="click"
                trigger={
                  <FontAwesomeIcon
                    icon={faLink}
                    size="1x" // lg = slight large than 1x
                    style={{ color: "#8B8" }}
                  />
                }
              />
            </InvisibleButton>
          </CopyToClipboard>
        );
      }}
    </MediaQuery>
  );

  // Return Share button popper
  return (
    <Manager>
      {shareButtonIcon}
      {shareButtonBar}
      <Popper style={{ backgroundColor: "#aaa" }} placement="bottom">
        {isPopperOpen
          ? ({ ref, style, placement, outOfBoundaries }) => (
              <PopperBox
                innerRef={ref}
                style={{ opacity: outOfBoundaries ? 0 : 1, ...style }}
                data-placement={placement}
              >
                {facebookButton}
                {linkedinButton}
                {twitterButton}
                {needLineBreak !== undefined && needLineBreak ? <br /> : ""}
                {whatappButton}
                {lineButton}
                {copyClipboardButton}
              </PopperBox>
            )
          : () => null}
      </Popper>
    </Manager>
    // </div>
  );
};

export default withNamespaces("translation")(ShareButton);
