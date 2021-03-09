
// Load in app and config
const app = require('./app');
const config = require('./../config/config');

// Start application
const port = config.port;
app.listen(port, () => {
    console.log('Server is up on port' + port)
});

