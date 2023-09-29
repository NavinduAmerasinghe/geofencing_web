// import React, { useCallback, useState } from "react";
// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
// import { FormControl, MenuItem, Select } from "@mui/material";
// import { animalNames, taxonGroups } from "./DropDownValues";
// import InputLabel from "@mui/material/InputLabel";
// import { DropzoneArea } from "material-ui-dropzone";

// export default function FirstStep({ formData, setFormData }) {
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };
//   console.log(formData);
//   return (
//     <React.Fragment>
//       <Typography variant="h6" gutterBottom>
//         Safe Pass Database
//       </Typography>
//       <Grid item xs={12} sm={6} sx={{ mb: 2 }}>
//         <FormControl fullWidth>
//           <InputLabel id="demo-simple-select-label">Animal Name</InputLabel>
//           <Select
//             required
//             labelId="demo-simple-select-label"
//             id="animalName"
//             name="animalName"
//             label="Animal Name"
//             varient="standard"
//             value={formData.animalName}
//             onChange={handleChange}
//           >
//             <MenuItem value="">Select Animal Name</MenuItem>
//             {animalNames.map((animal) => (
//               <MenuItem key={animal.value} value={animal.value}>
//                 {animal.label}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Grid>
//       {/* <Grid item xs={12} sm={6}>
//         <TextField
//           required
//           type="file"
//           id="image"
//           name="image"
//           label="Image"
//           fullWidth
//           autoComplete="family-name"
//           variant="standard"
//           value={formData.image}
//           onChange={handleChange}
//         />
//       </Grid> */}
//       <Grid item xs={12} sm={6}>
//         <FormControl fullWidth>
//           <DropzoneArea
//             acceptedFiles={["image/*"]}
//             filesLimit={1}
//             dropzoneText={
//               formData.image?.name
//                 ? ""
//                 : "Drag and drop an image file here or click"
//             }
//             onChange={(files) =>
//               handleChange({ target: { name: "image", value: files[0] } })
//             }
//           />
//         </FormControl>
//       </Grid>

//       <Grid item xs={12} sx={{ mt: 2 }}>
//         <FormControl fullWidth>
//           <InputLabel id="demo-simple-select-label">Taxon Group</InputLabel>
//           <Select
//             required
//             labelId="demo-simple-select-label"
//             id="taxonGroup"
//             name="taxonGroup"
//             label="Taxon Group"
//             varient="standard"
//             value={formData.taxonGroup}
//             onChange={handleChange}
//           >
//             <MenuItem value="">Select Taxon Group</MenuItem>
//             {taxonGroups.map((group) => (
//               <MenuItem key={group.value} value={group.value}>
//                 {group.label}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Grid>
//     </React.Fragment>
//   );
// }
//--------------------------------------------------------------------------------
// import React from "react";
// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
// import { FormControl, MenuItem, Select } from "@mui/material";
// import { animalNames, taxonGroups } from "./DropDownValues";
// import InputLabel from "@mui/material/InputLabel";
// import { DropzoneArea } from "material-ui-dropzone";

