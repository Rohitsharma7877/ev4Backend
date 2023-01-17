const mongoose=require("mongoose");
const electSchema=mongoose.Schema({
    title:String,
    body:String,
    elect:String
   
})
const ElectModel=mongoose.model("posts",electSchema);

module.exports={ElectModel}