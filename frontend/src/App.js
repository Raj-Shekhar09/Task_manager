import React, { useState } from 'react'
import Disp from './Comp/Disp'
import Reg from './Comp/Reg'
import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom"
import Login1 from './Comp/Login1'
import Edit from './Comp/Edit'
import Ct from './Comp/Ct'
import Register from './Comp/Register'
import Flipcard from './Comp/Flipcard'

const App = () => {
	let [store,setStore]=useState({})

	let updstore=(obj)=>{
		setStore({...store,...obj})
	}
	let obj={"store":store,"updstore":updstore}
  return (
	<BrowserRouter>
	<Ct.Provider value={obj}>
	<Routes>
		<Route path="/" element={<Navigate to="/login1"/>}/>
		<Route path="/*" element={<Flipcard/>}/>
		{/* <Route path="/" element={<Login1/>}/> */}
		<Route path="/disp" element={<Disp/>}/>
		<Route path="/reg" element={<Reg/>}/>
		<Route path="/edit" element={<Edit/>}/>
		{/* <Route path="/register" element={<Register/>}/> */}
	</Routes>
	</Ct.Provider>
	</BrowserRouter>
  )
}

export default App