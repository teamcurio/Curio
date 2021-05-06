const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

//To signup new user
router.post("/signup", userController.createUser, authController.generateJWT, (req, res) => {
  return res.status(200).json({
    user: res.locals.user,
    token: res.locals.token
  });
});

//Check in email address not already in database
router.post('/checkemail', userController.checkEmail, (req, res) => {
  return res.status(200).json(res.locals.emailExists);
});

router.post('/signin', authController.verifyUser, authController.generateJWT, (req, res) => {
return res.status(200).json({
  user: res.locals.user,
  token: res.locals.token
})
})



module.exports = router;
