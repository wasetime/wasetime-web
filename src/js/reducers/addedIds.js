import { ADD_COURSE, REMOVE_COURSE, SAVE_TIMETABLE } from "../actions/types";

const addedIds = (state = [], action) => {
  switch (action.type) {
    case ADD_COURSE:
      return [...state, action.payload.id];
    case REMOVE_COURSE:
      return state.filter((id) => id !== action.payload.id);
    case SAVE_TIMETABLE:
      return action.payload.ids;
    default:
      return state;
  }
};

export default addedIds;
