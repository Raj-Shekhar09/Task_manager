let mongoose=require("mongoose")
let tasksch=new mongoose.Schema({
    "_id":String,
	"task":String,
	"desc":String,
	"deadline":String,
	"status":{
		type:String,
		default:"pending"
	},
	"userId":String
})
let tm=mongoose.model("task",tasksch)
module.exports=tm