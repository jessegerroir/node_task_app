// CRUD operations

const { MongoClient, ObjectID } = require('mongodb');


const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-app';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    
	if (error) {
        return console.log('unable to connect to database');
    } 

    // creates db if it doesn't eixst
    const db = client.db(databaseName);

    // db.collection('users').updateOne({
    //     _id: new ObjectID('5fbdbae615dd3d21e0a6e1c4')
    // }, {
    //     $inc: {
    //         age: 100
    //     }
    // }).then((result) => {
    //     console.log(result.modifiedCount);
    // }).catch((error) => {
    //     console.log(error);
    // })

    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then(() => {
    //     console.log(result.modifiedCount);
    // }).catch(() => {
    //     console.log(error);
    // })

    // db.collection('users').deleteMany({
    //     age: 30
    // }).then((result) => {
    //     console.log(result.deletedCount);
    // }).catch((error) => {
    //     console.log(error);
    // })

    db.collection('tasks').deleteOne({
        description: 'water plants'
    }).then(() => {
        console.log(result.deletedCount);
    }).catch(() => {
        console.log(error);
    })

});