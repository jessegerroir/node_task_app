
const express = require('express');

const path = require('path');
const hbs = require('hbs');

// Connect to database
require('./db/mongoose');

// Load in routes
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

// Define paths for express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Define and configure app
const app = express();
app.use(express.json());

// Set routes
app.use(userRouter);
app.use(taskRouter);

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory for express to serve
// (It recognizes all the web pages in the static directory 
// and builds the routing)
app.use(express.static(publicDirectory))

// Define App Page --------------------------------------

// Setup the path to the Index page (using handlebar)
app.get('', (request, result) => {
    result.render('index', {});
});

// Setup the path to the Index page (using handlebar)
app.get('/dashboard', (request, result) => {
    result.render('dashboard', {});
});

// generic 404 page to match anything that hasn't been matched above
app.get('*', (req, res) => {
    res.render('404page', {
        title: '404: Page Not Found',
        name: 'Jesse G.',
        errorMessage: 'Unable to find the requested page.'
    })
});

// Export app for use
module.exports = app;
