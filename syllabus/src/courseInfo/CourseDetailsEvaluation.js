import React from "react";
import { withNamespaces } from "react-i18next";
import { SyllabusKey } from "@bit/wasedatime.syllabus.ts.constants.syllabus-data";
import { Grid, Table } from "semantic-ui-react";
import { Doughnut } from "react-chartjs-2";

const evalChartData = (course, t) => {
  return {
    datasets: [
      {
        data: course[SyllabusKey.EVAL].map((e) =>
          e[SyllabusKey.EVAL_PERCENT] === -1 ? 0 : e[SyllabusKey.EVAL_PERCENT]
        ),
        backgroundColor: course[SyllabusKey.EVAL].map(
          (e) => evalColorMap[e[SyllabusKey.EVAL_TYPE]]
        ),
      },
    ],
    labels: course[SyllabusKey.EVAL].map((e) =>
      t(
        `courseInfo.Details.Evaluation.${evalTypeMap[e[SyllabusKey.EVAL_TYPE]]}`
      )
    ),
  };
};

const evalChartOptions = {
  legend: {
    position: "left",
    labels: {
      boxWidth: 12,
    },
    onClick: (e) => e.stopPropagation(),
  },
  tooltips: {
    callbacks: {
      title: function (tooltipItem, data) {
        return data["labels"][tooltipItem[0]["index"]];
      },
      label: function (tooltipItem, data) {
        return " " + data["datasets"][0]["data"][tooltipItem["index"]] + "%";
      },
    },
  },
};

const evalTypeMap = ["Exam", "Papers", "Class Participation", "Others"];
const evalColorMap = ["#c2402c", "#c87f3d", "#a2ae67", "#6c92b4", "#28b4a9"];

const CourseDetailsEvaluation = ({ course, t }) => {
  return course[SyllabusKey.EVAL].length > 0 ? (
    <Grid columns={2} stackable>
      <Grid.Column>
        <Doughnut data={evalChartData(course, t)} options={evalChartOptions} />
      </Grid.Column>
      <Grid.Column>
        <Table>
          <Table.Body>
            {course[SyllabusKey.EVAL].map((e, i) => (
              <Table.Row key={i}>
                <Table.Cell>
                  <span
                    style={{
                      color: evalColorMap[e[SyllabusKey.EVAL_TYPE]],
                      fontSize: "2em",
                    }}
                  >
                    ●
                  </span>{" "}
                  {t(
                    `courseInfo.Details.Evaluation.${
                      evalTypeMap[e[SyllabusKey.EVAL_TYPE]]
                    }`
                  )}
                </Table.Cell>
                <Table.Cell>{e[SyllabusKey.EVAL_CRITERIA]}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Grid.Column>
    </Grid>
  ) : (
    <p style={{ textAlign: "center" }}>
      Click the blue arrow button above to check the details
    </p>
  );
};

export default withNamespaces("translation")(CourseDetailsEvaluation);