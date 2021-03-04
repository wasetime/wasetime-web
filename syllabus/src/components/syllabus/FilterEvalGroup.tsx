import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown";
import FilterGroup from "./FilterGroup";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styled from "styled-components";

const Range = Slider.createSliderWithTooltip(Slider.Range);

const StyledDropdown = styled(Dropdown)`
  font-size: 1em !important;
  min-height: 32px !important;
  padding: 0px !important;
  padding-top: 0.3rem !important;

  label {
    font-family: Lato, Yu Gothic Medium, Segoe UI !important;
    font-display: swap;
  }

  .divider.text {
    line-height: 1.3 !important;
    font-size: 1.2em !important;
    margin: 2px 1rem !important;
  }

  .menu .text {
    line-height: 1.2 !important;
  }

  i {
    padding: 0.5rem 0.2rem 0.5rem 0px !important;
  }
`;

interface Props {
  handleToggleFilter: (name: string, value: any) => void;
  legend: string;
  typeDefault: string;
  typeInputs: object[];
  typeInputName: string;
  selectedTypeInput: number;
  percentInputName: string;
  selectedPercentInputs: number[];
  specialInputName: string;
  checkedSpecialInputs: object[];
}

const FilterEvalGroup = ({
  handleToggleFilter,
  legend,
  typeDefault,
  typeInputs,
  typeInputName,
  selectedTypeInput,
  percentInputName,
  selectedPercentInputs,
  specialInputName,
  checkedSpecialInputs,
}: Props) => {
  return (
    <div>
      <FormLabel
        style={{ fontSize: "1.2em", color: "#000", fontWeight: "bold" }}
      >
        {legend}
      </FormLabel>
      <Grid style={{ margin: "0" }}>
        <Grid.Column width={7} style={{ paddingLeft: "0px", paddingTop: "0" }}>
          <StyledDropdown
            placeholder={typeDefault}
            selection
            fluid
            clearable
            options={typeInputs}
            value={selectedTypeInput}
            onChange={(e, data) => {
              handleToggleFilter(typeInputName, data.value);
            }}
            aria-label={typeInputName}
          />
        </Grid.Column>
        <Grid.Column width={9} style={{ paddingTop: "0" }}>
          <Range
            min={0}
            max={100}
            step={5}
            defaultValue={selectedPercentInputs}
            tipFormatter={(value) => value + "%"}
            tipProps={{ placement: "bottom", visible: true }}
            onAfterChange={(v) => handleToggleFilter(percentInputName, v)}
            ariaLabelGroupForHandles={[percentInputName + "Min", percentInputName + "Max"]}
          />
        </Grid.Column>
      </Grid>
      <FilterGroup
        handleToggleFilter={handleToggleFilter}
        legend={""}
        inputName={specialInputName}
        inputs={checkedSpecialInputs}
        filterType={"checkbox"}
      />
    </div>
  );
};

export default FilterEvalGroup;
