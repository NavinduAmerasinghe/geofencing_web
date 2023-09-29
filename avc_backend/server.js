const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./database/db");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const errorHandler = require("./middleware/error");
const multer = require("multer");
//route paths
const wildlifeObservationRoutes = require("./routes/wildlifeObservationRoute");
const bannerRoutes = require("./routes/banner");
const authRoutes = require("./routes/auth");
const protectedAreaRoutes = require("./routes/protectedAreaRoute");
const animalRoutes = require("./routes/yoloIdentificationRoute");

// Call the connectDB function to connect to the database
connectDB();

//middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    limit: "100mb",
    extended: false,
  })
);
app.use(cors());
app.use(express.json());

// Multer storage configuration
// const Storage = multer.diskStorage({
//   destination: "uploads",
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });
// const storage = multer.memoryStorage();
// const upload = multer({ storage }).single("image");
// const upload = multer({
//   storage: Storage,
// }).single("testImage");

// app.use(express.urlencoded());

app.get("/get", (req, res) => {
  res.send("Safe Pass");
});

app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

//Routes middleware
app.use("/api", wildlifeObservationRoutes);
app.use("/api", bannerRoutes);
app.use("/api", authRoutes);
app.use("/api", protectedAreaRoutes);
app.use("/api/yolo", animalRoutes);

//Error Middleware
app.use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
