const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const userModel = require('./models/user');

const app = express();

app.use(express.json())
app.use(cors())
mongoose.connect("mongodb://127.0.0.1:27017/user");

app.post('/log', (req, res)=> {
    const {email, password} = req.body;
    userModel.findOne({email:email})
    .then(user => {
        if (user){
            if (user.password === password) {
                res.json("success")
            } else {
                res.json("wrong password")
            }
        } else {
            res.json("user not found")
        }
    })
});


app.post('/register', (req, res)=> {
userModel.create(req.body)
.then(user => res.json(user))
.catch(err => res.json(err))
});

app.listen(3001,()=>{
    console.log("Server is running on port 3001")
})