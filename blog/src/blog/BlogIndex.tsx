import * as React from "react";
import { styled } from "@material-ui/core/styles";
// import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import GitHubIcon from "@material-ui/icons/GitHub";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import MainFeaturedPost from "./MainFeaturedPost";
import FeaturedPost from "./FeaturedPost";
import Main from "./Main";
import Sidebar from "./Sidebar";
// import axios from 'axios';
import careerAPI from "./careerAPI";
import { Post } from "../types/post";

const MainContainer = styled(Container)({
  padding: "50px",
});

// const mainFeaturedPost = {
//   title: 'Title of a longer featured blog post',
//   description:
//     "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
//   image: 'https://source.unsplash.com/random',
//   imageText: 'main image description',
//   linkText: 'Continue reading…',
// };

// const featuredPosts = [
//   {
//     title: 'Featured post',
//     date: 'Nov 12',
//     description:
//       'This is a wider card with supporting text below as a natural lead-in to additional content.',
//     image: 'https://source.unsplash.com/random',
//     imageText: 'Image Text',
//   },
//   {
//     title: 'Post title',
//     date: 'Nov 11',
//     description:
//       'This is a wider card with supporting text below as a natural lead-in to additional content.',
//     image: 'https://source.unsplash.com/random',
//     imageText: 'Image Text',
//   },
// ];

const sidebar = {
  title: "About",
  description:
    "Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.",
  archives: [
    { title: "March 2020", url: "#" },
    { title: "February 2020", url: "#" },
    { title: "January 2020", url: "#" },
    { title: "November 1999", url: "#" },
    { title: "October 1999", url: "#" },
    { title: "September 1999", url: "#" },
    { title: "August 1999", url: "#" },
    { title: "July 1999", url: "#" },
    { title: "June 1999", url: "#" },
    { title: "May 1999", url: "#" },
    { title: "April 1999", url: "#" },
  ],
  social: [
    { name: "GitHub", icon: GitHubIcon },
    { name: "Twitter", icon: TwitterIcon },
    { name: "Facebook", icon: FacebookIcon },
  ],
};

interface IMyComponentState {
  featuredPosts: Post[];
  mainFeaturedPost: Post | null;
}

class BlogIndex extends React.Component<{}, IMyComponentState> {
  constructor(props) {
    super(props);
    this.state = {
      mainFeaturedPost: null,
      featuredPosts: [],
      // urlFile: "https://api.wasedatime.com/staging/feeds?offset=0&limit=5",
    };
  }
  // componentDidMount() {
  //   axios.get(this.state.urlFile)
  //   .then(response => {
  //      console.log("Success in fetching the file from " + this.state.urlFile);
  //      this.setState({ mainFeaturedPost: response.data.data.articles[0] });
  //      console.log(this.state.mainFeaturedPost);

  //   })
  //   .catch(error => {
  //      console.error("Error in fetching the file from " + this.state.urlFile);
  //   });
  // }
  async componentDidMount() {
    let apiContents = await careerAPI.get<{ data: { articles: Post[] } }>("/");
    let MainApiContent = apiContents.data.data.articles[0];
    // apiContent = apiContent.data.data.articles
    let x = 0; //suppose you want to remove element at 0th index
    let apiContent = apiContents.data.data.articles.filter(
      (num, index) => index !== x
    ); //editedArray = [1,2,3,4]
    this.setState({
      mainFeaturedPost: MainApiContent,
      featuredPosts: apiContent,
    });
    console.log(this.state.featuredPosts);
  }
  render() {
    const { mainFeaturedPost, featuredPosts } = this.state;
    return (
      <React.Fragment>
        <MainContainer maxWidth="lg">
          <main>
            {mainFeaturedPost && <MainFeaturedPost post={mainFeaturedPost} />}

            <Grid container spacing={4}>
              {featuredPosts.map((post) => (
                <FeaturedPost key={post.title} post={post} />
              ))}
            </Grid>
            {/* <Grid container spacing={5}>
              <Main title="From the firehose" posts={posts} />
              <Sidebar
                title={sidebar.title}
                description={sidebar.description}
                archives={sidebar.archives}
                social={sidebar.social}
              />
            </Grid> */}
          </main>
        </MainContainer>
      </React.Fragment>
    );
  }
}

export default BlogIndex;
