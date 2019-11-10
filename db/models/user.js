const Joi=require('joi');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//creating userSchema
const UserSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String,
        unique: true
    },
    dob: {
        required: true,
        type: Date
    },
    phoneNumber: {
        required: true,
        type: String
    }
})
const User = mongoose.model('users', UserSchema)

//validate schema using joi
function validateUser(user){
    const schema={
        name:Joi.string().required(),
        email:Joi.string().regex(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).required().error(() => {
            return {
              message: 'Invalid Email address.',
            };
          }),
        dob:Joi.date().required(),
        phoneNumber:Joi.string().regex(/^[0-9]{10}$/).error(() => {
            return {
              message: 'Invalid Phone Number.',
            };
          }),
    }
      return Joi.validate(user,schema);
}
exports.User = User;
exports.validateUser=validateUser;