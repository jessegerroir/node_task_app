const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL + '/task-mananger-api', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

