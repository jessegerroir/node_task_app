
const express = require('express');
// Start database
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

// start app
const app = express();



// setup auth with middleware, this runs before every request
// app.use((request, response, next) => {
    
//     if (request.method === "GET") {
//         response.send('GET requests are disabled');
//     } else {
//         // call next to let epxress know we're done
//         next();
//     }
// });


// app.use((request, response, next) => {
//     response.status(503).send('503 maintence mode');
// })

// Customize the server
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

module.exports = app;
