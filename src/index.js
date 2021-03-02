
const app = require('./app');
const config = require('./../config/config');

const port = config.port;

app.listen(port, () => {
    console.log('server is up on port' + port)
});

