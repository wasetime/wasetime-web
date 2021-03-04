import {
  FETCH_COURSES_REQUEST,
  FETCH_COURSES_SUCCESS,
  FETCH_COURSES_FAILURE,
  SAVE_TIMETABLE,
} from "../../actions/types";

interface ActionProps {
  type: string;
}

const isFetching = (state = false, action: ActionProps): boolean => {
  switch (action.type) {
    case FETCH_COURSES_REQUEST:
      return true;
    case FETCH_COURSES_SUCCESS:
    case FETCH_COURSES_FAILURE:
      return false;
    case SAVE_TIMETABLE:
      return false;
    default:
      return state;
  }
};

export default isFetching;
