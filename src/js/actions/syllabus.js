import { normalize } from "normalizr";
import API from "@aws-amplify/api";

import {
  ADD_COURSE,
  CHANGE_COURSE_COLOR,
  CHANGE_COURSES_SORTING_OPTION,
  FETCH_COURSES_FAILURE,
  FETCH_COURSES_REQUEST,
  FETCH_COURSES_SUCCESS,
  HYDRATE_ADDED_COURSES,
  REMOVE_COURSE,
  TOGGLE_COURSE_VISIBILITY,
  ADD_SCHOOL_FETCH_COURSES_FAILURE,
  ADD_SCHOOL_FETCH_COURSES_REQUEST,
  ADD_SCHOOL_FETCH_COURSES_SUCCESS,
  REMOVE_SCHOOL,
  SAVE_TIMETABLE,
} from "./types";
import { SYLLABUS_KEYS } from "../config/syllabusKeys";
import * as schema from "../data/schema";
import { schoolCodeMap } from "../data/schoolCodeMap";

export const removeSchool = (school) => ({
  type: REMOVE_SCHOOL,
  payload: school,
});

export const fetchCoursesBySchool = (school) => async (dispatch, getState) => {
  dispatch({
    type: ADD_SCHOOL_FETCH_COURSES_REQUEST,
  });
  try {
    const res = await API.get("wasedatime-dev", `/syllabus/${school}`, {
      headers: {
        "Content-Type": "application/json",
      },
      response: true,
    });
    dispatch({
      type: ADD_SCHOOL_FETCH_COURSES_SUCCESS,
      payload: {
        courses: normalize(res.data, schema.coursesSchema),
        school: school,
        fetchedTime: new Date().toISOString(),
        exp: res.headers["expires"],
      },
    });
  } catch (error) {
    dispatch({
      type: ADD_SCHOOL_FETCH_COURSES_FAILURE,
      error: error.response || {
        status: 501,
        statusText: "Not Implemented",
      },
    });
  }
};

export const fetchCourses = () => async (dispatch, getState) => {
  dispatch({
    type: FETCH_COURSES_REQUEST,
  });

  const expBySchool = getState().fetchedCourses.expBySchool;
  var coursesBySchool = {};
  var updatedExpBySchool = {};

  try {
    Promise.all(
      getState().fetchedCourses.schools.map(async (school) => {
        if (
          !expBySchool[school] ||
          Date.parse(expBySchool[school]) <= Date.now()
        ) {
          const res = await API.get("wasedatime-dev", `/syllabus/${school}`, {
            headers: {
              "Content-Type": "application/json",
            },
            response: true,
          });
          coursesBySchool[school] = normalize(res.data, schema.coursesSchema);
          updatedExpBySchool[school] = res.headers["expires"];
        }
        return;
      })
    ).then(() => {
      // const normalizedCourses = normalize(courses, schema.coursesSchema);
      dispatch({
        type: FETCH_COURSES_SUCCESS,
        payload: {
          coursesBySchool,
          updatedExpBySchool,
          fetchedTime: new Date().toISOString(),
        },
      });
    });
  } catch (error) {
    dispatch({
      type: FETCH_COURSES_FAILURE,
      error: error.response || {
        status: 501,
        statusText: "Not Implemented",
      },
    });
  }
};

//ES6 syntax also allows omitting return statement
export const hydrateAddedCourses = (prefs, fetchedCoursesById) => ({
  type: HYDRATE_ADDED_COURSES,
  payload: {
    prefs,
    fetchedCoursesById,
  },
});

export const addCourse = (course, displayLang) => (dispatch, getState) => {
  try {
    if (getState().user.tokens) {
      const term = course[SYLLABUS_KEYS.TERM].match(/0|1|f/g)
        ? "spring"
        : "fall";
      API.patch("wasedatime-dev", "/timetable", {
        body: {
          data: {
            operation: "append",
            course: {
              id: course[SYLLABUS_KEYS.ID],
              color: getState().addedCourses[term].prefs.length % 8,
              displayLang: displayLang,
            },
          },
        },
        headers: {
          Authorization: getState().user.tokens
            ? getState().user.tokens.idToken
            : "",
        },
      });
    }
  } catch (e) {
    console.error(e);
  } finally {
    dispatch({
      type: ADD_COURSE,
      payload: {
        id: course[SYLLABUS_KEYS.ID],
        semester: course[SYLLABUS_KEYS.TERM],
        course: course,
        displayLang: displayLang,
        schoolExp: getState().fetchedCourses.expBySchool[
          course[SYLLABUS_KEYS.SCHOOL]
        ],
      },
    });
  }
};

