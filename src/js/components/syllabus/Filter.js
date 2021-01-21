import React from "react";
import stickybits from "stickybits";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { Button } from "semantic-ui-react";
import styled from "styled-components";
import { withNamespaces } from "react-i18next";

import { headerHeight } from "../../styled-components/variables";
import FilterGroup from "./FilterGroup";
import FilterEvalGroup from "./FilterEvalGroup";
import { Wrapper } from "../../styled-components/Wrapper";
import { Overlay } from "../../styled-components/Overlay";

const FilterWrapper = styled(Wrapper)`
  ${(props) => !props.isSideBar && "width: 100%;"}
  flex: none;
  position: fixed !important
  height: ${(props) => (props.isSideBar ? "calc(100vh - 70px)" : "100vh")};
  overflow-y: auto;
`;

const FilterOverlay = styled(Overlay)`
  padding: ${(props) =>
    props.isSideBar ? "0.5em 1em 1em 1em;" : "0.7em 1.2em;"};
`;

const FilterTitle = styled("span")`
  display: flex;
  align-items: center;
  font-size: 1.1em;
  font-family: Segoe UI, Yu Gothic Medium, Lato;
  font-display: swap;
`;

const FilterClearButton = styled(Button)`
  color: #b51e36 !important;
  background: #fff !important;
  font-weight: 500 !important;
`;

