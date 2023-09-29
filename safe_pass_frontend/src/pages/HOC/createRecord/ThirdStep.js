import React, { useCallback, useEffect, useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { FormControl, MenuItem, Select } from "@mui/material";
import { dayNight } from "./DropDownValues";
import InputLabel from "@mui/material/InputLabel";
import Flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

export default function ThirdStep({ formData, setFormData }) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const datePickerRef = useRef(null);

  useEffect(() => {
    const flatpickrInstance = Flatpickr(datePickerRef.current, {
      defaultDate: formData.observationDate || "today",
      static: true,
      inline: true,
      onChange: (selectedDates) => {
        const selectedDate = selectedDates[0];
        const formattedDate = selectedDate
          ? selectedDate.toISOString().split("T")[0]
          : "";
        setFormData({ ...formData, observationDate: formattedDate });
      },
    });

    return () => {
      flatpickrInstance.destroy();
    };
  }, [formData, setFormData]);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Safe Pass Database
      </Typography>

      <Grid item xs={12} sm={6}>
        <label
          htmlFor="observationDate"
          className="text-gray-700 dark:text-gray-400 mb-1"
        >
          Select a date:
        </label>
        <input
          type="text"
          ref={datePickerRef}
          id="observationDate"
          name="observationDate"
          className="bg-gray-100 border border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 py-2 px-4 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </Grid>

      <Grid item xs={12} sm={6}>
        <TextField
          required
          type="time"
          id="observationTime"
          name="observationTime"
          label="observation Time"
          fullWidth
          autoComplete="off"
          variant="standard"
          value={formData.observationTime}
          onChange={handleChange}
          className="bg-gray-100 border border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 py-2 px-4 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </Grid>

      <Grid item xs={12} className="mt-2">
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Day or Night</InputLabel>
          <Select
            required
            labelId="demo-simple-select-label"
            id="dayNight"
            name="dayNight"
            label="Day or Night"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={formData.dayNight}
            onChange={handleChange}
            className="bg-gray-100 border border-gray-300 text-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 py-2 px-4 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <MenuItem value="">Select Day or Night</MenuItem>
            {dayNight.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </React.Fragment>
  );
}
