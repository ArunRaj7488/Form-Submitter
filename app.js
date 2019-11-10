const express = require('express');
const logger = require('morgan');
const config = require('./config/config')
require('dotenv').config()

const app = express();

//view engines
app.set("view engine", "ejs");

//middlewares
app.use(express.json())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((request, response, next)=> {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//connection to db
require("./startups/db");

//routes
require("./startups/routes")(app);

//listening at PORT
const PORT = config.PORT || process.env.PORT
app.listen(PORT ,()=> console.log(`Server started at ${PORT}`));
