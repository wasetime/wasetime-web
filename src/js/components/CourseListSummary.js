import React from "react";
import styled from "styled-components";

import SortingOptions from "./SortingOptions";
import { RowWrapper } from "../styled-components/Wrapper";
import { InvisibleButton } from "../styled-components/Button";
import { withNamespaces } from "react-i18next";
import { Label, Dropdown } from "semantic-ui-react";
import { SYLLABUS_KEYS } from "../config/syllabusKeys";
import { ADDED_ORDER, COURSE_TITLE, COURSE_TIME } from "../data/sortingOptions";
import PropTypes from "prop-types";

const SortByButton = styled(InvisibleButton)`
  margin-left: auto;
  display: flex;
  &:hover {
    fill: #b51e36;
    color: #b51e36;
  }
  &:focus {
    fill: ${(props) => (props.isSortingOptionOpen ? "#b51e36;" : "#000;")};
    color: ${(props) => (props.isSortingOptionOpen ? "#b51e36;" : "#000;")};
  }
  fill: ${(props) => (props.isSortingOptionOpen ? "#b51e36;" : "#000;")};
  color: ${(props) => (props.isSortingOptionOpen ? "#b51e36;" : "#000;")};
`;

const StyledLabel = styled(Label)`
  padding: 0.6rem !important;
`;

const StyledDropdown = styled(Dropdown)`
  font-size: 1.4rem !important;
  font-family: Segoe UI, Yu Gothic Medium, Lato;
  font-display: swap;
  height: 2em !important;
  min-height: 2em !important;
  width: 40% !important;
  min-width: 40% !important;
  padding: 0.6rem !important;
  margin-left: auto;

  i {
    padding: 0.6rem !important;
  }
`;

const creditSum = (coursesAndPrefs) => {
  return coursesAndPrefs
    .map((courseAndPref) =>
      courseAndPref.course
        ? courseAndPref.course[SYLLABUS_KEYS.CREDIT]
        : courseAndPref[SYLLABUS_KEYS.CREDIT]
    )
    .reduce((a, b) => a + b, 0);
};

const sortingOptions = (t) => [
  {
    key: ADDED_ORDER,
    text: t("syllabus.Added order"),
    value: ADDED_ORDER,
  },
  {
    key: COURSE_TITLE,
    text: t("syllabus.Course title"),
    value: COURSE_TITLE,
  },
  {
    key: COURSE_TIME,
    text: t("syllabus.Course time"),
    value: COURSE_TIME,
  },
];

const CourseListSummary = ({
  courses,
  isSortingOptionOpen,
  handleToggleSortingOptions,
  selectedSortingOption,
  handleChangeSortingOption,
  t,
}) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <RowWrapper>
        <StyledLabel size="big" color="grey" basic>
          {`${courses.length}`} {t("timetable.courses")}{" "}
        </StyledLabel>
        <StyledLabel size="big" color="grey" basic>
          {creditSum(courses)} {t("timetable.credits")}
        </StyledLabel>

        <StyledDropdown
          placeholder={t("timetable.Sort by")}
          selection
          options={sortingOptions(t)}
          onChange={(e, data) => {
            handleChangeSortingOption(data.value);
          }}
        />
      </RowWrapper>
      {isSortingOptionOpen && (
        <SortingOptions
          selectedSortingOption={selectedSortingOption}
          handleChangeSortingOption={handleChangeSortingOption}
        />
      )}
    </div>
  );
};

export default withNamespaces("translation")(CourseListSummary);

CourseListSummary.propTypes = {
  courses: PropTypes.array.isRequired,
  isSortingOptionOpen: PropTypes.bool.isRequired,
  handleToggleSortingOptions: PropTypes.func.isRequired,
  selectedSortingOption: PropTypes.string.isRequired,
  handleChangeSortingOption: PropTypes.func.isRequired,
};

SortByButton.propTypes = {
  isSortingOptionOpen: PropTypes.bool.isRequired,
};
