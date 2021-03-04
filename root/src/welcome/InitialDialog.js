import React from "react";
import Dialog from "@material-ui/core/Dialog";
import {withStyles} from "@material-ui/core/styles";

import {WrapperWithBackground} from "../common/Wrapper";
import DialogStepper from "./DialogStepper";
import homeBackground from "../../../img/home_background.jpg";
import homeBackgroundPhone from "../../../img/home_background-phone.jpg";

const styles = {
  dialogPaper: {
    margin: "40px",
    maxWidth: "620px",
  },
};

const InitialDialog = ({ classes }) => {
  return (
    <WrapperWithBackground
      background={homeBackground}
      backgroundPhone={homeBackgroundPhone}
    >
      <Dialog
        open={true}
        // onClose={this.handleClose}
        aria-labelledby="initial-dialog"
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogStepper />
      </Dialog>
    </WrapperWithBackground>
  );
};

export default withStyles(styles)(InitialDialog);
