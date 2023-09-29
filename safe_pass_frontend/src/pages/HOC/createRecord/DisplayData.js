import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import ThirdStep from "./ThirdStep";
import FourthStep from "./FourthStep";
import api from "../../../api/api";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import AdminNotifications from "./AdminNotifications";
import DeleteRecordModel from "./DeleteRecordModel";
import ObserveConfirmationModel from "./ObserveConfirmationModel";

const steps = [
  "Animal Identification",
  "Identify Geolocation",
  "Chronology",
  "Meteorology and Road Assessment",
];

export default function DisplayData() {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    animalName: "",
    image: "",
    taxonGroup: "",
    location: {
      type: "",
      coordinates: [],
    },
    observationDate: "",
    observationTime: "",
    dayNight: "",
    climateType: "",
    observationRoad: "",
    roadCondition: "",
    trafficType: "",
  });

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <FirstStep formData={formData} setFormData={setFormData} />;
      case 1:
        return <SecondStep formData={formData} setFormData={setFormData} />;
      case 2:
        return <ThirdStep formData={formData} setFormData={setFormData} />;
      case 3:
        return <FourthStep formData={formData} setFormData={setFormData} />;
      default:
        throw new Error("Unknown step");
    }
  }
  console.log(formData);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const onSubmit = () => {
    api
      .post("/api/observations", formData)
      .then((res) => {
        // toast.success("Record created successfully");
        setOpen(true);
      })
      .catch((error) => {
        console.log(error.message);
        toast.error(error);
      });
  };

  // Modal close handler
  const handleClose = () => {
    setOpen(false);
    window.location = "/Safe-Pass-SriLanka/dashlayout";
  };
  return (
    <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
        <Typography component="h1" variant="h5" align="center">
          Safe Pass Database
        </Typography>
        <Stepper alternativeLabel activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography variant="h5" gutterBottom>
              Observation Recorded ✅.
            </Typography>
            <Typography variant="subtitle1">
              Thank you for submitting your observation details. Your
              information has been successfully recorded in the database and can
              now be accessed.
            </Typography>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {getStepContent(activeStep)}
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              {activeStep !== 0 && (
                <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                  Back
                </Button>
              )}

              <Button
                variant="contained"
                onClick={
                  activeStep === steps.length - 1 ? onSubmit : handleNext
                }
                sx={{ mt: 3, ml: 1 }}
              >
                {activeStep === steps.length - 1
                  ? "Confirm Your Observation"
                  : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Paper>
      {/* Modal */}
      <ObserveConfirmationModel open={open} handleClose={handleClose} />
    </Container>
  );
}
