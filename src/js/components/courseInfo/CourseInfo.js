import React from "react";
import { Auth } from "aws-amplify";
import { connect } from "react-redux";
import { getUserTokens } from "../../reducers/user";
import API from "@aws-amplify/api";
import qs from "qs";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import ReactGA from "react-ga";
import { gaRelatedCourses } from "../../ga/eventCategories";
import {
  gaAppendActionWithLng,
  gaCloseModal,
  gaOpenModal,
} from "../../ga/eventActions";
import Alert from "react-s-alert";
import { SYLLABUS_KEYS } from "../../config/syllabusKeys";
import levenshtein from "levenshtein-edit-distance";
import { withNamespaces } from "react-i18next";
import withFetchCourses from "../../hocs/withFetchCourses";

import { media } from "../../styled-components/utils";
import { RowWrapper, Wrapper } from "../../styled-components/Wrapper";
import { Overlay } from "../../styled-components/Overlay";

import CourseDetails from "./CourseDetails";
import FetchError from "../../components/FetchError";
import FetchedCourseItem from "../../containers/syllabus/FetchedCourseItem";
import CourseReviews from "./CourseReviews";
import AddReviewForm from "./AddReviewForm";
import LoadingSpinner from "../LoadingSpinner";
import RelatedCourses from "./RelatedCourses";
import SignInModal from "../user/SignInModal";
import Header from "../Header";

export const LongWrapper = styled(Wrapper)`
  margin-top: 70px;
  flex: 1 1 auto;
  width: calc(70vw - 65px);
  max-width: calc(70vw - 65px);
  ${media.tablet`margin-top: 0px; flex: 0 0 auto; width: 100%; max-width: 100%;`};
`;

const ExtendedOverlay = styled(Overlay)`
  padding: 0 25px;
  ${media.tablet`padding: 1rem 2rem;`}
  ${media.phone`padding: 1rem;`}
`;

const getCourse = (loadedCourses, courseID) => {
  // Return null if courses not saved in localStorage or the course to display is not saved in localStorage
  return loadedCourses ? loadedCourses[courseID] : null;
};

const getCourseKey = (course) => course[SYLLABUS_KEYS.ID].substring(0, 12);

const getRelatedCourses = (
  loadedCourses,
  courseCode,
  thisCourseKey,
  thisCourseTitle,
  thisCourseSchool
) => {
  const relatedCourseIDs = Object.keys(loadedCourses).filter(
    (courseID) =>
      loadedCourses[courseID][SYLLABUS_KEYS.CODE] === courseCode &&
      getCourseKey(loadedCourses[courseID]) !== thisCourseKey
  );
  const relatedCourses = relatedCourseIDs.map(
    (courseID) => loadedCourses[courseID]
  );
  const sortedRelatedCourses = relatedCourses
    .sort((a, b) => {
      if (
        a[SYLLABUS_KEYS.SCHOOL] === thisCourseSchool &&
        b[SYLLABUS_KEYS.SCHOOL] !== thisCourseSchool
      )
        return -1;
      if (
        a[SYLLABUS_KEYS.SCHOOL] !== thisCourseSchool &&
        b[SYLLABUS_KEYS.SCHOOL] === thisCourseSchool
      )
        return 1;
      return (
        levenshtein(thisCourseTitle, a[SYLLABUS_KEYS.TITLE]) -
        levenshtein(thisCourseTitle, b[SYLLABUS_KEYS.TITLE])
      );
    })
    .slice(0, 10);
  return sortedRelatedCourses;
};

const getCourseID = (searchQuery) =>
  qs.parse(searchQuery, {
    ignoreQueryPrefix: true,
  }).courseID;

const getSearchLang = (searchQuery) =>
  qs.parse(searchQuery, {
    ignoreQueryPrefix: true,
  }).searchLang;

