import React from "react";
import { withNamespaces } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { Divider, List } from "semantic-ui-react";

import { Article } from "../../styled-components/Article";
import { media } from "../../styled-components/utils";
import LANGS from "../../config/langs";
import logo from "../../../img/logo.png";

const ExtendedArticle = styled(Article)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Logo = styled("img")`
  width: 100px;
  height: 100px;
  margin: 10px;
  ${media.phone`width: 90px; height: 90px;`};
`;

const StyledList = styled(List)`
  margin: 10px 0px !important;
  text-align: left;
`;

const styles = {
  h3: {
    wordBreak: "keep-all",
    fontFamily: "Segoe UI, Yu Gothic Medium, Lato",
    fontDisplay: "swap",
  },
  h4: {
    wordBreak: "keep-all",
    color: "#0b35c8 !important",
    fontFamily: "Segoe UI, Yu Gothic Medium, Lato",
    fontDisplay: "swap",
  },
  formControlLabelLabel: {
    fontSize: "1em",
    fontFamily: "Segoe UI, Yu Gothic Medium, Lato",
    fontDisplay: "swap",
  },
  radioChecked: {
    color: "#b51e36 !important",
  },
};

class Greeting extends React.Component {
  handleChangeLang = (event) => {
    event.preventDefault();
    const lng = event.target.value;
    this.props.i18n.changeLanguage(lng);
  };

  render() {
    const { classes, t, lng } = this.props;
    return (
      <ExtendedArticle>
        <Logo src={logo} alt="" width="50" height="50" />
        <Typography
          variant="h3"
          component="h3"
          align="center"
          gutterBottom
          className={classes.h3}
        >
          {t("welcome.welcome")}
        </Typography>
        <FormControl component="fieldset" className={undefined}>
          <RadioGroup
            aria-label="Language"
            name="language"
            value={lng}
            onChange={this.handleChangeLang}
            row
          >
            <FormControlLabel
              classes={{ label: classes.formControlLabelLabel }}
              value={LANGS.JP}
              control={<Radio classes={{ checked: classes.radioChecked }} />}
              label="日本語"
            />
            <FormControlLabel
              classes={{ label: classes.formControlLabelLabel }}
              value={LANGS.EN}
              control={<Radio classes={{ checked: classes.radioChecked }} />}
              label="English"
            />
          </RadioGroup>
        </FormControl>
        <Divider horizontal style={{ fontSize: "1.3em" }}>
          {t("welcome.newFeature")}
        </Divider>
        <Typography
          variant="h4"
          component="h4"
          align="center"
          gutterBottom
          className={classes.h4}
        >
          <StyledList>
            <List.Item>
              <List.Icon name="user circle outline" />
              <List.Content>{t("welcome.userLogin")}</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="write" />
              <List.Content>{t("welcome.writeReviews")}</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="calendar alternate outline" />
              <List.Content>{t("welcome.timetableSync")}</List.Content>
            </List.Item>
          </StyledList>
        </Typography>
      </ExtendedArticle>
    );
  }
}

export default withNamespaces("translation")(withStyles(styles)(Greeting));
