import React, { useState,useEffect } from 'react'
import Layout from '../../components/layouts/Layout'    
import UserMenu from '../../components/layouts/UserMenu'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const Profile = () => {
  //context 
  const [Auth,setAuth]=useAuth()
  //sttes
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [address, setaddress] = useState("");
  const [phone, setphone] = useState("");

  //get user data
  useEffect(()=>{
    const {name,email,password,phone,address} = Auth?.user
    setname(name)
    setemail(email)
    setaddress(address)
    setpassword(password)
    setphone(phone)
  },[])

  const handleSubmit = async (e) =>{
    e.preventDefault()
   try {
    const {data} = await  axios.put("http://localhost:8080/api/v1/auth/profile",{name,email,password,phone,address})
    if(data?.error){
      toast.error(data?.error)
   
    }else{
       setAuth({...Auth,user: data?.updatedUser})
       let ls = localStorage.getItem("auth")
       ls = JSON.parse(ls)
       ls.user = data.updatedUser
       localStorage.setItem("auth", JSON.stringify(ls))
       toast.success("profile updated")
    }
   } catch (error) {
    console.log(error)
    toast.error("Something wrong")
   }

  }
  return (
    <Layout title={"Your profile"}>
      <div className='container-flui p-3 m-3'>
            <div className='row'>
                <div className='col-md-3' >
                    <UserMenu/>
                </div>
                <div className='col-md-9' >
                <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h4 className="title">Update Profile</h4>
        
          <div className="mb-3">
            <input
              type="text"
              onChange={(e)=>{setname(e.target.value)}}
              value={name}

              className="form-control"
              id="exampleInputName"
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
              disabled
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

          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Profile
