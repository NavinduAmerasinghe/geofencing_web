import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";

const RecordModal = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Record Created Successfully</DialogTitle>
      <DialogContent>
        <p>
          Thankyou for you valubale time . Your Record Will be reviewed by the
          administrator and will added to the database.Thankyou !
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RecordModal;
