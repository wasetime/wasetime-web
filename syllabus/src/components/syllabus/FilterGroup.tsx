import React from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Dropdown from "semantic-ui-react/dist/commonjs/modules/Dropdown";
import { withStyles } from "@material-ui/core/styles";
import { WithStyles, createStyles } from "@material-ui/core";
import styled from "styled-components";

const StyledDropdown = styled(Dropdown)`
  font-size: 1em !important;
  font-family: Segoe UI, Yu Gothic Medium, Lato;
  font-display: swap;
  min-height: 32px !important;
  padding: 0.2rem 0.5rem 0.1rem 0.5rem !important;

  a.ui.label {
    .delete.icon {
      padding: 0px !important;
    }
  }
  .menu .text {
    line-height: 1.2 !important;
  }

  .text {
    margin: 0.4rem 1rem !important;
  }

  i {
    padding: 0.5rem 1rem !important;
  }
`;

// const StyledFormControlLabel = styled(FormControlLabel)`
//   label {
//     padding-left: 50px !important;
//   }
// `;

const styles = (theme) =>
  createStyles({
    formLabel: {
      fontSize: "1.3em",
      color: "#000",
      fontWeight: "bold",
      fontFamily: "Lato, Yu Gothic Medium, Segoe UI",
      fontDisplay: "swap",
    },
    formGroup: {
      fontSize: "1.2em",
      margin: "0 0 10px",
      fontFamily: "Segoe UI, Yu Gothic Medium, Lato",
      fontDisplay: "swap",
    },
    formControlLabel: {
      minWidth: "70px",
      paddingLeft: "0.5rem",
      marginRight: "0px",
      fontFamily: "Segoe UI, Yu Gothic Medium, Lato",
      fontDisplay: "swap",
    },
    formControlLabel_label: {
      fontSize: "1em",
      fontFamily: "Segoe UI, Yu Gothic Medium, Lato",
      fontDisplay: "swap",
    },
    checkBox: {
      width: "25px",
      height: "30px",
    },
    checkBoxChecked: {
      color: "#b51e36 !important",
    },
  });

interface Props extends WithStyles<typeof styles> {
  handleToggleFilter: (name: string, value: any) => void;
  legend: string;
  inputs: any;
  inputName: string;
  classes: any;
  filterType: string;
}

const FilterGroup = ({
  handleToggleFilter,
  legend,
  inputs,
  inputName,
  classes,
  filterType,
}: Props) => {
  var filterItems;
  if (filterType === "checkbox") {
    filterItems = inputs.map((input) => (
      <FormControlLabel
        key={input.value}
        control={
          <Checkbox
            id={inputName + "_" + input.value}
            name={inputName}
            value={input.value}
            checked={input.ischecked}
            onChange={(e) => {
              handleToggleFilter(e.target.name, e.target.value);
            }}
            classes={{
              root: classes.checkBox,
              checked: classes.checkBoxChecked,
            }}
          />
        }
        label={input.label}
        classes={{
          root: classes.formControlLabel,
          label: classes.formControlLabel_label,
        }}
      />
    ));
  } else if (filterType === "dropdown") {
    filterItems = (
      <StyledDropdown
        placeholder={legend}
        fluid
        multiple
        selection
        options={inputs.map((i) => ({
          ...i,
          ischecked: i.ischecked.toString(),
        }))}
        value={inputs.filter((i) => i.ischecked).map((i) => i.value)}
        onChange={(e, data) => {
          handleToggleFilter(inputName, data.value);
        }}
        aria-label={inputName}
      />
    );
  }

  return (
    <div>
      <FormLabel className={classes.formLabel}>{legend}</FormLabel>
      <FormGroup row className={classes.formGroup}>
        {filterItems}
      </FormGroup>
    </div>
  );
};

export default withStyles(styles)(FilterGroup);
