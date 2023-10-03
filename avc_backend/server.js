const express = require("express");
const helmet = require("helmet");
const app = express();
require("dotenv").config();
const connectDB = require("./database/db");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const csrf = require("csurf"); // Import the csurf middleware
const session = require("express-session"); // Import express-session for managing sessions
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
app.use(helmet());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    limit: "100mb",
    extended: false,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cookieParser());

// Add the csurf middleware after express-session
const csrfProtection = csrf({ cookie: true });

// Use middleware for CSRF protection
app.use(csrfProtection);
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
  res.render("some_template", { csrfToken: req.csrfToken() });
});

// Check for CSRF errors in your error handler middleware
app.use((err, req, res, next) => {
  if (err.code === "EBADCSRFTOKEN") {
    res.status(403).send("CSRF token validation failed.");
  } else {
    next(err);
  }
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
