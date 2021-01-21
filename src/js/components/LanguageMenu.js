import React from "react";
import PropTypes from "prop-types";
import i18n from "./i18n";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";
import { withNamespaces } from "react-i18next";
import styled from "styled-components";
import ReactGA from "react-ga";
import { gaLanguage } from "../ga/eventCategories";
import { gaAppendActionWithLng, gaChangeLanguage } from "../ga/eventActions";
import { media } from "../styled-components/utils";

import LANGS from "../config/langs";

const StyledButton = styled("button")`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  outline: none;
  padding: 0;
  margin: 0 1rem;
  color: #b51e36;
  background-color: inherit;
  ${media.phone`margin: 0.5em 0 0 0.5em; font-size: 0.6em; color: #fff;`}
`;

class LanguangeMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = (event) => {
    event.preventDefault();
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleMenuItemClick = (event, lang) => {
    event.preventDefault();
    ReactGA.event({
      category: gaLanguage,
      action: gaAppendActionWithLng(gaChangeLanguage, this.props.lng),
      label: lang,
    });
    i18n.changeLanguage(lang);
    this.handleClose();
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <div style={{ float: "right" }}>
        <StyledButton onClick={this.handleClick}>
          <FontAwesomeIcon icon={faLanguage} size="3x" transform="shrink-2" />
        </StyledButton>
        <Menu
          id="language-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          disableAutoFocusItem={true}
        >
          <MenuItem
            style={{ fontSize: "0.8em", padding: "5px 12px" }}
            onClick={(event) => this.handleMenuItemClick(event, LANGS.JP)}
          >
            日本語
          </MenuItem>
          <MenuItem
            style={{ fontSize: "0.8em", padding: "5px 12px" }}
            onClick={(event) => this.handleMenuItemClick(event, LANGS.EN)}
          >
            English
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default withNamespaces("translation")(LanguangeMenu);

LanguangeMenu.propTypes = {
  lng: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};
