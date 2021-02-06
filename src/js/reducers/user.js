import { combineReducers } from "redux";

import {
  SET_FIRST_TIME_ACCESS_TO_FALSE,
  IS_AUTHENTICATED,
  NOT_AUTHENTICATED,
} from "../actions/types";

const isFirstTimeAccess = (state = true, action) => {
  switch (action.type) {
    case SET_FIRST_TIME_ACCESS_TO_FALSE:
      return action.payload.isFirstTimeAccess;
    default:
      return state;
  }
};

const info = (state = null, action) => {
  switch (action.type) {
    case IS_AUTHENTICATED:
      return {
        username: action.payload.idToken.payload.preferred_username,
        picture: action.payload.idToken.payload.picture,
        updatedAt: Date.now(),
      };
    case NOT_AUTHENTICATED:
      return null;
    default:
      return state;
  }
};

const tokens = (state = null, action) => {
  switch (action.type) {
    case IS_AUTHENTICATED:
      return {
        sub: action.payload.idToken.payload.sub,
        accessToken: action.payload.accessToken.jwtToken,
        idToken: action.payload.idToken.jwtToken,
        refreshToken: action.payload.refreshToken.token,
        exp: action.payload.idToken.payload.exp,
      };
    case NOT_AUTHENTICATED:
      return null;
    default:
      return state;
  }
};

const user = combineReducers({
  isFirstTimeAccess,
  info,
  tokens,
});

export default user;

export const getUserIsFirstTimeAccess = (state) => {
  return state.user.isFirstTimeAccess;
};

export const getUserInfo = (state) => {
  return state.user.info;
};

export const getUserTokens = (state) => {
  return state.user.tokens;
};
