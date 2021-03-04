import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { timetableTheme } from "@bit/wasedatime.syllabus.ts.constants.syllabus-theme";
import { RowWrapper, Wrapper } from "@bit/wasedatime.core.ts.styles.wrapper";
import { Article, Section } from "@bit/wasedatime.core.ts.styles.article";
import Message from "semantic-ui-react/dist/commonjs/collections/Message";
import TimeRowList from "./TimeRowList";
import DayColumnList from "./DayColumnList";
import AddedCourseAndPrefList from "./AddedCourseAndPrefList";
import { media } from "@bit/wasedatime.core.ts.utils.responsive-utils";
import { WithTranslation, withTranslation } from "react-i18next";
import { SyllabusKey } from "@bit/wasedatime.syllabus.ts.constants.syllabus-data";
import Course from "../../types/course";

const ExtendedRowWrapper = styled(RowWrapper)`
  flex-wrap: wrap;
  padding: 0.2em;
  padding-left: 1em;
  ${media.phone`
    padding: 0
  `};
`;

const Column = styled("div")`
  flex: ${(props) => `0 0 ${props.flexBasis};`}
  max-width: ${(props) => `${props.flexBasis};`}
  ${media.tablet`
    flex: 1 0 auto;
    max-width: 100vw;
  `};
  ${media.phone`
    flex: 1 0 auto;
    max-width: 100vw;
  `};
`;

const ScrollableTimetable = styled("div")`
  display: flex;
  flex-direction: row;
  flex: 1 0 0;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
`;

interface Props extends WithTranslation {
  addedCoursesAndPrefs: {
    pref: {
      color: number;
      displayLang: string;
      visibility: boolean;
    };
    course: Course;
  }[];
}

const Timetable = ({ addedCoursesAndPrefs, t }: Props) => {
  const visibleAddedCoursesAndPrefs = addedCoursesAndPrefs.filter(
    (elem) => elem.pref.visibility === true
  );

  const largestDayAndPeriod = visibleAddedCoursesAndPrefs.reduce(
    (acc, elem) => {
      const occurrences = elem.course[SyllabusKey.OCCURRENCES];
      return occurrences.reduce((acc, occurrence) => {
        const unformattedPeriod = occurrence[SyllabusKey.OCC_PERIOD];
        const maxPeriod =
          unformattedPeriod === -1
            ? 0
            : unformattedPeriod > 9
            ? unformattedPeriod % 10
            : unformattedPeriod;
        return {
          ...acc,
          day: Math.max(acc.day, occurrence[SyllabusKey.OCC_DAY]),
          period: Math.max(acc.period, maxPeriod),
        };
      }, acc);
    },
    { day: 1, period: 1 }
  );

  const { day: largestDay, period: largestPeriod } = largestDayAndPeriod;

  return (
    <ExtendedRowWrapper className="theme-default">
      <ThemeProvider theme={timetableTheme}>
        <Column flexBasis="70%">
          <ScrollableTimetable>
            <TimeRowList largestPeriod={largestPeriod} />
            <DayColumnList
              largestDay={largestDay}
              largestPeriod={largestPeriod}
              addedCoursesAndPrefs={visibleAddedCoursesAndPrefs}
            />
          </ScrollableTimetable>
        </Column>
        <Column flexBasis="30%">
          <Wrapper>
            {!addedCoursesAndPrefs.length && (
              <Wrapper>
                <Article>
                  <h3>{t("timetable.welcome")}</h3>
                  <Section>
                    <Message
                      warning
                      header={t("timetable.You haven't added any courses")}
                      content={
                        <p>
                          {t("timetable.Go to")}{" "}
                          <a href="./syllabus">{t("timetable.Syllabus")} </a>{" "}
                          {t("timetable.and try adding one!")}
                        </p>
                      }
                    />
                  </Section>
                  <Section>
                    <Message success>{t("timetable.SaveSpace")}</Message>
                  </Section>
                </Article>
              </Wrapper>
            )}
            <AddedCourseAndPrefList
              addedCoursesAndPrefs={addedCoursesAndPrefs}
            />
          </Wrapper>
        </Column>
      </ThemeProvider>
    </ExtendedRowWrapper>
  );
};

export default withTranslation("translation")(Timetable);
