import React from "react";
import styled from "styled-components";

import CourseListSummary from "../CourseListSummary";
import AddedCourseAndPrefItem from "../../containers/timetable/AddedCourseAndPrefItem";
import { Wrapper } from "../../styled-components/Wrapper";
import { media } from "../../styled-components/utils";
import { UnstyledUList } from "../../styled-components/List";

const ExtendedWrapper = styled(Wrapper)`
  padding: 0 1em;
  ${media.tablet`margin-top: 1rem;`};
`;

const ExtendedUnstyledUList = styled(UnstyledUList)`
  font-size: 14px;
`;

const AddedCourseAndPrefList = ({
  addedCoursesAndPrefs,
  isSortingOptionOpen,
  handleToggleSortingOptions,
  selectedSortingOption,
  handleChangeSortingOption,
}) => {
  return (
    <ExtendedWrapper>
      <CourseListSummary
        courses={addedCoursesAndPrefs}
        isSortingOptionOpen={isSortingOptionOpen}
        handleToggleSortingOptions={handleToggleSortingOptions}
        selectedSortingOption={selectedSortingOption}
        handleChangeSortingOption={handleChangeSortingOption}
      />
      <Wrapper>
        <ExtendedUnstyledUList>
          {addedCoursesAndPrefs.map((addedCourseAndPref, i) => (
            <React.Fragment key={i}>
              <AddedCourseAndPrefItem
                key={addedCourseAndPref.id}
                addedCourseAndPref={addedCourseAndPref}
              />
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