export const removeCourse = (id) => (dispatch, getState) => {
  try {
    if (getState().user.tokens) {
      API.patch("wasedatime-dev", "/timetable", {
        body: {
          data: {
            operation: "remove",
            index: getState().addedCourses.ids.indexOf(id),
          },
        },
        headers: {
          Authorization: getState().user.tokens
            ? getState().user.tokens.idToken
            : "",
        },
      });
    }
  } catch (e) {
    console.error(e);
  } finally {
    dispatch({
      type: REMOVE_COURSE,
      payload: {
        id,
      },
    });
  }
};

export const saveTimetable = (idsAndPrefs, fetchedCoursesById) => async (
  dispatch,
  getState
) => {
  let coursesAndPrefsByTerm = {
    fall: [],
    spring: [],
  };
  let loadedSchools = [];
  let unloadedSchools = [];
  const expBySchool = getState().fetchedCourses.expBySchool;
  const courseIdsBySchool = getState().fetchedCourses.list.ids;

  idsAndPrefs.forEach((idAndPref) => {
    const school = schoolCodeMap[idAndPref.id.substring(0, 2)];
    if (!loadedSchools.includes(school) && !unloadedSchools.includes(school)) {
      const isSchoolNotLoaded =
        !courseIdsBySchool[school] || courseIdsBySchool[school].length === 0;
      const isSchoolExpired =
        expBySchool[school] && Date.parse(expBySchool[school]) <= Date.now();
      if (isSchoolNotLoaded || isSchoolExpired) unloadedSchools.push(school);
      else loadedSchools.push(school);
    }
  });

  Promise.all(
    unloadedSchools.map(async (school) => {
      await dispatch(fetchCoursesBySchool(school));
    })
  )
    .then(() => {
      let idsBySchool = {};
      const updatedFetchedCoursesById = getState().fetchedCourses.byId;
      const updatedExpBySchool = getState().fetchedCourses.expBySchool;

      idsAndPrefs.forEach((idAndPref) => {
        const school = schoolCodeMap[idAndPref.id.substring(0, 2)];
        const course = {
          ...updatedFetchedCoursesById[school][idAndPref.id],
          [SYLLABUS_KEYS.SCHOOL]: school,
        };

        // if course details retrieved successfully
        if (course) {
          // push school to addedCourses
          if (idsBySchool[school]) {
            idsBySchool[school].ids.push(idAndPref.id);
          } else {
            idsBySchool[school] = {
              ids: [idAndPref.id],
              exp: updatedExpBySchool[school],
            };
          }

          // push course details to addedCourses
          if (course[SYLLABUS_KEYS.TERM].match(/2|3|f/g)) {
            coursesAndPrefsByTerm.fall.push({
              ...idAndPref,
              course: course,
            });
          }
          if (course[SYLLABUS_KEYS.TERM].match(/0|1|f/g)) {
            coursesAndPrefsByTerm.spring.push({
              ...idAndPref,
              course: course,
            });
          }
        }
      });

      // save addedCourses
      dispatch({
        type: SAVE_TIMETABLE,
        payload: {
          coursesAndPrefsByTerm: coursesAndPrefsByTerm,
          ids: idsAndPrefs.map((ip) => ip.id),
          idsBySchool: idsBySchool,
        },
      });
    })
    .catch((e) => console.error(e));
};

export const changeCourseColor = (id, color) => ({
  type: CHANGE_COURSE_COLOR,
  payload: {
    id,
    color,
  },
});

export const toggleCourseVisibility = (id) => ({
  type: TOGGLE_COURSE_VISIBILITY,
  payload: {
    id,
  },
});

export const changeCoursesSortingOption = (sortingOption, semester) => ({
  type: CHANGE_COURSES_SORTING_OPTION,
  payload: {
    sortingOption,
    semester,
  },
});
