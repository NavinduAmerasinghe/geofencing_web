import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { logOut } from "./authUtils";
import { useTranslation } from "react-i18next";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const shapeStyles = { bgcolor: "#001eb9", width: 40, height: 40 };
const shapeCircleStyles = { borderRadius: "50%" };
const rectangle = <Box component="span" sx={shapeStyles} />;
const circle = (
  <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles }} />
);

const theme = createTheme({
  palette: {
    primary: {
      main: "#54e346",
    },
  },
});

const Header = ({ history }) => {
  const { t, i18n } = useTranslation();

  const [selectLanguage, setSelectLangauge] = useState("");

  const handleClick = (lang) => {
    i18n.changeLanguage(lang);
    setSelectLangauge(lang);
  };

  const handleLogout = () => {
    logOut(history);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <img
              src="/images/wildlife_logo.jpg"
              style={{ width: "50px", height: "50px" }}
            />
            <Link
              className="navbar-brand mt-2 mt-lg-0"
              to="#"
              style={{ color: "blue" }}
            >
              {t("SAFE PASS")}
            </Link>

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  {t("HOME")}
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/research-objective">
                  {t("RESEARCH_OBJECTIVE")}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/proposed-guidlines">
                  {t("GUIDLINES")}
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/signup">
                  {t("SIGN_UP")}
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/signin">
                  {t("SIGN_IN")}
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="" onClick={handleLogout}>
                  {t("LOG_OUT")}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginRight: "60px",
          }}
        >
          <button
            style={{
              marginLeft: "10px",
              backgroundColor: selectLanguage == "si" ? "#add8e6" : "#f2f2f2",
              border: "none",
              padding: "10px 20px",
              fontSize: "14px",
              cursor: "pointer",
            }}
            onClick={() => handleClick("si")}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#add8e6";
            }}
            onMouseLeave={(e) => {
              if (selectLanguage != "si") {
                e.target.style.backgroundColor = "#f2f2f2";
              }
            }}
          >
            සිංහල
          </button>

          <button
            className="nav-item"
            style={{
              marginLeft: "10px",
              backgroundColor: selectLanguage == "ta" ? "#add8e6" : "#f2f2f2",
              border: "none",
              padding: "10px 20px",
              fontSize: "14px",
              cursor: "pointer",
            }}
            onClick={() => handleClick("ta")}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#add8e6";
            }}
            onMouseLeave={(e) => {
              if (selectLanguage != "ta") {
                e.target.style.backgroundColor = "#f2f2f2";
              }
            }}
          >
            தமிழ்
          </button>

          <button
            style={{
              marginLeft: "10px",
              backgroundColor: selectLanguage == "en" ? "#add8e6" : "#f2f2f2",
              border: "none",
              padding: "10px 20px",
              fontSize: "14px",
              cursor: "pointer",
            }}
            onClick={() => handleClick("en")}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#add8e6";
            }}
            onMouseLeave={(e) => {
              if (selectLanguage != "en") {
                e.target.style.backgroundColor = "#f2f2f2";
              }
            }}
          >
            English
          </button>
          <ThemeProvider theme={theme}>
            <div style={{ marginLeft: "100px" }}>
              <Link to="/user/dashboard">
                <Badge
                  color="primary"
                  overlap="circular"
                  badgeContent=" "
                  variant="dot"
                  sx={{
                    "& .MuiBadge-badge": {
                      top: "calc(68% + 6px)", // Adjust the value as per your preference
                    },
                  }}
                >
                  {circle}
                </Badge>
              </Link>
            </div>
          </ThemeProvider>
        </div>
      </nav>
    </div>
  );
};

export default Header;
