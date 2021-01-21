import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { withNamespaces } from "react-i18next";

const SignInButton = ({ onClickFunc, t }) => (
  <Button
    color="red"
    onClick={onClickFunc}
    style={{
      fontSize: "1.4em",
      padding: "0.5em",
      marginLeft: "0",
      background: "#b51e36",
      borderRadius: "30px",
    }}
    icon
    labelPosition="left"
  >
    <Icon name="google" />
    {t(`user.Sign In with WasedaMail`)}
  </Button>
);

export default withNamespaces("translation")(SignInButton);
