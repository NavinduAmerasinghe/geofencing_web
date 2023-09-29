import React, { useState } from "react";
import api from "../api/api";
import { toast } from "react-toastify";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { Card } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const SignUp = ({ history }) => {
  const { t, i18n } = useTranslation();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = values;

  const handleChange = (name) => (e) => {
    // console.log(e.target.value);
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/api/signup", {
        name,
        email,
        password,
      });

      console.log(data);

      if (data.success === true) {
        setValues({ name: "", email: "", password: "" });
        toast.success("Sign up successfully, please Login!");
        if (typeof window !== "undefined") {
          setTimeout(() => {
            history.push("/signin");
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
      <div className="container custom_className pt-5">
        <Card style={{ margin: 198, width: "600px", marginLeft: "300px" }}>
          <h2 className="signup_title text-center" style={{ marginTop: 20 }}>
            {t("SIGN_UP")}
          </h2>
          <form className=" col-sm-6 offset-3 pt-5 signup_form">
            <div className="form-outline mb-4">
              <input
                onChange={handleChange("name")}
                type="text"
                id="form4Example1"
                className="form-control"
                value={name}
              />
              <label className="form-label" htmlFor="form4Example1">
                {t("NAME")}
              </label>
            </div>

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
                type="password"
                id="form4Example3"
                className="form-control"
                value={password}
              />
              <label className="form-label" htmlFor="form4Example3">
                {t("PASSWORD")}
              </label>
            </div>

            <button
              onClick={handleSubmit}
              type="submit"
              className="btn btn-primary btn-block mb-4"
            >
              {t("REGISTER")}
            </button>
          </form>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
