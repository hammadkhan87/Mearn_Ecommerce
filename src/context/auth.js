import axios from "axios";
import { useState,useEffect,useContext,createContext,} from "react";
const AuthContext = createContext();


const AuthProvider =({children})=>{
    const [Auth,setAuth]=useState({user:null,
        token:""
        })
        axios.defaults.headers.common['Authorization'] = Auth?.token;
        useEffect(()=>{
            const data = localStorage.getItem('auth')
            if(data){
                const parsedata = JSON.parse(data)
                setAuth({
                    ...Auth,
                    user:parsedata.user,
                    token:parsedata.token 
                })
            }
            //eslint-disable-next-line
        },[])
        return(
            <AuthContext.Provider value={[Auth,setAuth]}>
                {children}
            </AuthContext.Provider>
        )
}
// custom hook 
const useAuth = ()=>useContext(AuthContext) 
export{useAuth,AuthProvider}