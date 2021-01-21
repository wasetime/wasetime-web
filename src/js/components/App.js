import React from "react";
import { Auth, Hub } from "aws-amplify";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Alert from "react-s-alert";
import styled, { ThemeProvider } from "styled-components";
import { withNamespaces } from "react-i18next";

import { normalTheme } from "../styled-components/theme";
import "react-s-alert/dist/s-alert-default.css";
import "../../styles/s-alert-custom.css";
import "react-s-alert/dist/s-alert-css-effects/jelly.css";
import "semantic-ui-css/semantic.min.css";

import Sidebar from "./Sidebar";
import MobileHeader from "./MobileHeader";
import SignInModal from "./user/SignInModal";
import About from "./About";
import InitialDialog from "./welcome/InitialDialog";
import TimetableContainer from "../containers/timetable/TimetableContainer";
import Syllabus from "./syllabus/Syllabus";
import CourseInfo from "./courseInfo/CourseInfo";
import RedirectPage from "./user/RedirectPage";
import JoinUs from "./JoinUs";
import Bus from "./Bus";
import Career from "./career/Career";
import CoronaInfo from "./CoronaInfo";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";
import Footer from "./Footer";
import NotFound from "./NotFound";
import {
  getUserInfo,
  getUserTokens,
  getUserIsFirstTimeAccess,
} from "../reducers/user";
import { setUserInfo, clearUserInfo, updateUserSession } from "../actions/user";

import { media, sizes } from "../styled-components/utils";
import MediaQuery from "react-responsive";

const Wrapper = styled("div")`
  display: grid;
  grid-template-rows: 67px auto auto;
  grid-template-columns: 65px auto;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  min-height: 100vh;
`;

const StyledMain = styled("main")`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  grid-area: 1 / 2 / span 3 / span 1;
  ${media.tablet`grid-area: 2 / 1 / span 1 / span 2;`}
  width: 100%;
  min-height: calc(100vh - ${(props) => props.theme.headerHeight});
`;

const GridFooter = styled("div")`
  grid-area: 3 / 1 / span 1 / span 2 !important;
`;

class App extends React.Component {
  state = {
    isSignInModalOpen: false,
  };

  timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  signIn() {
    try {
      Auth.federatedSignIn({
        provider: "Google",
        customState: window.location.pathname + window.location.search,
      });
    } catch (e) {
      console.log(e);
    }
  }

  signOut() {
    Auth.signOut({
      oAuth: "signOut",
      customState: window.location.pathname + window.location.search,
    });
  }

  toggleSignInModal = () => {
    this.setState((prevState, props) => ({
      isSignInModalOpen: !prevState.isSignInModalOpen,
    }));
  };

  getCurrentSessionAndRefresh = async () => {
    try {
      const cognitoUser = await Auth.currentAuthenticatedUser();
      const currentSession = await Auth.currentSession();

      cognitoUser.refreshSession(
        currentSession.refreshToken,
        (err, session) => {
          this.props.updateUserSession(session);
        }
      );
    } catch (e) {
      console.log(e);
      this.props.clearUserInfo();
    }
  };

  async componentDidMount() {
    const { userTokens, setUserInfo, clearUserInfo, history, t } = this.props;

    window.addEventListener("storage", (e) => {
      if (
        window.innerWidth > sizes.tablet &&
        e.key === "wasedatime-2020-state-ac" &&
        e.oldValue
      ) {
        Alert.warning(
          <React.Fragment>
            {t("app.courseChange")}
            <a
              href={"/"}
              onClick={(e) => {
                e.preventDefault();
                window.location.reload(true);
              }}
            >
              {t("app.RefreshLink")}
            </a>
          </React.Fragment>,
          {
            timeout: "none",
            position: "bottom",
            effect: "jelly",
          }
        );
      }
    });

    Hub.listen("auth", ({ payload: { event, data } }) => {
      switch (event) {
        case "signIn":
          // data: CognitoUser object
          setUserInfo(data);
          break;
        case "signOut":
          clearUserInfo();
          break;
        case "oAuthSignOut":
          clearUserInfo();
          Auth.signOut();
          break;
        case "customOAuthState":
          history.push(data);
          break;
        case "tokenRefresh":
          break;
        default:
          console.log(event);
      }
    });

    if (userTokens) {
      // if not expired: wait until expired, and then refresh
      // if already expired: refresh immediately
      if (userTokens.exp * 1000 >= Date.now()) {
        await this.timeout(userTokens.exp * 1000 - Date.now() - 5000);
      }
      this.getCurrentSessionAndRefresh();

      // refresh user session every hour
      let self = this;
      setTimeout(function refreshSessionEveryHour() {
        self.getCurrentSessionAndRefresh();
        setTimeout(refreshSessionEveryHour, 3595000);
      }, 3595000);
    }
  }

  render() {
    const { isFirstTimeAccess, userInfo } = this.props;
    const { isSignInModalOpen } = this.state;
    return (
      <ThemeProvider theme={normalTheme}>
        <Wrapper>
          <MediaQuery minWidth={sizes.tablet + 1}>
            {(matches) =>
              matches ? (
                <Sidebar
                  userInfo={userInfo}
                  signOut={this.signOut}
                  toggleSignInModal={this.toggleSignInModal}
                />
              ) : (
                <MobileHeader
                  userInfo={userInfo}
                  signOut={this.signOut}
                  toggleSignInModal={this.toggleSignInModal}
                />
              )
            }
          </MediaQuery>

          <StyledMain>
            {isFirstTimeAccess ? (
              <Switch>
                <Route exact path="/welcome" component={InitialDialog} />
                <Route render={() => <Redirect to="/welcome" />} />
              </Switch>
            ) : (
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => <Redirect to="/timetable" />}
                />
                <Route
                  exact
                  path="/index.html"
                  render={() => <Redirect to="/timetable" />}
                />
                <Route exact path="/about" component={About} />
                <Route exact path="/timetable" component={TimetableContainer} />
                <Route exact path="/syllabus" component={Syllabus} />
                <Route exact path="/joinus" component={JoinUs} />
                <Route exact path="/bus" component={Bus} />
                <Route path="/career" component={Career} />
                <Route exact path="/corona-info" component={CoronaInfo} />
                <Route exact path="/courseInfo" component={CourseInfo} />
                <Route exact path="/privacy-policy" component={PrivacyPolicy} />
                <Route
                  exact
                  path="/terms-of-service"
                  component={TermsOfService}
                />
                <Route exact path="/verify" component={RedirectPage} />
                <Route component={NotFound} />
              </Switch>
            )}
          </StyledMain>
          <MediaQuery maxWidth={sizes.tablet}>
            {(matches) =>
              matches && (
                <GridFooter>
                  <Footer />
                </GridFooter>
              )
            }
          </MediaQuery>

          <SignInModal
            isModalOpen={isSignInModalOpen}
            signIn={this.signIn}
            closeModal={this.toggleSignInModal}
          />
          <Alert stack={{ limit: 1 }} timeout={3000} />
        </Wrapper>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  isFirstTimeAccess: getUserIsFirstTimeAccess(state),
  userInfo: getUserInfo(state),
  userTokens: getUserTokens(state),
});

const mapDispatchToProps = {
  setUserInfo,
  clearUserInfo,
  updateUserSession,
};

export default withNamespaces("translation")(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
);
