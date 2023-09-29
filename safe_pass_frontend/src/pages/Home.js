/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";
import api from "../api/api";
import Banner from "../component/Banner";
import Card from "../component/Card";
import "antd/dist/antd.css";
import { Pagination } from "antd";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t, i18n } = useTranslation();
  const [responseCount, setResponseCount] = useState(0);
  const [lastAddedDate, setLastAddedDate] = useState("");

  useEffect(() => {
    api
      .get("/api/observations")
      .then((res) => {
        setResponseCount(res.data);
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.mesage);
      });
  }, []);

  console.log(responseCount);

  useEffect(() => {
    api
      .get("/api/observation/summary")
      .then((res) => {
        setLastAddedDate(res.data);
        return res.data;
      })
      .catch((error) => {
        toast.error(error.mesage);
      });
  }, []);

  return (
    <div>
      <Header />
      <Banner />

      <div className="container pb-5">
        <div className="row">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src="/images/wildlife_logo.jpg"
              alt="My Image"
              style={{ width: "250px", height: "250px" }}
            />
          </div>
          <div className="col-sm-11">
            <div style={{ textAlign: "center", color: "white" }}>
              <h2
                style={{ textAlign: "center", color: "white", marginTop: 20 }}
              >
                REAL-TIME ALERT SYSTEM FOR ROAD SAFTEY TO PREVENT ANIMAL-VEHICLE
                CONFLICTS IN SRILANKA
              </h2>
              <div className="card-body ">
                <div
                  className="card-body"
                  style={{ backgroundColor: "#6ab04c" }}
                >
                  Knowledge-based case study for animal habitat, behaviour, and
                  interaction.{" "}
                </div>
              </div>
            </div>

            <div
              className=" mt-4"
              style={{ maxHeight: "300px", overflow: "hidden" }}
            >
              <div className="row m-4">
                <div className="col-sm-4">
                  <div className="card">
                    <div className="card-body text-center">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: "20px",
                        }}
                      >
                        <img
                          src="/images/icon_database.png"
                          alt="My Image"
                          style={{ width: "80px", height: "80px" }}
                        />
                      </div>
                      <h5 className="card-title mt-6">
                        {t("ENTRIES")} {responseCount.length}
                      </h5>
                      {/* <p className="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.
                      </p> */}
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="card">
                    <div className="card-body text-center">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: "20px",
                        }}
                      >
                        <img
                          src="/images/icon_date.png"
                          alt="My Image"
                          style={{ width: "80px", height: "80px" }}
                        />
                      </div>
                      <h5 className="card-title"> {t("LAST_ON")}</h5>
                      <h7 className="card-title">
                        {t("DATE")} :{" "}
                        {/* {lastAddedDate?.lastCreated?.createdAt?.split(", ")[0]} */}
                        {lastAddedDate &&
                          lastAddedDate.lastCreated &&
                          lastAddedDate.lastCreated.createdAt &&
                          lastAddedDate.lastCreated.createdAt.split(", ")[0]}
                      </h7>
                      <br />
                      <h7 className="card-title">
                        {t("TIME")} :{" "}
                        {/* {lastAddedDate?.lastCreated?.createdAt?.split(", ")[1]} */}
                        {lastAddedDate &&
                          lastAddedDate.lastCreated &&
                          lastAddedDate.lastCreated.createdAt &&
                          lastAddedDate.lastCreated.createdAt.split(", ")[1]}
                      </h7>
                      {/* <p className="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.
                      </p> */}
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="card">
                    <div className="card-body text-center">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginBottom: "20px",
                        }}
                      >
                        <img
                          src="/images/icon_records.png"
                          alt="My Image"
                          style={{ width: "80px", height: "80px" }}
                        />
                      </div>
                      <h5 className="card-title">{t("VIEW_DATA")}</h5>
                      {/* <p className="card-text">
                        With supporting text below as a natural lead-in to
                        additional content.
                      </p> */}
                      <a
                        href="/Safe-Pass-SriLanka/dashlayout"
                        className="btn btn-primary"
                      >
                        {t("VIEW_DATA")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body ">
              <div className="card-body" style={{ backgroundColor: "#6ab04c" }}>
                A knowledge-based study is being carried out to pinpoint the
                habitats and behaviors of many kinds of animals. Using
                crowdsourcing technologies, information will be gathered from
                Sri Lankan government agencies, non-governmental organizations
                (NGOs), local communities living in areas where there is a high
                risk of animal-vehicle collisions, drivers and commuters who
                frequently use roads that are known to be high-risk areas for
                animal-vehicle collisions, and researchers to identify high-risk
                areas and time periods for animal-vehicle collisions and notify
                passengers about the conflicts before they occur.
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
