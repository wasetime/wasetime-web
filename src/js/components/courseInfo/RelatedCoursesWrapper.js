import React from "react";
import styled from "styled-components";
import CourseReviewsGroup from "./CourseReviewsGroup";
import ReviewLangSwitches from "./ReviewLangSwitches";
import { media } from "../../styled-components/utils";
import { Overlay } from "../../styled-components/Overlay";
import { withNamespaces } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { SYLLABUS_KEYS } from "../../config/syllabusKeys";

const ExtendedOverlay = styled(Overlay)`
  padding: 0 25px;
  ${media.tablet`padding-right: 2rem;`};
`;

const RelatedCoursesHeading = styled("div")`
  z-index: 80;
  background-color: #fff;
  height: 75px;
`;

const StyledSubHeading = styled("h2")`
  align-self: flex-start;
  margin-top: 1em !important;
  margin-bottom: 0.5rem;
  padding-left: 1rem;
  border-left: 5px solid rgb(148, 27, 47);
  font-size: 2rem;
  font-weight: 300;
  ${media.tablet`font-size: 2rem;`};
`;

const RelatedCoursesWrapper = styled("div")`
  padding-top: 0.5rem;
  max-height: calc(100vh - 145px);
  overflow-y: auto;
  ${media.tablet`max-height: calc(100vh - 77px);`};
`;

const RelatedCoursesExplainTooltip = styled("div")`
  position: relative;
  display: inline-block;

  &:hover span {
    visibility: visible;
  }
`;

const RelatedCoursesExplainTooltipText = styled("span")`
  visibility: hidden;
  width: 150px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  margin-left: 5px;
  font-size: 0.6em;
  position: absolute;
  z-index: 1;
  ${media.phoneMini`left: -400%; top: 100%;`};
`;

const getCourseKey = (course) => course[SYLLABUS_KEYS.ID].substring(0, 12);

class RelatedCoursesContainer extends React.Component {
  state = {
    reviewLang: this.props.lng === "jp" ? "ja" : this.props.lng,
  };

  switchReviewLang = (lang) => this.setState({ reviewLang: lang });

  render() {
    const { relatedCourses, courseReviews, searchLang, t } = this.props;
    return (
      <ExtendedOverlay>
        <RelatedCoursesHeading>
          <StyledSubHeading>
            {t(`courseInfo.Related courses`)}{" "}
            <RelatedCoursesExplainTooltip>
              <FontAwesomeIcon
                icon={faQuestionCircle}
                style={{ fontSize: "0.7em" }}
              ></FontAwesomeIcon>
              <RelatedCoursesExplainTooltipText>
                {t(`courseInfo.Related courses explanation`)}
              </RelatedCoursesExplainTooltipText>
            </RelatedCoursesExplainTooltip>
          </StyledSubHeading>
          <ReviewLangSwitches
            reviewLang={this.state.reviewLang}
            switchReviewLang={this.switchReviewLang}
            isInHeading={false}
          />
        </RelatedCoursesHeading>
        <RelatedCoursesWrapper>
          {relatedCourses.map((relatedCourse, i) => (
            <CourseReviewsGroup
              course={relatedCourse}
              reviews={courseReviews[getCourseKey(relatedCourse)]}
              searchLang={searchLang}
              reviewLang={this.state.reviewLang}
              key={i}
            />
          ))}
        </RelatedCoursesWrapper>
      </ExtendedOverlay>
    );
  }
}

export default withNamespaces("translation")(RelatedCoursesContainer);
