import React from "react";
import styled from "styled-components";
import MediaQuery from "react-responsive";
import { media, sizes } from "@bit/wasedatime.core.ts.utils.responsive-utils";
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

const getAvgScales = (reviews) => {
  let satisfactionSum = 0,
    difficultySum = 0,
    benefitSum = 0;
  reviews.forEach((review) => {
    satisfactionSum += review.satisfaction;
    difficultySum += review.difficulty;
    benefitSum += review.benefit;
  });
  // calculate the averages of scales and round them to the nearest .5
  return {
    satisfaction:
      Math.round((satisfactionSum / thisCourseReviews.length) * 2) / 2,
    difficulty: Math.round((difficultySum / thisCourseReviews.length) * 2) / 2,
    benefit: Math.round((benefitSum / thisCourseReviews.length) * 2) / 2,
  };
};

class CourseReviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: props.reviews,
      scalesAvg: getAvgScales(props.reviews),
    };
  }

  render() {
    const { searchLang, reviewLang, t } = this.props;

    const { reviews, scalesAvg } = this.props;

    return (
      <StyledReviewsWrapper>
        <StyledSubHeading>
          {t(`courseInfo.Reviews`)}{" "}
          <MediaQuery minWidth={sizes.phone}>
            {(matches) => (matches ? " " : <br />)}
          </MediaQuery>
          <span style={{ marginLeft: "10px" }}>
            <ReviewLangSwitches
              reviewLang={reviewLang}
              switchReviewLang={(x) => {}}
              isInHeading={true}
            />
          </span>
          <MediaQuery minWidth={sizes.phone}>
            {(matches) =>
              matches && (
                <AddReviewButton onClick={() => {}}>
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
              <AddReviewButton onClick={() => {}}>
                <FontAwesomeIcon icon={faPen} />{" "}
                {t(`courseInfo.Write your Review`)}
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
            openReviewEditForm={() => {}}
            deleteReview={() => {}}
          />
        </ReviewsListWrapper>
        <br />
      </StyledReviewsWrapper>
    );
  }
}

export default CourseReviews;