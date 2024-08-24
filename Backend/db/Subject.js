const mongoose= require('mongoose');

const subjectSchema = new mongoose.Schema({
    BName:String,
    CName:String,
    Board:String,
    BookUrl:String,
    pdfFile:String
})

mongoose.model("Subjects",subjectSchema);