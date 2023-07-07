import React from "react";
import { useState } from "react";
import Layout from "../../components/layouts/Layout";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import "../style/Authstyle.css"

const Register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");
  
  const [answer, setanswer] = useState("");

  const navigate =useNavigate()

  const handleSubmit = async (e) =>{
    e.preventDefault()
   try {
    const res = await  axios.post("http://localhost:8080/api/v1/auth/register",{name,email,password,phone,address,answer})
    if(res.data.success){
      toast.success(res.data.message)
      navigate("/login")  
    }else{
      toast.error(res.data.message)
    }
   } catch (error) {
    console.log(error)
    toast.error("Something wrong")
   }

  }

  return (
    <Layout title={"Register user"}>
      <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h4 className="title">Register Form</h4>
        
          <div className="mb-3">
            <input
              type="text"
              onChange={(e)=>{setname(e.target.value)}}
              value={name}

              className="form-control"
              id="exampleInputName"
              required
              placeholder="Enter Name"
            />
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
            <input
              type="text"
              onChange={(e)=>{setaddress(e.target.value)}}

              value={address}
              className="form-control"
              id="exampleInputAddress"
              placeholder="Enter Address"
            />
          </div>
          <div className="mb-3">
            <input
              type="phone"
              onChange={(e)=>{setphone(e.target.value)}}

              value={phone}
              className="form-control"
              id="exampleInputphone"
              placeholder="Enter Phone"
            />
          </div>
          <div className="mb-3">
            <input
              type="phone"
              onChange={(e)=>{setanswer(e.target.value)}}

              value={answer}
              className="form-control"
              id="exampleInputanswer"
              placeholder="What is your favorite sports?"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
