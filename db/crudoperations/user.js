const mailer = require('../../config/utils/mailer')
const {User} = require("../models/user");

const dbOperations = {
    async createUser(userData){
        const {name, email, phoneNumber, dob} = userData;
        let user = await User.findOne({email});
        if(user) return {error: true, result: `User Already Exitis`}

        user = new User(userData);
        await user.save();
        var emailObj = {
            to : userData.email,
            subject : 'Registered Successfully',
            emailText : "Congratulations " + userData.name + ", You have registered successfully"
        }
        mailer.sendEmail(emailObj);
        return {error: false, result: `User Created Successfully`};
    },
    async findByEmail(email){
       let user=await User.findOne({email});
       if(!user) return {error:true,result: `No user found`}
        return user;

          
    }
} 

module.exports = dbOperations;