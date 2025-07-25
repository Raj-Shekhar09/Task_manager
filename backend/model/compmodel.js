let mongoose=require("mongoose")
let compsch=new mongoose.Schema({
	"_id":String,
	"task":String,
	"desc":String,
	"deadline":String,
	"status":{
		type:String,
		default:"completed"
	},
	"userId":String 
})
let cm=mongoose.model("comp",compsch)
module.exports=cm