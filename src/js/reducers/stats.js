import { combineReducers } from "redux";

import {
  FETCH_STATS_REQUEST,
  FETCH_STATS_SUCCESS,
  FETCH_STATS_FAILURE,
} from "../actions/types";

//TODO Think about a way of abstracting list and stats into one reusable reducer.
//TODO Perhaps combine is Fetching, error into one reducer called status?

const info = (state = {}, action) => {
  switch (action.type) {
    case FETCH_STATS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

const isFetching = (state = false, action) => {
  switch (action.type) {
    case FETCH_STATS_REQUEST:
      return true;
    case FETCH_STATS_SUCCESS:
    case FETCH_STATS_FAILURE:
      return false;
    default:
      return state;
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case FETCH_STATS_FAILURE:
      return action.error;
    case FETCH_STATS_REQUEST:
    case FETCH_STATS_SUCCESS:
      return null;
    default:
      return state;
  }
};

const stats = combineReducers({ info, isFetching, error });

export default stats;

export const getInfo = (state) => state.info;
export const getIsFetching = (state) => state.isFetching;
export const getError = (state) => state.error;
