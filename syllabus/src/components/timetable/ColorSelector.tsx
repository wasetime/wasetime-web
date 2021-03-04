import React from "react";
import styled from "styled-components";

const colorIds = [0, 1, 2, 3, 4, 5, 6, 7];

const InvisibleButton = styled("button")`
  align-self: flex-start;
  background-color: #fff;
  border: none;
  padding: 0;
  outline: 0;
`;

const ColorButton = styled(InvisibleButton)`
  width: 1.5em;
  height: 1.5em;
  border: 1px solid ${props => props.theme["color" + props.color]};
  border-radius: 0.3em;
  margin: 0 0.1em;
  background-color: ${props => props.theme["bgColor" + props.color]};
`;

interface Props {
  handleChangeColor: (id: string) => void;
}

const ColorSelector = ({ handleChangeColor }) => {
  return (
    <div>
      {colorIds.map((id) => (
        <ColorButton
          key={id}
          color={id}
          onClick={(event) => {
            event.preventDefault();
            handleChangeColor(id);
          }}
        />
      ))}
    </div>
  );
};

export default ColorSelector;
