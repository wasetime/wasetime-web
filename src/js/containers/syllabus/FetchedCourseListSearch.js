import React from "react";
import { connect } from "react-redux";
import { fetchCoursesBySchool, removeSchool } from "../../actions/syllabus";
import debounce from "lodash/debounce";
import MediaQuery from "react-responsive";
import { withRouter } from "react-router";
import { withNamespaces } from "react-i18next";
import queryString from "query-string";
import styled from "styled-components";
import ReactGA from "react-ga";

import { searchCourses, sortCourses } from "../../utils/courseSearch";
import { SYLLABUS_KEYS } from "../../config/syllabusKeys";
import Header from "../../components/Header";
import FetchedCourseList from "../../components/syllabus/FetchedCourseList";
import SearchBar from "../../components/syllabus/SearchBar";
import Filter from "../../components/syllabus/Filter";
import FilterButton from "../../components/syllabus/FilterButton";
import SchoolFilterForm from "../../components/syllabus/SchoolFilterForm";
import Modal from "../../components/Modal";
import { Wrapper, RowWrapper } from "../../styled-components/Wrapper";
import { SideBar } from "../../styled-components/SideBar";
import { sizes } from "../../styled-components/utils";
import { getSearchLang } from "../../utils/courseSearch";
import { gaFilter } from "../../ga/eventCategories";
import {
  gaAppendActionWithLng,
  gaOpenModal,
  gaCloseModal,
  gaApplyFilter,
  gaRemoveFilter,
  gaUpdateFilter,
} from "../../ga/eventActions";

const ExtendedWrapper = styled(Wrapper)`
  flex: 1 0 0;
`;

const FetchedCourseListWrapper = styled(ExtendedWrapper)`
  max-height: calc(100vh - 67px);
  overflow-y: auto;
`;

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

class FetchedCourseSearch extends React.Component {
  constructor(props) {
    super(props);
    const parsedSearch = queryString.parse(this.props.location.search);
    const parsedSearchQ = parsedSearch.q;
    const searchTerm = parsedSearchQ === undefined ? "" : parsedSearchQ;

    this.state = {
      isModalOpen: false,
      filterGroups: this.initialFilterGroups,
      inputText: searchTerm,
      searchTerm: searchTerm,
      filteredCourses: props.fetchedCourses,
    };
  }

  get initialFilterGroups() {
    return {
      semester: [],
      school: [],
      lang: [],
      special: [],
      day: [],
      period: [],
      minYear: [],
      credit: [],
      evalType: null,
      evalPercent: [0, 100],
      evalSpecial: [],
      type: [],
      level: [],
    };
  }

  componentWillUnmount() {
    this.debounceUpdateSearchTerm.cancel();
  }

  handleToggleModal = (event) => {
    event.preventDefault();
    const gaAction = this.state.isModalOpen ? gaCloseModal : gaOpenModal;
    ReactGA.event({
      category: gaFilter,
      action: gaAppendActionWithLng(gaAction, this.props.lng),
    });
    this.setState((prevState, props) => {
      return {
        isModalOpen: !prevState.isModalOpen,
      };
    });
  };

  clearFilter = () =>
    this.setState({
      filterGroups: this.initialFilterGroups,
      filteredCourses: this.props.fetchedCourses,
    });

  handleToggleFilter = (inputName, value) => {
    this.setState((prevState, props) => {
      const { [inputName]: filters, ...rest } = prevState.filterGroups;
      let newFilters, gaAction;
      if (inputName === "evalType" || inputName === "evalPercent") {
        newFilters = value;
        gaAction = gaUpdateFilter;
      } else if (Array.isArray(value)) {
        newFilters = value;
        gaAction =
          value.length < filters.length ? gaRemoveFilter : gaApplyFilter;
      } else {
        if (filters.includes(value)) {
          newFilters = filters.filter((elem) => elem !== value);
          gaAction = gaRemoveFilter;
        } else {
          newFilters = [...filters, value];
          gaAction = gaApplyFilter;
        }
      }
      ReactGA.event({
        category: gaFilter,
        action: gaAppendActionWithLng(gaAction, this.props.lng),
        label: `${inputName} - ${value}`,
      });
      const newFilterGroups = {
        [inputName]: newFilters,
        ...rest,
      };
      const newFilteredCourses = this.filterCourses(
        newFilterGroups,
        this.props.fetchedCourses
      );
      return {
        filterGroups: newFilterGroups,
        filteredCourses: newFilteredCourses,
      };
    });
  };

