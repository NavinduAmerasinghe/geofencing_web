import api from "../api/api";
import { toast } from "react-toastify";

export const logOut = (history) => {
  api
    .get("/api/logout")
    .then((result) => {
      toast.success("Log out successfully");
      window.location.reload();
      localStorage.removeItem("token");
      localStorage.removeItem("userRole");
      localStorage.removeItem("isAuthenticated");
      history.push("/");
    })
    .catch((error) => {
      console.log(error);
    });
};
