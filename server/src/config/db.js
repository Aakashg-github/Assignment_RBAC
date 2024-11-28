const mongoose = require('mongoose');

const connection = () => {
    mongoose.set('strictQuery', false);
    mongoose.connect("mongodb://127.0.0.1:27017/Assignment_db").then( () => {
        console.log("db connected");
    }).catch((err) => {
        console.log("Error while connecting...");
    })
}

module.exports =  {
    connection,
}