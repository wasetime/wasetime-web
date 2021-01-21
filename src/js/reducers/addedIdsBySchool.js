import { ADD_COURSE, REMOVE_COURSE, SAVE_TIMETABLE } from "../actions/types";
import { SYLLABUS_KEYS } from "../config/syllabusKeys";

const addedIdsBySchool = (state = {}, action) => {
  switch (action.type) {
    case ADD_COURSE:
      const school = action.payload.course[SYLLABUS_KEYS.SCHOOL];
      const newIds = state[school]
        ? [...state[school].ids, action.payload.id]
        : [action.payload.id];
      return {
        ...state,
        [school]: {
          ids: newIds,
          exp: action.payload.schoolExp,
        },
      };
    case REMOVE_COURSE:
      let schoolToRemoveFrom = "";
      for (const school in state) {
        if (state[school].ids.indexOf(action.payload.id) > -1) {
          schoolToRemoveFrom = school;
          break;
        }
      }
      return {
        ...state,
        [schoolToRemoveFrom]: {
          ids: state[schoolToRemoveFrom].ids.filter(
            (id) => id !== action.payload.id
          ),
          exp: state[schoolToRemoveFrom].exp,
        },
      };
    case SAVE_TIMETABLE:
      return {
        ...state,
        ...action.payload.idsBySchool,
      };
    default:
      return state;
  }
};

export default addedIdsBySchool;
