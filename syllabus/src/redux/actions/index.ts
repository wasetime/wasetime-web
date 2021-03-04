import API from "@aws-amplify/api";
import { getIdToken } from "@bit/wasedatime.core.ts.utils.user";

import {
  ADD_COURSE,
  CHANGE_COURSE_COLOR,
  CHANGE_COURSES_SORTING_OPTION,
  FETCH_COURSES_FAILURE,
  FETCH_COURSES_REQUEST,
  FETCH_COURSES_SUCCESS,
  REMOVE_COURSE,
  TOGGLE_COURSE_VISIBILITY,
  ADD_SCHOOL_FETCH_COURSES_FAILURE,
  ADD_SCHOOL_FETCH_COURSES_REQUEST,
  ADD_SCHOOL_FETCH_COURSES_SUCCESS,
  REMOVE_SCHOOL,
  SAVE_TIMETABLE,
} from "./types";
import { SyllabusKey } from "@bit/wasedatime.syllabus.ts.constants.syllabus-data";
import { schoolCodeMap } from "@bit/wasedatime.syllabus.ts.constants.school-code";
import Course from "../../types/course";

export const removeSchool = (school: string) => ({
  type: REMOVE_SCHOOL,
  payload: {
    school: school,
  },
});

export const fetchCoursesBySchool = (school: string) => async (
  dispatch: (x: any) => void,
  getState: any
) => {
  const bySchool = getState().fetchedCourses.schools;
  const schoolKeys = Object.keys(bySchool).filter(
    (school) => bySchool[school].active
  );
  if (schoolKeys.length >= 10) {
    dispatch(
      removeSchool(
        schoolKeys.sort(
          (a, b) => bySchool[a].timestamp - bySchool[b].timestamp
        )[0]
      )
    );
  }
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
        courses: res.data,
        school: school,
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

export const fetchCourses = () => async (
  dispatch: (x: any) => void,
  getState: any
) => {
  const schools = getState().fetchedCourses.schools;
  var coursesBySchool = {};
  var updatedSchools = {};
  const schoolKeys = Object.keys(schools).filter((schoolKey) => {
    const exp = schools[schoolKey].exp;
    return !exp || Date.parse(exp) <= Date.now();
  });

  if (schoolKeys.length === 0) return;

  dispatch({
    type: FETCH_COURSES_REQUEST,
  });

  try {
    Promise.all(
      schoolKeys.map(async (schoolKey) => {
        const school = schools[schoolKey];
        const res = await API.get(
          "wasedatime-dev",
          `/syllabus/${school.name}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            response: true,
          }
        );
        coursesBySchool[school.name] = res.data;
        updatedSchools[school.name] = {
          name: school.name,
          exp: res.headers["expires"],
          ids: res.data.map((c) => c[SyllabusKey.ID]),
          active: true,
        };
        return;
      })
    ).then(() => {
      dispatch({
        type: FETCH_COURSES_SUCCESS,
        payload: {
          coursesBySchool: {
            ...getState().fetchedCourses.coursesBySchool,
            ...coursesBySchool,
          },
          updatedSchools: { ...schools, ...updatedSchools },
        },
      });
    });
  } catch (error) {
    dispatch({
      type: FETCH_COURSES_FAILURE,
      error: error.message || {
        status: 501,
        statusText: "Not Implemented",
      },
    });
  }
};

export const addCourse = (course: Course, displayLang: string) => async (
  dispatch: (x: any) => void,
  getState: any
) => {
  try {
    const idToken = await getIdToken();
    if (idToken) {
      API.patch("wasedatime-dev", "/timetable", {
        body: {
          data: {
            operation: "append",
            course: {
              id: course[SyllabusKey.ID],
              color: getState().addedCourses.orderedIds.length % 8,
              displayLang: displayLang,
            },
          },
        },
        headers: {
          Authorization: idToken,
        },
      });
    }
  } catch (e) {
    console.error(e);
  } finally {
    dispatch({
      type: ADD_COURSE,
      payload: {
        course: course,
        displayLang: displayLang,
      },
    });
  }
};

export const removeCourse = (id: string) => async (
  dispatch: (x: any) => void,
  getState: any
) => {
  try {
    const idToken = await getIdToken();
    if (idToken) {
      API.patch("wasedatime-dev", "/timetable", {
        body: {
          data: {
            operation: "remove",
            index: getState().addedCourses.orderedIds.indexOf(id),
          },
        },
        headers: {
          Authorization: idToken,
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

export const saveTimetable = (idsAndPrefs) => async (dispatch, getState) => {
  let unloadSchools = [];
  const schools = getState().fetchedCourses.schools;
  idsAndPrefs.forEach((ip) => {
    const school = schoolCodeMap[ip.id.substring(0, 2)];
    if (
      (!schools[school] || !schools[school].active) &&
      !unloadSchools.includes(school)
    )
      unloadSchools.push(school);
  });

  dispatch({
    type: FETCH_COURSES_REQUEST,
  });

  Promise.all(
    unloadSchools.map(async (school) => {
      await dispatch(fetchCoursesBySchool(school));
    })
  ).then(() => {
    const coursesBySchool = getState().fetchedCourses.coursesBySchool;
    let coursesAndPrefs = [];
    idsAndPrefs.forEach((ip) => {
      const school = schoolCodeMap[ip.id.substring(0, 2)];
      const course = coursesBySchool[school].find(
        (c) => c[SyllabusKey.ID] === ip.id
      );
      if (course) {
        coursesAndPrefs.push({
          id: ip.id,
          color: ip.color,
          displayLang: ip.displayLang === "jp" ? "ja" : ip.displayLang,
          course: {
            ...course,
            [SyllabusKey.SCHOOL]: school,
          },
        });
      }
    });
    dispatch({
      type: SAVE_TIMETABLE,
      payload: {
        coursesAndPrefs: coursesAndPrefs,
      },
    });
  });
};

export const changeCourseColor = (id, color) => ({
  type: CHANGE_COURSE_COLOR,
  payload: {
    id,
    color,
  },
});

export const toggleCourseVisibility = (id: string) => ({
  type: TOGGLE_COURSE_VISIBILITY,
  payload: {
    id,
  },
});

export const changeSortingOption = (sortingOption: string) => ({
  type: CHANGE_COURSES_SORTING_OPTION,
  payload: {
    sortingOption,
  },
});
