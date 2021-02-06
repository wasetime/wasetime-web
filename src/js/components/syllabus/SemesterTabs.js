import React from "react";
import styled from "styled-components";
import stickybits from "stickybits";

import { headerHeight } from "../../styled-components/variables";
import { RowWrapper } from "../../styled-components/Wrapper";
import PropTypes from "prop-types";

const ExtendedWrapper = styled(RowWrapper)`
  flex: none;
  align-items: center;
  justify-content: space-around;
  height: ${(props) => props.theme.semesterTabsHeight};
  width: 100%;
  background-color: ${(props) => props.theme.grey7};
  z-index: 103;
`;

const SemesterButton = styled("button")`
  width: 100%;
  height: 100%;
  background-color: ${(props) =>
    props.isSelected ? props.theme.grey4 : "unset"};
  border: none;
  padding: 0;
  color: ${(props) => props.theme.white};
  &:hover {
    background-color: ${(props) => props.theme.grey4};
  }
  &:focus {
    outline: 0;
  }
`;

class SemesterTabs extends React.Component {
  constructor() {
    super();
    this.wrapper = null;
    this.setWrapperRef = (element) => {
      this.wrapper = element;
    };

    this.createStickyWrapper = () => {
      if (this.wrapper) {
        this.stickyWrapper = stickybits(this.wrapper, {
          stickyBitStickyOffset: parseInt(headerHeight, 10),
        });
      }
    };

    this.cleanupStickyWrapper = () => {
      if (this.stickyWrapper) {
        this.stickyWrapper.cleanup();
      }
    };

    this.fallButtonId = "button--fall";
    this.springButtonId = "button--spring";
    this.fallSemester = "fall";
    this.springSemester = "spring";
  }

  handleOnClick = (event) => {
    event.preventDefault();
    const buttonId = event.target.id;
    const semester =
      buttonId === this.fallButtonId ? this.fallSemester : this.springSemester;
    this.props.handleChangeSemester(semester);
  };

  componentDidMount() {
    this.createStickyWrapper();
  }

  componentWillUnmount() {
    this.cleanupStickyWrapper();
  }

  render() {
    const { t } = this.props;
    return (
      <ExtendedWrapper innerRef={this.setWrapperRef}>
        <SemesterButton
          id={this.springButtonId}
          onClick={this.handleOnClick}
          isSelected={this.props.semester === this.springSemester}
        >
          Spring Semester
        </SemesterButton>
        <SemesterButton
          id={this.fallButtonId}
          onClick={this.handleOnClick}
          isSelected={this.props.semester === this.fallSemester}
        >
          Fall Semester
        </SemesterButton>
      </ExtendedWrapper>
    );
  }
}
export default SemesterTabs;

SemesterTabs.propTypes = {
  handleChangeSemester: PropTypes.func.isRequired,
  semester: PropTypes.string.isRequired,
};

SemesterButton.propTypes = {
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};
