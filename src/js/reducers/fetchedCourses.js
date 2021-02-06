import { combineReducers } from "redux";

import {
  FETCH_COURSES_REQUEST,
  FETCH_COURSES_SUCCESS,
  FETCH_COURSES_FAILURE,
  ADD_SCHOOL_FETCH_COURSES_REQUEST,
  ADD_SCHOOL_FETCH_COURSES_SUCCESS,
  ADD_SCHOOL_FETCH_COURSES_FAILURE,
  REMOVE_SCHOOL,
} from "../actions/types";
import fetchedList, * as fromList from "./fetchedList";
import fetchedById from "./fetchedById";
import fetchedSchools from "./fetchedSchools";
import fetchedExpBySchool from "./fetchedExpBySchool";
import { SYLLABUS_KEYS } from "../config/syllabusKeys";

const actionTypes = {
  fetchRequest: FETCH_COURSES_REQUEST,
  fetchSuccess: FETCH_COURSES_SUCCESS,
  fetchFailure: FETCH_COURSES_FAILURE,
  addSchoolFetchRequest: ADD_SCHOOL_FETCH_COURSES_REQUEST,
  addSchoolFetchSuccess: ADD_SCHOOL_FETCH_COURSES_SUCCESS,
  addSchoolFetchFailure: ADD_SCHOOL_FETCH_COURSES_FAILURE,
  removeSchool: REMOVE_SCHOOL,
};

const fetchedCourses = combineReducers({
  list: fetchedList(actionTypes),
  byId: fetchedById("courses", actionTypes),
  schools: fetchedSchools(actionTypes),
  expBySchool: fetchedExpBySchool(actionTypes),
});

export default fetchedCourses;

export const getFetchedIds = (state) => fromList.getIds(state.list);

export const getFetchedById = (state) => {
  var courses = {};
  const coursesBySchool = JSON.parse(JSON.stringify(state.byId));
  Object.keys(coursesBySchool).forEach((school) => {
    var coursesById = coursesBySchool[school];
    if (coursesById) {
      Object.keys(coursesById).forEach((id) => {
        coursesById[id][SYLLABUS_KEYS.SCHOOL] = school;
      });

      courses = {
        ...courses,
        ...coursesById,
      };
    }
  });
  return courses;
};

export const getIsFetching = (state) => {
  return fromList.getIsFetching(state.list);
};

export const getError = (state) => {
  return fromList.getError(state.list);
};
