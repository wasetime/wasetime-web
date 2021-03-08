import React from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

const StyledMarkdown = styled(ReactMarkdown)`
    font-family: 'Open Sans', sans-serif;
    padding: 30px;

    & p {
    font-size: 1rem;
    margin-top: 0;
    margin-bottom: 0;
    padding-bottom: 2px;
    }
    & ul {
    list-style: square;
    margin-top: 10px;
    font-size:  1rem;
    }
    & li {
    padding-bottom: 2px;
    }
    & h1 {
      font-size: 1.6rem;
    }
    & img{
      display: block;
      margin-left: auto;
      margin-right: auto;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    }
   `;

interface Props {
  match: {
    params: {
      title: string;
    };
  };
}

interface State {
  content: any;
  urlFile: string;
}

class CareerArticles extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    const { params } = this.props.match;
    this.state = {
      content: null,
      urlFile: `https://wasedatime-feeds.s3-ap-northeast-1.amazonaws.com/${params.title}/${params.title}.md`,
    };
  }
  componentDidMount() {
    axios
      .get(this.state.urlFile)
      .then((response) => {
        console.log("Success in fetching the file from " + this.state.urlFile);
        this.setState({ content: response.data });
      })
      .catch((error) => {
        console.error("Error in fetching the file from " + this.state.urlFile);
      });
  }
  render() {
    const { urlFile, content } = this.state;

    return (
      <div>
        <h3> Fetched from: </h3> {urlFile}
        <hr />
        <div className="markdown-body">
          <StyledMarkdown source={content} />
        </div>
      </div>
    );
  }
}

export default CareerArticles;
