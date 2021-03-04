import React, { useState } from "react";
import { navigate } from "@reach/router";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faMapMarkerAlt,
  faMinusCircle,
  faPlusCircle,
  faExternalLinkSquareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { WithTranslation, withTranslation } from "react-i18next";
import { termKeysDecoder } from "@bit/wasedatime.syllabus.ts.utils.term-keys-decoder";
import { getCourseTitleAndInstructor } from "@bit/wasedatime.syllabus.ts.utils.course-search";
import { Highlight } from "@bit/wasedatime.syllabus.ts.ui.highlight";
import Lang from "@bit/wasedatime.core.ts.constants.langs";
import * as schoolIconEnMap from "@bit/wasedatime.syllabus.ts.constants.school-name-icon-map-en";
import * as schoolIconJaMap from "@bit/wasedatime.syllabus.ts.constants.school-name-icon-map-ja";
import { SyllabusKey } from "@bit/wasedatime.syllabus.ts.constants.syllabus-data";
import { media, sizes } from "@bit/wasedatime.core.ts.utils.responsive-utils";
import { InvisibleButton } from "@bit/wasedatime.core.ts.styles.button";
import { Badge } from "@bit/wasedatime.core.ts.styles.badge";
import CourseInfo from "./courseInfo/CourseInfo";
import Course from "../types/course";

const CourseItemWrapper = styled("li")`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  align-items: stretch;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 0px 8px 0px;
  margin: 1em 0.5em;
  padding: 0.5em 0.8em;
  width: 96%;
  line-height: 150%;
  &:hover {
    background-color: #eee;
    box-shadow: none;
    cursor: pointer;
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
  width: 24px;
  height: 24px;
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
    <SchoolIconImage
      src={
        lng === Lang.EN
          ? schoolIconEnMap.allSchoolNameIconMap[school]
          : schoolIconJaMap.allSchoolNameIconMap[school]
      }
      width="24px"
      height="24px"
      alt={school}
    />
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
  if (course[SyllabusKey.LANG].includes(-1)) return "N/A";
  return course[SyllabusKey.LANG]
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
    return `${(period / 10) | 0}-${period % 10}`;
  } else if (period === 0) {
    return t("courseInfo.Details.Type.On-demand");
  } else {
    return `${period}`;
  }
};

interface Props extends WithTranslation {
  searchTerm: string | string[];
  searchLang: string | string[];
  course: Course;
  isAddable: boolean;
  handleOnClick: (title: string, lng: string) => void;
  expandable: boolean;
  openNewTabOnClick: boolean;
  history?: any;
}

const CourseItem = ({
  searchTerm,
  searchLang,
  course,
  isAddable,
  handleOnClick,
  expandable,
  openNewTabOnClick,
  history,
  t,
  i18n,
}: Props) => {
  const [expanded, setExpanded] = useState(
    window.location.search.includes(course[SyllabusKey.ID])
  );

  const { title, instructor } = getCourseTitleAndInstructor(course, searchLang);
  const highlightedTitle = Highlight(searchTerm, searchLang, title);
  const highlightedInstructor = Highlight(searchTerm, searchLang, instructor);
  const langTerm = getLang(course, t);
  const yearTerm = combineYearTerm(
    "2020",
    termKeysDecoder(course[SyllabusKey.TERM]),
    t
  );
  const schoolIcons = mapSchoolToIcon(
    course[SyllabusKey.SCHOOL],
    i18n.language
  );
  //Need to use index as keys due to Waseda's data.
  const occurrences = course[SyllabusKey.OCCURRENCES].map(
    (occurrence, index) => {
      const day = getDay(occurrence[SyllabusKey.OCC_DAY], t);
      const period = getPeriod(occurrence[SyllabusKey.OCC_PERIOD], t);
      const location = getLocation(occurrence[SyllabusKey.OCC_LOCATION], t);
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

  const navigateToCourse = async () => {
    await navigate(`/courses/syllabus?courseId=${course[SyllabusKey.ID]}`);
  };

  return (
    <CourseItemWrapper expandable={expandable}>
      <div
        onClick={async () => {
          expandable ? setExpanded(!expanded) : await navigateToCourse();
        }}
      >
        <StyledHeading>{highlightedTitle}</StyledHeading>
        {expandable && (
          <StyledSubHeading>{course[SyllabusKey.SUBTITLE]}</StyledSubHeading>
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
            <InvisibleButton
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleOnClick(title, i18n.language);
              }}
              style={{ cursor: "pointer" }}
              aria-label="Add course button"
            >
              {buttonIcon}
            </InvisibleButton>
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
        </DetailWrapper>
      </div>
      {expandable && expanded && (
        <CourseInfo course={course} searchLang={searchLang} />
      )}
    </CourseItemWrapper>
  );
};

export default withTranslation("translation")(CourseItem);
