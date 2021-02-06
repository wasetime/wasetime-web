import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkSquareAlt,
  faMinusCircle,
  faToggleOff,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import { Manager, Popper, Reference } from "react-popper";
import PropTypes from "prop-types";

import { Arrow, PopperBox } from "../../styled-components/ColorPopper";
import ColorSelector from "./ColorSelector";
import { media } from "../../styled-components/utils";
import { getCourseTitleAndInstructor } from "../../utils/courseSearch";
import { SYLLABUS_KEYS } from "../../config/syllabusKeys";

const RowWrapper = styled("li")`
  display: flex;
  flex-direction: row;
  padding: 0.3em 0;
`;

const CourseItemWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  align-items: stretch;
  color: #000;
`;

const InvisibleButton = styled("button")`
  align-self: flex-start;
  background-color: #fff;
  border: none;
  padding: 0;
  outline: 0;
`;

const ColorButton = styled(InvisibleButton)`
  width: 1.5em;
  height: 1.5em;
  border: solid 2px;
  border-radius: 50%;
  margin: 0.5em 0.5em 0 0;
`;

const StyledHeading = styled("h3")`
  margin: 0;
  text-align: left;
  font-size: 1.2em;
  ${media.phone`font-size: 1.1em;`};
  font-weight: 600;
`;

const CourseItemRow = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const CourseAndPrefItem = ({
  isPopperOpen,
  color,
  visibility,
  displayLang,
  course,
  handleToggleColorPopper,
  handleToggleVisibility,
  handleRemoveCourse,
  handleChangeColor,
  handleClickSyllabusLink,
}) => {
  const { title, instructor } = getCourseTitleAndInstructor(
    course,
    displayLang
  );
  const courseId = course[SYLLABUS_KEYS.ID];
  const removeCourseIcon = (
    <FontAwesomeIcon
      style={{ color: "#ce0115" }}
      icon={faMinusCircle}
      size="2x"
      transform="shrink-2"
    />
  );
  const visibilityIcon = (
    <FontAwesomeIcon
      style={{ color: "#48af37" }}
      icon={visibility ? faToggleOn : faToggleOff}
      size="2x"
      transform="shrink-2"
    />
  );
  return (
    <RowWrapper>
      <Manager>
        <Reference>
          {({ ref }) => (
            <ColorButton
              className={`color-${color}`}
              innerRef={ref}
              onClick={handleToggleColorPopper}
            />
          )}
        </Reference>
        <Popper placement="top">
          {isPopperOpen
            ? ({ ref, style, placement, arrowProps }) => (
                <PopperBox
                  innerRef={ref}
                  style={style}
                  data-placement={placement}
                >
                  <ColorSelector handleChangeColor={handleChangeColor} />
                  <Arrow
                    innerRef={arrowProps.ref}
                    data-placement={placement}
                    style={arrowProps.style}
                  />
                </PopperBox>
              )
            : () => null}
        </Popper>
      </Manager>
      <CourseItemWrapper>
        <StyledHeading>{title}</StyledHeading>
        <CourseItemRow>
          <div
            style={{
              fontSize: "1.2em",
              overflowWrap: "break-word",
              wordWrap: "break-word",
              flex: "1 0 auto",
              width: "0",
            }}
          >
            {instructor}
          </div>
          <div
            style={{
              display: "flex",
              flex: "0 1 auto",
              justifyContent: "flex-end",
            }}
          >
            <InvisibleButton
              onClick={(e) => {
                e.preventDefault();
                handleToggleVisibility(courseId, title);
              }}
            >
              {visibilityIcon}
            </InvisibleButton>

            <a
              style={{ alignSelf: "flex-start" }}
              href={`/courseInfo?courseID=${courseId}&searchLang=${displayLang}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                handleClickSyllabusLink(title);
              }}
            >
              <FontAwesomeIcon
                style={{ color: "#ffae42" }}
                icon={faExternalLinkSquareAlt}
                size="2x"
                transform="shrink-2"
              />
            </a>
            <InvisibleButton
              onClick={(e) => {
                e.preventDefault();
                handleRemoveCourse(courseId, title);
              }}
            >
              {removeCourseIcon}
            </InvisibleButton>
          </div>
        </CourseItemRow>
      </CourseItemWrapper>
    </RowWrapper>
  );
};

export default CourseAndPrefItem;

CourseAndPrefItem.propTypes = {
  course: PropTypes.object.isRequired,
};
