import {
  SET_FIRST_TIME_ACCESS_TO_FALSE,
  IS_AUTHENTICATED,
  NOT_AUTHENTICATED,
} from "./types";

export const setFirstTimeAccessToFalse = () => ({
  type: SET_FIRST_TIME_ACCESS_TO_FALSE,
  payload: {
    isFirstTimeAccess: false,
  },
});

export const setUserInfo = (user) => {
  return {
    type: IS_AUTHENTICATED,
    payload: {
      ...user.signInUserSession,
    },
  };
};

export const updateUserSession = (session) => ({
  type: IS_AUTHENTICATED,
  payload: session,
});

export const clearUserInfo = () => ({
  type: NOT_AUTHENTICATED,
});
