import React from "react";
import HomeIcon from "./sidePaneIcons/icon_home.png";
import AddIcon from "./sidePaneIcons/icon_add.png";
import AssessmentIcon from "./sidePaneIcons/icon_analytics.png";
import DashboardIcon from "./sidePaneIcons/icon_dashboard.png";
import ResearchIcon from "./sidePaneIcons/icon_research.png";
import LogoutIcon from "./sidePaneIcons/icon_logout.png";
import ProtectedArea from "./sidePaneIcons/icon_map.png";
import { useHistory } from "react-router-dom";
import { logOut } from "../../component/authUtils";

export const SidebarData = (isAdmin) => {
  const userRole = localStorage.getItem("userRole");
  const sidebarItems = [
    {
      title: "HOME",
      icon: (
        <img
          src={HomeIcon}
          style={{ width: "30px", height: "30px" }}
          alt="Profile"
        />
      ),
      onClick: () => (window.location.pathname = "/"),
    },
    {
      title: "ADD_RECORD",
      icon: (
        <img
          src={AddIcon}
          style={{ width: "30px", height: "30px" }}
          alt="AddData"
        />
      ),
      onClick: () =>
        (window.location.pathname = "/Safe-Pass-SriLanka/CreateRecord"),
    },
    // {
    //   title: "NOTIFICATIONS",
    //   icon: (
    //     <img
    //       src={AddIcon}
    //       style={{ width: "30px", height: "30px" }}
    //       alt="AddData"
    //     />
    //   ),
    //   onClick: () =>
    //     (window.location.pathname = "/Safe-Pass-SriLanka/Admin/Notifications"),
    // },
    {
      title: "ANALYTICS",
      icon: (
        <img
          src={AssessmentIcon}
          style={{ width: "30px", height: "30px" }}
          alt="Profile"
        />
      ),
      onClick: () =>
        (window.location.pathname = "/Safe-Pass-SriLanka/analytics"),
    },
    {
      title: "DASHBOARD",
      icon: (
        <img
          src={DashboardIcon}
          style={{ width: "20px", height: "20px" }}
          alt="Profile"
        />
      ),
      onClick: () =>
        (window.location.pathname = "/Safe-Pass-SriLanka/dashlayout"),
    },
    {
      title: "PROTECTED_AREAS",
      icon: (
        <img
          src={ProtectedArea}
          style={{ width: "20px", height: "20px" }}
          alt="Profile"
        />
      ),
      onClick: () =>
        (window.location.pathname = "/Safe-Pass-SriLanka/protected-areas"),
    },
    {
      title: "RESEARCH_OBJECTIVE",
      icon: (
        <img
          src={ResearchIcon}
          style={{ width: "30px", height: "30px" }}
          alt="Research"
        />
      ),
      onClick: () => (window.location.pathname = "/research-objective"),
    },
    {
      title: "LOG_OUT",
      icon: (
        <img
          src={LogoutIcon}
          style={{ width: "20px", height: "20px" }}
          alt="Logout"
        />
      ),
      onClick: (history) => {
        logOut(history);
      },
    },
  ];
  if (parseInt(userRole) === 1) {
    console.log("Admin");
    return sidebarItems;
  } else {
    // Remove the dashboard option from the sidebar items
    console.log("User");
    const filteredSidebarItems = sidebarItems.filter(
      (item) => item.title !== "NOTIFICATIONS"
    );
    return filteredSidebarItems;
  }
};
