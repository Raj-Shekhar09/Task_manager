import React, { useContext, useState } from 'react'
import Ct from './Ct'
import { useNavigate } from 'react-router'
import axios from 'axios'
import "./Edit.css"

const Edit = () => {
	let obj=useContext(Ct)
	let navigate=useNavigate()
	let [data,setData]=useState(obj.store.item)

	let fun=(e)=>{
		setData({...data,[e.target.name]:e.target.value})
	}

	let upd=()=>{
		axios.put("http://localhost:5000/updtask",data).then((res)=>{
			navigate("/disp")
		})
	}
  return (
	<div className='edit'>
	<div className='edit-form'>
		<label>Task:</label>
		<input type='text' placeholder='Task' name="task" onChange={fun} value={data.task}/>
		<label>Description</label>
		<input type='text' placeholder='Desc' name="desc" onChange={fun} value={data.desc}/>
		<label>Deadline</label>
		<input type='date' placeholder='deadline' name="deadline" onChange={fun} value={data.deadline}/>

		<button onClick={upd}>Update</button>

	</div>

</div>
  )
}

export default Edit