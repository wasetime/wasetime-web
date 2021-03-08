import * as React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CareerArticles from "./CareerArticles";
import moment from "moment";
import { Post } from "../types/post";

const useStyles = makeStyles({
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

function FeaturedPost(props: { post: Post }) {
  const classes = useStyles();
  const { post } = props;
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Link to={`/blog/articles/${post.src}`}>
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                <Typography component="h2" variant="h5">
                  {post.title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {moment(post.created_at).format("MMMM Do YYYY")}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {post.summary}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  Continue reading...
                  {/* {post.src} */}
                </Typography>
              </CardContent>
            </div>
            <Hidden smDown>
              <CardMedia
                className={classes.cardMedia}
                image={`https://wasedatime-feeds.s3-ap-northeast-1.amazonaws.com/${post.src}cover.jpg`}
                title="Article Cover"
              />
            </Hidden>
          </Card>
        </Link>
      </CardActionArea>
      {/* <Route path={`/user/${post.src}`} component={CareerArticles} /> */}
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    created_at: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    // image: PropTypes.string.isRequired,
    // imageText: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;
