let express=require("express")
let mongoose=require("mongoose")
let cors=require("cors")
let bodyParser = require("body-parser");
const rt = require("./routes/rt")

mongoose.connect("mongodb://127.0.0.1:27017/taskportal").then(()=>{
    console.log("ok")
})

let app=express()
app.use(express.json())
app.use(cors())
app.use("/",rt)
app.listen(5000,()=>console.log("connection OK"))