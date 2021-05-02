const path = require("path");
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./models/graphqlSchema");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
require("dotenv").config();
//  Required routes:
const authRouter = require("./routes/authRouter");

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

// if (process.env.NODE_ENV === 'production'){
//   console.log('here');
//   app.use(express.static(path.join(__dirname, '../build')));
//   app.get('/*', (req,res) => {
//     return res.sendFile(path.join(__dirname, '../build/index.html'));
//   });
// }

app.use(express.static(path.join(__dirname, "../src")));

// Define route handlers:
app.use("/auth", authRouter);

//global error handler
app.use((err, req, res, next) => {
  const defaultError = {
    log: "Express error handler caught: Unknown Middleware Error",
    status: 200,
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
