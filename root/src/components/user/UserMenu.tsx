import React, { useState } from "react";
import { WithTranslation, withTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import styled, { keyframes } from "styled-components";
import { media } from "@bit/wasedatime.core.ts.utils.responsive-utils";
import { getUserAttr, signOut } from "../../utils/user";

export const expandLink = () =>
  keyframes`
    from { opacity: 0; }
    to { opacity: 1; }
  `;

const UserMenuTrigger = styled("div")`
  color: #fff;
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.5vh 0.5rem 1rem 1.2rem;
  ${media.tablet`padding: 0.5rem;`}

  i {
    margin: 0 !important;
    font-size: 2em !important;
    width: 40px;
    min-width: 40px;
  }

  img.ui.circular.image {
    width: 40px;
    min-width: 40px;
    ${media.phone`width: 35px; min-width: 35px;`}
  }

  &:hover {
    cursor: pointer;
  }
`;

const StyledSpan = styled("span")`
  animation-name: ${expandLink};
  animation-duration: 0.3s;
  text-align: left;
  font-weight: 100;
  margin-left: 1rem;
  color: #fff;
  opacity: ${(props) => (props.ishovered ? "1" : "0")};
  width: ${(props) => (props.ishovered ? "145px" : "0px")};
  white-space: nowrap;
  overflow-x: hidden;
  transition: ${(props) =>
    props.ishovered
      ? "width 0.5s ease, opacity 0.5s ease 0.1s"
      : "width 0.5s, opacity 0.2s"};
`;

interface Props extends WithTranslation {
  openSignInModal: () => void;
  isHovered: boolean;
  isMobileMode: boolean;
}

const UserMenu = ({ openSignInModal, isHovered, isMobileMode, t }: Props) => {
  const [userAttr, setUserAttr] = useState(null);
  const notSignedIn = !userAttr;
  if (notSignedIn) getUserAttr().then((attr) => setUserAttr(attr));

  return notSignedIn ? (
    <React.Fragment>
      <UserMenuTrigger onClick={openSignInModal}>
        <FontAwesomeIcon
          icon={faUserCircle}
          size="2x"
          style={{ marginLeft: "4px" }}
        />
        {!isMobileMode && (
          <StyledSpan ishovered={isHovered}>{t("user.Sign in")}</StyledSpan>
        )}
      </UserMenuTrigger>
    </React.Fragment>
  ) : (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex w-full rounded-md shadow-sm p-4 bg-blank text-white focus:outline-none"
        id="options-menu"
        aria-haspopup="true"
        aria-expanded="true"
      >
        <img
          src={userAttr.picture}
          width="40"
          height="40"
          className="rounded-full"
          alt="Image of User account"
          style={{ marginLeft: "2px" }}
        />
        <StyledSpan className="pt-3" ishovered={isHovered}>
          {userAttr.name}
        </StyledSpan>
      </button>

      <div
        className={`transition-opacity ${
          isHovered
            ? "duration-500 delay-100 opacity-100"
            : "duration-300 opacity-0"
        } w-full origin-top-left absolute right-0 m-0 rounded-md shadow-lg text-white`}
      >
        <div
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <a
            href="#"
            className="block px-4 py-2 rounded text-white hover:text-gray-500 bg-gray-500 hover:bg-gray-300"
            role="menuitem"
            onClick={signOut}
          >
            {t("user.Sign Out")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default withTranslation("translation")(UserMenu);
