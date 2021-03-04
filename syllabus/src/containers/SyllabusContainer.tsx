import React, { lazy, Suspense } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import debounce from "lodash/debounce";
import { connect } from "react-redux";
import { fetchCourses, fetchCoursesBySchool } from "../redux/actions";
import { ReduxRootState } from "../redux/reducers";
import { getFetchedCoursesList } from "../redux/reducers/fetchedCourses";
const AddedCourseListContainer = lazy(
  () => import("./AddedCourseListContainer")
);
const FetchedCourseList = lazy(
  () => import("../components/syllabus/FetchedCourseList")
);
import Filter from "../components/syllabus/Filter";
import FilterButton from "../components/syllabus/FilterButton";
import LoadingSpinner from "@bit/wasedatime.core.ts.ui.loading-spinner";
import {
  getSearchLang,
  searchCourses,
  sortCourses,
} from "@bit/wasedatime.syllabus.ts.utils.course-search";
import { createHistory, LocationProvider, navigate } from "@reach/router";
import { WithTranslation, withTranslation } from "react-i18next";
import MediaQuery from "react-responsive";
import Modal from "@bit/wasedatime.core.ts.ui.modal";
import Header from "@bit/wasedatime.core.ts.ui.header";
import filterCourses from "../utils/filterCourses";
import { sizes } from "@bit/wasedatime.core.ts.utils.responsive-utils";
import { SyllabusKey } from "@bit/wasedatime.syllabus.ts.constants.syllabus-data";
import Course from "../types/course";
import queryString from "query-string";
import API from "@aws-amplify/api";
import { schoolCodeMap } from "@bit/wasedatime.syllabus.ts.constants.school-code";

const SyllabusWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  flex: 67px;
`;

const SyllabusFlex = styled.div`
  flex: calc(100% - 67px);
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const SideColumn = styled.div`
  flex: 22em;
  flex-grow: 0;
  flex-shrink: 0;
`;

const ShorterSideColumn = styled.div`
  flex: 15em;
  flex-grow: 0;
  flex-shrink: 0;
`;

const MiddleColumn = styled.div`
  flex: auto;
`;

interface ReduxStateProps {
  fetchedCourses: Course[];
  isFetching: boolean;
}

interface ReduxDispatchProps {
  fetchCourses: () => void;
  fetchCoursesBySchool: (school: string) => void;
}

interface OwnProps extends WithTranslation {
  location: any;
  history: any;
}

interface OwnState {
  isModalOpen: boolean;
  filterGroups: { [filterName: string]: any };
  fetchedCourses: Course[];
  searchTerm: string | string[];
  inputText: string | string[];
  topCourse: Course | null;
  topCourseId: string;
}

// let history = createHistory(window);

const modalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: "401",
  },
  content: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "#fff",
    overflowY: "auto",
    overflowScrolling: "touch",
    WebkitOverflowScrolling: "touch",
    outline: "none",
    fontSize: "16px",
    padding: 0,
  },
};

class SyllabusContainer extends React.Component<
  ReduxStateProps & ReduxDispatchProps & OwnProps,
  OwnState
