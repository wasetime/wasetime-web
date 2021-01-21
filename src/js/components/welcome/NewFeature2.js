import React from "react";
import { withNamespaces } from "react-i18next";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

import { Article } from "../../styled-components/Article";
import { media } from "../../styled-components/utils";
import { Divider, Grid, Icon } from "semantic-ui-react";

import reviewsImg from "../../../img/reviews-example.png";
import timetableImg1 from "../../../img/timetable-example-1.png";
import timetableImg2 from "../../../img/timetable-example-2.png";

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

const NewFeature2 = ({ classes, t, lng }) => {
  return (
    <ExtendedArticle>
      <Divider horizontal style={{ fontSize: "1.3em" }}>
        {t("welcome.writeReviews")}
      </Divider>

      <Typography
        className={classes.h4}
        variant="h4"
        component="p"
        align="center"
        gutterBottom
      >
        {t("welcome.writeReviewsExplain1")}
        <br />
        <br />
        {t("welcome.writeReviewsExplain2")}
        <br />
        <br />
        <img src={reviewsImg} alt="reviews example" width="100%" />
      </Typography>

      <Divider horizontal style={{ fontSize: "1.3em" }}>
        {t("welcome.timetableSync")}
      </Divider>

      <Typography
        className={classes.h4}
        variant="h4"
        component="p"
        align="center"
        gutterBottom
      >
        {t("welcome.timetableSyncExplain")}
        <br />
        <Grid style={{ paddingTop: "4vh" }}>
          <Grid.Column width={10} style={{ padding: "0px" }}>
            <img src={timetableImg1} alt="timetable example 1" width="100%" />
          </Grid.Column>
          <Grid.Column width={2} style={{ padding: "0px", paddingTop: "20%" }}>
            <Icon name="exchange" />
          </Grid.Column>
          <Grid.Column width={4} style={{ padding: "0px" }}>
            <img src={timetableImg2} alt="timetable example 2" width="100%" />
          </Grid.Column>
        </Grid>
        <br />
        {t("welcome.timetableDisplayCredits")}
      </Typography>
    </ExtendedArticle>
  );
};

export default withNamespaces("translation")(withStyles(styles)(NewFeature2));
