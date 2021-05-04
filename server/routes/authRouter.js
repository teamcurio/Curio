const express = require("express");
const userController = require("../controllers/userController");
// const authController = require("../controllers/authController");
const router = express.Router();

//To signup new user
router.post("/signup", userController.createUser, (req, res) => {
  return res.status(200).json({
    user: res.locals.user,
  });
});

//Check in email address not already in database
router.post('/checkemail', userController.checkEmail, (req, res) => {
  return res.status(200).json(res.locals.emailExists);
});




module.exports = router;
