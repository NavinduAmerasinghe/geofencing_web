import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Polygon,
  OverlayView,
} from "@react-google-maps/api";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { UseTranslationOptions, useTranslation } from "react-i18next";
import api from "../../../api/api";
import CreateProtectedArea from "./createProtectedArea";

const libraries = ["places"];
const mapContainerStyle = {
  marginRight: "80px",
  height: "80vh",
  width: "55vw",
};
const options = {
  zoomControl: true,
};

const center = { lat: 7.8731, lng: 80.7718 };
const numPoints = 100; // Number of points to create the circular area
const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

const createCirclePolygon = (center, radius, numPoints) => {
  const path = [];
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * 360;
    const lat = center.lat + radius * Math.cos(angle * (Math.PI / 180));
    const lng = center.lng + radius * Math.sin(angle * (Math.PI / 180));
    path.push({ lat, lng });
  }
  return path;
};

const ProtectedArea = () => {
  const { t } = useTranslation();
  const userRole = localStorage.getItem("userRole");

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  const [infoWindow, setInfoWindow] = React.useState(null);
  const [blink, setBlink] = useState(true);
  const [polygons, setPolygons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/"); // Replace with your API endpoint
        setPolygons(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log(polygons);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink((prevBlink) => !prevBlink);
    }, 1000); // Blink every 1 second

    return () => {
      clearInterval(blinkInterval);
    };
  }, []);

  const handlePolygonClick = (event, name) => {
    setInfoWindow({
      position: event.latLng,
      content: name,
    });
  };

  const closeInfoWindow = () => {
    setInfoWindow(null);
  };

  const renderLabel = (position, content) => (
    <OverlayView
      position={position}
      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={(width, height) => ({
        x: -(width / 2),
        y: -(height / 2),
      })}
    >
      <div
        style={{
          background: "white",
          padding: "2px",
          borderRadius: "4px",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
        }}
      >
        {content}
      </div>
    </OverlayView>
  );

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <h2
        style={{
          color: "white",
          textAlign: "center",
          fontFamily: "times-new-roman",
        }}
      >
        {t(
          "PROPOSED_ELEPHANT_CORRIDORS_UNDER_THE DEPARTMENT_OF_WILDLIFE_CONSERVATION"
        )}
      </h2>

      {parseInt(userRole) === 1 && <CreateProtectedArea />}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBottom: "2rem",
          marginTop: "2rem",
          // marginRight: "15rem",
        }}
      >
        <Container
          component="main"
          maxWidth="sm"
          style={{ marginRight: "1rem" }}
        >
          <Paper variant="outlined" style={{ height: "45vh", width: "35vw" }}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              zoom={12}
              center={center}
              options={options}
            >
              {polygons.map((polygon) => {
                const radiusInMeters = Math.sqrt(
                  (polygon.totalAreaKm2 * 1000000) / Math.PI
                );
                const coords = createCirclePolygon(
                  { lat: polygon.lat, lng: polygon.lng },
                  radiusInMeters / 111300,
                  numPoints
                );
                const blinkOptions = blink
                  ? {
                      strokeColor: "#e74c3c",
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                      fillColor: "#e74c3c",
                      fillOpacity: 0.35,
                    }
                  : {
                      strokeColor: "#ff7979",
                      strokeOpacity: 0.8,
                      strokeWeight: 2,
                      fillColor: "#ff7979",
                      fillOpacity: 0.35,
                    };
                return (
                  <Polygon
                    key={polygon._id}
                    paths={coords}
                    options={blinkOptions}
                    onClick={(event) => handlePolygonClick(event, polygon.name)}
                  />
                );
              })}
              {infoWindow &&
                renderLabel(infoWindow.position, infoWindow.content)}
            </GoogleMap>
          </Paper>
        </Container>
        <Paper
          variant="outlined"
          style={{
            width: "30%",
            height: "50vh",
            fontFamily: "times-new-roman",
            overflow: "auto",
            marginLeft: "45rem",
            paddingTop: "1rem",
            display: "flex",
            flexDirection: "row",
          }}
        >
          {/* New box column content */}
          <ul style={{ listStyleType: "circle" }}>
            {polygons.map((polygon) => (
              <li key={polygon._id}>{polygon.name}</li>
            ))}
          </ul>
        </Paper>
      </div>
    </div>
  );
};

export default ProtectedArea;
