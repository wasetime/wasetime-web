import styled from "styled-components";

// import { media } from "./utils";

export const Wrapper = styled("div")`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
`;

export const RowWrapper = styled("div")`
  display: flex;
  flex-direction: row;
  flex: 1 0 auto;
`;

export const WrapperWithBackground = styled(Wrapper)`
  background-image: url(${(props) => props.background});
  background-position: center, center;
  background-size: cover;
  background-repeat: no-repeat;
`;

// ${media.phone`background-image: url(${(props) => props.backgroundPhone});`};
