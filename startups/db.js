const mongoose = require("mongoose");
const config = require('../config/config')
const DB_URL = config.DB_URL

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const dbUrl = DB_URL || process.env.DB_URL;
module.exports = mongoose.connect(dbUrl, mongoOptions)
.then(()=> console.log("Successfully connected to MongoDB"))
.catch((err)=> console.log("Unable to connect to MongoDB ",err));
