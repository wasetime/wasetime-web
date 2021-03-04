import { SyllabusKey } from "@bit/wasedatime.syllabus.ts.constants.syllabus-data";
import {
  ADD_COURSE,
  REMOVE_COURSE,
  SAVE_TIMETABLE,
  TOGGLE_COURSE_VISIBILITY,
  CHANGE_COURSE_COLOR,
} from "../../actions/types";
import Course from "../../../types/course";

interface courseAndPrefTypes {
  id: string;
  color: number;
  displayLang: string;
  course: Course;
}

interface PayloadProps {
  course?: Course;
  coursesAndPrefs?: courseAndPrefTypes[];
  displayLang?: string;
  id?: string;
  color?: number;
}

interface ActionProps {
  type: string;
  payload: PayloadProps;
}

interface byIdProps {
  [id: string]: {
    pref: {
      color: number;
      visibility: boolean;
      displayLang: string;
    };
    course: Course;
  };
}

const initialState: byIdProps = {};

const byId = (state = initialState, action: ActionProps): byIdProps => {
  const courseId = action.payload ? action.payload.id : "";
  switch (action.type) {
    case ADD_COURSE:
      const id: string = action.payload.course[SyllabusKey.ID];
      return {
        ...state,
        [id]: {
          pref: {
            color: Object.keys(state).length % 8,
            visibility: true,
            displayLang: action.payload.displayLang,
          },
          course: action.payload.course,
        },
      };
    case REMOVE_COURSE:
      let restCourses = { ...state };
      delete restCourses[action.payload.id];
      return restCourses;
    case TOGGLE_COURSE_VISIBILITY:
      return {
        ...state,
        [courseId]: {
          ...state[courseId],
          pref: {
            ...state[courseId].pref,
            visibility: !state[courseId].pref.visibility,
          },
        },
      };
    case CHANGE_COURSE_COLOR:
      return {
        ...state,
        [courseId]: {
          ...state[courseId],
          pref: {
            ...state[courseId].pref,
            color: action.payload.color,
          },
        },
      };
    case SAVE_TIMETABLE:
      let newCoursesAndPrefs = {};
      action.payload.coursesAndPrefs.forEach((cp) => {
        newCoursesAndPrefs[cp.id] = {
          pref: {
            color: cp.color,
            visibility: true,
            displayLang: cp.displayLang,
          },
          course: cp.course,
        };
      });
      return newCoursesAndPrefs;
    default:
      return state;
  }
};

export default byId;
