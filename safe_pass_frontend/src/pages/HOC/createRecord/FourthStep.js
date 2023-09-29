import React, { useCallback, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { FormControl, MenuItem, Select } from "@mui/material";
import {
  climateType,
  observationRoad,
  roadCondition,
  trafficType,
} from "./DropDownValues";
import InputLabel from "@mui/material/InputLabel";

export default function FourthStep({ formData, setFormData }) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Safe Pass Database
      </Typography>

      <div className="grid grid-cols-2 gap-4">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} className="mb-2">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Climate Type
              </InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="climateType"
                name="climateType"
                label="Climate Type"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                value={formData.climateType}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 py-2 px-4 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <MenuItem value="">Select Climate Type</MenuItem>
                {climateType.map((climate) => (
                  <MenuItem key={climate.value} value={climate.value}>
                    {climate.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} className="mb-2">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Observation Road
              </InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="observationRoad"
                name="observationRoad"
                label="Observation Road"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                value={formData.observationRoad}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 py-2 px-4 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <MenuItem value="">Select Observation Road</MenuItem>
                {observationRoad.map((road) => (
                  <MenuItem key={road.value} value={road.value}>
                    {road.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} className="mb-2">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Road Condition
              </InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="roadCondition"
                name="roadCondition"
                label="Road Condition"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                value={formData.roadCondition}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 py-2 px-4 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <MenuItem value="">Select Road Condition</MenuItem>
                {roadCondition.map((road) => (
                  <MenuItem key={road.value} value={road.value}>
                    {road.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} className="mb-2">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Traffic Type
              </InputLabel>
              <Select
                required
                labelId="demo-simple-select-label"
                id="trafficType"
                name="trafficType"
                label="Traffic Type"
                fullWidth
                autoComplete="given-name"
                variant="standard"
                value={formData.trafficType}
                onChange={handleChange}
                className="bg-gray-100 border border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 py-2 px-4 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <MenuItem value="">Select Traffic Type</MenuItem>
                {trafficType.map((traffic) => (
                  <MenuItem key={traffic.value} value={traffic.value}>
                    {traffic.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
