import React from "react";
import { navigate } from "@reach/router";
import { withTranslation } from "react-i18next";
import styled from "styled-components";

interface Props {
  path: string;
}

class RedirectPage extends React.Component<Props> {
  async componentDidMount() {
    if (window.location.search.includes("error_description")) {
      await this.timeout(5000);
      navigate("/");
    }
  }

  timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  render() {
    return window.location.search.includes("error_description") ? (
      <div className="mt-20">
        <h1>Login failed...</h1>
        <br />
        <p>Please use your Waseda Gmail account to sign in.</p>
        <p>We need to confirm that you are a student in Waseda university.</p>
        <p>You will be redirected to our home page in 5 seconds...</p>
      </div>
    ) : (
      <div className="mt-20">
        <h1>Login successfully! Redirecting...</h1>
        <br />
        <p>Now you can save your timetable and check it in any device!</p>
        <p>You can also write and edit your course reviews now!</p>
      </div>
    );
  }
}

export default withTranslation("translation")(RedirectPage);
