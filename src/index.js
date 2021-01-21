import React from "react";
import { hydrate, render } from "react-dom";
import throttle from "lodash/throttle";
import * as Sentry from "@sentry/react";

import configureStore from "./configureStore";
import { saveState } from "./localForage";
import Root from "./js/components/Root";

import "normalize-css/normalize.css";
import "./styles/styles.css";
import "./js/components/i18n";

import Amplify, { Auth } from "aws-amplify";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const authRedirectPath =
  window.location.protocol + "//" + window.location.host + "/verify";
const authSignOutPath =
  window.location.protocol + "//" + window.location.host + "/";

const config = {
  API: {
    endpoints: [
      {
        name: "wasedatime-dev",
        endpoint: process.env.REACT_APP_API_BASE_URL,
      },
    ],
  },
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    // identityPoolId: "XX-XXXX-X:XXXXXXXX-XXXX-1234-abcd-1234567890ab",

    // REQUIRED - Amazon Cognito Region
    region: "ap-northeast-1",

    // OPTIONAL - Amazon Cognito Federated Identity Pool Region
    // Required only if it's different from Amazon Cognito Region
    // identityPoolRegion: "us-east-1",

    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: "ap-northeast-1_dKhj1aZQy",

    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: "4i0q5hl5u27mili6fnpvjap8fc",

    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: true,

    // OPTIONAL - Configuration for cookie storage
    // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
    // cookieStorage: {
    //   // REQUIRED - Cookie domain (only required if cookieStorage is provided)
    //   domain: ".yourdomain.com",
    //   // OPTIONAL - Cookie path
    //   path: "/",
    //   // OPTIONAL - Cookie expiration in days
    //   expires: 365,
    //   // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
    //   sameSite: "strict" | "lax",
    //   // OPTIONAL - Cookie secure flag
    //   // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
    //   secure: true,
    // },

    // // OPTIONAL - customized storage object
    // storage: localStorage,
    //
    // // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    // authenticationFlowType: "USER_PASSWORD_AUTH",
    //
    // // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
    // clientMetadata: { myCustomKey: "myCustomValue" },

    // OPTIONAL - Hosted UI configuration
    oauth: {
      domain: "auth.wasedatime.com",
      scope: ["email", "profile", "openid", "aws.cognito.signin.user.admin"],
      redirectSignIn: authRedirectPath,
      redirectSignOut: authSignOutPath,
      responseType: "code", // or 'token', note that REFRESH token will only be generated when the responseType is code
    },
  },
};

Amplify.configure(config);
Auth.configure(config);

// Auth.configure();

if (process.env.NODE_ENV !== "development") {
  Sentry.init({
    dsn:
      "https://6730c6ebd6784cee8330d59452a33d13@o498993.ingest.sentry.io/5577049",
    environment: process.env.NODE_ENV,
  });
}

configureStore().then((store) => {
  store.subscribe(
    throttle(() => {
      const state = store.getState();
      saveState(state);
    }, 800)
  );

  const rootElement = document.getElementById("root");
  if (rootElement.hasChildNodes()) {
    hydrate(<Root store={store} />, rootElement);
  } else {
    render(<Root store={store} />, rootElement);
  }
});

serviceWorkerRegistration.register();
