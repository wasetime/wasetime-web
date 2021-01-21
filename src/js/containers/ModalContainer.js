//Credits: Adapted from the awesome tutorial by Sergio Pedercini at
//https://medium.com/@pppped/build-a-simple-modal-window-with-react-and-jss-f05041d899cc
import React from "react";
import { withNamespaces } from "react-i18next";
import ReactGA from "react-ga";

import BusModal from "../components/BusModal";
import { InvisibleButton } from "../styled-components/Button";
import { gaBus } from "../ga/eventCategories";
import { gaAppendActionWithLng, gaOpenModal } from "../ga/eventActions";

class ModalContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
  }

  //Avoid creating an arrow function wrapper and binds in render.
  handleToggleModal = () => {
    ReactGA.event({
      category: gaBus,
      action: gaAppendActionWithLng(gaOpenModal, this.props.lng),
    });
    this.setState((prevState, props) => {
      return { showModal: !this.state.showModal };
    });
  };

  render() {
    const { linkText, text, children } = this.props;
    const { showModal } = this.state;
    //TODO remove styling from container components
    return (
      <div>
        <span>
          <InvisibleButton
            style={{
              color: "#1e70bf",
              textDecoration: "underline",
              cursor: "pointer",
            }}
            onClick={this.handleToggleModal}
          >
            {linkText}
          </InvisibleButton>{" "}
          {text}
        </span>
        {showModal && (
          <BusModal onClose={this.handleToggleModal}>{children}</BusModal>
        )}
      </div>
    );
  }
}

export default withNamespaces("translation")(ModalContainer);
