const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/signup", userController.createUser, (req, res) => {
  return res.status(200).json({
    user: res.locals.user,
  });
});

router.post('/checkemail', userController.checkEmail, (req, res) => {
  return res.status(200).json(res.locals.emailExists);
});

module.exports = router;
