import React, { useState, useEffect } from "react";
import styled from "styled-components";

import CourseListSummaryContainer from "../../containers/CourseListSummaryContainer";
import AddedCourseAndPrefItem from "../../containers/AddedCourseAndPrefItem";
import { Wrapper } from "@bit/wasedatime.core.ts.styles.wrapper";
import { media } from "@bit/wasedatime.core.ts.utils.responsive-utils";
import { UnstyledUList } from "@bit/wasedatime.core.ts.styles.list";
import Course from "../../types/course";

const ExtendedWrapper = styled(Wrapper)`
  padding: 0 1em;
  ${media.tablet`margin-top: 1rem;`};
`;

const ExtendedUnstyledUList = styled(UnstyledUList)`
  font-size: 14px;
  max-height: calc(100vh - 160px);
  overflow-y: auto;
  ${media.tablet`max-height: none;`};
`;

interface Props {
  addedCoursesAndPrefs: {
    pref: {
      color: number;
      displayLang: string;
      visibility: boolean;
    };
    course: Course;
  }[];
}

const AddedCourseAndPrefList = ({ addedCoursesAndPrefs }: Props) => {
  return (
    <ExtendedWrapper>
      <CourseListSummaryContainer courses={addedCoursesAndPrefs} />
      <Wrapper>
        <ExtendedUnstyledUList>
          {addedCoursesAndPrefs.map((courseAndPref, i) => (
            <React.Fragment key={i}>
              <AddedCourseAndPrefItem addedCourseAndPref={courseAndPref} />
              <hr
                style={{
                  border: "none",
                }}
              />
            </React.Fragment>
          ))}
        </ExtendedUnstyledUList>
      </Wrapper>
    </ExtendedWrapper>
  );
};

export default AddedCourseAndPrefList;
