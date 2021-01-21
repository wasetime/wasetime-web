import {
  HYDRATE_ADDED_COURSES,
  ADD_COURSE,
  REMOVE_COURSE,
  SAVE_TIMETABLE,
  CHANGE_COURSE_COLOR,
  TOGGLE_COURSE_VISIBILITY,
} from "../actions/types";

const addedCoursePrefs = (state = [], action) => {
  switch (action.type) {
    case HYDRATE_ADDED_COURSES:
      //Remove coursePref whose id doesn't match to any courses
      //due to course key udpates in waseda official syllabus
      return state.filter((coursePref) => {
        return action.payload.fetchedCoursesById[coursePref.id] !== undefined;
      });
    case ADD_COURSE:
      return [
        ...state,
        {
          id: action.payload.id,
          color: state.length % 8,
          visibility: true,
          displayLang: action.payload.displayLang,
        },
      ];
    case REMOVE_COURSE:
      return state.filter((coursePref) => coursePref.id !== action.payload.id);
    case SAVE_TIMETABLE:
      // action.payload.coursesAndPrefs: [
      //   { id: STR, color: INT, displayLang: STR, courses: [{...}] },
      //   ...
      // ]
      return action.payload.coursesAndPrefs.map((courseAndPref) => ({
        id: courseAndPref.id,
        color: courseAndPref.color,
        displayLang: courseAndPref.displayLang,
        visibility: true,
      }));
    case CHANGE_COURSE_COLOR:
      return state.map((coursePref) =>
        coursePref.id === action.payload.id
          ? { ...coursePref, color: action.payload.color }
          : coursePref
      );
    case TOGGLE_COURSE_VISIBILITY:
      return state.map((coursePref) =>
        coursePref.id === action.payload.id
          ? { ...coursePref, visibility: !coursePref.visibility }
          : coursePref
      );
    default:
      return state;
  }
};

export default addedCoursePrefs;

export const getId = (property) => property.id;
