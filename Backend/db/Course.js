const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    id: String,
    CourseName: String,
    CourseYear: String
})

module.exports = mongoose.model("Course", courseSchema);
