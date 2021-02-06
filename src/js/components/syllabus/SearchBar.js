import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import stickybits from "stickybits";
import PropTypes from "prop-types";

import { headerHeight } from "../../styled-components/variables";
import { RowWrapper } from "../../styled-components/Wrapper";

const ExtendedWrapper = styled(RowWrapper)`
  flex: none;
  align-items: center;
  height: ${(props) => props.theme.searchBarHeight};
  width: 100%;
  padding: 0 1em;
  background-color: #fff;
  z-index: 103;
`;

const StyledForm = styled("form")`
  width: 100%;
  align-self: center;
  background-color: ${(props) => props.theme.white};
  padding: 0 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledInput = styled("input")`
  border: 1px solid ${(props) => props.theme.grey12};
  border-radius: 5em;
  background: none;
  outline: none;
  padding: 3px 0px 3px 10px;
  margin: 0;
  margin-top: 10px;
  flex: 1 0 auto;
`;

const StyledClearButton = styled("span")`
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${(props) => props.theme.grey7};
  margin: 10px 0 0 -15px;
  &:focus {
    outline: 0;
  }
  -webkit-tap-highlight-color: transparent;
`;

class SearchBar extends React.Component {
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

  componentDidMount() {
    this.createStickyWrapper();
  }

  componentWillUnmount() {
    this.cleanupStickyWrapper();
  }

  handleInputChange = (event) => {
    event.preventDefault();
    const inputText = event.target.value;
    this.props.onInputChange(inputText);
  };

  handleClearInput = (event) => {
    event.preventDefault();
    this.props.onInputChange("");
  };

  render() {
    return (
      <ExtendedWrapper innerRef={this.setWrapperRef}>
        <StyledForm
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <StyledInput
            type="text"
            placeholder={this.props.placeholder}
            value={this.props.inputText}
            onChange={this.handleInputChange}
          />
          <StyledClearButton
            role="button"
            title="clear"
            onClick={this.handleClearInput}
          >
            <FontAwesomeIcon icon={faTimes} size="1x" />
          </StyledClearButton>
        </StyledForm>
      </ExtendedWrapper>
    );
  }
}

export default SearchBar;

SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired,
  inputText: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

StyledForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

StyledInput.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

StyledClearButton.propTypes = {
  role: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
