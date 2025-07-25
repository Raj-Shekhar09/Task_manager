const cm = require("../model/compmodel")

let addcomptask=async(req,res)=>{
    try{
        if(!req.body.userId){
            return res.json({err:"Missing userId"})
        }
        let comptask={...req.body,status:"completed"}
        let data=new cm(comptask)
        await data.save()
        res.json({"msg":"task moved to completed"})
    }
    catch(err)
    {
        res.json({"err":"error in completed task"})
    }
}

let getcomptask=async(req,res)=>{
	try{
		let data=await cm.find({userId:req.params.userId})
		res.json(data)
	}
	catch(err)
	{
		res.json({"err":"error in getting completing task"})
	}
  }

  let delcomptask=async(req,res)=>{
	try{
		await cm.findByIdAndDelete(req.params.idno)
		res.json({"msg":"deleted "})
	}
	catch(err){
		res.json({"err":"error deleting completed"})
	}
}

  
module.exports={addcomptask,getcomptask,delcomptask}