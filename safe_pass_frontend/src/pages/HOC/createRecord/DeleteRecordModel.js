import React from "react";
import { Modal, Button, Typography } from "@material-ui/core";
import AlertIcon from "@material-ui/icons/Warning";

const RecordModal = ({ isOpen, onCancel, onConfirm }) => {
  return (
    <div>
      {/* Delete Confirmation Modal */}
      <Modal open={isOpen} onClose={onCancel} centered>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            margin: "auto",
            backgroundColor: "#FFF",
            padding: "20px",
            borderRadius: "4px",
          }}
        >
          <AlertIcon style={{ fontSize: "50px", color: "#f44336" }} />
          <Typography variant="h6" style={{ marginTop: "10px" }}>
            Are you sure?
          </Typography>
          <Typography variant="body1">
            You will not be able to undo this action if you proceed!
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "20px",
            }}
          >
            <Button
              variant="outlined"
              color="default"
              style={{ marginRight: "10px" }}
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={onConfirm}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RecordModal;
