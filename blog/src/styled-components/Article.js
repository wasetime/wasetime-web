import styled from "styled-components";
import { Header } from "semantic-ui-react";

export const Article = styled("article")`
  background-color: #fff;
  flex: 1 0 auto;
  font-size: 18px;
  padding: 0.5em 0.7em;
`;

export const Section = styled("section")`
  margin-bottom: 1em;
`;

export const Subheading = styled(Header)`
  margin: 0;
`;

export const OList = styled("ol")`
  padding-left: 1em;
  margin: 0;
`;

export const ListItem = styled("li")`
  margin-top: 0.2em;
`;
