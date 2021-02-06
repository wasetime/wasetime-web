import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { withNamespaces } from "react-i18next";
import PropTypes from "prop-types";
import MobileStepper from "@material-ui/core/MobileStepper";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import noScroll from "no-scroll";
import ReactGA from "react-ga";

import { setFirstTimeAccessToFalse } from "../../actions/user";
import Greeting from "./Greeting";
import NewFeature from "./NewFeature";
import NewFeature2 from "./NewFeature2";
import { gaLanguage } from "../../ga/eventCategories";
import { gaSetLanguage } from "../../ga/eventActions";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  dotActive: {
    backgroundColor: "#000",
  },
  buttonLabel: {
    fontSize: "1.6em",
  },
});

class DialogStepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
    };
  }

  componentDidMount() {
    window.scrollTo({ top: 0 });
    noScroll.on();
  }

  componentWillUnmount() {
    noScroll.off();
  }

  handleNext = () => {
    this.setState((prevState) => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState((prevState) => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  redirectToRoot = () => {
    this.props.history.push({
      pathname: "/",
    });
  };

  handleDone = () => {
    ReactGA.event({
      category: gaLanguage,
      action: gaSetLanguage,
      label: this.props.lng,
    });
    this.props.setFirstTimeAccessToFalse();
    this.redirectToRoot();
  };

  render() {
    const { classes, t } = this.props;
    const { activeStep } = this.state;
    const setupSteps = [<Greeting />, <NewFeature />, <NewFeature2 />];
    const maxSteps = setupSteps.length;
    const isFirstStep = activeStep === 0;
    const isLastStep = activeStep === maxSteps - 1;
    return (
      <div className={classes.root}>
        {setupSteps[activeStep]}
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          classes={{
            root: classes.mobileStepper,
            dotActive: classes.dotActive,
          }}
          nextButton={
            !isLastStep ? (
              <Button
                size="small"
                classes={{ label: classes.buttonLabel }}
                onClick={this.handleNext}
              >
                {t("welcome.next")}
                <KeyboardArrowRight />
              </Button>
            ) : (
              <Button
                size="small"
                classes={{ label: classes.buttonLabel }}
                onClick={this.handleDone}
              >
                {t("welcome.done")}
                <KeyboardArrowRight />
              </Button>
            )
          }
          backButton={
            <Button
              size="small"
              classes={{ label: classes.buttonLabel }}
              onClick={this.handleBack}
              disabled={isFirstStep}
            >
              <KeyboardArrowLeft />
              {t("welcome.back")}
            </Button>
          }
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  setFirstTimeAccessToFalse,
};

DialogStepper.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withNamespaces("translation")(
  withRouter(
    withStyles(styles)(connect(null, mapDispatchToProps)(DialogStepper))
  )
);
