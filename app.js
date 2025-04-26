const express = require('express');
const { connectToDB } = require('./src/db');
const app = express();
require("dotenv").config();
const cors = require('cors');
const userRouter = require('./src/router/user-router');


app.use(express.json());
app.use('/create', userRouter);


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  connectToDB();
});