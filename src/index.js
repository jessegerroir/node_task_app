
const express = require('express');
const port = process.env.PORT;

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');



// start app
const app = express();

// Start database
require('./db/mongoose');

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

const errorMiddleware = (request, response, next) => {
    throw new Error('From my middleware')
}

// Listens on port 3000 for requests

app.listen(port, () => {
    console.log('server is up on port' + port)
});

