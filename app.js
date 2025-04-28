const express = require('express');
const { connectToDB } = require('./src/db');
const app = express();
require("dotenv").config();
const cors = require('cors');
const userRouter = require('./src/router/user-router');
const leaderRouter = require('./src/router/leader-router');
const notificationRouter = require('./src/router/notification-router');
const referralRouter = require('./src/router/referral-router');


app.use(express.json());
app.use('/user', userRouter);
app.use('/leader', leaderRouter);
app.use('/notification', notificationRouter);
app.use('/referral', referralRouter);


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  connectToDB();
});