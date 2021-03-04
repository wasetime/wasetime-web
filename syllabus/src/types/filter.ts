import FilterOption from "@bit/wasedatime.syllabus.ts.constants.syllabus-filter";

export interface FilterGroups {
  [FilterOption.SEMESTER]?: string[];
  [FilterOption.SCHOOL]?: string[];
  [FilterOption.LANG]?: string[];
  [FilterOption.DAY]?: string[];
  [FilterOption.PERIOD]?: string[];
  [FilterOption.MIN_YEAR]?: string[];
  [FilterOption.CREDIT]?: string[];
  [FilterOption.EVAL_TYPE]?: number;
  [FilterOption.EVAL_PERCENT]?: number[];
  [FilterOption.EVAL_SPECIAL]?: string[];
  [FilterOption.TYPE]?: string[];
  [FilterOption.LEVEL]?: string[];
}

export default FilterGroups;
