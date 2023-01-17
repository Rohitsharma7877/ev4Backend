const mongoose=require("mongoose");
const userSchema=mongoose.Schema({
    name:String,
    email:String,
    pass:String,
    gender:String
})
const UserModel=mongoose.model("user",userSchema);


module.exports={UserModel}


// name ==> String
// email ==> String
// gender ==> String
// password ==> String