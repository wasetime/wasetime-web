import React from "react";
import { Container, Dropdown, Header, Image, Menu } from "semantic-ui-react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import styled from "styled-components";

class CareerArticles extends React.Component {
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
    const StyledMarkdown = styled(ReactMarkdown)`
    font-family: 'Open Sans', sans-serif;
    padding: 30px;

    & p {
    font-size: 1.6rem;
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
    return (
      <div>
        <h3> Fetched from: </h3> {urlFile}
        <hr />
        <Container className="markdown-body">
          <StyledMarkdown source={content} />
        </Container>
        {/* <Menu fixed='top' inverted>
          <Container>
            <Menu.Item as='a' header>
              <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
              Project Name
            </Menu.Item>
            <Menu.Item as='a'>Home</Menu.Item>

            <Dropdown item simple text='Dropdown'>
              <Dropdown.Menu>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Header>Header Item</Dropdown.Header>
                <Dropdown.Item>
                  <i className='dropdown icon' />
                  <span className='text'>Submenu</span>
                  <Dropdown.Menu>
                    <Dropdown.Item>List Item</Dropdown.Item>
                    <Dropdown.Item>List Item</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Container>
        </Menu> */}
        {/* <Container text style={{ marginTop: "7em" }}>
          <Header as="h1">Semantic UI React Fixed Template</Header>
          <p>
            This is a basic fixed menu template using fixed size containers.
          </p>
          <p>
            A text container is used for the main container, which is useful for
            single column layouts.
          </p>

          <Image
            src="/images/wireframe/media-paragraph.png"
            style={{ marginTop: "2em" }}
          />
          <Image
            src="/images/wireframe/paragraph.png"
            style={{ marginTop: "2em" }}
          />
          <Image
            src="/images/wireframe/paragraph.png"
            style={{ marginTop: "2em" }}
          />
          <Image
            src="/images/wireframe/paragraph.png"
            style={{ marginTop: "2em" }}
          />
          <Image
            src="/images/wireframe/paragraph.png"
            style={{ marginTop: "2em" }}
          />
          <Image
            src="/images/wireframe/paragraph.png"
            style={{ marginTop: "2em" }}
          />
          <Image
            src="/images/wireframe/paragraph.png"
            style={{ marginTop: "2em" }}
          />
        </Container> */}
      </div>
    );
  }
}

export default CareerArticles;
