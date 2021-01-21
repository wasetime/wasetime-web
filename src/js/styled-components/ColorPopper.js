import styled from "styled-components";

export const Arrow = styled("div")`
  position: absolute;
  width: 3em;
  height: 3em;
  &[data-placement*="top"] {
    bottom: 0;
    left: 0;
    margin-bottom: -0.9em;
    width: 3em;
    height: 1em;
    &::before {
      border-width: 1em 1.5em 0 1.5em;
      border-color: #eee transparent transparent transparent;
    }
  }
  &::before {
    content: "";
    margin: auto;
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
  }
  z-index: 105;
`;

export const PopperBox = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 8em;
  background-color: #eee;
  color: #fff;
  border-radius: 5px;
  margin: 0.9em;
  padding: 0.5em;
  text-align: center;
  z-index: 105;
`;
