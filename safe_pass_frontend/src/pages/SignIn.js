import React, { useState } from "react";
import api from "../api/api";
import { toast } from "react-toastify";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { Card } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const SignIn = ({ history }) => {
  const { t, i18n } = useTranslation();
  const [values, setValues] = useState({
    email: "dulnathamerasinghe@gmail.com",
    password: "Dulnath@123",
  });
  const [visible, setVisible] = useState(false);

  const togglePassword = () => {
    setVisible(!visible);
  };

  const { email, password } = values;

  const handleChange = (name) => (e) => {
    // console.log(e.target.value);
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/api/signin", {
        email,
        password,
      });

      console.log(data);

      if (data.success === true) {
        setValues({ email: "", password: "" });
        toast.success("Log In successfully");
        localStorage.setItem("token", JSON.stringify(data));
        localStorage.setItem("userRole", data.user.role);
        localStorage.setItem("isAuthenticated", true);
        console.log(data.user.role);
        if (typeof window !== "undefined") {
          setTimeout(() => {
            history.push("/");
          }, 2000);
        }
      }
    } catch (err) {
      console.log(err.response.data.error);
      toast.error(err.response.data.error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container custom_className ">
        <Card
          style={{
            margin: 250,
            width: "600px",
            // marginLeft: 250,
            // marginBottom: 250,
          }}
        >
          <h2 className="signup_title text-center" style={{ marginTop: 20 }}>
            {t("SIGN_IN")}
          </h2>
          <form className=" col-sm-6 offset-3 pt-5 signup_form">
            <div className="form-outline mb-4">
              <input
                onChange={handleChange("email")}
                type="email"
                id="form4Example2"
                className="form-control"
                value={email}
              />
              <label className="form-label" htmlFor="form4Example2">
                {t("EMAIL")}
              </label>
            </div>

            <div className="form-outline mb-4">
              <input
                onChange={handleChange("password")}
                type={visible ? "text" : "password"}
                id="form4Example3"
                className="form-control"
                value={password}
              />
              <label
                className="form-label"
                shrink={false}
                htmlFor="form4Example3"
              >
                {t("PASSWORD")}
              </label>
              <i
                className={`fas ${visible ? "fa-eye" : "fa-eye-slash"}`}
                onClick={togglePassword}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "15px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              />
            </div>

            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-primary btn-block mb-4"
            >
              {t("LOGIN")}
            </button>
          </form>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
