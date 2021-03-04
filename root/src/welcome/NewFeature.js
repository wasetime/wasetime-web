import React from "react";
import { withNamespaces } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";
import Typography from "@material-ui/core/Typography";
import MediaQuery from "react-responsive";

import { Article } from "../common/Article";
import { media, sizes } from "../common/utils";
import { Divider } from "semantic-ui-react";

import loginImg from "../../../img/login-example.png";
import loginMobileImg from "../../../img/login-example-mobile.png";

const ExtendedArticle = styled(Article)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  ${media.phone`
    font-size: 16px
  `};
`;

const styles = {
  h3: {
    margin: "0.6em 0",
    wordBreak: "keep-all",
    fontSize: "1.6em",
  },
  h4: {
    margin: "0.35em 0",
    fontSize: "1.1em",
  },
};

const NewFeature = ({ classes, t, lng }) => {
  return (
    <ExtendedArticle>
      <Divider horizontal style={{ fontSize: "1.3em" }}>
        {t("welcome.userLogin")}
      </Divider>

      <Typography
        className={classes.h4}
        variant="h4"
        component="p"
        align="center"
        gutterBottom
      >
        {t("welcome.loginExplain1")}
        <Icon name="user circle outline" />
        {t("welcome.loginExplain2")}
        <br />
        <br />
        <MediaQuery minWidth={sizes.tablet + 1}>
          {(matches) =>
            matches && <img src={loginImg} alt="login example" height="300" />
          }
        </MediaQuery>{" "}
        <MediaQuery maxWidth={sizes.tablet}>
          {(matches) =>
            matches ? (
              <img
                src={loginMobileImg}
                alt="login mobile example"
                width="250"
              />
            ) : (
              <img
                src={loginMobileImg}
                alt="login mobile example"
                width="250"
                style={{ marginBottom: "100px" }}
              />
            )
          }
        </MediaQuery>
        <br />
        <br />
        {t("welcome.useWasedaGmail1")}
        <b style={{ color: "#b51e36" }}>{t("welcome.Waseda Gmail")}</b>
        {t("welcome.useWasedaGmail2")}
        <br />( ***@***.waseda.jp )
      </Typography>
    </ExtendedArticle>
  );
};

export default withNamespaces("translation")(withStyles(styles)(NewFeature));
