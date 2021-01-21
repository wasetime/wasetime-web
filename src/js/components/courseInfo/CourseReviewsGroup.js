import React from "react";
import styled from "styled-components";
import { withNamespaces } from "react-i18next";

import FetchedCourseItem from "../../containers/syllabus/FetchedCourseItem";
import ReviewsList from "./ReviewsList";

const CourseReviewsGroupWrapper = styled("div")`
  background: #fff;
  margin-bottom: 1em;
`;

const ReviewsHeader = styled("h3")`
  margin: -8px 8px 0 8px;
  text-align: center;
  background: #eee;
`;

const CourseReviewsGroup = ({ course, reviews, searchLang, reviewLang, t }) => {
  return (
    <CourseReviewsGroupWrapper>
      <FetchedCourseItem
        searchTerm={""}
        searchLang={searchLang}
        course={course}
        isDetailDisplayed={false}
        needLineBreak={true}
      />
      <ReviewsHeader>{t(`courseInfo.Reviews`)}</ReviewsHeader>
      {reviews && (
        <ReviewsList
          reviews={reviews}
          searchLang={searchLang}
          reviewLang={reviewLang}
        />
      )}
    </CourseReviewsGroupWrapper>
  );
};

export default withNamespaces("translation")(CourseReviewsGroup);
