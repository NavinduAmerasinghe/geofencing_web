// import React, {useState, useEffect} from 'react';
// import Header from '../../component/Header'
// import Footer from '../../component/Footer'

// const UserDashboard = () => {

//     const [profile, setProfile] = useState("");
//     const {name, email, role, createdAt} = profile;

//     useEffect(()=>{
//         fetch('/api/getme')
//         .then(res =>{
//             return res.json()
//         })
//         .then(result =>{
//             //console.log(result)
//             setProfile(result.user)
//         })
//         .catch(error => {
//             console.log(error);
//         })
//     }, []);

//   return (
//     <>

//     <Header/>

//     <div className="container-fluid dashboard_container">
//         <div className="row">
//             <div className="col-sm-4">
//                <div className="card card_dashboard">
//                <div className="card-header">
//                     <b>User Dashboard</b>
//                 </div>
//                 <ul className="list-group list-group-flush">
//                     <li className="list-group-item"> Name: {name}</li>
//                     <li className="list-group-item"> E-mail: {email}</li>
//                     <li className="list-group-item"> Join at: {new Date(createdAt).toLocaleDateString()}</li>
//                     <li className="list-group-item"> {role===1 ? "Admin" : "Registred User"}</li>
//                 </ul>
//                </div>
//             </div>
//             <div className="col-sm-8">
//                 <h4>other col</h4>
//             </div>
//         </div>
//     </div>

//     <Footer/>

//     </>
//   )
// };

// export default UserDashboard;
import React, { useState, useEffect } from "react";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import "./UserDashboard.css"; // Import custom CSS for UserDashboard
import api from "../../api/api";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const UserDashboard = () => {
  const [profile, setProfile] = useState("");
  const { name, email, role, createdAt } = profile;
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    api
      .get("/api/getme")
      .then((res) => res.json())
      .then((result) => {
        setProfile(result.user);
        console.log("sdfsf");
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Header />

      <div className="container user-dashboard-container">
        <div className="row">
          <div className="col-sm-4">
            <div className="card user-info-card">
              <div className="card-header">
                <b>User Dashboard</b>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">Name: {name}</li>
                <li className="list-group-item">E-mail: {email}</li>
                <li className="list-group-item">
                  Joined at: {new Date(createdAt).toLocaleDateString()}
                </li>
                <li className="list-group-item">
                  {role === 1 ? "Admin" : "Registered User"}
                </li>
              </ul>
              <hr />
              <Link to="/admin/dashboard/banner/create">
                {parseInt(userRole) === 1 && <Button>Create Banner...</Button>}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;
