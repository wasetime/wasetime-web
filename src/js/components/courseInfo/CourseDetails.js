import React from "react";
import styled from "styled-components";
import { withNamespaces } from "react-i18next";
import { SYLLABUS_KEYS } from "../../config/syllabusKeys";
import { Segment, Grid, Table, Statistic, Divider } from "semantic-ui-react";
import CourseDetailsEvaluation from "./CourseDetailsEvaluation";

const mapCourseType = (course, t) => {
  if (course[SYLLABUS_KEYS.TYPE] === -1) return "";
  const courseTypeMap = [
    t("courseInfo.Details.Type.Lecture"),
    t("courseInfo.Details.Type.Seminar"),
    t("courseInfo.Details.Type.Work"),
    t("courseInfo.Details.Type.Foreign Language"),
    t("courseInfo.Details.Type.On-demand"),
    t("courseInfo.Details.Type.Thesis"),
    t("courseInfo.Details.Type.Graduate Research"),
    t("courseInfo.Details.Type.Practice"),
    t("courseInfo.Details.Type.Blended"),
  ];
  return courseTypeMap[course[SYLLABUS_KEYS.TYPE]];
};

const mapCourseLevel = (course, t) => {
  if (course[SYLLABUS_KEYS.TYPE] === -1) return "";
  const courseLevelMap = [
    t("courseInfo.Details.Level.Beginner"),
    t("courseInfo.Details.Level.Intermediate"),
    t("courseInfo.Details.Level.Advanced"),
    t("courseInfo.Details.Level.Final-stage"),
    t("courseInfo.Details.Level.Master"),
    t("courseInfo.Details.Level.Doctor"),
  ];
  return courseLevelMap[course[SYLLABUS_KEYS.LEVEL]];
};

const StyledSegment = styled(Segment)`
  width: 100% !important;
  font-size: 1em !important;
  margin: 1em 0px !important;
  cursor: default !important;
  border: none !important;
  margin-top: 0 !important;
  box-shadow: none !important;
  &:hover {
    transform: none !important;
  }
`;

const CourseDetails = ({ course, t, lng }) => {
  return (
    <StyledSegment>
      <Grid columns={2} stackable>
        <Grid.Column>
          <Grid columns={2} style={{ padding: "1em 2.5em" }}>
            <Grid.Column style={{ textAlign: "center" }}>
              <Statistic>
                <Statistic.Value>
                  {course[SYLLABUS_KEYS.MIN_YEAR]}+
                </Statistic.Value>
                <Statistic.Label>
                  {t("courseInfo.Details.Min Year")}
                </Statistic.Label>
              </Statistic>
            </Grid.Column>
            <Grid.Column style={{ textAlign: "center" }}>
              <Statistic>
                <Statistic.Value>
                  {course[SYLLABUS_KEYS.CREDIT]}
                </Statistic.Value>
                <Statistic.Label>
                  {t("courseInfo.Details.Credit")}
                </Statistic.Label>
              </Statistic>
            </Grid.Column>
          </Grid>
        </Grid.Column>
        <Grid.Column>
          <Table unstackable>
            <Table.Body>
              <Table.Row>
                <Table.Cell>{t("courseInfo.Details.Type.title")}</Table.Cell>
                <Table.Cell>
                  <b>{mapCourseType(course, t)}</b>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>{t("courseInfo.Details.Category")}</Table.Cell>
                <Table.Cell>
                  <b>
                    {
                      course[
                        lng === "en"
                          ? SYLLABUS_KEYS.CATEGORY
                          : SYLLABUS_KEYS.CATEGORY_JP
                      ]
                    }
                  </b>
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>{t("courseInfo.Details.Level.title")}</Table.Cell>
                <Table.Cell>
                  <b>{mapCourseLevel(course, t)}</b>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>

      <Divider horizontal style={{ margin: "2em", fontSize: "1em" }}>
        {t("courseInfo.Details.Evaluation.title")}
      </Divider>

      <CourseDetailsEvaluation course={course} />
    </StyledSegment>
  );
};

export default withNamespaces("translation")(CourseDetails);
