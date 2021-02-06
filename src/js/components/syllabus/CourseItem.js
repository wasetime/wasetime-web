import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faMapMarkerAlt,
  faMinusCircle,
  faPlusCircle,
  faExternalLinkSquareAlt,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import { withNamespaces } from "react-i18next";

import { termKeysDecoder } from "../../utils/termKeysDecoder";
import { getCourseTitleAndInstructor } from "../../utils/courseSearch";
import { highlight } from "../../utils/highlight";
import { SYLLABUS_KEYS } from "../../config/syllabusKeys";
import { media, sizes } from "../../styled-components/utils";
import { InvisibleButton } from "../../styled-components/Button";
import { allSchoolNameIconMap } from "../../utils/schoolNameIconMap";
import FetchedShareButton from "../../containers/syllabus/FetchedShareButton";

const RowWrapper = styled("li")`
  display: flex;
  flex-direction: row;
  justify-content: center;
  overflow-y: hidden;
`;

const CourseItemWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  align-items: stretch;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 0px 8px 0px;
  margin: 0.5em 0.5em;
  padding: 0.5em 0.8em;
  width: 90%;
  line-height: 150%;
  &:hover {
    ${(props) =>
      !props.isDetailDisplayed &&
      "background-color: #eee; box-shadow: none; cursor: pointer;"}
  }
`;

const StyledHeading = styled("h3")`
  margin: 0;
  text-align: left;
  font-size: 1.2em;
  ${media.phone`font-size: 1.1em;`};
  font-weight: 600;
  color: #000;
`;

const StyledSubHeading = styled(StyledHeading)`
  font-size: 1em;
  ${media.phone`font-size: 0.9em;`};
  color: #777;
`;

const CourseItemRow = styled("div")`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const IconBadgeWrapper = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`;

const SchoolIconList = styled("ul")`
  display: flex;
  flex-direction: row;
  margin: 0.1em 0;
  padding: 0;
  list-style: none;
  list-style-type: none;
`;

const SchoolIconItem = styled("li")`
  display: flex;
  margin: 0 0.3em 0 0;
  padding: 0;
`;

const SchoolIconImage = styled("img")`
  height: 2.1em;
`;

const Badge = styled("span")`
  display: inline-block;
  background-color: #666;
  color: #fff;
  padding: 0.15em 0.3em;
  border: none;
  border-radius: 0.2em;
  font-size: 0.8em;
  margin: 0.1em 0.3em 0.1em 0;
  line-height: 120%;
`;

const DetailWrapper = styled("div")`
  display: flex;
  flex-direction: row;
  font-size: 1.2em;
  flex-wrap: wrap;
  ${media.phone`font-size: 1.0em;`};
`;

const DescriptionWrapper = styled("div")`
  flex: 3 0 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Description = styled("div")`
  flex: 1 0 auto;
  text-align: left;
`;

const OccurrenceList = styled("ul")`
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: left;
`;

const mapSchoolToIcon = (school, lng) => (
  <SchoolIconItem key={school}>
    <SchoolIconImage src={allSchoolNameIconMap(lng)[school]} />
  </SchoolIconItem>
);

const combineYearTerm = (year, term, t) => {
  var str = `${year} `;
  term.split(" ").forEach((substr) => {
    str = str + t(`syllabus.semesterMap.${substr}`);
  });
  return str;
};

const getLang = (course, t) => {
  if (course[SYLLABUS_KEYS.LANG].includes(-1)) return "N/A";
  return course[SYLLABUS_KEYS.LANG]
    .toString()
    .split(",")
    .map((l, i) => (i > 0 ? " / " : "") + t(`syllabus.languageKeys.${l}`));
};

const getDay = (day, t) => {
  switch (day) {
    case 1:
      return `${t("common.mon")}.`;
    case 2:
      return `${t("common.tue")}.`;
    case 3:
      return `${t("common.wed")}.`;
    case 4:
      return `${t("common.thu")}.`;
    case 5:
      return `${t("common.fri")}.`;
    case 6:
      return `${t("common.sat")}.`;
    case 7:
      return `${t("common.sun")}.`;
    default:
      return "";
  }
};

const getLocation = (location, t) => {
  if (location === "undecided") {
    return t("syllabus.location.undecided");
  } else {
    return location;
  }
};

const getPeriod = (period, t) => {
  if (period === -1) {
    return t("syllabus.location.undecided");
  } else if (period > 9) {
    return `${parseInt(period / 10)}-${period % 10}`;
  } else if (period === 0) {
    return t("courseInfo.Details.Type.On-demand");
  } else {
    return `${period}`;
  }
};

