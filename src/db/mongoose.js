const mongoose = require('mongoose');
const config = require('./../../config/config');

mongoose.connect(config.mongodb_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

