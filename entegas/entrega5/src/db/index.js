const mongoose = require('mongoose');
const { dbUser, dbPassword, dbHost } = require('../configs/db.config');


const mongoConnect = async () => {
    try {
       await mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/?retryWrites=true&w=majority`)
        console.log('db is connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = mongoConnect
