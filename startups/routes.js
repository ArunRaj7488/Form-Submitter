const router = require("express").Router();
const Form = require("../routes")
module.exports = (app)=>{
    app.use("/", Form)
}