> {
  constructor(props) {
    super(props);
    if (window.location.pathname.includes("timetable"))
      navigate("/courses/timetable");

    this.state = {
      isModalOpen: false,
      filterGroups: {},
      fetchedCourses: props.fetchedCourses,
      searchTerm: "",
      inputText: "",
      topCourse: null,
      topCourseId: "",
    };
  }

  async componentDidMount() {
    const courseId = queryString.parse(window.location.search).courseId;
    if (courseId) await this.setTopCourse(courseId);
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.isFetching && !this.props.isFetching) {
      this.setState({ fetchedCourses: this.props.fetchedCourses });
    }
    const courseId = queryString.parse(window.location.search).courseId;
    if (courseId && this.state.topCourseId !== courseId) {
      await this.setTopCourse(courseId);
    }
  }

  setTopCourse = async (courseId) => {
    let course = this.state.fetchedCourses.find(
      (c) => c[SyllabusKey.ID] === courseId
    );
    const school = schoolCodeMap[courseId.substring(0, 2)];
    if (!course) {
      await this.props.fetchCoursesBySchool(school);
      const res = await API.get("wasedatime-dev", `/syllabus/${school}`, {
        headers: {
          "Content-Type": "application/json",
        },
        response: true,
      });
      course = res.data.find((c) => c[SyllabusKey.ID] === courseId);
    }
    if (course) {
      this.setState((prevState) => ({
        topCourseId: courseId,
        topCourse: { ...course, [SyllabusKey.SCHOOL]: school },
        fetchedCourses: [
          { ...course, [SyllabusKey.SCHOOL]: school },
          ...prevState.fetchedCourses,
        ],
      }));
    }
  };

  updateSearchTerm = () => {
    this.setState((prevState, props) => {
      return {
        searchTerm: prevState.inputText,
      };
    });
  };

  handleInputChange = (inputText) => {
    this.setState(
      {
        inputText,
      },
      debounce(this.updateSearchTerm, 500, {
        leading: false,
      })
    );
  };

  handleToggleModal = () => {
    this.setState((prevState) => ({ isModalOpen: !prevState.isModalOpen }));
  };

  handleToggleFilter = (name: string, value: any) => {
    this.setState((prevState, props) => {
      const { [name]: filters, ...rest } = prevState.filterGroups;
      let newFilters;
      if (["evalType", "evalPercent"].includes(name) || Array.isArray(value)) {
        newFilters = value; // change the whole value of the filter group
      } else if (!filters) {
        newFilters = [value]; // add first item to an unselected filter group
      } else if (filters.includes(value)) {
        newFilters = filters.filter((elem) => elem !== value); // cancel an item from a filter group
      } else {
        newFilters = [...filters, value]; // add an item to a filter group
      }

      const newFilterGroups =
        Array.isArray(newFilters) && newFilters.length === 0
          ? rest
          : { [name]: newFilters, ...rest };

      const newFilteredCourses = filterCourses(
        newFilterGroups,
        prevState.topCourse
          ? [prevState.topCourse, ...props.fetchedCourses]
          : props.fetchedCourses
      );

      return {
        filterGroups: newFilterGroups,
        fetchedCourses: newFilteredCourses,
      };
    });
  };

  clearFilter = () => {
    this.setState({
      filterGroups: {},
      fetchedCourses: this.props.fetchedCourses,
    });
  };

  render() {
    const { fetchCourses, t, i18n } = this.props;
    let newI18n = { ...i18n };

    const { fetchedCourses, searchTerm, inputText } = this.state;
    const searchLang =
      searchTerm === "" ? newI18n.language : getSearchLang(searchTerm);
    const results =
      searchTerm.length > 0
        ? sortCourses(
            searchTerm,
            searchCourses(searchTerm, fetchedCourses, searchLang),
            searchLang
          )
        : fetchedCourses;

    return (
      <SyllabusWrapper className="theme-default">
        <Helmet>
          <title>WasedaTime - Syllabus Search</title>
          <meta
            name="description"
            content="Syllabus Searching at Waseda University."
          />
          <meta property="og:title" content="WasedaTime - Syllabus Search" />
          <meta
            property="og:description"
            content="Syllabus Searching at Waseda University."
          />
          <meta
            property="og:site_name"
            content="WasedaTime - Syllabus Search"
          />
        </Helmet>

        <HeaderWrapper>
          <Header
            title={t("navigation.syllabus")}
            onInputChange={this.handleInputChange}
            placeholder={t("syllabus.searchBarPlaceholder")}
            inputText={inputText}
            disabled={false}
            isBlur={false}
            changeLang={(lng) => i18n.changeLanguage(lng)}
          />
        </HeaderWrapper>

        <SyllabusFlex>
          <MediaQuery minWidth={sizes.tablet}>
            {(matches) =>
              matches && (
                <SideColumn>
                  <Suspense fallback={<LoadingSpinner message="Loading..." />}>
                    <AddedCourseListContainer />
                  </Suspense>
                </SideColumn>
              )
            }
          </MediaQuery>

          <MiddleColumn>
            <Suspense fallback={<LoadingSpinner message="Loading..." />}>
              <FetchedCourseList
                searchTerm={searchTerm}
                searchLang={searchLang}
                results={results}
                onSearchInputChange={this.handleInputChange}
              />
            </Suspense>
          </MiddleColumn>
          <MediaQuery minWidth={1280}>
            {(matches) =>
              matches && (
                <SideColumn>
                  <Filter
                    filterGroups={this.state.filterGroups}
                    handleToggleFilter={this.handleToggleFilter}
                    clearFilter={this.clearFilter}
                    isSideBar={true}
                  />
                </SideColumn>
              )
            }
          </MediaQuery>
          <MediaQuery minWidth={sizes.desktop} maxWidth={1279}>
            {(matches) =>
              matches && (
                <ShorterSideColumn>
                  <Filter
                    filterGroups={this.state.filterGroups}
                    handleToggleFilter={this.handleToggleFilter}
                    clearFilter={this.clearFilter}
                    isSideBar={true}
                  />
                </ShorterSideColumn>
              )
            }
          </MediaQuery>
          <MediaQuery maxWidth={sizes.desktop - 1}>
            {(matches) =>
              matches && (
                <div>
                  <FilterButton
                    isModalOpen={this.state.isModalOpen}
                    handleToggleModal={this.handleToggleModal}
                  />
                  <Modal isOpen={this.state.isModalOpen} style={modalStyle}>
                    <Filter
                      filterGroups={this.state.filterGroups}
                      handleToggleFilter={this.handleToggleFilter}
                      clearFilter={this.clearFilter}
                      isSideBar={false}
                    />
                  </Modal>
                </div>
              )
            }
          </MediaQuery>
        </SyllabusFlex>
      </SyllabusWrapper>
    );
  }
}

const mapStateToProps = (state: ReduxRootState) => ({
  fetchedCourses: getFetchedCoursesList(state.fetchedCourses.coursesBySchool),
  isFetching: state.fetchedCourses.isFetching,
});

const mapDispatchToProps = {
  fetchCourses,
  fetchCoursesBySchool,
};

export default connect<ReduxStateProps, ReduxDispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation("translation")(SyllabusContainer));
