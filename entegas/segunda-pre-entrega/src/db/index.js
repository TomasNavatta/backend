const mongoose = require('mongoose')

const mongoConnect = async () => {
    try {
        mongoose.connect('mongodb+srv://ivannavatta:eDlcx9r5lHFSbvLJ@cluster0.4yvhxqm.mongodb.net/Segunda-pre-entrega?retryWrites=true&w=majority')
        console.log('Db is connected');
    } catch (error) {
        console.log(error);
    }
    
}

module.exports = mongoConnect