const FilterGroupWrapper = styled("div")`
  background-color: #fff;
  flex: 1 0 auto;
  padding: 1rem;
  margin-top: 0.2em;
  font-size: 11px;
`;

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = null;

    this.setWrapperRef = (element) => {
      this.wrapper = element;
    };

    this.createStickyWrapper = () => {
      if (this.wrapper) {
        const offset = this.props.isSideBar ? parseInt(headerHeight, 10) : 0;
        this.stickyWrapper = stickybits(this.wrapper, {
          stickyBitStickyOffset: offset,
        });
      }
    };

    this.cleanupStickyWrapper = () => {
      if (this.stickyWrapper) {
        this.stickyWrapper.cleanup();
      }
    };
  }

  componentDidMount() {
    this.createStickyWrapper();
  }

  componentWillUnmount() {
    this.cleanupStickyWrapper();
  }

  render() {
    const { filterGroups, t } = this.props;
    const semesterLegend = t("syllabus.Semesters");
    const semesterInputName = "semester";
    const semesterInputs = [
      {
        key:
          t("syllabus.semesterMap.Spring") + t("syllabus.semesterMap.Semester"),
        text:
          t("syllabus.semesterMap.Spring") + t("syllabus.semesterMap.Semester"),
        value: "0s",
      },
      {
        key:
          t("syllabus.semesterMap.Fall") + t("syllabus.semesterMap.Semester"),
        text:
          t("syllabus.semesterMap.Fall") + t("syllabus.semesterMap.Semester"),
        value: "2s",
      },
      {
        key:
          t("syllabus.semesterMap.Spring") + t("syllabus.semesterMap.Quarter"),
        text:
          t("syllabus.semesterMap.Spring") + t("syllabus.semesterMap.Quarter"),
        value: "0q",
      },
      {
        key:
          t("syllabus.semesterMap.Summer") + t("syllabus.semesterMap.Quarter"),
        text:
          t("syllabus.semesterMap.Summer") + t("syllabus.semesterMap.Quarter"),
        value: "1q",
      },
      {
        key: t("syllabus.semesterMap.Fall") + t("syllabus.semesterMap.Quarter"),
        text:
          t("syllabus.semesterMap.Fall") + t("syllabus.semesterMap.Quarter"),
        value: "2q",
      },
      {
        key:
          t("syllabus.semesterMap.Winter") + t("syllabus.semesterMap.Quarter"),
        text:
          t("syllabus.semesterMap.Winter") + t("syllabus.semesterMap.Quarter"),
        value: "3q",
      },
      {
        key:
          t("syllabus.semesterMap.Spring") +
          t("syllabus.semesterMap.Intensive"),
        text:
          t("syllabus.semesterMap.Spring") +
          t("syllabus.semesterMap.Intensive"),
        value: "0i",
      },
      {
        key:
          t("syllabus.semesterMap.Summer") +
          t("syllabus.semesterMap.Intensive"),
        text:
          t("syllabus.semesterMap.Summer") +
          t("syllabus.semesterMap.Intensive"),
        value: "1i",
      },
      {
        key:
          t("syllabus.semesterMap.Fall") + t("syllabus.semesterMap.Intensive"),
        text:
          t("syllabus.semesterMap.Fall") + t("syllabus.semesterMap.Intensive"),
        value: "2i",
      },
      {
        key:
          t("syllabus.semesterMap.Winter") +
          t("syllabus.semesterMap.Intensive"),
        text:
          t("syllabus.semesterMap.Winter") +
          t("syllabus.semesterMap.Intensive"),
        value: "3i",
      },
      {
        key: t("syllabus.semesterMap.Full-Year"),
        text: t("syllabus.semesterMap.Full-Year"),
        value: "f",
      },
    ];
    const checkedSemesterInputs = semesterInputs.map((input) => ({
      ...input,
      isChecked: filterGroups[semesterInputName].includes(input.value),
    }));

    const langLegend = t("syllabus.Languages");
    const langInputName = "lang";
    const langInputs = [
      {
        key: t("syllabus.languageKeys.0"),
        text: t("syllabus.languages.0"),
        value: "0",
      },
      {
        key: t("syllabus.languageKeys.1"),
        text: t("syllabus.languages.1"),
        value: "1",
      },
      {
        key: t("syllabus.languageKeys.2"),
        text: t("syllabus.languages.2"),
        value: "2",
      },
      {
        key: t("syllabus.languageKeys.3"),
        text: t("syllabus.languages.3"),
        value: "3",
      },
      {
        key: t("syllabus.languageKeys.4"),
        text: t("syllabus.languages.4"),
        value: "4",
      },
      {
        key: t("syllabus.languageKeys.5"),
        text: t("syllabus.languages.5"),
        value: "5",
      },
      {
        key: t("syllabus.languageKeys.6"),
        text: t("syllabus.languages.6"),
        value: "6",
      },
      {
        key: t("syllabus.languageKeys.7"),
        text: t("syllabus.languages.7"),
        value: "7",
      },
      {
        key: t("syllabus.languageKeys.8"),
        text: t("syllabus.languages.8"),
        value: "8",
      },
      {
        key: t("syllabus.languageKeys.9"),
        text: t("syllabus.languages.9"),
        value: "9",
      },
    ];
    const checkedLangInputs = langInputs.map((input) => ({
      ...input,
      isChecked: filterGroups[langInputName].includes(input.value),
    }));

    const dayLegend = t("syllabus.day");
    const dayInputName = "day";
    const dayInputs = [
      { value: "1", label: t("common.mon") },
      { value: "2", label: t("common.tue") },
      { value: "3", label: t("common.wed") },
      { value: "4", label: t("common.thu") },
      { value: "5", label: t("common.fri") },
      { value: "6", label: t("common.sat") },
    ];
    const checkedDayInputs = dayInputs.map((input) => ({
      ...input,
      isChecked: filterGroups[dayInputName].includes(input.value),
    }));

    const periodLegend = t("syllabus.period.Period");
    const periodInputName = "period";
    const periodInputs = [
      { value: "1", label: t("syllabus.period.1") },
      { value: "2", label: t("syllabus.period.2") },
      { value: "3", label: t("syllabus.period.3") },
      { value: "4", label: t("syllabus.period.4") },
      { value: "5", label: t("syllabus.period.5") },
      { value: "6", label: t("syllabus.period.6") },
      { value: "7", label: t("syllabus.period.7") },
    ];
    const checkedPeriodInputs = periodInputs.map((input) => ({
      ...input,
      isChecked: filterGroups[periodInputName].includes(input.value),
    }));

    const minYearLegend = t("syllabus.minYear");
    const minYearInputName = "minYear";
    const minYearInputs = [
      { value: "1", label: "1+" },
      { value: "2", label: "2+" },
      { value: "3", label: "3+" },
      { value: "4", label: "4+" },
    ];
    const checkedMinYearInputs = minYearInputs.map((input) => ({
      ...input,
      isChecked: filterGroups[minYearInputName].includes(input.value),
    }));

    const creditLegend = t("syllabus.credit");
    const creditInputName = "credit";
    const creditInputs = [
      { value: "1", label: "1" },
      { value: "2", label: "2" },
      { value: "3", label: "3+" },
    ];
    const checkedCreditInputs = creditInputs.map((input) => ({
      ...input,
      isChecked: filterGroups[creditInputName].includes(input.value),
    }));

    const evalLegend = t("syllabus.eval.title");
    const evalTypeDefault = t("syllabus.eval.typeDefault");
    const evalTypeInputs = [
      { key: "Exam", text: t("syllabus.eval.Exam"), value: 0 },
      { key: "Papers", text: t("syllabus.eval.Papers"), value: 1 },
      {
        key: "Class Participation",
        text: t("syllabus.eval.Class Participation"),
        value: 2,
      },
      { key: "Others", text: t("syllabus.eval.Others"), value: 3 },
    ];
    const evalTypeInputName = "evalType";
    const evalPercentInputName = "evalPercent";
    const selectedEvalTypeInput = filterGroups[evalTypeInputName];
    const selectedEvalPercentInputs = filterGroups[evalPercentInputName];

    const evalSpecialInputName = "evalSpecial";
    const evalSpecialInputs = [
      { value: "noExam", label: t("syllabus.eval.No exam") },
      { value: "noPaper", label: t("syllabus.eval.No paper") },
      {
        value: "noClassParticipation",
        label: t("syllabus.eval.No class participation"),
      },
    ];
    const checkedEvalSpecialInputs = evalSpecialInputs.map((input) => ({
      ...input,
      isChecked: filterGroups[evalSpecialInputName].includes(input.value),
    }));

    const typeLegend = t("syllabus.type");
    const typeInputName = "type";
    const typeInputs = [
      {
        key: "Lecture",
        text: t("courseInfo.Details.Type.Lecture"),
        value: "0",
      },
      {
        key: "Seminar",
        text: t("courseInfo.Details.Type.Seminar"),
        value: "1",
      },
      {
        key: "Work",
        text: t("courseInfo.Details.Type.Work"),
        value: "2",
      },
      {
        key: "Foreign Language",
        text: t("courseInfo.Details.Type.Foreign Language"),
        value: "3",
      },
      {
        key: "On-demand",
        text: t("courseInfo.Details.Type.On-demand"),
        value: "4",
      },
      {
        key: "Thesis",
        text: t("courseInfo.Details.Type.Thesis"),
        value: "5",
      },
      {
        key: "Graduate Research",
        text: t("courseInfo.Details.Type.Graduate Research"),
        value: "6",
      },
      {
        key: "Practice",
        text: t("courseInfo.Details.Type.Practice"),
        value: "7",
      },
      {
        key: "Blended",
        text: t("courseInfo.Details.Type.Blended"),
        value: "8",
      },
    ];
    const checkedTypeInputs = typeInputs.map((input) => ({
      ...input,
      isChecked: filterGroups[typeInputName].includes(input.value),
    }));

    const levelLegend = t("syllabus.level");
    const levelInputName = "level";
    const levelInputs = [
      {
        key: "Beginner",
        text: t("courseInfo.Details.Level.Beginner"),
        value: "0",
      },
      {
        key: "Intermediate",
        text: t("courseInfo.Details.Level.Intermediate"),
        value: "1",
      },
      {
        key: "Advanced",
        text: t("courseInfo.Details.Level.Advanced"),
        value: "2",
      },
      {
        key: "Final-stage",
        text: t("courseInfo.Details.Level.Final-stage"),
        value: "3",
      },
      {
        key: "Master",
        text: t("courseInfo.Details.Level.Master"),
        value: "4",
      },
      {
        key: "Doctor",
        text: t("courseInfo.Details.Level.Doctor"),
        value: "5",
      },
    ];
    const checkedLevelInputs = levelInputs.map((input) => ({
      ...input,
      isChecked: filterGroups[levelInputName].includes(input.value),
    }));

    const { handleToggleFilter, clearFilter, isSideBar } = this.props;
    return (
      <FilterWrapper innerRef={this.setWrapperRef} isSideBar={isSideBar}>
        <FilterOverlay isSideBar={isSideBar}>
          <FilterTitle isSideBar={isSideBar}>
            <FontAwesomeIcon icon={faFilter} size="1x" />
            &nbsp;
            <b>{t("syllabus.Filter by")}</b>
            &nbsp;
            <FilterClearButton size="big" onClick={clearFilter}>
              {t("syllabus.Clear filter")}
            </FilterClearButton>
          </FilterTitle>
          <FilterGroupWrapper>
            <FilterGroup
              handleToggleFilter={handleToggleFilter}
              legend={semesterLegend}
              inputName={semesterInputName}
              inputs={checkedSemesterInputs}
              filterType={"dropdown"}
            />
            <FilterGroup
              handleToggleFilter={handleToggleFilter}
              legend={langLegend}
              inputName={langInputName}
              inputs={checkedLangInputs}
              filterType={"dropdown"}
            />
            <FilterGroup
              handleToggleFilter={handleToggleFilter}
              legend={dayLegend}
              inputName={dayInputName}
              inputs={checkedDayInputs}
              filterType={"checkbox"}
            />
            <FilterGroup
              handleToggleFilter={handleToggleFilter}
              legend={periodLegend}
              inputName={periodInputName}
              inputs={checkedPeriodInputs}
              filterType={"checkbox"}
            />
            <FilterGroup
              handleToggleFilter={handleToggleFilter}
              legend={minYearLegend}
              inputName={minYearInputName}
              inputs={checkedMinYearInputs}
              filterType={"checkbox"}
            />
            <FilterGroup
              handleToggleFilter={handleToggleFilter}
              legend={creditLegend}
              inputName={creditInputName}
              inputs={checkedCreditInputs}
              filterType={"checkbox"}
            />
            <FilterEvalGroup
              handleToggleFilter={handleToggleFilter}
              legend={evalLegend}
              typeDefault={evalTypeDefault}
              typeInputs={evalTypeInputs}
              typeInputName={evalTypeInputName}
              selectedTypeInput={selectedEvalTypeInput}
              percentInputName={evalPercentInputName}
              selectedPercentInputs={selectedEvalPercentInputs}
              specialInputName={evalSpecialInputName}
              checkedSpecialInputs={checkedEvalSpecialInputs}
            />
            <FilterGroup
              handleToggleFilter={handleToggleFilter}
              legend={typeLegend}
              inputName={typeInputName}
              inputs={checkedTypeInputs}
              filterType={"dropdown"}
            />
            <FilterGroup
              handleToggleFilter={handleToggleFilter}
              legend={levelLegend}
              inputName={levelInputName}
              inputs={checkedLevelInputs}
              filterType={"dropdown"}
            />
          </FilterGroupWrapper>
        </FilterOverlay>
      </FilterWrapper>
    );
  }
}

export default withNamespaces("translation")(Filter);
