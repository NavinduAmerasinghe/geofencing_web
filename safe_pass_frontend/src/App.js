import React from "react";
import "./App.css";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import UserDashboard from "./pages/user/UserDashboard";
import { BrowserRouter, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  PrivateRoute,
  AdminAuthRoute,
  CombinedRoute,
} from "./component/PrivateRoute";
// import AdminCreateProduct from "./pages/admin/AdminCreateProduct";
import AdminAddBanner from "./pages/admin/AdminAddBanner";
import AdminDashboard from "./pages/admin/AdminDashboard";
import NotAuthorized from "./pages/admin/NotAuthorized";
import AnimalObservationData from "./pages/HOC/AnimalObservationData";
import ProtectedArea from "./pages/HOC/ProtectedAreas/ProtectedArea";
import CreateProtectedArea from "./pages/HOC/ProtectedAreas/createProtectedArea";
import Analytics from "./pages/HOC/Analytics/Analytics";
import DisplayData from "./pages/HOC/createRecord/DisplayData";
import ResearchObjective from "./component/ResearchObjective";
import ProposedGuildlines from "./component/ProposedGuidlines";
import AdminNotifications from "./pages/HOC/createRecord/AdminNotifications";
import Layout from "./pages/HOC/Layout";
import SessionTimeout from "./SessionTimeout";

//Layout Structure
const ObservationData = Layout(AnimalObservationData);
const AnalyticsData = Layout(Analytics);
const CreateRecord = Layout(DisplayData);
const ProtectedAreaRecords = Layout(ProtectedArea);
const AdminRecordNotifications = Layout(AdminNotifications);

const App = () => {
  const handleTimeout = () => {
    // Perform logout or session expiration action here
    // For example, clear the local storage and redirect to sign-in page
    localStorage.clear();
    window.location.href = "/signin";
  };
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/research-objective" component={ResearchObjective} />
        <Route
          exact
          path="/proposed-guidlines"
          component={ProposedGuildlines}
        />
        <Route
          path="/Safe-Pass-SriLanka/dashlayout"
          exact
          component={ObservationData}
        />
        <Route
          path="/Safe-Pass-SriLanka/analytics"
          exact
          component={AnalyticsData}
        />
        <Route
          path="/Safe-Pass-SriLanka/createRecord"
          exact
          component={CreateRecord}
        />
        <Route
          path="/Safe-Pass-SriLanka/protected-areas"
          exact
          component={ProtectedAreaRecords}
        />
        <Route
          path="/Safe-Pass-SriLanka/Admin/Notifications"
          exact
          component={AdminRecordNotifications}
        />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        {/* <PrivateRoute exact path="/user/dashboard" component={UserDashboard} /> */}
        <Route exact path="/user/dashboard" component={UserDashboard} />
        <Route exact path="/admin/dashboard" component={AdminDashboard} />
        <Route
          exact
          path="/admin/createProtectedArea"
          component={CreateProtectedArea}
        />
        {/* <Route
          exact
          path="/admin/dashboard/product/create"
          component={AdminCreateProduct}
        /> */}
        <CombinedRoute
          exact
          path="/admin/dashboard/banner/create"
          component={AdminAddBanner}
        />
        <Route exact path="/unAuthorized" component={NotAuthorized} />
      </BrowserRouter>
      <SessionTimeout timeout={1800000} onTimeout={handleTimeout} />
    </div>
  );
};

export default App;
