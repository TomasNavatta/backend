const mongoose = require('mongoose')
const userSchema = require('../schemas/user.schema')

const userCollection = 'user'


const Users = mongoose.model(userCollection, userSchema)

module.exports = Users