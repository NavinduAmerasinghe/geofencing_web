import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import api from "../../../api/api";

const ObeservationDayNightStats = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          "/api/observation/animalObservationDayNight"
        );
        setChartData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {chartData.dayObservations && chartData.nightObservations && (
        <ReactApexChart
          options={{
            chart: {
              id: "observation-chart",
            },
            xaxis: {
              categories: chartData.dayObservations.map(
                (observation) => observation._id
              ),
              title: {
                text: "Animal Type",
                style: {
                  fontSize: "12px",
                  color: "#FFFFFF",
                  fontFamily: "times-new-roman",
                },
              },
            },
            yaxis: {
              title: {
                text: "Day & Night Observation",
                style: {
                  fontSize: "12px",
                  color: "#FFFFFF",
                  fontFamily: "times-new-roman",
                },
              },
            },
            title: {
              text: "Observation Day and Night Stats", // Specify the chart title
              align: "center", // Align the title to the center
              style: {
                fontSize: "18px", // Adjust the font size of the title
                color: "#FFFFFF", // Set the title color to white
                fontFamily: "times-new-roman", // Set the font family to Times New Roman
              },
            },
          }}
          series={[
            {
              name: "Day Observations",
              data: chartData.dayObservations.map(
                (observation) => observation.count
              ),
            },
            {
              name: "Night Observations",
              data: chartData.nightObservations.map(
                (observation) => observation.count
              ),
            },
          ]}
          type="bar"
          height={400}
          width="100%"
        />
      )}
    </div>
  );
};

export default ObeservationDayNightStats;
