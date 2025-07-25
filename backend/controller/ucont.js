let bcrypt=require("bcrypt")
let jwt=require("jsonwebtoken")
const um = require("../model/um")
let {v4:uuidv4}=require("uuid")

let reg=async(req,res)=>{
	try{
		let pwdhash=await bcrypt.hash(req.body.pwd,10)
		let userId=uuidv4()
		let data=new um({...req.body,"pwd":pwdhash,userId})
		await data.save()
		res.json({success:true,msg:"Registration successful"})
	}
	catch{
		res.json({success:false,msg:"Error in Register"})
	}
}
let login=async(req,res)=>{
	try{
		let obj=await um.findById(req.body._id)
		if(obj){
			let f=await bcrypt.compare(req.body.pwd,obj.pwd)
			if(f){
				res.json({"token":jwt.sign({"_id":obj._id},"abcd"),"name":obj.name,userId:obj.userId})
			}
			else{
				res.json({"msg":"check password"})
			}
		}
		else{
			res.json({"msg":"check email"})
		}
	}
	catch{
		res.json({"err":"error in login"})
	}
}

module.exports={reg,login}