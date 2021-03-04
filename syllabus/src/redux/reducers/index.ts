import { combineReducers } from "redux";
import fetchedCourses from "./fetchedCourses";
import addedCourses from "./addedCourses";

export const root = combineReducers({
  addedCourses,
  fetchedCourses,
});

export type ReduxRootState = ReturnType<typeof root>;
export default root;
