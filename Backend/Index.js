const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
app.use("/Files",express.static("Files"))

const jwt = require('jsonwebtoken');
const jwtkey = 'e-comm';

require('./db/config');  
require('./db/Subject');
const Books = mongoose.model("Subjects");
const User = require('./db/user');
const Course = require('./db/Course');
const Feedback = require('./db/Feedback');
const Admin = require('./db/Admin');


app.use(express.json());
app.use(cors());

app.post('/register', async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.Password
    jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (error, token) => {
        if (error) {
            res.send({ result: "SOMTHING WENT WRONG" });
        }
        res.send({ result, auth: token });
    })
})

app.post('/login', async (req, res) => {
    if (req.body.Password && req.body.Email) {
        let user = await User.findOne(req.body).select("-Password");
        if (user) {
            jwt.sign({ user }, jwtkey, { expiresIn: "2h" }, (error, token) => {
                if (error) {
                    res.send({ result: "SOMTHING WENT WRONG" });
                }
                res.send({ user, auth: token });
            })

        }
        else {
            res.send('NO USER FOUND!!');
        }
    } else {
        res.send('NO USER FOUND!!');
    }
})
app.post('/admin/login', async (req, res) => {
    if (req.body.Password && req.body.Email) {
        let admin = await Admin.findOne(req.body).select("-Password");
        if (admin) {
            jwt.sign({ admin }, jwtkey, { expiresIn: "2h" }, (error, token) => {
                if (error) {
                    res.send({ result: "SOMTHING WENT WRONG" });
                }
                res.send({ admin, auth: token });
            })

        }
        else {
            res.send('NO USER FOUND!!');
        }
    } else {
        res.send('NO USER FOUND!!');
    }
})

const stor = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./Files")
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    },
});
const upload = multer({ storage: stor })

app.post('/add-book', upload.single("pdfFile"), async (req, res) => {
    const BName = req.body.BName;
    const CName = req.body.CName;
    const Board = req.body.Board;
    const BookUrl = req.body.BookUrl;
    const fileName = req.file.filename;
    try {
        await Books.create({ BName: BName,CName:CName, pdfFile: fileName, Board: Board, BookUrl: BookUrl });
        res.send({ status: "ok" })
    } catch (error) {
        res.send({ status: error });
    }
})

app.get('/books',async(req,res)=>{
    try{
        Books.find({}).then((data)=>{
            res.send({status:"ok",data:data});
        })
    }catch(error){

    }
})

app.delete('/book/:id', async (req, res) => {
    const result = await Books.deleteOne({ _id: req.params.id });
    res.send(result);
})

app.get('/course/book/:id', async (req, res) => {
    const result = await Books.findOne({ _id: req.params.id });
    if (result) {
        res.send(result)
    } else {
        res.send({ result: "NO RECORD FOUND!!!" });
    }
})

app.put('/book/:id', async (req, res) => {
    let result = await Books.updateOne(
        { _id: req.params.id }, { $set: req.body }
    );
    res.send(result);

})

app.get('/search/:key', async (req, res) => {
    console.log(req.params.ke)
    let result = await Books.find({
        "$or": [
            { BName: { $regex: req.params.key} },
            { Board: { $regex: req.params.key } },
            { CName: { $regex: req.params.key } }
        ]
    });
    res.send(result);
})
app.get('/getUsers' , async(req,res)=>{
    let result = await User.find({});
    res.send(result);
})
app.delete('/user/:id', async (req, res) => {
    const result = await User.deleteOne({ _id: req.params.id });
    res.send(result);
})
app.post('/feedBack', async (req, res) => {
    const Name = req.body.Name;
    const Comment = req.body.Comment;
    try {
        await Feedback.create({Name:Name,Comment:Comment });
        res.send({ status: "ok" })
    } catch (error) {
        res.send({ status: error });
    }
})
app.get('/feedbackList',async(req,res)=>{
    let result = await Feedback.find({});
    res.send(result);
})
app.delete('/feedback/:id', async (req, res) => {
    const result = await Feedback.deleteOne({ _id: req.params.id });
    res.send(result);
})

app.listen(5010);
console.log("Server 5010 is started");