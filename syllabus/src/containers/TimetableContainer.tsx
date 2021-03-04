import React, { lazy, Suspense } from "react";
import styled from "styled-components";
import { navigate } from "@reach/router";
import { ReduxRootState } from "../redux/reducers";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";

import { Wrapper } from "@bit/wasedatime.core.ts.styles.wrapper";
import Header from "@bit/wasedatime.core.ts.ui.header";
import LoadingSpinner from "@bit/wasedatime.core.ts.ui.loading-spinner";
const Timetable = lazy(() => import("../components/timetable/Timetable"));
import SemesterSwitcher from "../components/SemesterSwitcher";
import { Semester } from "@bit/wasedatime.syllabus.ts.constants.timetable-terms";
import { getCurrentSemester } from "@bit/wasedatime.syllabus.ts.utils.get-current-semesters";
import { WithTranslation, withTranslation } from "react-i18next";
import { getAddedCoursesAndPrefsByTerm } from "../redux/reducers/addedCourses";
import { sortAddedCoursesAndPrefs } from "@bit/wasedatime.syllabus.ts.utils.added-courses-and-prefs";
import Course from "../types/course";

const TimetableWrapper = styled(Wrapper)`
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  flex: 67px;
`;

const TimetableFlex = styled.div`
  flex: calc(100% - 67px);
`;

interface ReduxStateProps {
  addedCoursesAndPrefsByTerm: {
    [key: string]: {
      pref: {
        color: number;
        displayLang: string;
        visibility: boolean;
      };
      course: Course;
    }[];
  };
  selectedSortingOption: string;
}

interface OwnState {
  selectedSemester: string;
  selectedQuarter: string;
}

interface SemesterTitlesType {
  [key: string]: string;
}

class TimetableContainer extends React.Component<
  ReduxStateProps & WithTranslation,
  OwnState
> {
  semesterTitles: SemesterTitlesType;

  constructor(props) {
    super(props);
    if (window.location.pathname.includes("syllabus"))
      navigate("/courses/syllabus");

    this.semesterTitles = {
      [Semester.SPRING]: "Spring Semester",
      [Semester.FALL]: "Fall Semester",
    };

    this.state = {
      selectedSemester: getCurrentSemester(),
      selectedQuarter: "",
    };
  }

  handleToggleSemester = () => {
    if (this.state.selectedSemester === Semester.SPRING) {
      this.setState({ selectedSemester: Semester.FALL });
    } else {
      this.setState({ selectedSemester: Semester.SPRING });
    }
  };

  handleToggleQuarter = (quarter) => {
    this.setState((prevState) => ({
      selectedQuarter: prevState.selectedQuarter === quarter ? "" : quarter,
    }));
  };

  render() {
    const {
      t,
      i18n,
      addedCoursesAndPrefsByTerm,
      selectedSortingOption,
    } = this.props;
    const { selectedSemester, selectedQuarter } = this.state;

    const addedCoursesAndPrefs =
      selectedQuarter.length > 0
        ? addedCoursesAndPrefsByTerm[selectedQuarter]
        : addedCoursesAndPrefsByTerm[selectedSemester];

    const sortedAddedCoursesAndPrefs = sortAddedCoursesAndPrefs(
      addedCoursesAndPrefs,
      selectedSortingOption
    );

    return (
      <TimetableWrapper className="theme-default">
        <Helmet>
          <title>WasedaTime - Timetable</title>
          <meta
            name="description"
            content="Create Your Own Timetable at Waseda University."
          />
          <meta property="og:title" content="WasedaTime - Timetable" />
          <meta
            property="og:description"
            content="Create Your Own Timetable at Waseda University."
          />
          <meta property="og:site_name" content="WasedaTime - Timetable" />
        </Helmet>
        <HeaderWrapper>
          <Header
            title={t("navigation.timetable")}
            onInputChange={() => {}}
            placeholder={"Search course (in construction...)"}
            inputText={""}
            disabled={true}
            isBlur={false}
            changeLang={(lng) => i18n.changeLanguage(lng)}
          />
        </HeaderWrapper>
        <TimetableFlex>
          <SemesterSwitcher
            semesterTitle={t(
              `timetable.${this.semesterTitles[selectedSemester]}`
            )}
            selectedSemester={selectedSemester}
            selectedQuarter={selectedQuarter}
            isQuarterDisplayed={true}
            toggleSemester={this.handleToggleSemester}
            toggleQuarter={this.handleToggleQuarter}
          />
          <Suspense fallback={<LoadingSpinner message="Loading..." />}>
            <Timetable addedCoursesAndPrefs={sortedAddedCoursesAndPrefs} />
          </Suspense>
        </TimetableFlex>
      </TimetableWrapper>
    );
  }
}

const mapStateToProps = (state: ReduxRootState) => ({
  addedCoursesAndPrefsByTerm: getAddedCoursesAndPrefsByTerm(
    state.addedCourses.byId
  ),
  selectedSortingOption: state.addedCourses.sortingOption,
});

export default connect<ReduxStateProps, {}>(
  mapStateToProps,
  null
)(withTranslation("translation")(TimetableContainer));
