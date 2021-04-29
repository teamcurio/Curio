const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3000;
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use(express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});


// app.get("/", (req, res) => {
//     res.sendFile(path.join(__dirname, "../src/index.html"));
//   });
app.use(express.static(path.join(__dirname, '../src')));



//global error handler
app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Express error handler caught: Unknown Middleware Error',
    status: 200,
    message: {
      err: 'Unexpected Error Occurred'
    }
  };

  const errObj = Object.assign(defaultError, err);
  console.log('Server Error', errObj.log);
  return res.status(errObj.status).json(errObj.message);
});

//port listener
app.listen(PORT, () => console.log('Server Running On Port ' + PORT));
