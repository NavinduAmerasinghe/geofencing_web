// import React from "react";
// import { useHistory } from "react-router-dom";
// import Button from "@mui/material/Button";
// import { toast } from "react-toastify";
// import api from "../../../api/api";

// export default function AdminPage({ formData }) {
//   const history = useHistory();
//   console.log(formData);
//   const handleApprove = () => {
//     // Add the logic to save the data to the database here
//     api
//       .post("/api/observations", formData)
//       .then((res) => {
//         toast.success("Record created successfully");
//         history.push("/observations"); // Redirect to the observations page after approval
//       })
//       .catch((error) => {
//         console.log(error.message);
//         toast.error(error);
//       });
//   };

//   return (
//     <div>
//       {/* Display the formData here for the admin to review */}
//       {/* Add any necessary UI elements and styling */}

//       <Button onClick={handleApprove} variant="contained" sx={{ mt: 3 }}>
//         Approve Observation
//       </Button>
//     </div>
//   );
// }