const CourseItem = ({
  searchTerm,
  searchLang,
  course,
  isAddable,
  handleOnClick,
  handleClickSyllabusLink,
  isDetailDisplayed,
  needLineBreak,
  openNewTabOnClick,
  history,
  t,
  lng,
}) => {
  const { title, instructor } = getCourseTitleAndInstructor(course, searchLang);
  const highlightedTitle = highlight(searchTerm, searchLang, title);
  const highlightedInstructor = highlight(searchTerm, searchLang, instructor);
  const langTerm = getLang(course, t);
  const yearTerm = combineYearTerm(
    "2020",
    termKeysDecoder(course[SYLLABUS_KEYS.TERM]),
    t
  );
  const schoolIcons = mapSchoolToIcon(course[SYLLABUS_KEYS.SCHOOL], lng);
  const syllabusId = course[SYLLABUS_KEYS.ID];
  const shareLink = `https://wasedatime.com/courseInfo?courseID=${syllabusId}%26searchLang=${searchLang}`; // share link
  //Need to use index as keys due to Waseda's data.
  const occurrences = course[SYLLABUS_KEYS.OCCURRENCES].map(
    (occurrence, index) => {
      const day = getDay(occurrence[SYLLABUS_KEYS.OCC_DAY], t);
      const period = getPeriod(occurrence[SYLLABUS_KEYS.OCC_PERIOD], t);
      const location = getLocation(occurrence[SYLLABUS_KEYS.OCC_LOCATION], t);
      return (
        <li key={index}>
          <span>
            <FontAwesomeIcon icon={faClock} size="1x" />
            &nbsp;
            {`${day}${period}`}
            &nbsp;&nbsp;
            <FontAwesomeIcon icon={faMapMarkerAlt} size="1x" />
            &nbsp;
            {`${location}`}
          </span>
        </li>
      );
    }
  );

  const buttonIcon = (
    <FontAwesomeIcon
      style={isAddable ? { color: "#48af37" } : { color: "#ce0115" }}
      icon={isAddable ? faPlusCircle : faMinusCircle}
      size="2x"
      transform="shrink-2"
    />
  );

  return (
    <RowWrapper>
      <CourseItemWrapper
        isDetailDisplayed={isDetailDisplayed}
        onClick={() => {
          if (!isDetailDisplayed) {
            if (openNewTabOnClick) {
              window.open(
                `/courseInfo?courseID=${syllabusId}&searchLang=${searchLang}`,
                "_blank"
              );
            } else {
              history.push(
                `/courseInfo?courseID=${syllabusId}&searchLang=${searchLang}`
              );
            }
          }
        }}
      >
        <StyledHeading>{highlightedTitle}</StyledHeading>
        {isDetailDisplayed && (
          <StyledSubHeading>{course[SYLLABUS_KEYS.SUBTITLE]}</StyledSubHeading>
        )}
        <CourseItemRow>
          <IconBadgeWrapper>
            <SchoolIconList>{schoolIcons}</SchoolIconList>
            <Badge>{langTerm}</Badge>
            {/* keywordsList */}
          </IconBadgeWrapper>
          <div
            style={{
              display: "flex",
              flex: "1 0 auto",
              justifyContent: "flex-end",
              borderRadius: "5px",
            }}
          >
            {isDetailDisplayed && (
              <a
                style={{ alignSelf: "flex-start" }}
                href={`https://www.wsl.waseda.jp/syllabus/JAA104.php?pKey=${syllabusId}${t(
                  "syllabus.langParam"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  handleClickSyllabusLink(title, lng);
                }}
              >
                <FontAwesomeIcon
                  style={{ color: "#6495ED" }}
                  icon={faExternalLinkSquareAlt}
                  size="2x"
                  transform="shrink-2"
                />
              </a>
            )}
            <InvisibleButton /* Add Button */
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleOnClick(title, lng);
              }}
            >
              {buttonIcon}
            </InvisibleButton>

            <FetchedShareButton
              shareLink={shareLink}
              isDetailDisplayed={isDetailDisplayed}
              display="icon"
              sizesDesktop={sizes.desktop}
              needLineBreak={needLineBreak}
            />
          </div>
        </CourseItemRow>

        <DetailWrapper>
          <DescriptionWrapper>
            <Description>{yearTerm}</Description>
            <Description>
              <OccurrenceList>{occurrences}</OccurrenceList>
            </Description>
            <Description>{highlightedInstructor}</Description>
          </DescriptionWrapper>
          <FetchedShareButton
            shareLink={shareLink}
            isDetailDisplayed={isDetailDisplayed}
            display="bar"
            sizesDesktop={sizes.desktop}
            needLineBreak={needLineBreak}
          />
        </DetailWrapper>
      </CourseItemWrapper>
    </RowWrapper>
  );
};

// <Instructors>{highlightedInstructor}</Instructors>

export default withRouter(withNamespaces("translation")(CourseItem));

CourseItem.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  course: PropTypes.object.isRequired,
  isAddable: PropTypes.bool.isRequired,
  handleOnClick: PropTypes.func.isRequired,
};
