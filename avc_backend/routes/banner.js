const express = require("express");
const router = express.Router();
const { isAuthenticated, isAdmin } = require("../middleware/auth.js");
const {
  createBanner,
  displayBanner,
} = require("../controllers/bannerController");

router.post("/banner/create", isAuthenticated, isAdmin, createBanner);
router.get("/fetch/banner", displayBanner);

module.exports = router;
