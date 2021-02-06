import React from "react";
import stickybits from "stickybits";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { withNamespaces } from "react-i18next";
import { Step, Icon, Message } from "semantic-ui-react";

import {
  addedCourseListSwitchHeight,
  headerHeight,
} from "../../styled-components/variables";
import CourseListSummary from "../CourseListSummary";
import AddedCourseItem from "../../containers/syllabus/AddedCourseItem";
import { Wrapper } from "../../styled-components/Wrapper";
import { Article, Section, Subheading } from "../../styled-components/Article";

const CourseListWrapper = styled(Wrapper)`
  flex: none;
  position: fixed !important;
  padding: 0.5em 1em 1em 1em;
  overflow-y: auto;
  width: 21em;
  height: calc(
    100vh - ${(props) => props.theme.headerHeight} -
      ${(props) => props.theme.addedCourseListSwitchHeight}
  );
`;

const ExtendedArticle = styled(Article)`
  margin-top: 0.2em;
  padding: 1em 0px;
`;

const StyledMessageHeader = styled(Message.Header)`
  font-family: Segoe UI, Yu Gothic Medium, Lato !important;
  font-display: swap;
`;

const StyledStepGroup = styled(Step.Group)`
  margin-top: 0px !important;
  .title {
    font-family: Segoe UI, Yu Gothic Medium, Lato !important;
    font-display: swap;
  }
`;

const StepWithDownwardArrow = styled(Step)`
  &:after {
    display: block !important;
    position: absolute;
    z-index: 2;
    content: "";
    top: 101% !important;
    left: 50% !important;
    border: medium none;
    background-color: #fff;
    width: 1.14285714em;
    height: 1.14285714em;
    border-style: solid;
    border-color: rgba(34, 36, 38, 0.15);
    border-width: 0 1px 1px 0;
    transition: background-color 0.1s ease, opacity 0.1s ease, color 0.1s ease,
      box-shadow 0.1s ease;
    transform: translateY(-50%) translateX(50%) rotate(45deg) !important;
  }
`;

class AddedCourseList extends React.Component {
  constructor(props) {
    super(props);
    this.wrapper = null;

    this.setWrapperRef = (element) => {
      this.wrapper = element;
    };

    this.createStickyWrapper = () => {
      if (this.wrapper) {
        this.stickyWrapper = stickybits(this.wrapper, {
          stickyBitStickyOffset:
            parseInt(headerHeight, 10) +
            parseInt(addedCourseListSwitchHeight, 10),
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
    const {
      addedCourses,
      isSortingOptionOpen,
      handleToggleSortingOptions,
      selectedSortingOption,
      handleChangeSortingOption,
      t,
    } = this.props;

    return (
      <CourseListWrapper innerRef={this.setWrapperRef}>
        <CourseListSummary
          courses={addedCourses}
          isSortingOptionOpen={isSortingOptionOpen}
          handleToggleSortingOptions={handleToggleSortingOptions}
          selectedSortingOption={selectedSortingOption}
          handleChangeSortingOption={handleChangeSortingOption}
        />
        {addedCourses.length ? (
          <div style={{ fontSize: "14px" }}>
            {addedCourses.map((course, index) => (
              <AddedCourseItem key={course.a} course={course} />
            ))}
          </div>
        ) : (
          <ExtendedArticle>
            <Message info size="tiny">
              <StyledMessageHeader>
                {t("syllabus.Added courses are displayed here")}
              </StyledMessageHeader>
            </Message>
            <Section>
              <Subheading as="h2">{t("syllabus.To add a course")}</Subheading>
              <StyledStepGroup size="huge" vertical fluid>
                <StepWithDownwardArrow>
                  <Icon name="search" />
                  <Step.Content>
                    <Step.Title>
                      {t("syllabus.Search with keywords")}
                    </Step.Title>
                    <Step.Description>
                      {t("syllabus.With course or instructor's name")}
                    </Step.Description>
                    <Step.Description>
                      {t("syllabus.English & Japanese supported")}
                    </Step.Description>
                  </Step.Content>
                </StepWithDownwardArrow>

                <Step>
                  <Icon name="plus" />
                  <Step.Content>
                    <Step.Title>
                      {t("syllabus.Click on")}{" "}
                      <FontAwesomeIcon
                        style={{ color: "#48af37" }}
                        icon={faPlusCircle}
                        size="1x"
                      />{" "}
                      {t("syllabus.to add")}
                    </Step.Title>
                    <Step.Description>
                      {t("syllabus.To remove")}
                      {t("syllabus.Click on")}{" "}
                      <FontAwesomeIcon
                        style={{ color: "#ce0115" }}
                        icon={faMinusCircle}
                        size="1x"
                      />{" "}
                      {t("syllabus.to remove suffix")}
                    </Step.Description>
                  </Step.Content>
                </Step>
              </StyledStepGroup>
            </Section>
            <Section>
              <Message info size="mini">
                <StyledMessageHeader>
                  {t("syllabus.Pro Tip!")}
                </StyledMessageHeader>
                {t("syllabus.Use")} {t("syllabus.Filter by")}{" "}
                {t("syllabus.to narrow down your search")}
              </Message>
            </Section>
          </ExtendedArticle>
        )}
      </CourseListWrapper>
    );
  }
}

export default withNamespaces("translation")(AddedCourseList);
