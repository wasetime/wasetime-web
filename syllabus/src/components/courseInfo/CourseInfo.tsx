import React from "react";
import styled from "styled-components";
import { WithTranslation, withTranslation } from "react-i18next";
import Course from "../../types/course";
import Review from "../../types/review";
import CourseDetails from "./CourseDetails";
import CourseReviews from "./CourseReviews";
import ShareButtons from "./ShareButtons";
import CourseItemContainer from "../../containers/CourseItemContainer";
import { SyllabusKey } from "@bit/wasedatime.syllabus.ts.constants.syllabus-data";
import LoadingSpinner from "@bit/wasedatime.core.ts.ui.loading-spinner";
import levenshtein from "levenshtein-edit-distance";
import { getUserAttr } from "@bit/wasedatime.core.ts.utils.user";
import API from "@aws-amplify/api";
import { connect } from "react-redux";
import { ReduxRootState } from "../../redux/reducers";
import { getFetchedCoursesList } from "../../redux/reducers/fetchedCourses";
import { media } from "@bit/wasedatime.core.ts.utils.responsive-utils";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkSquareAlt } from "@fortawesome/free-solid-svg-icons";

const CourseInfoWrapper = styled(Segment)`
  width: 100%;
  display: block;
  cursor: auto;
`;

const RelatedCourses = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow-x: auto;
  padding: none;
  margin: none;
`;

const RelatedCourse = styled.div`
  flex: 0 0 25%;
`;

const StyledSubHeading = styled("h6")`
  align-self: flex-start;
  margin: 1rem 0px;
  padding-left: 1rem;
  border-left: 5px solid rgb(148, 27, 47);
  font-weight: 300;
`;

const getCourseKey = (course) => course[SyllabusKey.ID].substring(0, 12);

const getRelatedCourses = (loadedCourses, thisCourse, thisCourseKey) => {
  const courseId = thisCourse[SyllabusKey.ID];
  const courseCode = thisCourse[SyllabusKey.CODE];
  const thisCourseTitle = thisCourse[SyllabusKey.TITLE];
  const thisCourseSchool = thisCourse[SyllabusKey.SCHOOL];

  const sortedRelatedCourses = loadedCourses
    .filter(
      (course) =>
        course[SyllabusKey.CODE] === courseCode &&
        course[SyllabusKey.ID] !== courseId
    )
    .sort((a, b) => {
      if (
        a[SyllabusKey.SCHOOL] === thisCourseSchool &&
        b[SyllabusKey.SCHOOL] !== thisCourseSchool
      )
        return -1;
      if (
        a[SyllabusKey.SCHOOL] !== thisCourseSchool &&
        b[SyllabusKey.SCHOOL] === thisCourseSchool
      )
        return 1;
      return (
        levenshtein(thisCourseTitle, a[SyllabusKey.TITLE]) -
        levenshtein(thisCourseTitle, b[SyllabusKey.TITLE])
      );
    })
    .slice(0, 10);
  return sortedRelatedCourses;
};

interface ReduxStateProps {
  fetchedCourses: Course[];
}

interface OwnProps extends WithTranslation {
  course: Course;
  searchLang: string;
}

interface OwnState {
  relatedCourses: Course[];
  thisCourseReviews: Review[];
  isLoaded: boolean;
}

class CourseInfo extends React.Component<ReduxStateProps & OwnProps, OwnState> {
  state = {
    relatedCourses: [],
    thisCourseReviews: [],
    isLoaded: false,
  };

  async loadReviewsAndRelatedCourses() {
    const thisCourse = this.props.course;
    let loadedCourses = this.props.fetchedCourses;
    const thisCourseKey = getCourseKey(thisCourse);

    // Get related courses by code, sort them, and get the first k courses (k=10)
    const relatedCourses = getRelatedCourses(
      loadedCourses,
      thisCourse,
      thisCourseKey
    );

    // Fetch reviews with course key
    const thisCourseReviews = await this.getCourseReviewsByKey(thisCourseKey);

    this.setState({
      relatedCourses: relatedCourses,
      thisCourseReviews: thisCourseReviews,
      isLoaded: true,
    });
  }

  getCourseReviewsByKey = async (courseKey: string): Promise<Review[]> => {
    try {
      const userAttr = await getUserAttr();
      const res = await API.get(
        "wasedatime-dev",
        "/course-reviews/" +
          courseKey +
          "?uid=" +
          (userAttr ? userAttr.id : ""),
        {
          headers: {
            "x-api-key": "0PaO2fHuJR9jlLLdXEDOyUgFXthoEXv8Sp0oNsb8",
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    this.loadReviewsAndRelatedCourses();
  }

  render() {
    const { course, searchLang, t } = this.props;
    const { isLoaded, thisCourseReviews, relatedCourses } = this.state;

    return (
      <CourseInfoWrapper>
        <CourseDetails course={course} />
        <Grid style={{ textAlign: "center", margin: "1em 0px" }}>
          <Grid.Column width={6}>
            <p style={{ marginBottom: "0px" }}>Official Syllabus:</p>
            <a
              style={{ alignSelf: "flex-start" }}
              href={`https://www.wsl.waseda.jp/syllabus/JAA104.php?pKey=${
                course.a
              }${t("syllabus.langParam")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon
                style={{ color: "#6495ED" }}
                icon={faExternalLinkSquareAlt}
                size="2x"
              />
            </a>
          </Grid.Column>
          <Grid.Column width={10}>
            <ShareButtons courseId={course.a} />
          </Grid.Column>
        </Grid>
        {isLoaded ? (
          <CourseReviews
            courseKey={getCourseKey(course)}
            course={course}
            reviews={thisCourseReviews}
            searchLang={searchLang}
          />
        ) : (
          <LoadingSpinner message={"Loading reviews..."} />
        )}
        <StyledSubHeading>{t(`courseInfo.Related courses`)}</StyledSubHeading>
        <RelatedCourses>
          {isLoaded ? (
            relatedCourses.map((course, i) => (
              <RelatedCourse key={i}>
                <CourseItemContainer
                  searchTerm={""}
                  searchLang={searchLang}
                  course={course}
                  expandable={false}
                />
              </RelatedCourse>
            ))
          ) : (
            <LoadingSpinner message={"Loading related courses..."} />
          )}
        </RelatedCourses>
      </CourseInfoWrapper>
    );
  }
}

const mapStateToProps = (state: ReduxRootState) => ({
  fetchedCourses: getFetchedCoursesList(state.fetchedCourses.coursesBySchool),
});

export default connect<ReduxStateProps, {}>(
  mapStateToProps,
  null
)(withTranslation("translation")(CourseInfo));
