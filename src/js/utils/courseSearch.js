import sortBy from "lodash/sortBy";

import LANGS from "../config/langs";
import { SYLLABUS_KEYS } from "../config/syllabusKeys";
import UnsupportedLanguageError from "../errors/UnsupportedLanguageError";

// Unicode for Japanese: http://www.rikai.com/library/kanjitables/kanji_codes.unicode.shtml
export const jpRegex = "\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf";

export const tokenize = (string) => {
  // TODO benchmark contructor (new RegExp) vs factory (RegExp)
  const regex = new RegExp(`[^A-Za-z0-9${jpRegex}]+`);
  return string.trim().split(regex);
};

export const getSearchLang = (searchTerm) => {
  return new RegExp(`[${jpRegex}]`).test(searchTerm) ? LANGS.JP : LANGS.EN;
};

export const regexify = (token, searchLang) => {
  switch (searchLang) {
    case LANGS.JP:
      return new RegExp(token, "i");
    case LANGS.EN:
      return new RegExp(`\\b${token}`, "i");
    default:
      throw new UnsupportedLanguageError(searchLang);
  }
};

export const getCourseTitleAndInstructor = (course, searchLang) => {
  switch (searchLang) {
    case LANGS.JP:
      return {
        title: course[SYLLABUS_KEYS.TITLE_JP],
        instructor: course[SYLLABUS_KEYS.INSTRUCTOR_JP],
      };
    case LANGS.EN:
      return {
        title: course[SYLLABUS_KEYS.TITLE],
        instructor: course[SYLLABUS_KEYS.INSTRUCTOR],
      };
    default:
      throw new UnsupportedLanguageError(searchLang);
  }
};

export const searchCourses = (searchTerm, courses, searchLang) => {
  const searchRegexes = tokenize(searchTerm).map((token) =>
    regexify(token, searchLang)
  );

  return courses.filter((course) => {
    const { title, instructor } = getCourseTitleAndInstructor(
      course,
      searchLang
    );
    return searchRegexes.every((regex) => {
      return regex.test(title) || regex.test(instructor);
    });
  });
};

export const sortCourses = (searchTerm, courses, searchLang) => {
  const searchRegexes = tokenize(searchTerm).map((token) =>
    regexify(token, searchLang)
  );

  return sortBy(courses, (course) => {
    const { title, instructor } = getCourseTitleAndInstructor(
      course,
      searchLang
    );
    let sum = 0;
    for (let i = 0; i < searchRegexes.length; i++) {
      if (searchRegexes[i].test(title)) {
        sum += 1;
      } else if (searchRegexes[i].test(instructor)) {
        sum += 2;
      } else {
        sum += 3;
      }
      return sum;
    }
  });
};
