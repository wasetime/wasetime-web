import React from "react";
import ReactModal from "react-modal";
import noScroll from "no-scroll";
import PropTypes from "prop-types";

ReactModal.setAppElement("#root");
//TODO check how often this is called.
// console.log('setAppElement called');

class Modal extends React.Component {
  componentDidMount() {
    if (this.props.isOpen) {
      noScroll.on();
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.isOpen !== this.props.isOpen) {
      nextProps.isOpen ? noScroll.on() : noScroll.off();
    }
  }

  componentWillUnmount() {
    noScroll.off();
  }

  render() {
    const {
      closeTimeoutMS,
      style,
      overlayClassName,
      className,
      children,
      onRequestClose,
      ...rest
    } = this.props;
    return (
      <ReactModal
        closeTimeoutMS={closeTimeoutMS}
        style={style}
        overlayClassName={overlayClassName}
        className={className}
        onRequestClose={onRequestClose || (() => {})}
        shouldCloseOnOverlayClick={true}
        {...rest}
      >
        {children}
      </ReactModal>
    );
  }
}

export default Modal;

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeTimeoutMS: PropTypes.number,
  style: PropTypes.object,
  overlayClassName: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
