import React, { useState } from 'react'
import axios from "axios"
import toast from "react-hot-toast"
import Layout from '../../components/layouts/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';


const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [Auth,setAuth] =useAuth()
  const location = useLocation()
 
  const navigate =useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault()
   try {
    const res = await axios.post("http://localhost:8080/api/v1/auth/login",{email,password})
    if(res && res.data.success){
      toast.success(res.data && res.data.message)
      setAuth({
        ...Auth,
        user: res.data.user,
        token: res.data.token,
      })
      localStorage.setItem('auth',JSON.stringify(res.data))
      navigate( location.state  || "/")  
    }else{
      toast.error(res.data.message)
    }
   } catch (error) {
    console.log(error)
    toast.error("Something wrong")
   }

  }
  return (
    <div>
        <Layout>
        <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h4 className="title">Login Form</h4>
        
          <div className="mb-3">
          
          </div>
          <div className="mb-3">
            <input
              type="email"
              onChange={(e)=>{setemail(e.target.value)}}

              value={email}

              className="form-control"
              id="exampleInputemail"
              required
              placeholder="Enter Email"
            />
          </div>
          <div className="mb-3">
            <input
              
              type="password"
              onChange={(e)=>{setpassword(e.target.value)}}

              value={password}
              className="form-control"
              id="exampleInputPassword1"
              required
              placeholder="Enter Password"
            />
          </div>
          <div className="mb-3">
          
          </div>
          <div className="mb-3">
        
          </div>
          <div className='mb-3'>
          <button type="button" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}} >
            Forgot Password
          </button>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
      </Layout>
    </div>
  )
}

export default Login
