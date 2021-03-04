import React from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";
import { Helmet } from "react-helmet";
import { withTranslation } from "react-i18next";
import CareerArticles from "./CareerArticles"
import BlogIndex from "./BlogIndex"

const Blog = ({ t }) => {
  return (
    <React.Fragment>
      <Helmet>
        <title>WasedaTime - Career Blog</title>
        <meta
          name="description"
          content="Syllabus Searching at Waseda University."
        />
        <meta property="og:title" content="WasedaTime - Career" />
        <meta
          property="og:description"
          content="Career Finding at Waseda University."
        />
        <meta property="og:site_name" content="WasedaTime - Career" />
      </Helmet>
      <div>
        <Link to="/blog/articles">
          <button className="ui button">{t("career.Articles")}</button>
        </Link>
        <Link to="/blog">
          <button className="ui button">{t("career.Blog")}</button>
        </Link>
        <Switch>
          <Route exact path="/blog/articles" component={CareerArticles} />
          <Route exact path="/blog" component={BlogIndex} />
        </Switch>
      </div>
    </React.Fragment>
  );
};

export default Blog;
