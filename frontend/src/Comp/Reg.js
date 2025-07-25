import React, { useContext, useState } from 'react'
import axios from "axios"
import "./Reg.css"
import { useNavigate } from 'react-router-dom'
import Ct from './Ct'

const Reg = () => {
	let [data,setData]=useState({"task":"","desc":"","deadline":""})
	let [msg,setMsg]=useState("")

	let obj=useContext(Ct)
	let navigate=useNavigate()

	let fun=(e)=>{
		setData({...data,[e.target.name]:e.target.value})
	}
	let add=()=>{
		let finalData = { ...data, userId: obj.store.userId }
		  axios.post("http://localhost:5000/addtask",finalData).then((res)=>{
			  if("msg" in res.data){
				  setMsg(res.data.msg)
				  setData({"task":"","deadline":"","desc":""})
				  navigate('/disp')
			  }
			  else{
				  setMsg(res.data.err)
			  }
			  
		  }).catch((err)=>{
			  console.log(err)
		  })
	  }
  
  return (
	<div className='fcon'>
		
		<div className='form'>
			<label>Task:</label>
			<input type='text' placeholder='Task' name="task" onChange={fun} value={data.task}/>
			<label>Description</label>
			<input type='text' placeholder='Desc' name="desc" onChange={fun} value={data.desc}/>
			<label>Deadline</label>
			<input type='date' placeholder='deadline' name="deadline" onChange={fun} value={data.deadline}/>

			<button onClick={add}>ADD</button>

		</div>

	</div>
  )
}

export default Reg