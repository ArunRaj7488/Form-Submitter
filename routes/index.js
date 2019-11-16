var express = require('express');
var router = express.Router();
const {validateUser, User} = require("../db/models/user");
const db = require("../db/crudoperations/user");

router.get('/form',(req, res)=>{
  res.render("index", {error: null, success: null})
})

router.get('/view',(req,res)=>{
  res.render("view")
})

router.get("/allResponse",  async (req, res)=>{
  const allUsers = await User.find(); 
  console.log(allUsers)
  res.render("allUser", {allUsers})
})

router.get('/*',(req, res)=>{
   res.render("home")
})

router.post('/user-form', async (req, res)=>{
  const {error: err} = validateUser(req.body);
  if(err) return res.render("index", {error: err.details[0].message, success: null});
  
  const {error, result} = await db.createUser(req.body);

  if(error) return res.render("index", {error: result, success: null});
  console.log(error,result);
  const user=await db.findByEmail(req.body.email)
  const date=new Date(user.dob)
  const dob=date.getDay()+"/"+date.getMonth()+1+'/'+date.getFullYear();
  res.render("view", {name:user.name,email:user.email,phoneNumber:user.phoneNumber, dob});
  
});

module.exports = router;