  filterCourses = (filterGroups, courses) => {
    const semesterFilters = filterGroups.semester;
    let filteredCourses =
      semesterFilters.length === 0
        ? courses
        : courses.filter((course) =>
            semesterFilters.some((filter) =>
              course[SYLLABUS_KEYS.TERM].includes(filter)
            )
          );

    const schoolFilters = filterGroups.school;
    filteredCourses =
      schoolFilters.length === 0 || schoolFilters.length === 6
        ? filteredCourses
        : filteredCourses.filter((course) =>
            schoolFilters.includes(course[SYLLABUS_KEYS.SCHOOL])
          );

    const langFilters = filterGroups.lang;
    filteredCourses =
      langFilters.length === 0 || langFilters.length === 10
        ? filteredCourses
        : filteredCourses.filter(
            (course) =>
              course[SYLLABUS_KEYS.LANG]
                .toString()
                .split(",")
                .filter((l) => langFilters.includes(l)).length > 0
          );

    const dayFilters = filterGroups.day;
    filteredCourses =
      dayFilters.length === 0 || dayFilters.length === 6
        ? filteredCourses
        : filteredCourses.filter((course) => {
            const occurrences = course[SYLLABUS_KEYS.OCCURRENCES];
            for (let i = 0; i < occurrences.length; i++) {
              if (
                dayFilters.includes(
                  occurrences[i][SYLLABUS_KEYS.OCC_DAY].toString()
                )
              )
                return true;
            }
            return false;
          });

    const periodFilters = filterGroups.period;

    filteredCourses =
      periodFilters.length === 0 || periodFilters.length === 6
        ? filteredCourses
        : filteredCourses.filter((course) => {
            const occurrences = course[SYLLABUS_KEYS.OCCURRENCES];

            for (let i = 0; i < periodFilters.length; i++) {
              const period = parseInt(periodFilters[i], 10);
              for (let j = 0; j < occurrences.length; j++) {
                const op = occurrences[j][SYLLABUS_KEYS.OCC_PERIOD];
                if (op > 9) {
                  const start = parseInt(op / 10);
                  const end = op % 10;
                  if (start <= period && period <= end) return true;
                } else {
                  if (op === period) return true;
                }
              }
            }
            return false;
          });

    const minYearFilters = filterGroups.minYear;
    filteredCourses =
      minYearFilters.length === 0 || minYearFilters.length === 4
        ? filteredCourses
        : filteredCourses.filter((course) =>
            minYearFilters.includes(course[SYLLABUS_KEYS.MIN_YEAR].toString())
          );

    const creditFilters = filterGroups.credit;
    filteredCourses =
      creditFilters.length === 0 || creditFilters.length === 3
        ? filteredCourses
        : filteredCourses.filter((course) =>
            course[SYLLABUS_KEYS.CREDIT] >= 3
              ? creditFilters.includes("3")
              : creditFilters.includes(course[SYLLABUS_KEYS.CREDIT].toString())
          );

    const evalTypeFilter = filterGroups.evalType;
    const evalPercentFilters = filterGroups.evalPercent;
    filteredCourses =
      evalPercentFilters[0] === 0 && evalPercentFilters[1] === 100
        ? filteredCourses
        : filteredCourses.filter((course) => {
            if (course[SYLLABUS_KEYS.EVAL].length === 0) return true;
            // Check if the target evaluation item (e.g. 'exam') is included in the evaluation of this course
            const targetEval = course[SYLLABUS_KEYS.EVAL].filter(
              (e) => e[SYLLABUS_KEYS.EVAL_TYPE] === evalTypeFilter
            )[0];
            // If the target evaluation item (e.g. 'exam') is included, check if its percentage is in the range of the filter
            // If it is included, return the course; if not included, check if the eval filter includes 0
            // If yes, return the course
            return targetEval
              ? targetEval[SYLLABUS_KEYS.EVAL_PERCENT] >=
                  evalPercentFilters[0] &&
                  targetEval[SYLLABUS_KEYS.EVAL_PERCENT] <=
                    evalPercentFilters[1]
              : evalPercentFilters[0] === 0;
          });

    const evalSpecialFilters = filterGroups.evalSpecial;
    filteredCourses =
      evalSpecialFilters.length === 0
        ? filteredCourses
        : filteredCourses.filter((course) => {
            var isFiltered = true;
            ["noExam", "noPaper", "noClassParticipation"].forEach(
              (filter, i) => {
                if (evalSpecialFilters.includes(filter)) {
                  var targetEval = course[SYLLABUS_KEYS.EVAL].filter(
                    (e) => e[SYLLABUS_KEYS.EVAL_TYPE] === i
                  )[0];
                  if (
                    targetEval !== undefined &&
                    targetEval[SYLLABUS_KEYS.EVAL_PERCENT] > 0
                  )
                    isFiltered = false;
                }
              }
            );
            return isFiltered;
          });

    const typeFilters = filterGroups.type;
    filteredCourses =
      typeFilters.length === 0 || typeFilters.length === 9
        ? filteredCourses
        : filteredCourses.filter((course) =>
            typeFilters.includes(course[SYLLABUS_KEYS.TYPE].toString())
          );

    const levelFilters = filterGroups.level;
    filteredCourses =
      levelFilters.length === 0 || levelFilters.length === 6
        ? filteredCourses
        : filteredCourses.filter((course) =>
            levelFilters.includes(course[SYLLABUS_KEYS.LEVEL].toString())
          );

    return filteredCourses;
  };

