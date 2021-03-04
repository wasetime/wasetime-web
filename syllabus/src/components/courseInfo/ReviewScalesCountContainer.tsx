import React from "react";
import MediaQuery from "react-responsive";
import styled from "styled-components";
import ReviewStars from "./ReviewStars";
import { media, sizes } from "@bit/wasedatime.core.ts.utils.responsive-utils";
import { WithTranslation, withTranslation } from "react-i18next";

const ReviewScalesRow = styled("div")`
  display: flex;
  flex-direction: row;
  font-size: 1.5em;
  background: #eee;
  padding: 0.5rem;
  line-height: 100%;
  ${media.tablet`font-size: 1.2em;`};
  ${media.phoneMini`font-size: 1em;`};
`;

const ReviewScalesList = styled("div")`
  flex: 5;
  display: flex;
  flex-direction: row;
  ${media.tablet`flex: 2; flex-direction: column;`};
`;

const ReviewScale = styled("div")`
  flex: 1;
  padding: 1rem 0px;
  text-align: center;
  color: #333;
  ${media.tablet`
    flex: 1;
    padding: 0.2rem 0px;
    text-align: left;
  `};
`;

const ReviewsCount = styled("div")`
  flex: 1;
  padding: 1rem 0px;
  padding-top: 1.5rem;
  text-align: center;
  justify-content: flex-start;
  color: #777;
`;

interface Props extends WithTranslation {
  avgSatisfaction: number;
  avgDifficulty: number;
  avgBenefit: number;
  thisCourseReviewsLength: number;
}

const ReviewScalesCountContainer = ({
  avgSatisfaction,
  avgDifficulty,
  avgBenefit,
  thisCourseReviewsLength,
  t,
}: Props) => (
  <ReviewScalesRow>
    <ReviewScalesList>
      <ReviewScale>
        <ReviewStars scale={avgSatisfaction} />
        <MediaQuery maxWidth={sizes.tablet}>
          {(matches) => !matches && <br />}
        </MediaQuery>
        <span>&nbsp;{t(`courseInfo.Satisfaction`)}</span>
      </ReviewScale>
      <ReviewScale>
        <ReviewStars scale={avgDifficulty} />
        <MediaQuery maxWidth={sizes.tablet}>
          {(matches) => !matches && <br />}
        </MediaQuery>
        <span>&nbsp;{t(`courseInfo.Difficulty`)}</span>
      </ReviewScale>
      <ReviewScale>
        <ReviewStars scale={avgBenefit} />
        <MediaQuery maxWidth={sizes.tablet}>
          {(matches) => !matches && <br />}
        </MediaQuery>
        <span>&nbsp;{t(`courseInfo.Benefit`)}</span>
      </ReviewScale>
    </ReviewScalesList>

    <ReviewsCount>
      <MediaQuery minWidth={sizes.desktop}>
        {(matches) =>
          matches ? (
            <span>{thisCourseReviewsLength}</span>
          ) : (
            <h1 style={{ margin: "0px" }}>{thisCourseReviewsLength}</h1>
          )
        }
      </MediaQuery>{" "}
      {thisCourseReviewsLength > 1
        ? t(`courseInfo.Reviews`)
        : t(`courseInfo.Review`)}
    </ReviewsCount>
  </ReviewScalesRow>
);

export default withTranslation("translation")(ReviewScalesCountContainer);
