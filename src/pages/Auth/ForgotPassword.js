import React from 'react'
import Layout from '../../components/layouts/Layout'
import { useState } from 'react'
import axios from "axios"
import toast from "react-hot-toast"
import { useLocation, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setemail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [answer, setanswer] = useState("");

  const location = useLocation()
 
  const navigate =useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault()
   try {
    const res = await axios.post("http://localhost:8080/api/v1/auth/forgot-password",{email,newPassword,answer})
    if(res && res.data.success){
      toast.success(res.data && res.data.message)

      navigate( location.state  || "/login")  
    }else{
      toast.error(res.data.message)
    }
   } catch (error) {
    console.log(error)
    toast.error("Something wrong")
   }

  }
  return (
    <Layout title={'Forgot password'}>
        <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h4 className="title">Reset passwod</h4>
        
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
          </div><div className="mb-3">
            <input
              type="text"
              onChange={(e)=>{setanswer(e.target.value)}}

              value={answer}

              className="form-control"
              id="exampleInputemail"
              required
              placeholder="Enter your favorit sports"
            />
          </div>

          <div className="mb-3">
            <input
              
              type="password"
              onChange={(e)=>{setnewPassword(e.target.value)}}

              value={newPassword}
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
          
          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ForgotPassword