  pushHistory = () => {
    this.props.history.push({
      pathname: "/syllabus",
      search: this.state.inputText === "" ? "" : `q=${this.state.inputText}`,
    });
  };

  updateSearchTerm = () => {
    this.setState((prevState, props) => {
      return {
        searchTerm: prevState.inputText,
      };
    }, this.pushHistory());
  };

  debounceUpdateSearchTerm = debounce(this.updateSearchTerm, 500, {
    leading: false,
  });

  handleInputChange = (inputText) => {
    this.setState(
      {
        inputText,
      },
      this.debounceUpdateSearchTerm()
    );
  };

  loadSyllabus = async (school) => {
    this.props.fetchCoursesBySchool(school);
  };

  removeSyllabus = async (school) => {
    this.props.removeSchool(school);
  };

  componentDidUpdate(prevProps) {
    if (prevProps.fetchedCourses !== this.props.fetchedCourses) {
      this.setState((prevState, props) => ({
        filteredCourses: this.filterCourses(
          prevState.filterGroups,
          props.fetchedCourses
        ),
      }));
    }
  }

  render() {
    const { inputText, searchTerm } = this.state;
    const searchLang =
      searchTerm === "" ? this.props.lng : getSearchLang(searchTerm);
    const { t } = this.props;
    //TODO debounce here? it's executed in every render which happens every time a user changes input.
    const results =
      searchTerm.length > 0
        ? sortCourses(
            searchTerm,
            searchCourses(searchTerm, this.state.filteredCourses, searchLang),
            searchLang
          )
        : this.state.filteredCourses;
    return (
      <ExtendedWrapper>
        <Header
          title={t("navigation.syllabus")}
          onInputChange={this.handleInputChange}
          placeholder={t("syllabus.searchBarPlaceholder")}
          inputText={inputText}
          disabled={false}
        />

        <RowWrapper>
          <FetchedCourseListWrapper>
            <div>
              <MediaQuery maxWidth={sizes.tablet - 1}>
                {(matches) =>
                  matches && (
                    <SearchBar
                      onInputChange={this.handleInputChange}
                      placeholder={t("syllabus.searchBarPlaceholder")}
                      inputText={inputText}
                    />
                  )
                }
              </MediaQuery>
            </div>
            <div>
              <SchoolFilterForm
                handleToggleFilter={this.handleToggleFilter}
                loadedSchools={this.props.loadedSchools}
                selectedSchools={this.state.filterGroups.school}
                loadSyllabus={this.loadSyllabus}
                removeSyllabus={this.removeSyllabus}
              />
            </div>
            <div>
              <FetchedCourseList
                searchTerm={searchTerm}
                searchLang={searchLang}
                results={results}
              />
            </div>
          </FetchedCourseListWrapper>
          <MediaQuery minWidth={sizes.desktop}>
            {(matches) => {
              return matches ? (
                <SideBar flexBasis="20em">
                  <Filter
                    filterGroups={this.state.filterGroups}
                    handleToggleFilter={this.handleToggleFilter}
                    clearFilter={this.clearFilter}
                    isSideBar={true}
                  />
                </SideBar>
              ) : (
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
              );
            }}
          </MediaQuery>
        </RowWrapper>
      </ExtendedWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loadedSchools: state.fetchedCourses.schools,
  };
};

const mapDispatchToProps = {
  fetchCoursesBySchool,
  removeSchool,
};

export default withRouter(
  withNamespaces("translation")(
    connect(mapStateToProps, mapDispatchToProps)(FetchedCourseSearch)
  )
);
