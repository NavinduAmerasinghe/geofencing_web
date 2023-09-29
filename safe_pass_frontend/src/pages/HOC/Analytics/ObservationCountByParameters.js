import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import api from "../../../api/api";

const ObservationCountByParameters = () => {
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          "/api/observation/animalObservationRoad"
        ); // Replace with your API endpoint

        const chartData = Object.entries(response.data).map(
          ([key, values]) => ({
            name: key,
            data: values.map(({ count }) => count),
          })
        );

        setChartOptions({
          xaxis: {
            categories: chartData.map(({ name }) => name),
            title: {
              text: "Meteorology and Road Assessment",
              style: {
                fontSize: "12px",
                color: "#FFFFFF",
                fontFamily: "Times New Roman",
              },
            },
          },
          yaxis: {
            title: {
              text: "Observation Count",
              style: {
                fontSize: "12px",
                color: "#FFFFFF",
                fontFamily: "Times New Roman",
              },
            },
          },
          title: {
            text: "Observation Count by Parameters",
            align: "center",
            style: {
              fontSize: "18px",
              color: "#FFFFFF",
              fontFamily: "Times New Roman",
            },
          },
        });

        setChartSeries(
          chartData.map(({ name, data }) => ({
            name,
            data,
          }))
        );
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={400}
        width="100%"
      />
    </div>
  );
};

export default ObservationCountByParameters;
