import { useEffect,useState } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";
 export default function PrivateRoute(){
    const [ok, setok]=useState(false)
    const [Auth,setAuth]=useAuth()
    useEffect(()=>{
        const authcheck = async ()=>{
          const res = await axios.get("http://localhost:8080/api/v1/auth/user-auth")
          if(res.data.ok){ 
            setok(true)
          }else{
            setok(false)
          }
          }
        if(Auth?.token){
            authcheck()
        }
    },[Auth.token])
    return ok ? <Outlet/> :<Spinner/>
 }