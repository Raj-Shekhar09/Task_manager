import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Ct from './Ct'
import "./Register.css"

const Register = ({ onFlip }) => {
  const [data, setData] = useState({ "name": '', "_id": '', "pwd": '' })
  const [msg, setMsg] = useState('')

  let obj=useContext(Ct)
  const navigate = useNavigate()

  const fun = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const register = () => {
    axios.post('http://localhost:5000/reg', data).then((res) => {
      if (res.data.success) {
        setMsg('Registration successful!')

        onFlip()
        setTimeout(()=>{
          navigate('/login') // Redirect to login after successful registration
        },500)
      } else {
        setMsg(res.data.msg)
      }
    }).catch(err => {
      setMsg('Registration failed. Please try again.')
    })
  }

  return (
    <div className='register'>
      <h2>Register</h2>
      <div>{msg}</div>

      <label>Name:</label>
      <input type='text' name='name' placeholder='Enter your name' onChange={fun} value={data.name} />

      <label>Email:</label>
      <input type='text' name='_id' placeholder='Enter email' onChange={fun} value={data._id} />

      <label>Password:</label>
      <input type='password' name='pwd' placeholder='Enter password' onChange={fun} value={data.pwd} />

      <button onClick={register}>Register</button>
      <p>Already have an account?{' '} <a href='#' className='link' onClick={(e)=>{e.preventDefault();onFlip();}}>Login</a></p>
    </div>
  )
}

export default Register