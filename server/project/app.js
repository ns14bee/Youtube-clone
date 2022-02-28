const express =  require('express');
const chalk = require('chalk');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");

const verifyToken = require('./authentication/verify_token');

// controller import
const users = require('./controllers/users.controller');
const videos = require('./controllers/video.controller');
const rating = require('./controllers/rating.controller');
const channel = require('./controllers/channel.controller');
const subscription = require('./controllers/subscription.controller');
const playlist = require('./controllers/playlist.controller');
const history = require('./controllers/video.history.controller');


require('dotenv').config();

const url =  process.env.URL;

app.use(express.json());

global.config = require('./authentication/config');


const port = process.env.PORT || 1414

app.options("*", cors({ origin: url , optionsSuccessStatus: 200 }));

app.use(cors({ origin: url, optionsSuccessStatus: 200 }));

// database connection

const conn = async () =>{
    try{
        await mongoose.connect(process.env.DATABASE);
        console.log(chalk.green("Database connected"))
    }catch(err){
        console.log(chalk.red(err));
    }
}
conn();


// Middleware
const {LoggerMiddleware,error}  = require('./middleware/logger');
app.use(LoggerMiddleware);

//app.use(verifyToken);

// use controller
app.use("/users",users);
app.use("/videos",videos);
app.use("/ratings",rating);
app.use("/channel",channel);
app.use("/subscription",subscription);
app.use("/playlist",playlist);
app.use("/history",history);


app.listen(port,(req,res) => {
    console.log('server running at:  '+ chalk.blue(`http://localhost:${port}/`));
})
