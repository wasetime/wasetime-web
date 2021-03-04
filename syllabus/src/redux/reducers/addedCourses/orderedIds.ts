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

const initialState = [];

const orderedIds = (state = initialState, action: ActionProps): string[] => {
  switch (action.type) {
    case ADD_COURSE:
      return [...state, action.payload.course[SyllabusKey.ID]];
    case REMOVE_COURSE:
      let newIds = [...state];
      const index = newIds.indexOf(action.payload.id);
      if (index > -1) {
        newIds.splice(index, 1);
      }
      return newIds;
    case SAVE_TIMETABLE:
      return action.payload.coursesAndPrefs.map(
        (cp) => cp.course[SyllabusKey.ID]
      );
    default:
      return state;
  }
};

export default orderedIds;
