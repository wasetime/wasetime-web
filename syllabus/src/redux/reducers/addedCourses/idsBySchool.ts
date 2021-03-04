import { SyllabusKey } from "@bit/wasedatime.syllabus.ts.constants.syllabus-data";
import { ADD_COURSE, REMOVE_COURSE, SAVE_TIMETABLE } from "../../actions/types";
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
  id?: string;
}

interface ActionProps {
  type: string;
  payload: PayloadProps;
}

interface SchoolsProps {
  [id: string]: {
    ids: string[];
  };
}

const initialState: SchoolsProps = {};

const schools = (state = initialState, action: ActionProps): SchoolsProps => {
  let school;
  switch (action.type) {
    case ADD_COURSE:
      school = action.payload.course[SyllabusKey.SCHOOL];
      const id = action.payload.course[SyllabusKey.ID];
      const newIds = state[school] ? [...state[school].ids, id] : [id];
      return {
        ...state,
        [school]: {
          ids: newIds,
        },
      };
    case REMOVE_COURSE:
      for (const school in state) {
        if (state[school].ids.includes(id)) {
          return {
            ...state,
            [school]: {
              ids: state[school].ids.filter((id) => id !== action.payload.id),
            },
          };
        }
      }
      return state;
    case SAVE_TIMETABLE:
      let newCoursesAndPrefs = {};
      action.payload.coursesAndPrefs.forEach((cp) => {
        const school = cp.course[SyllabusKey.SCHOOL];
        const id = cp.course[SyllabusKey.ID];
        newCoursesAndPrefs[school] = {
          ids: newCoursesAndPrefs[school]
            ? [...newCoursesAndPrefs[school].ids, id]
            : [id],
        };
      });
      return newCoursesAndPrefs;
    default:
      return state;
  }
};

export default schools;
