const express = require("express");
const router = express.Router();
require("dotenv").config();

// const authController = require("../controllers/authController");
const favoritesController = require("../controllers/favoritesController");

router.get("/getFavorites", favoritesController.getFavorites, (req, res) => {
  res.status(200).json(res.locals.favorites);
});




module.exports = router;