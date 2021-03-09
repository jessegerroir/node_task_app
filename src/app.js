
const express = require('express');

// Connect to database and define routes
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

// Define and configure app
const app = express();
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

// Export app for use
module.exports = app;
