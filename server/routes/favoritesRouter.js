const express = require("express");
const router = express.Router();
require("dotenv").config();

// const authController = require("../controllers/authController");
const favoritesController = require("../controllers/favoritesController");

router.get("/getFavorites", favoritesController.getFavorites, (req, res) => {
  res.status(200).json(res.locals.favorites);
});

router.post('/addFavorite', favoritesController.addFavorite, (req, res) => {
  res.status(200).send('Favorite Saved');
});

router.delete('/deleteFavorite', favoritesController.deleteFavorite, (req, res) => {
  res.status(200).send('Favorite Deleted')
});

module.exports = router;