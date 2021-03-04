import { SyllabusKey } from "@bit/wasedatime.syllabus.ts.constants.syllabus-data";

export interface Course {
  [SyllabusKey.ID]: string;
  [SyllabusKey.TITLE]: string;
  [SyllabusKey.TITLE_JP]: string;
  [SyllabusKey.INSTRUCTOR]: string;
  [SyllabusKey.INSTRUCTOR_JP]: string;
  [SyllabusKey.LANG]: number[];
  [SyllabusKey.TYPE]: number;
  [SyllabusKey.TERM]: string;
  [SyllabusKey.OCCURRENCES]: {
    [SyllabusKey.OCC_DAY]: number;
    [SyllabusKey.OCC_PERIOD]: number;
    [SyllabusKey.OCC_LOCATION]: string;
  }[];
  [SyllabusKey.MIN_YEAR]: number;
  [SyllabusKey.CATEGORY]: string;
  [SyllabusKey.CREDIT]: number;
  [SyllabusKey.LEVEL]: number;
  [SyllabusKey.EVAL]: {
    [SyllabusKey.EVAL_TYPE]: number;
    [SyllabusKey.EVAL_PERCENT]: number;
    [SyllabusKey.EVAL_CRITERIA]: string;
  }[];
  [SyllabusKey.CODE]: string;
  [SyllabusKey.SUBTITLE]: string;
  [SyllabusKey.SCHOOL]: string;
  displayLang?: string;
}

export interface CourseWithOcc extends Course {
  occurrence: {
    [SyllabusKey.OCC_DAY]: number;
    [SyllabusKey.OCC_PERIOD]: number;
    [SyllabusKey.OCC_LOCATION]: string;
  };
}

export default Course;
