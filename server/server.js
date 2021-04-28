const path = require('path');
const express = require('express');
const port = process.env.PORT || 3000;
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use(express.static(path.join(__dirname,'../build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});


  
app.listen(port, () => console.log('app running at port', port));