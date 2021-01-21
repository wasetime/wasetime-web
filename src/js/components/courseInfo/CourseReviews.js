import React from "react";
import styled from "styled-components";
import MediaQuery from "react-responsive";
import { media, sizes } from "../../styled-components/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import ReviewLangSwitches from "./ReviewLangSwitches";
import ReviewScalesCountContainer from "./ReviewScalesCountContainer";
import ReviewsList from "./ReviewsList";

const StyledReviewsWrapper = styled("div")`
  ${media.phone`padding: 0 1em;`}
`;

const StyledSubHeading = styled("h2")`
  align-self: flex-start;
  margin: 1rem 0px;
  padding-left: 1rem;
  border-left: 5px solid rgb(148, 27, 47);
  font-size: 2rem;
  font-weight: 300;
  ${media.tablet`font-size: 2rem;`};
`;

const AddReviewButton = styled("button")`
  background-color: #b51e36;
  color: #fff;
  border: 0px;
  border-radius: 5px;
  font-size: 0.9em;
  float: right;
  ${media.phone`float: none;`}
  ${media.phone`width: 100%;`}
  padding: 0.3rem 0.5em;
`;

const Announcement = styled("div")`
  background-color: #48af37;
  color: #fff;
  margin-top: 20px;
  margin-bottom: 5px;
  padding: 5px 10px;
  font-size: 0.7em;
  border-radius: 3px;
  line-height: normal;
`;

const Disclaimer = styled(Announcement)`
  background-color: #aaa;
  margin: 0.5rem 0px;
`;

const ReviewsListWrapper = styled("div")`
  max-height: 60vh;
  overflow-y: auto;
`;

const CourseReviews = ({
  reviews,
  scalesAvg,
  searchLang,
  reviewLang,
  switchReviewLang,
  openReviewNewForm,
  openReviewEditForm,
  deleteReview,
  t,
}) => (
  <StyledReviewsWrapper>
    <StyledSubHeading>
      {t(`courseInfo.Reviews`)}{" "}
      <MediaQuery minWidth={sizes.phone}>
        {(matches) => (matches ? " " : <br />)}
      </MediaQuery>
      <span style={{ marginLeft: "10px" }}>
        <ReviewLangSwitches
          reviewLang={reviewLang}
          switchReviewLang={switchReviewLang}
          isInHeading={true}
        />
      </span>
      <MediaQuery minWidth={sizes.phone}>
        {(matches) =>
          matches && (
            <AddReviewButton onClick={openReviewNewForm}>
              <FontAwesomeIcon icon={faPen} />{" "}
              {t(`courseInfo.Write your Review`)}
            </AddReviewButton>
          )
        }
      </MediaQuery>
    </StyledSubHeading>
    <MediaQuery minWidth={sizes.phone}>
      {(matches) =>
        !matches && (
          <AddReviewButton onClick={openReviewNewForm}>
            <FontAwesomeIcon icon={faPen} /> {t(`courseInfo.Write your Review`)}
          </AddReviewButton>
        )
      }
    </MediaQuery>
    <Disclaimer>{t(`courseInfo.Disclaimer`)}</Disclaimer>
    <ReviewsListWrapper>
      <ReviewScalesCountContainer
        avgSatisfaction={scalesAvg.satisfaction}
        avgDifficulty={scalesAvg.difficulty}
        avgBenefit={scalesAvg.benefit}
        thisCourseReviewsLength={reviews.length}
      />
      <ReviewsList
        reviews={reviews}
        searchLang={searchLang}
        reviewLang={reviewLang}
        openReviewEditForm={openReviewEditForm}
        deleteReview={deleteReview}
      />
    </ReviewsListWrapper>
    <br />
  </StyledReviewsWrapper>
);

export default CourseReviews;
