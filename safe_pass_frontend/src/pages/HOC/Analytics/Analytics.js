import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import ApexCharts from "apexcharts";
import "./Analytics.css";
import ObeservationDayNightStats from "./ObeservationDayNightStats";
import ObservationCountByParameters from "./ObservationCountByParameters";
import api from "../../../api/api";

const Analytics = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/api/observation/getAnimalCountByDate");
        setChartData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (chartData.length > 0) {
      renderCharts();
    }
  }, [chartData]);

  const renderCharts = () => {
    const data = chartData.map((item) => ({
      x: new Date(item.date).getTime(),
      y: item.count,
    }));

    var options1 = {
      chart: {
        id: "chart2",
        type: "area",
        height: 230,
        width: "100%",
        foreColor: "#ccc",
        toolbar: {
          autoSelected: "pan",
          show: false,
        },
      },
      colors: ["#00BAEC"],
      stroke: {
        width: 3,
      },
      grid: {
        borderColor: "#555",
        clipMarkers: false,
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        gradient: {
          enabled: true,
          opacityFrom: 0.55,
          opacityTo: 0,
        },
      },
      markers: {
        size: 5,
        colors: ["#000524"],
        strokeColor: "#00BAEC",
        strokeWidth: 3,
      },
      series: [
        {
          data: data,
        },
      ],
      tooltip: {
        theme: "dark",
      },
      xaxis: {
        type: "datetime",
        labels: {
          datetimeFormatter: {
            year: "yyyy",
            month: "MMM 'yy",
            day: "dd MMM",
            hour: "HH:mm",
          },
        },
        title: {
          text: "Date",
          style: {
            fontSize: "14px",
            fontWeight: 600,
          },
        },
      },
      yaxis: {
        min: 0,
        tickAmount: 4,
        title: {
          text: "Responses",
          style: {
            fontSize: "14px",
            fontWeight: 600,
          },
        },
      },
    };

    var chart1 = new ApexCharts(
      document.querySelector("#chart-area"),
      options1
    );
    chart1.render();

    var options2 = {
      chart: {
        id: "chart1",
        height: 130,
        width: "100%",
        type: "bar",
        foreColor: "#ccc",
        brush: {
          target: "chart2",
          enabled: true,
        },
        selection: {
          enabled: true,
          fill: {
            color: "#fff",
            opacity: 0.4,
          },
          xaxis: {
            min: new Date("27 Jul 2017 10:00:00").getTime(),
            max: new Date("14 Aug 2017 10:00:00").getTime(),
          },
        },
      },
      colors: ["#FF0080"],
      series: [
        {
          data: data,
        },
      ],
      stroke: {
        width: 2,
      },
      grid: {
        borderColor: "#444",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        type: "datetime",
        tooltip: {
          enabled: false,
        },
      },
      yaxis: {
        tickAmount: 2,
      },
    };

    var chart2 = new ApexCharts(document.querySelector("#chart-bar"), options2);
    chart2.render();
  };

  return (
    <div>
      <h2
        style={{
          color: "white",
          textAlign: "center",
          fontFamily: "times-new-roman",
        }}
      >
        Analytics For Reasearch Findings
      </h2>
      <div id="chart-area"></div>
      <div id="chart-bar"></div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "50px",
        }}
      >
        <ObeservationDayNightStats />
        <ObservationCountByParameters />
      </div>
    </div>
  );
};

export default Analytics;
