const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

const {createReport, getReport} = require('./routes');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/myreport');
mongoose.connection
        .once('open',() =>{
            console.log("connected mongoose");
        })
        .on('error', (err) =>{
            console.log(err);
        });

router.route('/create')
        .post(createReport)

router.route('/')
        .get(getReport)

app.use('/reports', router);
app.listen( 3000, () =>{
    console.log("server started on 3000")
})