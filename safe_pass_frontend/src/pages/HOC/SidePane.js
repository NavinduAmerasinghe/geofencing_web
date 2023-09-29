import React, { useEffect, useState } from "react";
import "./SidePane.css";
import { SidebarData } from "./SideBarData";
import api from "../../api/api";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const SidePane = () => {
  const { t, i18n } = useTranslation();
  const [profile, setProfile] = useState("");
  const { name, email, role, createdAt } = profile;
  const sidebarItems = SidebarData();

  useEffect(() => {
    api
      .get("/api/getme")
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        //console.log(result)
        setProfile(result.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="Sidebar">
      <div className="profile">
        <a href="/user/dashboard">
          <img src="/images/userProfileIcon.png" alt="Profile" />
        </a>

        <h2>{name}</h2>
        <p> {role == 1 ? "Administrator" : "User"}</p>
      </div>
      <ul className="SidebarList">
        {sidebarItems.map((item, key) => {
          return (
            <li
              key={key}
              className="row"
              id={window.location.pathname == item.link ? "active" : ""}
              onClick={item.onClick}
            >
              <div id="icon">{item.icon}</div>
              <div id="title">{t(item.title)}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SidePane;
