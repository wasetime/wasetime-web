import React from "react";
import ShareButton from "../../components/syllabus/ShareButton";

class FetchedShareButton extends React.Component {
  state = { isPopperOpen: false };

  handleToggleSharePopper = (event) => {
    event.preventDefault();
    this.setState((prevState, props) => {
      return { isPopperOpen: !prevState.isPopperOpen };
    });
  };

  render() {
    const {
      display,
      shareLink,
      sizesDesktop,
      isDetailDisplayed,
      needLineBreak,
    } = this.props;
    return (
      <ShareButton
        display={display}
        shareLink={shareLink}
        sizesDesktop={sizesDesktop}
        isDetailDisplayed={isDetailDisplayed}
        isPopperOpen={this.state.isPopperOpen}
        handleToggleSharePopper={this.handleToggleSharePopper}
        needLineBreak={needLineBreak}
      />
    );
  }
}

export default FetchedShareButton;
