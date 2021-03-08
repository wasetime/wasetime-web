import React from "react";
import BlogIndex from "./blog/BlogIndex";
import CareerArticles from "./blog/CareerArticles";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";

export default function Root(props) {
  return (
    <section>
      <Router>
        <Switch>
          <Route path="/blog/articles/:title" component={CareerArticles} />
          <Route exact path="/blog" component={BlogIndex} />
        </Switch>
      </Router>
    </section>
  );
}
