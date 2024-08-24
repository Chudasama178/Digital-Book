const mongoose = require('mongoose');

const feedbackSchma = new mongoose.Schema({
    Name:String,
    Comment :String
})

module.exports = mongoose.model("Feedback",feedbackSchma);
