import React from "react";
import styled from "styled-components";
import { WithTranslation, withTranslation } from "react-i18next";

import DayColumnItem from "./DayColumnItem";
import { SyllabusKey } from "@bit/wasedatime.syllabus.ts.constants.syllabus-data";
import Course from "../../types/course";

const StyledList = styled("ol")`
  display: flex;
  flex-direction: row;
  flex: 1 0 auto;
  justify-content: space-between;
  padding: 0;
  margin: 0 auto;
  list-style: none;
  list-style-type: none;
`;

interface Props extends WithTranslation {
  largestDay: number;
  largestPeriod: number;
  addedCoursesAndPrefs: {
    pref: {
      color: number;
      displayLang: string;
      visibility: boolean;
    };
    course: Course;
  }[];
}

const DayColumnList = ({
  largestDay,
  largestPeriod,
  addedCoursesAndPrefs,
  t,
}: Props) => {
  const initCoursesByDay = {
    "-1": [],
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  };
  const coursesByDay = addedCoursesAndPrefs.reduce((acc, elem) => {
    const { course, ...restOfElem } = elem;
    const { [SyllabusKey.OCCURRENCES]: occs, ...restOfCourse } = course;
    occs.forEach((occ) => {
      acc[occ[SyllabusKey.OCC_DAY]] = [
        ...acc[occ[SyllabusKey.OCC_DAY]],
        {
          ...restOfElem,
          course: {
            occurrence: occ,
            ...restOfCourse,
          },
        },
      ];
    });
    return acc;
  }, initCoursesByDay);

  //We define Sunday as index 0.
  const days = [
    t("common.mon"),
    t("common.tue"),
    t("common.wed"),
    t("common.thu"),
    t("common.fri"),
    t("common.sat"),
  ];

  const dayColumns = days
    .slice(0, Math.max(largestDay, 5))
    .map((day, index) => {
      return (
        <DayColumnItem
          key={day}
          day={day}
          largestPeriod={largestPeriod}
          coursesAndProperties={coursesByDay[index + 1]}
        />
      );
    });
  return <StyledList>{dayColumns}</StyledList>;
};

export default withTranslation("translation")(DayColumnList);
