const path = require("path");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./models/graphqlSchema");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
require("dotenv").config();
//  Required routes:
const authRouter = require("./routes/authRouter");
const favoritesRouter = require("./routes/favoritesRouter");
const { log } = require("console");

const app = express();

app.use(cors());

//Route for graphql:
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "production") {
  console.log("here");
  app.use(express.static(path.join(__dirname, "../dist")));
  app.get("/*", (req, res) => {
    return res.sendFile(path.join(__dirname, "../dist/index.html"));
  });
}

//handle requests for static files
else {
  console.log("in Dev")
  app.use(express.static(path.join(__dirname, "../src")));
}

// Define route handlers:
app.use("*", (req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Authorization, Origin, Content-Type, Accept"
  );
  return next();
});

app.use("/auth", authRouter);
app.use("/favorites", favoritesRouter);

//global error handler
app.use((err, req, res, next) => {
  const defaultError = {
    log: "Express error handler caught: Unknown Middleware Error",
    status: 500,
    message: {
      err: "Unexpected Error Occurred",
    },
  };

  const errObj = Object.assign(defaultError, err);
  console.log("Server Error", errObj.log);
  return res.status(errObj.status).json(errObj.message);
});

//port listener
app.listen(PORT, () => console.log("Server Running On Port " + PORT));
