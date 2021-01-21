//Credits: Adapted from the awesome tutorial by Sergio Pedercini at
//https://medium.com/@pppped/build-a-simple-modal-window-with-react-and-jss-f05041d899cc
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import styled, { keyframes } from "styled-components";

import { media } from "../styled-components/utils";
import { Overlay } from "../styled-components/Overlay";
import PropTypes from "prop-types";

const show = keyframes`
  0% {
    display: none;
    opacity: 0;
  }
  1% {
    display: flex;
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const hide = keyframes`
  0% {
    opacity: 1;
  }
  80% {
    display: flex;
    opacity: 0;
  }
  100% {
    display: none;
    opacity: 0;
  }
`;

const ExtendedOverlay = styled(Overlay)`
  background-color: rgba(0, 0, 0, 0.6);
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  padding: 1rem;
  z-index: 999;
  opacity: 1;
  animation: ${(props) => props.animation} 0.5s ease;
`;

const Window = styled("div")`
  height: 100%;
  max-width: 500px;
  padding: 10px 25px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.2);
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  ${media.phone`width: 80vw;`};
`;

const Header = styled("header")`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Content = styled("section")`
  color: #000000;
  display: flex;
  flex-direction: column;
`;

const Footer = Header.withComponent("footer");

const CloseLink = styled("a")`
  color: #000000;
  position: relative;
  top: -5px;
  right: -20px;
  align-self: flex-end;
  margin-bottom: -35px;
  cursor: pointer;
`;
const CloseButton = styled("button")`
  padding: 12px;
  text-align: center;
  text-decoration: none;
  align-self: flex-end;
  border-radius: 8px;
  background-color: #ccc;
  font-size: 1.7rem;
  &:hover {
    background-color: #999;
  }
  &:active {
    background-color: #999;
  }
`;

class BusModal extends React.Component {
  constructor(props) {
    super(props);
    this.setModalWindow = this.setModalWindow.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleOutsideTouchStart = this.handleOutsideTouchStart.bind(this);

    this.state = {
      close: false,
    };
  }

  componentDidMount() {
    // Add listeners
    document.addEventListener("click", this.handleOutsideClick, false);
    document.addEventListener(
      "touchstart",
      this.handleOutsideTouchStart,
      false
    );
    document.body.style.overflowY = "hidden";
  }

  componentWillUnmount() {
    // Remove listeners
    document.removeEventListener("click", this.handleOutsideClick, false);
    document.removeEventListener(
      "touchstart",
      this.handleOutsideTouchStart,
      false
    );
    document.body.style.overflowY = "";
  }

  closeModal() {
    if (!this.state.close) {
      const { onClose } = this.props;
      this.setState({
        close: true,
      });
      setTimeout(() => {
        onClose();
      }, 300);
    }
  }

  // Handle mouse click on browser window.
  handleOutsideClick(e) {
    if (this.modalWindow != null) {
      if (!this.modalWindow.contains(e.target)) {
        this.closeModal();
        document.removeEventListener("click", this.handleOutsideClick, false);
      }
    }
  }

  // Handle touch on smartphone window.
  handleOutsideTouchStart(e) {
    if (this.modalWindow != null) {
      if (!this.modalWindow.contains(e.target)) {
        this.closeModal();
        document.removeEventListener(
          "touchstart",
          this.handleOutsideTouchStart,
          false
        );
      }
    }
  }

  setModalWindow(element) {
    this.modalWindow = element;
  }

  render() {
    const { children } = this.props;
    return (
      <ExtendedOverlay animation={this.state.close ? hide : show}>
        <Window innerRef={this.setModalWindow}>
          <Header>
            <CloseLink onClick={this.closeModal}>
              <FontAwesomeIcon
                icon={faTimesCircle}
                size="2x"
                transform="shrink-2"
              />
            </CloseLink>
          </Header>
          <Content>{children}</Content>
          <Footer>
            <CloseButton onClick={this.closeModal}>Close</CloseButton>
          </Footer>
        </Window>
      </ExtendedOverlay>
    );
  }
}

export default BusModal;

BusModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

ExtendedOverlay.propTypes = {
  animation: PropTypes.object.isRequired,
};
