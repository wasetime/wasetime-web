import React, { useState } from "react";
import { Link } from "@reach/router";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { media } from "@bit/wasedatime.core.ts.utils.responsive-utils";
import { getUserAttr, signOut } from "@bit/wasedatime.core.ts.utils.user";

type Props = {
  navItems: any;
  openSignInModal: () => void;
};

const MobileNav = ({ navItems, openSignInModal }: Props) => {
  const [userAttr, setUserAttr] = useState(null);
  const [signOutAvailable, setSignOutAvailable] = useState(false);
  const notSignedIn = !userAttr;
  if (notSignedIn) getUserAttr().then((attr) => setUserAttr(attr));

  const styledLinks = navItems.map((item) => {
    const itemName = item["name"];
    const itemPath = item["path"];
    const itemIcon = item["icon"];
    const fontBase = (
      <FontAwesomeIcon
          icon={itemIcon}
          className="text-white"
          size="2x"
          transform="shrink-2"
        />
    );
    return (
      <Link
        to={itemPath}
        key={itemPath}
        className="flex-1 text-center"
      >
        <button className="focus:outline-none">
          {fontBase}
          <br />
          <span className="text-white">{itemName}</span>
        </button>
      </Link>
    );
  });

  return (
    <nav
      className="fixed bottom-0 flex flex-row p-1 bg-black w-full"
      style={{ height: "50px", zIndex: 1000 }}
    >
      {styledLinks}
      
      <div className="flex-1 text-center">
        <button
          className="w-full focus:outline-none"
          onClick={() => userAttr ? setSignOutAvailable(true) : openSignInModal()}
          onMouseLeave={() => setSignOutAvailable(false)}
        >
          {
            userAttr ? (
              <img
                src={userAttr.picture}
                width="35"
                height="35"
                className="rounded-full"
                alt="Image of User account"
                style={{ margin: "5px auto" }}
              />           
            ) : (
              <FontAwesomeIcon
                icon={faUserCircle}
                className="text-white"
                size="2x"
                transform="shrink-2"
              />
            )
          }

          <br />
          
          {
            !userAttr && <span className="text-white">Sign in</span>
          }
          
          {signOutAvailable && (
            <button
              className="absolute right-0 mb-4 bg-gray-700 rounded text-white p-2 w-1/4 focus:outline-none"
              onClick={signOut}
              style={{ top: "-2em" }}
            >
              Sign Out
            </button>
          )}
        </button>
      </div>
    </nav>
  );
};

export default MobileNav;
