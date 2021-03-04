import { combineReducers } from "redux";
// import fetchedList, * as fromList from "./fetchedList";
import coursesBySchool from "./coursesBySchool";
import schools from "./schools";
import isFetching from "./isFetching";
import { SyllabusKey } from "@bit/wasedatime.syllabus.ts.constants.syllabus-data";
import schoolCodeMap from "@bit/wasedatime.syllabus.ts.constants.school-code";
import Course from "../../../types/course";

const fetchedCourses = combineReducers({
  coursesBySchool,
  schools,
  isFetching,
});

interface coursesBySchoolTypes {
  [school: string]: Course[];
}

export default fetchedCourses;

export const getFetchedCoursesList = (
  coursesBySchool: coursesBySchoolTypes
) => {
  let courses = [];
  for (const school in coursesBySchool) {
    courses = courses.concat(
      coursesBySchool[school].map((c) => ({
        ...c,
        [SyllabusKey.SCHOOL]: school,
      }))
    );
  }
  return courses;
};
