import React from "react";
import styled from "styled-components";
import stickybits from "stickybits";

import { headerHeight } from "../../styled-components/variables";
import { RowWrapper } from "../../styled-components/Wrapper";

const ExtendedWrapper = styled(RowWrapper)`
  flex: none;
  align-items: center;
  justify-content: space-around;
  height: ${(props) => props.height};
  width: 21em;
  background-color: ${(props) => props.theme.white};
  z-index: 103;
  position: fixed !important;
`;

const SwitchButton = styled("button")`
  width: 100%;
  height: 100%;
  background-color: ${(props) =>
    props.isSelected ? props.theme.white : "unset"};
  border: none;
  border-bottom: ${(props) => (props.isSelected ? "3px solid #ccc" : "none")};
  padding: 5px;
  color: ${(props) => props.theme.grey2};
  &:hover {
    background-color: #ccc;
    border-bottom: "3px solid #ccc";
  }
  &:focus {
    outline: 0;
  }
`;

export default class BinarySwitch extends React.Component {
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
  }

  handleOnClick = (event) => {
    event.preventDefault();
    const buttonId = event.target.id;
    const { leftButtonId, leftValue, rightValue } = this.props;
    const value = buttonId === leftButtonId ? leftValue : rightValue;
    this.props.handleSwitchValue(value);
  };

  componentDidMount() {
    this.createStickyWrapper();
  }

  componentWillUnmount() {
    this.cleanupStickyWrapper();
  }

  render() {
    const {
      leftButtonId,
      rightButtonId,
      leftValue,
      rightValue,
      value,
      leftDisplayedValue,
      rightDisplayedValue,
    } = this.props;
    return (
      <ExtendedWrapper
        height={this.props.switchHeight}
        innerRef={this.setWrapperRef}
      >
        <SwitchButton
          id={leftButtonId}
          onClick={this.handleOnClick}
          isSelected={value === leftValue}
        >
          {leftDisplayedValue}
        </SwitchButton>
        <SwitchButton
          id={rightButtonId}
          onClick={this.handleOnClick}
          isSelected={value === rightValue}
        >
          {rightDisplayedValue}
        </SwitchButton>
      </ExtendedWrapper>
    );
  }
}
