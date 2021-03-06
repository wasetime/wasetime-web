import SortingOption from "../constants/sorting-options";
import { SyllabusKey } from "../constants/syllabus-data";

export const sortAddedCourses = (addedCourses, sortingOption) => {
  switch (sortingOption) {
    case SortingOption.ADDED_ORDER:
      return addedCourses;
    case SortingOption.COURSE_TITLE:
      return addedCourses.sort((a, b) => {
        // ignore upper and lowercase
        const courseTitleA = a[SyllabusKey.TITLE].toUpperCase();
        const courseTitleB = b[SyllabusKey.TITLE].toUpperCase();
        if (courseTitleA < courseTitleB) {
          return -1;
        } else if (courseTitleA > courseTitleB) {
          return 1;
        } else {
          return 0;
        }
      });
    case SortingOption.COURSE_TIME:
      return addedCourses.sort((a, b) => {
        const firstOccurrenceDayA =
          a[SyllabusKey.OCCURRENCES][0][SyllabusKey.OCC_DAY];
        const firstOccurrenceDayB =
          b[SyllabusKey.OCCURRENCES][0][SyllabusKey.OCC_DAY];

        const firstOccurrencePeriodA =
          a[SyllabusKey.OCCURRENCES][0][SyllabusKey.OCC_PERIOD];
        const firstOccurrenceStartPeriodA =
          firstOccurrencePeriodA > 9
            ? Math.floor(firstOccurrencePeriodA / 10)
            : firstOccurrencePeriodA % 10;
        const firstOccurrencePeriodB =
          b[SyllabusKey.OCCURRENCES][0][SyllabusKey.OCC_PERIOD];
        const firstOccurrenceStartPeriodB =
          firstOccurrencePeriodB > 9
            ? Math.floor(firstOccurrencePeriodB / 10)
            : firstOccurrencePeriodB % 10;

        if (firstOccurrenceDayA < firstOccurrenceDayB) {
          return -1;
        } else if (firstOccurrenceDayA > firstOccurrenceDayB) {
          return 1;
        } else {
          if (firstOccurrenceStartPeriodA < firstOccurrenceStartPeriodB) {
            return -1;
          } else if (
            firstOccurrenceStartPeriodA > firstOccurrenceStartPeriodB
          ) {
            return 1;
          } else {
            return 0;
          }
        }
      });
    default:
      return addedCourses;
  }
};
