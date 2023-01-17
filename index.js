const express=require("express")
const {connection}=require("./config/db")
const {userRouter}=require("./routes/User.route")
const {electRouter}=require("./routes/Electronic.route")
const{authenticate}=require("./middlewares/authenticate.middleware")
require("dotenv").config()

const app=express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("home page")
})


app.use("/users",userRouter)
app.use(authenticate);
app.use("/posts",electRouter)




app.listen(process.env.port ,async ()=>{
    try{
        await connection
        console.log("connection db")
    }catch(err){
        console.log("trouble to connection db")
     console.log(err)
    }
    console.log("Running at 8000 Port")
})
