import React from "react";
import { connect } from "react-redux";
import { changeSortingOption } from "../redux/actions";
import { ReduxRootState } from "../redux/reducers";
import CourseListSummary from "../components/CourseListSummary";
import Course from "../types/course";

interface ReduxStateProps {
  selectedSortingOption: string;
}

interface ReduxDispatchProps {
  changeSortingOption: (sortingOption: string) => void;
}

interface OwnProps {
  courses: Course[];
}

const CourseListSummaryContainer = ({
  courses,
  selectedSortingOption,
  changeSortingOption,
}: OwnProps & ReduxStateProps & ReduxDispatchProps) => (
  <CourseListSummary
    courses={courses}
    selectedSortingOption={selectedSortingOption}
    changeSortingOption={changeSortingOption}
  />
);

const mapStateToProps = (state: ReduxRootState) => ({
  selectedSortingOption: state.addedCourses.sortingOption,
});

const mapDispatchToProps = {
  changeSortingOption,
};

export default connect<ReduxStateProps, ReduxDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(CourseListSummaryContainer);
