import { combineReducers } from "redux";

const fetchedList = (actionTypes) => {
  const ids = (state = {}, action) => {
    switch (action.type) {
      case actionTypes.fetchSuccess:
        var ids = { ...state };
        const coursesBySchool = action.payload["coursesBySchool"];

        Object.keys(coursesBySchool).forEach((school) => {
          if (coursesBySchool[school].result) {
            ids[school] = coursesBySchool[school].result;
          }
        });
        return ids;
      case actionTypes.addSchoolFetchSuccess:
        const courses = action.payload["courses"];
        const school = action.payload["school"];
        return {
          ...state,
          [school]: courses.result || [],
        };
      case actionTypes.removeSchool:
        delete state[action.payload];
        return state;
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    switch (action.type) {
      case actionTypes.fetchRequest:
        return true;
      case actionTypes.fetchSuccess:
      case actionTypes.fetchFailure:
        return false;
      case actionTypes.addSchoolFetchRequest:
        return true;
      case actionTypes.addSchoolFetchSuccess:
      case actionTypes.addSchoolFetchFailure:
        return false;
      default:
        return state;
    }
  };

  const fetchedTime = (state = null, action) => {
    switch (action.type) {
      case actionTypes.fetchSuccess:
        return action.payload.fetchedTime;
      case actionTypes.addSchoolFetchSuccess:
        return action.payload.fetchedTime;
      default:
        return state;
    }
  };

  const error = (state = null, action) => {
    switch (action.type) {
      case actionTypes.fetchFailure:
        return action.error;
      case actionTypes.fetchRequest:
      case actionTypes.fetchSuccess:
        return null;
      case actionTypes.addSchoolFetchFailure:
        return action.error;
      case actionTypes.addSchoolFetchRequest:
      case actionTypes.addSchoolFetchSuccess:
        return null;
      default:
        return state;
    }
  };
  return combineReducers({ ids, isFetching, fetchedTime, error });
};

export default fetchedList;

export const getIds = (state) => {
  var ids = [];
  const idsBySchool = state.ids;
  Object.keys(idsBySchool).forEach((school) => {
    ids = [...ids, ...idsBySchool[school]];
  });
  return ids;
};

export const getIsFetching = (state) => state.isFetching;
export const getError = (state) => state.error;
