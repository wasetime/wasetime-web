import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import { InvisibleButton } from "../../styled-components/Button";
import { RowWrapper } from "../../styled-components/Wrapper";
import { media } from "../../styled-components/utils";

const ExtendedRowWrapper = styled(RowWrapper)`
  flex: none;
  justify-content: center;
  font-size: 1.3em;
  ${media.phone`
    font-size: 1.1em;
  `};
  padding: 80px 0 0.1em 0;
  ${media.tablet`padding-top: 1rem;`}
`;

const ExtendedInvisibleButton = styled(InvisibleButton)`
  color: #000;
  &:hover {
    color: #b51e36;
  }
  &:active {
    color: #000;
  }
  ${media.tablet`
    &:focus {
        color: #000;
    }`};
  ${media.phone`
    &:focus {
      color: #000;
    }
  `};
`;

const SemesterTitle = styled("div")`
  width: 10em;
  text-align: center;
`;

const SemesterSwitcher = ({
  semesterTitle,
  handleIncreaseSemesterIndex,
  handleDecreaseSemesterIndex,
}) => {
  return (
    <ExtendedRowWrapper>
      <ExtendedInvisibleButton onClick={handleIncreaseSemesterIndex}>
        <FontAwesomeIcon icon={faAngleDoubleLeft} size="1x" />
      </ExtendedInvisibleButton>
      <SemesterTitle>{semesterTitle}</SemesterTitle>
      <ExtendedInvisibleButton onClick={handleDecreaseSemesterIndex}>
        <FontAwesomeIcon icon={faAngleDoubleRight} size="1x" />
      </ExtendedInvisibleButton>
    </ExtendedRowWrapper>
  );
};

export default SemesterSwitcher;
