import {
  HYDRATE_ADDED_COURSES,
  ADD_COURSE,
  REMOVE_COURSE,
  SAVE_TIMETABLE,
} from "../actions/types";

const addedById = (state = {}, action) => {
  switch (action.type) {
    case HYDRATE_ADDED_COURSES:
      // Provide an init value of {} to the reduce function
      return action.payload.prefs.reduce((acc, pref) => {
        const fetchedCourse = action.payload.fetchedCoursesById[pref.id];
        //If pref id does not match a course among fetchedCourses, don't include it.
        //This can be caused by course key updates in the waseda offical syllabus.
        return fetchedCourse === undefined
          ? acc
          : {
              ...acc,
              [pref.id]: {
                ...action.payload.fetchedCoursesById[pref.id],
              },
            };
      }, {});
    case ADD_COURSE:
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload.course,
        },
      };
    case REMOVE_COURSE:
      const { [action.payload.id]: value, ...rest } = state;
      return rest;
    case SAVE_TIMETABLE:
      // action.payload.coursesAndPrefs: [
      //   { id: STR, color: INT, displayLang: STR, courses: [{...}] },
      //   ...
      // ]
      let coursesById = {};
      action.payload.coursesAndPrefs.forEach((courseAndPref) => {
        coursesById[courseAndPref.id] = courseAndPref.course;
      });
      return coursesById;
    default:
      return state;
  }
};

export default addedById;

export const getItem = (state, id) => state[id];