class CourseInfo extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
  }

  state = {
    thisCourse: getCourse(
      this.props.fetchedCoursesById,
      getCourseID(this.props.location.search)
    ),
    relatedCourses: [],
    thisCourseReviews: [],
    relatedCourseReviews: {},
    avgSatisfaction: 0,
    avgDifficulty: 0,
    avgBenefit: 0,
    searchLang: getSearchLang(this.props.location.search),
    reviewLang: "",
    isLoaded: false,
    isModalOpen: false,
    error: false,
    isAddReviewFormOpen: false,
    newReviewSatisfaction: 0,
    newReviewDifficulty: 0,
    newReviewBenefit: 0,
    newReviewComment: "",
    newReviewIsSending: false,
    reviewFormMode: "new",
    editReviewIndex: 0,
    editReviewPrimaryKey: "",
    editReviewOriginalText: "",
    isSignInModalOpen: false,
  };

  componentDidMount() {
    API.configure();
    this._isMounted = true;
    this._isMounted && this.loadReviewsAndRelatedCourses();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async loadReviewsAndRelatedCourses() {
    const thisCourse = this.state.thisCourse;
    const searchLang = this.state.searchLang;
    let loadedCourses = this.props.fetchedCoursesById;
    const thisCourseKey = getCourseKey(thisCourse);

    // 1. Get related courses by code, sort them, and get the first k courses (k=10)
    const relatedCourses = getRelatedCourses(
      loadedCourses,
      thisCourse[SYLLABUS_KEYS.CODE],
      thisCourseKey,
      thisCourse[SYLLABUS_KEYS.TITLE],
      thisCourse[SYLLABUS_KEYS.SCHOOL]
    );

    this.setState({ relatedCourses: relatedCourses });

    const relatedCoursesByKey = {};
    relatedCourses.forEach((c) => {
      relatedCoursesByKey[getCourseKey(c)] = c;
    });

    // 2. Make the key of this course and keys of top 3 related courses into a list
    const courseKeysToFetchReviews = [thisCourseKey].concat(
      relatedCourses.slice(0, 3).map((course) => getCourseKey(course))
    );

    // 3. Fetch the reviews by posting the keys list
    const courseReviews = await this.getCourseReviewsByKey(
      courseKeysToFetchReviews
    );
    let thisCourseReviews = [];
    let relatedCourseReviews = {};
    (courseReviews || []).forEach((c, i) => {
      if (i === 0) thisCourseReviews = c.data;
      else {
        relatedCourseReviews[courseKeysToFetchReviews[i]] = c.data;
        // Same first 10 digits of courseKey & same instructors => show same reviews
        if (
          thisCourseKey.substring(0, 10) ===
            courseKeysToFetchReviews[i].substring(0, 10) &&
          thisCourse[SYLLABUS_KEYS.INSTRUCTOR] ===
            relatedCoursesByKey[courseKeysToFetchReviews[i]][
              SYLLABUS_KEYS.INSTRUCTOR
            ]
        ) {
          thisCourseReviews = [...thisCourseReviews, ...c.data];
        }
      }
    });

    let satisfactionSum = 0,
      difficultySum = 0,
      benefitSum = 0;
    thisCourseReviews.forEach((review) => {
      satisfactionSum += review.satisfaction;
      difficultySum += review.difficulty;
      benefitSum += review.benefit;
    });
    // calculate the averages of scales and round them to the nearest .5
    const avgSatisfaction =
      Math.round((satisfactionSum / thisCourseReviews.length) * 2) / 2;
    const avgDifficulty =
      Math.round((difficultySum / thisCourseReviews.length) * 2) / 2;
    const avgBenefit =
      Math.round((benefitSum / thisCourseReviews.length) * 2) / 2;

    this._isMounted &&
      this.setState({
        relatedCourses: relatedCourses,
        thisCourseReviews: thisCourseReviews,
        relatedCourseReviews: relatedCourseReviews,
        avgSatisfaction: avgSatisfaction,
        avgDifficulty: avgDifficulty,
        avgBenefit: avgBenefit,
        searchLang: searchLang,
        reviewLang: this.props.lng === "jp" ? "ja" : this.props.lng,
        isLoaded: true,
      });
  }

  async getCourseReviewsByKey(courseKeys) {
    try {
      const reviews = await Promise.all(
        courseKeys.map(async (courseKey) => {
          const res = await API.get(
            "wasedatime-dev",
            "/course-reviews/" +
              courseKey +
              "?uid=" +
              (this.props.userTokens ? this.props.userTokens.sub : ""),
            {
              headers: {
                "x-api-key": "0PaO2fHuJR9jlLLdXEDOyUgFXthoEXv8Sp0oNsb8",
                "Content-Type": "application/json",
              },
            }
          );
          return res;
        })
      );
      return reviews;
    } catch (error) {
      console.error(error);
    }
  }

  handleToggleModal = (event) => {
    event.preventDefault();
    const gaAction = this.state.isModalOpen ? gaCloseModal : gaOpenModal;
    ReactGA.event({
      category: gaRelatedCourses,
      action: gaAppendActionWithLng(gaAction, this.props.lng),
    });
    this.setState((prevState, props) => {
      return {
        isModalOpen: !prevState.isModalOpen,
      };
    });
  };

  switchReviewLang = (lang) => this.setState({ reviewLang: lang });

  toggleAddReviewForm = () => {
    if (this.props.userTokens) {
      this.setState({
        isAddReviewFormOpen: !this.state.isAddReviewFormOpen,
      });
    } else {
      this.setState({ isSignInModalOpen: true });
    }
  };

  openReviewNewForm = () => {
    this.setState(
      {
        reviewFormMode: "new",
        newReviewSatisfaction: 0,
        newReviewDifficulty: 0,
        newReviewBenefit: 0,
        newReviewComment: "",
        editReviewIndex: 0,
        editReviewPrimaryKey: "",
        editReviewOriginalText: "",
      },
      this.toggleAddReviewForm
    );
  };

  openReviewEditForm = (review) => {
    this.setState(
      {
        reviewFormMode: "edit",
        newReviewSatisfaction: review["satisfaction"],
        newReviewDifficulty: review["difficulty"],
        newReviewBenefit: review["benefit"],
        newReviewComment: review["src_comment"],
        editReviewIndex: review["index"],
        editReviewPrimaryKey: review["created_at"],
        editReviewOriginalText: review["src_comment"],
      },
      this.toggleAddReviewForm
    );
  };

  onNewReviewScaleChange = (target, score) => {
    switch (target) {
      case "satisfaction":
        this.setState({ newReviewSatisfaction: score });
        break;
      case "difficulty":
        this.setState({ newReviewDifficulty: score });
        break;
      case "benefit":
        this.setState({ newReviewBenefit: score });
        break;
      default:
        this.setState({ newReviewSatisfaction: score });
    }
  };

  onNewReviewCommentChange = (text) =>
    this.setState({ newReviewComment: text });

  onNewReviewFormSubmit = () => {
    if (!this.props.userTokens) {
      this.setState({ isSignInModalOpen: true });
      return;
    }

    const {
      newReviewSatisfaction,
      newReviewDifficulty,
      newReviewBenefit,
      newReviewComment,
      reviewFormMode,
      editReviewPrimaryKey,
      editReviewOriginalText,
    } = this.state;
    if (
      [
        newReviewSatisfaction,
        newReviewDifficulty,
        newReviewBenefit,
        newReviewComment.length,
      ].some((scale) => scale === 0)
    ) {
      Alert.warning(
        this.props.t(`courseInfo.Fill in all fields before sending`),
        {
          position: "bottom",
          effect: "jelly",
        }
      );
    } else {
      const thisCourse = this.state.thisCourse;

      let editReview = {
        satisfaction: newReviewSatisfaction,
        difficulty: newReviewDifficulty,
        benefit: newReviewBenefit,
      };
      if (editReviewOriginalText !== newReviewComment) {
        editReview = { ...editReview, comment: newReviewComment };
      }
      const newReview = {
        ...editReview,
        course_key: getCourseKey(thisCourse),
        title: thisCourse[SYLLABUS_KEYS.TITLE],
        title_jp: thisCourse[SYLLABUS_KEYS.TITLE_JP],
        instructor: thisCourse[SYLLABUS_KEYS.INSTRUCTOR],
        instructor_jp: thisCourse[SYLLABUS_KEYS.INSTRUCTOR_JP],
        year: 2020,
      };

      try {
        this.setState({ newReviewIsSending: true });

        // Send the review
        if (reviewFormMode === "new") {
          API.post(
            "wasedatime-dev",
            "/course-reviews/" + getCourseKey(thisCourse),
            {
              body: {
                data: newReview,
              },
              headers: {
                "Content-Type": "application/json",
                Authorization: this.props.userTokens
                  ? this.props.userTokens.idToken
                  : "",
              },
            }
          ).then(() => this.cleanFormAndUpdateReviews(newReview));
        } else if (reviewFormMode === "edit") {
          API.patch(
            "wasedatime-dev",
            "/course-reviews/" +
              getCourseKey(thisCourse) +
              "?ts=" +
              editReviewPrimaryKey,
            {
              body: {
                data: editReview,
              },
              headers: {
                "Content-Type": "application/json",
                Authorization: this.props.userTokens
                  ? this.props.userTokens.idToken
                  : "",
              },
            }
          ).then(() => this.cleanFormAndUpdateReviews(newReview));
        }
      } catch (error) {
        Alert.error(this.props.t(`courseInfo.Review failed to send`), {
          position: "bottom",
          effect: "jelly",
        });
      }
    }
  };

  cleanFormAndUpdateReviews = (newReview) => {
    const { thisCourseReviews, reviewFormMode, editReviewIndex } = this.state;
    Alert.success(this.props.t(`courseInfo.Review sent`), {
      position: "bottom",
      effect: "jelly",
    });

    const postedReview = {
      ...newReview,
      comment_en: newReview["comment"],
      comment_ja: newReview["comment"],
      "comment_zh-TW": newReview["comment"],
      "comment_zh-CN": newReview["comment"],
      comment_ko: newReview["comment"],
    };

    let updatedThisCourseReviews = [];

    if (reviewFormMode === "edit") {
      updatedThisCourseReviews = thisCourseReviews.map((r, i) =>
        i === editReviewIndex ? postedReview : r
      );
    } else {
      updatedThisCourseReviews = [postedReview, ...thisCourseReviews];
    }

    this.setState((prevState, props) => ({
      thisCourseReviews: updatedThisCourseReviews,
      isAddReviewFormOpen: false,
      newReviewSatisfaction: 0,
      newReviewDifficulty: 0,
      newReviewBenefit: 0,
      newReviewComment: "",
      newReviewIsSending: false,
      reviewFormMode: "new",
      editReviewPrimaryKey: 0,
      editReviewOriginalText: "",
    }));
  };

  deleteReview = (reviewPrimaryKey, reviewIndex) => {
    if (!this.props.userTokens) {
      this.setState({ isSignInModalOpen: true });
      return;
    }
    API.del(
      "wasedatime-dev",
      "/course-reviews/" +
        getCourseKey(this.state.thisCourse) +
        "?ts=" +
        reviewPrimaryKey,
      {
        headers: {
          Authorization: this.props.userTokens
            ? this.props.userTokens.idToken
            : "",
        },
      }
    )
      .then(() => {
        Alert.success(this.props.t(`courseInfo.Review deleted`), {
          position: "bottom",
          effect: "jelly",
        });

        const reviews = this.state.thisCourseReviews;
        reviews.splice(reviewIndex, 1);
        this.setState({ thisCourseReviews: reviews });
      })
      .catch((e) => console.log(e));
  };

  signIn = () =>
    Auth.federatedSignIn({
      provider: "Google",
      customState: window.location.pathname + window.location.search,
    });

  closeSignInModal = () => this.setState({ isSignInModalOpen: false });

  render() {
    const {
      thisCourse,
      relatedCourses,
      thisCourseReviews,
      relatedCourseReviews,
      avgSatisfaction,
      avgDifficulty,
      avgBenefit,
      searchLang,
      reviewLang,
      isLoaded,
      isModalOpen,
      error,
      isAddReviewFormOpen,
      newReviewSatisfaction,
      newReviewDifficulty,
      newReviewBenefit,
      newReviewComment,
      newReviewIsSending,
      isSignInModalOpen,
    } = this.state;
    if (error)
      return <FetchError onRetry={this.loadReviewsAndRelatedCourses} />;
    return (
      <RowWrapper>
        <Helmet>
          <title>WasedaTime - Course Reviews</title>
          <meta
            name="description"
            content="Latest Course Reviews by Waseda Students."
          />
          <meta property="og:title" content="WasedaTime - Course Reviews" />
          <meta
            property="og:description"
            content="Latest Course Reviews by Waseda Students."
          />
          <meta property="og:site_name" content="WasedaTime - Course Reviews" />
        </Helmet>
        <Header
          title={this.props.t("navigation.course info")}
          placeholder="Search course (in construction...)"
          disabled={true}
        />
        <LongWrapper>
          <ExtendedOverlay>
            <div>
              <FetchedCourseItem
                searchTerm={""}
                searchLang={searchLang}
                course={thisCourse}
                isDetailDisplayed={true}
              />

              <CourseDetails course={thisCourse} />

              {isLoaded ? (
                isAddReviewFormOpen ? (
                  <AddReviewForm
                    toggleModal={this.toggleAddReviewForm}
                    satisfaction={newReviewSatisfaction}
                    difficulty={newReviewDifficulty}
                    benefit={newReviewBenefit}
                    comment={newReviewComment}
                    handleScaleChange={this.onNewReviewScaleChange}
                    handleCommentChange={this.onNewReviewCommentChange}
                    handleFormSubmit={this.onNewReviewFormSubmit}
                    isSending={newReviewIsSending}
                  />
                ) : (
                  <CourseReviews
                    reviews={thisCourseReviews}
                    scalesAvg={{
                      satisfaction: avgSatisfaction,
                      difficulty: avgDifficulty,
                      benefit: avgBenefit,
                    }}
                    searchLang={searchLang}
                    reviewLang={reviewLang}
                    switchReviewLang={this.switchReviewLang}
                    openReviewNewForm={this.openReviewNewForm}
                    openReviewEditForm={this.openReviewEditForm}
                    deleteReview={this.deleteReview}
                    t={this.props.t}
                  />
                )
              ) : (
                <LoadingSpinner message={"Loading reviews..."} />
              )}
            </div>
            <br />
          </ExtendedOverlay>
        </LongWrapper>
        <RelatedCourses
          courses={relatedCourses}
          reviews={relatedCourseReviews}
          searchLang={searchLang}
          isModalOpen={isModalOpen}
          handleToggleModal={this.handleToggleModal}
        />
        <SignInModal
          isModalOpen={isSignInModalOpen}
          signIn={this.signIn}
          closeModal={this.closeSignInModal}
        />
      </RowWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  userTokens: getUserTokens(state),
});

export default withFetchCourses(
  withNamespaces("translation")(connect(mapStateToProps)(CourseInfo))
);
