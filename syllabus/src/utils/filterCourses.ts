import { SyllabusKey } from "@bit/wasedatime.syllabus.ts.constants.syllabus-data";
import Course from "../types/course";
import FilterGroups from "../types/filter";

class CoursesFilter {
  maxLength: number;
  filterValues: any[];
  constructor(filterValues) {
    this.maxLength = 100;
    this.filterValues = filterValues;
  }
  filterCallback = (course: Course) => {
    return true;
  };
  filterCourses = (courses: Course[]) => {
    return this.filterValues.length < this.maxLength
      ? courses.filter(this.filterCallback)
      : courses;
  };
}

class SemesterFilter extends CoursesFilter {
  filterCallback = (course: Course) => {
    return this.filterValues.some((filter) =>
      course[SyllabusKey.TERM].includes(filter)
    );
  };
}

class SchoolFilter extends CoursesFilter {
  filterCallback = (course: Course) => {
    return this.filterValues.includes(course[SyllabusKey.SCHOOL]);
  };
}

class LangFilter extends CoursesFilter {
  constructor(filterValues) {
    super(filterValues);
    this.maxLength = 10;
  }
  filterCallback = (course: Course) => {
    return (
      course[SyllabusKey.LANG]
        .toString()
        .split(",")
        .filter((l) => this.filterValues.includes(l)).length > 0
    );
  };
}

class DayFilter extends CoursesFilter {
  constructor(filterValues) {
    super(filterValues);
    this.maxLength = 6;
  }
  filterCallback = (course: Course) => {
    return course[SyllabusKey.OCCURRENCES].some((occ) =>
      this.filterValues.includes(occ[SyllabusKey.OCC_DAY].toString())
    );
  };
}

class PeriodFilter extends CoursesFilter {
  constructor(filterValues) {
    super(filterValues);
    this.maxLength = 7;
  }
  filterCallback = (course: Course) => {
    const occurrences = course[SyllabusKey.OCCURRENCES];
    for (const filter of this.filterValues) {
      const period = parseInt(filter, 10);
      for (const occ of occurrences) {
        const op = occ[SyllabusKey.OCC_PERIOD];
        const start = (op / 10) | 0;
        const end = op % 10;
        if (op > 9 && start <= period && period <= end) return true;
        if (op <= 9 && op === period) return true;
      }
    }
    return false;
  };
}
class MinYearFilter extends CoursesFilter {
  constructor(filterValues) {
    super(filterValues);
    this.maxLength = 4;
  }
  filterCallback = (course: Course) => {
    return this.filterValues.includes(course[SyllabusKey.MIN_YEAR].toString());
  };
}
class CreditFilter extends CoursesFilter {
  constructor(filterValues) {
    super(filterValues);
    this.maxLength = 3;
  }
  filterCallback = (course: Course) => {
    return course[SyllabusKey.CREDIT] >= 3
      ? this.filterValues.includes("3")
      : this.filterValues.includes(course[SyllabusKey.CREDIT].toString());
  };
}
class TypeFilter extends CoursesFilter {
  constructor(filterValues) {
    super(filterValues);
    this.maxLength = 9;
  }
  filterCallback = (course: Course) => {
    return this.filterValues.includes(course[SyllabusKey.TYPE].toString());
  };
}
class LevelFilter extends CoursesFilter {
  constructor(filterValues) {
    super(filterValues);
    this.maxLength = 6;
  }
  filterCallback = (course: Course) => {
    return this.filterValues.includes(course[SyllabusKey.LEVEL].toString());
  };
}

class EvalPercentFilter extends CoursesFilter {
  type: number;
  constructor(filterValues, type) {
    super(filterValues);
    this.type = type;
  }
  filterCallback = (course: Course) => {
    if (course[SyllabusKey.EVAL].length === 0) return false;
    // Check if the target evaluation item (e.g. 'exam') is included in the evaluation of this course
    const targetEval = course[SyllabusKey.EVAL].filter(
      (e) => e[SyllabusKey.EVAL_TYPE] === this.type
    )[0];
    // If the target evaluation item (e.g. 'exam') is included, check if its percentage is in the range of the filter
    // If it is included, return the course; if not included, check if the eval filter includes 0
    // If yes, return the course
    return targetEval
      ? targetEval[SyllabusKey.EVAL_PERCENT] >= this.filterValues[0] &&
          targetEval[SyllabusKey.EVAL_PERCENT] <= this.filterValues[1]
      : this.filterValues[0] === 0;
  };

  filterCourses = (courses: Course[]) => {
    return this.filterValues[0] === 0 && this.filterValues[1] === 100
      ? courses
      : courses.filter((course) => this.filterCallback(course));
  };
}
class EvalSpecialFilter extends CoursesFilter {
  filterCallback = (course: Course) => {
    if (course[SyllabusKey.EVAL].length === 0) return false;
    var isFiltered = true;
    ["noExam", "noPaper", "noClassParticipation"].forEach((filter, i) => {
      if (this.filterValues.includes(filter)) {
        var targetEval = course[SyllabusKey.EVAL].filter(
          (e) => e[SyllabusKey.EVAL_TYPE] === i
        )[0];
        if (
          targetEval !== undefined &&
          targetEval[SyllabusKey.EVAL_PERCENT] > 0
        )
          isFiltered = false;
      }
    });
    return isFiltered;
  };
}

const filterCourses = (
  filterGroups: FilterGroups,
  courses: Course[]
): Course[] => {
  const filters = [
    new SemesterFilter(filterGroups.semester),
    new SchoolFilter(filterGroups.school),
    new LangFilter(filterGroups.lang),
    new DayFilter(filterGroups.day),
    new PeriodFilter(filterGroups.period),
    new MinYearFilter(filterGroups.minYear),
    new CreditFilter(filterGroups.credit),
    new EvalPercentFilter(filterGroups.evalPercent, filterGroups.evalType),
    new EvalSpecialFilter(filterGroups.evalSpecial),
    new TypeFilter(filterGroups.type),
    new LevelFilter(filterGroups.level),
  ];
  return filters.reduce(
    (filteredCourses, filter) =>
      filter.filterValues
        ? filter.filterCourses(filteredCourses)
        : filteredCourses,
    courses
  );
};

export default filterCourses;
