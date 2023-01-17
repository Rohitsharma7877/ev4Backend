const express =require("express")
const { ElectModel } = require("../models/Electronic.model")
const electRouter =express.Router()


electRouter.get("/",async(req,res)=>{
   
    try{
        const notes=await ElectModel.find()
        res.send(notes)
    }
    catch(err){
        console.log(err)
        res.send("something wrong")
    }
    
})
electRouter.post("/create",async (req,res)=>{
    const payload=req.body
    console.log(payload)
    try{
       
        const note=new ElectModel(payload)
        await note.save()
        res.send({"mesg":"Notes successfully"})
    }

    catch(err)
    {
        console.log(err)
        res.send({"err":"something wrong"})
    }
})

electRouter.patch("/update/:todoID",async(req,res)=>{
    const logiID = req.params.logiID
    const userID = req.body.userID
    const payload = req.body
    const todo = await ElectModel.findOne({_id:logiID})
    try {
        if(userID!==todo.userID){
            res.send("You are not Authorized for updating")
        }else{
             const data = await ElectModel.findByIdAndUpdate({_id:logiID},payload)
            res.send("Data Updated Successfully")
            console.log(data)
        }
       
    } catch (error) {
        console.log(Error)
        res.send("error ")
    }
})


electRouter.delete("/delete/:logiID", async (req, res) => {
    const logiID = req.params.logiID
    const userID = req.body.userID
    const todo = await ElectModel.findOne({_id:logiID})
    if(userID !== todo.userID){
        res.send("Not authorised for Deleting")
    }
    else{
        await ElectModel.findByIdAndDelete({_id : logiID})
        res.send({"msg" : "Deleted successfully"})
    }
})



module.exports={electRouter}