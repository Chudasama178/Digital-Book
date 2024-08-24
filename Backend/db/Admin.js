const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    Email:String,
    Password:String
})

module.exports = mongoose.model("Admins",adminSchema);