// export default function FirstStep({ formData, setFormData }) {
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleDropzoneChange = (files) => {
//     const file = files[0];
//     const filePath = file && URL.createObjectURL(file);

//     setFormData({ ...formData, image: filePath });
//   };

//   console.log(formData);

//   return (
//     <React.Fragment>
//       <Typography variant="h6" gutterBottom>
//         Safe Pass Database
//       </Typography>
//       <Grid item xs={12} sm={6} sx={{ mb: 2 }}>
//         <FormControl fullWidth>
//           <InputLabel id="demo-simple-select-label">Animal Name</InputLabel>
//           <Select
//             required
//             labelId="demo-simple-select-label"
//             id="animalName"
//             name="animalName"
//             label="Animal Name"
//             variant="standard"
//             value={formData.animalName}
//             onChange={handleChange}
//           >
//             <MenuItem value="">Select Animal Name</MenuItem>
//             {animalNames.map((animal) => (
//               <MenuItem key={animal.value} value={animal.value}>
//                 {animal.label}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <FormControl fullWidth>
//           <DropzoneArea
//             acceptedFiles={["image/*"]}
//             filesLimit={1}
//             dropzoneText={
//               formData.image ? "" : "Drag and drop an image file here or click"
//             }
//             onChange={handleDropzoneChange}
//           />
//         </FormControl>
//       </Grid>

//       <Grid item xs={12} sx={{ mt: 2 }}>
//         <FormControl fullWidth>
//           <InputLabel id="demo-simple-select-label">Taxon Group</InputLabel>
//           <Select
//             required
//             labelId="demo-simple-select-label"
//             id="taxonGroup"
//             name="taxonGroup"
//             label="Taxon Group"
//             variant="standard"
//             value={formData.taxonGroup}
//             onChange={handleChange}
//           >
//             <MenuItem value="">Select Taxon Group</MenuItem>
//             {taxonGroups.map((group) => (
//               <MenuItem key={group.value} value={group.value}>
//                 {group.label}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Grid>
//     </React.Fragment>
//   );
// }
//---------------------------------------------------------------------------------------
// import React, { useState } from "react";
// import {
//   Grid,
//   Typography,
//   FormControl,
//   MenuItem,
//   Select,
//   InputLabel,
// } from "@mui/material";
// import { DropzoneArea } from "material-ui-dropzone";
// import { animalNames, taxonGroups } from "./DropDownValues";

// export default function FirstStep({ formData, setFormData }) {
//   const [imageURL, setImageURL] = useState("");

//   const handleChange = (e) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleDropzoneChange = (files) => {
//     if (files.length === 0) {
//       return;
//     }

//     const reader = new FileReader();
//     const file = files[0];

//     reader.onload = (event) => {
//       const imageData = event.target.result;
//       setFormData({ ...formData, image: imageData });
//       setImageURL(imageData);
//       uploadImage(file); // Call the function to upload the image
//     };

//     reader.readAsDataURL(file);
//   };

//   const uploadImage = async (file) => {
//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const response = await fetch("/api/observations", {
//         method: "POST",
//         body: formData,
//       });

//       // Handle the response from the server if needed
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   console.log(formData);

//   return (
//     <React.Fragment>
//       <Typography variant="h6" gutterBottom>
//         Safe Pass Database
//       </Typography>
//       <Grid item xs={12} sm={6} sx={{ mb: 2 }}>
//         <FormControl fullWidth>
//           <InputLabel id="demo-simple-select-label">Animal Name</InputLabel>
//           <Select
//             required
//             labelId="demo-simple-select-label"
//             id="animalName"
//             name="animalName"
//             label="Animal Name"
//             variant="standard"
//             value={formData.animalName}
//             onChange={handleChange}
//           >
//             <MenuItem value="">Select Animal Name</MenuItem>
//             {animalNames.map((animal) => (
//               <MenuItem key={animal.value} value={animal.value}>
//                 {animal.label}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Grid>
//       <Grid item xs={12} sm={6}>
//         <FormControl fullWidth>
//           <DropzoneArea
//             acceptedFiles={["image/*"]}
//             filesLimit={1}
//             dropzoneText={
//               imageURL ? "" : "Drag and drop an image file here or click"
//             }
//             onChange={handleDropzoneChange}
//           />
//         </FormControl>
//       </Grid>

//       <Grid item xs={12} sx={{ mt: 2 }}>
//         <FormControl fullWidth>
//           <InputLabel id="demo-simple-select-label">Taxon Group</InputLabel>
//           <Select
//             required
//             labelId="demo-simple-select-label"
//             id="taxonGroup"
//             name="taxonGroup"
//             label="Taxon Group"
//             variant="standard"
//             value={formData.taxonGroup}
//             onChange={handleChange}
//           >
//             <MenuItem value="">Select Taxon Group</MenuItem>
//             {taxonGroups.map((group) => (
//               <MenuItem key={group.value} value={group.value}>
//                 {group.label}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Grid>

//       {imageURL && (
//         <Grid item xs={12}>
//           <img src={imageURL} alt="Uploaded" style={{ width: "100%" }} />
//         </Grid>
//       )}
//     </React.Fragment>
//   );
// }
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { FormControl, MenuItem, Select } from "@mui/material";
import { animalNames, taxonGroups } from "./DropDownValues";
import InputLabel from "@mui/material/InputLabel";
import { DropzoneArea } from "material-ui-dropzone";

export default function FirstStep({ formData, setFormData }) {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handle and convert it in base 64
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  };

  // Update setFileToBase function
  const setFileToBase = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result }); // Update the image field in formData
    };
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Safe Pass Database
      </Typography>
      <Grid item xs={12} sm={6} sx={{ mb: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Animal Name</InputLabel>
          <Select
            required
            labelId="demo-simple-select-label"
            id="animalName"
            name="animalName"
            label="Animal Name"
            variant="standard"
            value={formData.animalName}
            onChange={handleChange}
          >
            <MenuItem value="">Select Animal Name</MenuItem>
            {animalNames.map((animal) => (
              <MenuItem key={animal.value} value={animal.value}>
                {animal.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <div>
        <input
          onChange={handleImage}
          type="file"
          id="formupload"
          name="image"
          className="form-control"
        />
        <label className="form-label" htmlFor="form4Example2">
          Image
        </label>
      </div>
      {/* <img src={formData?.image} alt="" /> */}
      <img src={formData && formData.image} alt="" />

      <Grid item xs={12} sx={{ mt: 2 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Taxon Group</InputLabel>
          <Select
            required
            labelId="demo-simple-select-label"
            id="taxonGroup"
            name="taxonGroup"
            label="Taxon Group"
            variant="standard"
            value={formData.taxonGroup}
            onChange={handleChange}
          >
            <MenuItem value="">Select Taxon Group</MenuItem>
            {taxonGroups.map((group) => (
              <MenuItem key={group.value} value={group.value}>
                {group.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {/* <Grid item xs={12} sx={{ mt: 2 }}>
        <img src={image} />
      </Grid> */}
    </React.Fragment>
  );
}
