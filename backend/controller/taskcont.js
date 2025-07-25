const tm = require("../model/taskmodel")

let addtask=async(req,res)=>{
    try{
        //check if userId exits in req.body
        if(!req.body.userId){
            return res.json({err:"Missing userId"})
        }
        let rn=Math.floor(Math.random()*99999+10000)
        let data=new tm({...req.body,"_id":rn,userId:req.body.userId})
        await data.save()
        res.json({"msg":"data added"})
    }
    catch(err)
    {
        res.json({"err":"error adding task"})
    }
}

let gettask=async(req,res)=>{
    try{
		let data=await tm.find({userId:req.params.userId})
		res.json(data)
	}
	catch(err)
	{
		res.json({"err":"error in getting task"})
	}
  }
  
  
  let updtask=async(req,res)=>{
    try{
       await tm.findByIdAndUpdate({"_id":req.body._id},req.body)
       res.json({"msg":"task was updated"})

    }
    catch(err)
    {
        res.json({"err":"error in updated"})
    }
  }

let deltask=async(req,res)=>{
	try{
		await tm.findByIdAndDelete(req.params.idno)
		res.json({"msg":"deleted "})
	}
	catch(err){
		res.json({"err":"error deleting task"})
	}
}


module.exports={addtask,gettask,updtask,deltask}
