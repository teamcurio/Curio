const db = require("../models/curioModel");
const bcrypt = require("bcrypt");

const userController = {};

//CREATE USER CONTROLLER:
userController.createUser = async (req, res, next) => {
  //create registration date
  let registration_date = new Date().toString().slice(0, 15);

  //destructure email and password from request body
  const { email, password } = req.body;

  //handle blank input fields
  if (!email)
    return next({
      msg: {
        error: "Please complete email field.",
      },
    });

  if (!password)
    return next({
      msg: {
        error: "Please complete password field.",
      },
    });

  //encrypt password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  //create SQL query to insert user info to database
  const createUserQuery = `INSERT INTO "public"."Users" (email, password, registration_date) 
                           VALUES ($1, $2, $3) RETURNING *`;
  const values = [email, hashedPassword, registration_date];


  db.query(createUserQuery,values)
    .then((response) => {
      console.log("response", response);
      const { id, email } = response.rows[0];
      res.locals.user = { id, email };
      return next();
    })
    .catch((err) => {
      console.log("Error caught in userController.createUser", err);
      if (err.constraint === "Users_email_key") {
        return next({
          message: { err: "Email already exists" },
        });
      } else {
        return next(err);
      }
    });
};

module.exports = userController;

