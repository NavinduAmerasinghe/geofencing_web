import React, { useEffect, useRef, useState } from "react";
import { Typography, Grid, TextField, Button } from "@material-ui/core";

const SecondStep = ({ formData, setFormData }) => {
  const mapRef = useRef(null);
  const [addressInput, setAddressInput] = useState("");
  const [map, setMap] = useState(null);
  const [geocoder, setGeocoder] = useState(null);
  const [address, setAddress] = useState("");

  const geocodeAddress = () => {
    const address = addressInput;

    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          const formattedAddress = results[0].formatted_address;
          const { lat, lng } = results[0].geometry.location;

          console.log("Address: " + formattedAddress);
          console.log("Latitude: " + lat());
          console.log("Longitude: " + lng());
          setAddress(formattedAddress);
          const locationData = {
            type: "Point",
            coordinates: [lng(), lat()],
          };

          setFormData((prevFormData) => ({
            ...prevFormData,
            location: locationData,
          }));

          map.panTo({ lat, lng });
          new window.google.maps.Marker({
            position: { lat, lng },
            map,
          });
        }
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  };

  useEffect(() => {
    if (!map) {
      setMap(
        new window.google.maps.Map(mapRef.current, {
          zoom: 8,
          center: { lat: 6.9271, lng: 79.8612 },
        })
      );
    }

    if (!geocoder) {
      setGeocoder(new window.google.maps.Geocoder());
    }

    if (map && geocoder) {
      map.addListener("click", handleMapClick);
    }
  }, [map, geocoder]);

  const handleMapClick = (event) => {
    const latLng = event.latLng;
    geocodeCoordinates(latLng);
  };

  const geocodeCoordinates = (latLng) => {
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === "OK") {
        if (results[0]) {
          const formattedAddress = results[0].formatted_address;
          const { lat, lng } = results[0].geometry.location;

          console.log("Address: " + formattedAddress);
          console.log("Latitude: " + lat());
          console.log("Longitude: " + lng());
          setAddress(formattedAddress);

          const locationData = {
            type: "Point",
            coordinates: [lng(), lat()],
          };

          setFormData((prevFormData) => ({
            ...prevFormData,
            location: locationData,
          }));

          map.panTo({ lat, lng });
          new window.google.maps.Marker({
            position: { lat, lng },
            map,
          });
        }
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  };

  const handleAddressChange = (event) => {
    setAddressInput(event.target.value);
  };

  const handleGeocodeClick = () => {
    geocodeAddress();
    setAddressInput("");
  };

  console.log(formData);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          variant="outlined"
          label={address ? address : "Enter the Address"}
          value={addressInput}
          onChange={handleAddressChange}
        />
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGeocodeClick}
        >
          Geocode
        </Button>
      </Grid>
      <Grid item container xs={12} spacing={2}>
        <Grid item xs={6}>
          <Typography>
            {/* Longitude: {formData?.location?.coordinates?.[0]} */}
            Longitude:{" "}
            {formData &&
              formData.location &&
              formData.location.coordinates &&
              formData.location.coordinates[0]}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography>
            {/* Latitude: {formData?.location?.coordinates?.[1]} */}
            Latitude:{" "}
            {formData &&
              formData.location &&
              formData.location.coordinates &&
              formData.location.coordinates[1]}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography>Address: {address}</Typography>
      </Grid>
      <Grid item xs={12}>
        <div ref={mapRef} style={{ height: "400px", width: "100%" }} />
      </Grid>
    </Grid>
  );
};

export default SecondStep;
