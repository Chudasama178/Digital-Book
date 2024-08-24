const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Class Schema
const courseSchema = new Schema({
    CourseName: String,
    CourseYear: String
    // Add more fields as needed
});

// File Schema
const fileSchema = new Schema({
    name: String,
    data: Buffer
    // Add more fields as needed
});

// Subject Schema
const subjectSchema = new Schema({
    BName: String,
    Price: String,
    Board: String,
    BookUrl: String,
    ClassName: String,
    pdfFile: { type: Schema.Types.ObjectId, ref: 'File' },
    classId: { type: Schema.Types.ObjectId, ref: 'Course' },
});

const Course = mongoose.model('Course',courseSchema);
const File = mongoose.model('File', fileSchema);
const Subject = mongoose.model('Subject', subjectSchema);

module.exports = { Course, File, Subject };
