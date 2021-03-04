import React from "react";
import styled from "styled-components";

const ReviewLangSwitch = styled("button")`
  font-size: 0.6em;
  border: none;
  padding: 2px 10px;
  background-color: #ddd;
  ${(props) =>
    props.active && "border-bottom: 2px solid #fff; background-color: #eee;"};
  ${(props) => props.isInHeading && "line-height: 20px;"};

  &:hover {
    outline: none;
    background-color: #eee;
  }

  &:focus {
    outline: none;
  }
`;

interface Props {
  reviewLang: string;
  switchReviewLang: (lng: string) => void;
  isInHeading: boolean;
}

const ReviewLangSwitches = ({
  reviewLang,
  switchReviewLang,
  isInHeading,
}: Props) => (
  <span>
    <ReviewLangSwitch
      active={reviewLang === "en"}
      onClick={() => switchReviewLang("en")}
      isInHeading={isInHeading}
    >
      English
    </ReviewLangSwitch>
    <ReviewLangSwitch
      active={reviewLang === "ja"}
      onClick={() => switchReviewLang("ja")}
      isInHeading={isInHeading}
    >
      日本語
    </ReviewLangSwitch>
    <ReviewLangSwitch
      active={reviewLang === "zh-TW"}
      onClick={() => switchReviewLang("zh-TW")}
      isInHeading={isInHeading}
    >
      繁中
    </ReviewLangSwitch>
    <ReviewLangSwitch
      active={reviewLang === "zh-CN"}
      onClick={() => switchReviewLang("zh-CN")}
      isInHeading={isInHeading}
    >
      简中
    </ReviewLangSwitch>
    <ReviewLangSwitch
      active={reviewLang === "ko"}
      onClick={() => switchReviewLang("ko")}
      isInHeading={isInHeading}
    >
      한국
    </ReviewLangSwitch>
  </span>
);

export default ReviewLangSwitches;
