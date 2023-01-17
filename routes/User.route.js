const express=require("express");
var jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const {UserModel}=require("../models/User.model")
const userRouter=express.Router();


userRouter.post("/register",async(req,res)=>{
    const {email,pass,name,gender}=req.body;

    try {
        bcrypt.hash(pass, 8, async(err, hash)=> {
           if(err){
            console.log(err);
           }else{
            const user=new UserModel({email,pass:hash,name,gender});
            await user.save();
            res.send("Registered")
           }
        });
    } catch (error) {
        res.send("Error in register");
        console.log(error)
    }
   
})

userRouter.post("/login",async(req,res)=>{
    const {email,pass}=req.body;
    try {
        const user=await UserModel.find({email});
      if(user.length>0){
            bcrypt.compare(pass, user[0].pass, (err, result)=> {
                if(result){
                 const token = jwt.sign({ course: 'fsd' }, 'masai');
                 res.send({"msg":"Login Successful","token":token})
                }
             });
        }else{
            res.send("wrong Credntials")
        }
       
    } catch (error) {
       res.send("Something wrong ") ;
       console.log(error)
    }
   
})

module.exports={userRouter}