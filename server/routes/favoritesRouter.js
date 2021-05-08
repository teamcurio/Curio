const express = require("express");
const router = express.Router();
require("dotenv").config();

const authController = require("../controllers/authController");
const favoritesController = require("../controllers/favoritesController");

//Get favorites:
router.get(
  "/getFavorites",
  authController.verifyJWT,
  favoritesController.getFavorites,
  (req, res) => {
    res.status(200).json(res.locals.favorites);
  }
);

//Add favorites:
router.post(
  "/addFavorite",
  authController.verifyJWT,
  favoritesController.addFavorite,
  (req, res) => {
    res.status(200).json("Favorite Saved");
  }
);

//Delete favorites:
router.delete(
  "/deleteFavorite",
  authController.verifyJWT,
  favoritesController.deleteFavorite,
  (req, res) => {
    res.status(200).send("Favorite Deleted");
  }
);

module.exports = router;
