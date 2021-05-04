const db = require("../models/curioModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authController = {};

authController.verifyUser = (req, res, next) => {
  const { email, password } = req.body;
  const verifyUserString = `
        SELECT * FROM "Users" 
        WHERE email=$1
    `;
  const value = [email];

  db.query(verifyUserString, value)
    .then(async (response) => {
      if (!response.rows[0]) {
        return next({
          message: { err: "Email does not exist" },
        });
      }
      const hashedPassword = response.rows[0].password;
      const isMatch = await bcrypt.compare(password, hashedPassword);
      if (isMatch) {
        const { id, email } = response.rows[0];
        res.locals.user = { id, email };
        return next();
      } else {
        return next({
          message: {
            err: "Email and/or Password do not match.",
          },
        });
      }
    })
    .catch((err) => {
      return next({
        log: "authController: Unable to verify user data with verifyUser",
        message: {
          err: `authController.verifyUser: ERROR: ${err}`,
        },
      });
    });
};

authController.generateJWT = (req, res, next) => {
  let token = jwt.sign({ id: res.locals.user.id }, process.env.JWT_SECRET, {
    expiresIn: 600,
  });
  res.locals.token = token;
  return next();
};

authController.verifyJWT = (req, res, next) => {
  //TODO:Check token
  console.log("Req.header-->", req.headers);
  let token = req.headers["authorization"];
  console.log("token in verifyJWT", token);

  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (!token) {
    return res.status(403).send({
      message: { err: "No token provided!" },
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    console.log("Token and Decoded-->", { token, decoded });
    if (err) {
      return res.status(401).send({
        message: { err: 'Unauthorized!' },
      });
    }
    console.log('decoded.id in jwt.verify is: ', decoded.id);
    res.locals.user_id = decoded.id;
    return next();
  });

};

module.exports = authController;
