import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import Ct from './Ct'
import "./Login.css"

const Login1 = ({onFlip}) => {
  let [data, setData] = useState({ "_id": "", "pwd": "" })
  let [msg, setMsg] = useState("")
  let obj = useContext(Ct)
  let navigate = useNavigate()

  let fun = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  let log = () => {
    axios.post("http://localhost:5000/login", data).then((res) => {
      if (res.data.token !== undefined) {
        obj.updstore(res.data)
        navigate("/reg")  // Navigate to the dashboard or home page
      } else {
        setMsg(res.data.msg)
      }
    })
  }

  return (
    <div className='form'>
      <h2>Login</h2>
      <div><b>{msg}</b></div>

      <label><b>Email:</b></label>
      <input type='text' placeholder='Enter Email' name='_id' value={data._id} onChange={fun} />

      <label><b>Password:</b></label>
      <input type='password' placeholder='Enter Password' name='pwd' value={data.pwd} onChange={fun} />

      <button onClick={log}>Login</button>

      <p>Don't have an Account? <a href='/register' className='link' onClick={(e)=>{e.preventDefault();onFlip();}}>Register</a></p> {/* Direct link to register page */}
    </div>
  )
}

export default Login1
