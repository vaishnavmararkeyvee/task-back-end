const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');

const cors = require('cors');
const { userModelObj } = require('./src/UserModel');
const app = express();
const port = 3005;
app.use(cors())
app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
  
    res.setHeader('Access-Control-Allow-Credentials',true);
    next();
});


app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

mongoose.connect("mongodb+srv://vaishnav:vaishnav@cluster0.nyrni.mongodb.net/StoryDatabase?retryWrites=true&w=majority");



app.post('/api/register', async (req, res) => {
    try {
        console.log(req.body);
        let mydata = new userModelObj(req.body);
        let data = await mydata.save();
        res.send("Registration Successfully");
    }
    catch (err) {
        console.log(err);
    }
});

app.get('/api/signin', async (req, res) => {
    try {
        let result = await userModelObj.find();
        res.json(result);
    }
    catch (err) {
        console.log(err);
    }
});

app.post('/api/add', async (req, res) => {
    try {
        console.log(req.body);
        let mydata = new articleModelObj(req.body);
        let data = await mydata.save();
        console.log("Successfully Added Data");
        res.send("Successfully Added Data");
    }
    catch (err) {
        console.log(err);
    }
});

app.get('/api/view', async (req, res) => {
    try {
        let result = await articleModelObj.find();
        res.json(result);
    }
    catch (err) {
        console.log(err);
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});