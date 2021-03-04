import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FloatingActionButton } from "@bit/wasedatime.core.ts.styles.button";

const StyledFloatingActionButton = styled(FloatingActionButton)`
  bottom: 70px;
`;
interface Props {
  isModalOpen: boolean;
  handleToggleModal: () => void;
}

const FilterButton = ({ isModalOpen, handleToggleModal }) => {
  return (
    <StyledFloatingActionButton
      onClick={handleToggleModal}
      width="56px"
      borderRadius="30px"
    >
      <FontAwesomeIcon
        icon={isModalOpen ? faTimes : faFilter}
        size="2x"
        transform="shrink-3"
      />
    </StyledFloatingActionButton>
  );
};

export default FilterButton;
