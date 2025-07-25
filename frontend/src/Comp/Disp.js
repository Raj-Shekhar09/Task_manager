import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Ct from './Ct'
import "./Disp.css"

const Disp = () => {
    let [data,setData]=useState([])
    let [complete,setComplete]=useState([])
    let [f,setF]=useState(true)
    let navigate=useNavigate()
    let obj=useContext(Ct)

    useEffect(()=>{
        axios.get(`http://localhost:5000/gettask/${obj.store.userId}`).then((res)=>{
            if(Array.isArray(res.data)){
              setData(res.data)
            }else{
              setData([])
            }
        }).catch(err=>{
          console.error("Error fetching tasks:",err)
        })

        axios.get(`http://localhost:5000/getcomptask/${obj.store.userId}`).then((res) => {
          if (Array.isArray(res.data)) {
            setComplete(res.data)
          } else {
            setComplete([])
          }
        }).catch(err => {
          console.error("Error fetching completed tasks:", err)
        })
    },[f])

    let upd=(edtobj)=>{
        obj.updstore(edtobj)
        navigate("/edit")
    }

    let del=(idno)=>{
      axios.delete(`http://localhost:5000/deltask/${idno}`).then((res)=>{
        setF(!f)
      })
    }
    
    
    
    let comp = (task) => {
      // Step 1: Add to completed collection
      axios.post("http://localhost:5000/addcomptask", task)
        .then(() => {
          // Step 2: Delete from active task collection
          return axios.delete(`http://localhost:5000/deltask/${task._id}`)
        })
        .then(() => {
          setF(!f) // refresh data
        })
        .catch((err) => {
          console.error("Error completing task:", err)
        })
    }

    let delcomp = (idno) => {
      axios.delete(`http://localhost:5000/delcomptask/${idno}`)
        .then(() => {
          setF(!f)
        })
        .catch(err => {
          console.error("Error deleting completed task:", err)
        })
    }
  return (
    <div>
      {data.length>0&&(
      <div className='disp'>
      <h1>Task Data</h1>
      <table border='1'>
        <tr><th>SNO</th><th>ID</th><th>Title</th><th>Description</th><th>Deadline</th><th>Status</th></tr>
        {
            data.map((item,ind)=>{
                return(<tr>
                    <td>{ind+1}</td>
                    <td>{item._id}</td>
                    <td>{item.task}</td>
                    <td>{item.desc}</td>
                    <td>{item.deadline}</td>
                    <td>{item.status}</td>
                    <td><button onClick={()=>upd({"item":item})}>Edit</button></td>
                    <td><button onClick={()=>del(item._id)}>Delete</button></td>
                    <td><button onClick={()=>comp(item)}>Complete</button></td>
                </tr>)
            })
        }
      </table>
      </div>
    )}


    {complete.length>0&&(
      <div>
      <h1>Completed Tasks</h1>
      <table border='1'>
          <tr><th>SNO</th><th>ID</th><th>Title</th><th>Description</th><th>Deadline</th><th>Status</th></tr>
          {
            complete.map((item, ind) => (
              <tr key={item._id}>
                <td>{ind + 1}</td>
                <td>{item._id}</td>
                <td>{item.task}</td>
                <td>{item.desc}</td>
                <td>{item.deadline}</td>
                <td>{item.status}</td>
                <td><button onClick={()=>delcomp(item._id)}>Delete</button></td>
              </tr>
            ))
          }
        
      </table>
      </div>
      )}
    </div>
  )
}

export default Disp
