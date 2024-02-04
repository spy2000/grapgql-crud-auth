import React, { useState,useEffect,useContext } from 'react'
import {Link} from "react-router-dom"
import Loader from "../component/Loader/Loader"
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../GraphQL/Mutation";
import {useNavigate} from "react-router-dom"
import {UserData} from "../App"


const initialLoginDetail = {
    email:"",
    password:""
}

const Login = () => {
    const {userDetail,_,setAuthToken} = useContext(UserData)
    const [loginDetail,setLoginDetail] = useState(initialLoginDetail)
    const [loginUser, { loading, error, data }] = useMutation(LOGIN_USER);
    const navigate = useNavigate()
   

const onInputChange = (e) => {
    const {name,value} = e.target
    return setLoginDetail({...loginDetail,[name]:value})
}

const login = async (e) => {
    e.preventDefault()
    if(!loginDetail.email || !loginDetail.password){
        return alert("Please fill the all field")
    }

    try {
        await loginUser({
            variables: {
                email: loginDetail.email,
                password: loginDetail.password,
            },
        })
    } catch (error) {
        
    }
}


useEffect(() => {
    if (!loading && error?.message) {
        return alert(error?.message)
    } else if (!loading && data) {
        localStorage.setItem("authToken",data.loginUser.token)
        setLoginDetail(initialLoginDetail)
        setAuthToken(data.loginUser.token)
        return navigate("/profile")
    }
}, [loading, error, data,navigate,setAuthToken])



useEffect(()=>{
    const token = localStorage.getItem("authToken")
    if(token && token !== "null"){
        setAuthToken(token)
    }

},[])


  return (
    <>
    { loading ? <Loader /> :
  <div className="card">
    <h2>Login</h2>
    <form>
      <label htmlFor="username">Email</label>
      <input placeholder='Enter You Email' type="text" id="email" name="email" onChange={onInputChange} value={loginDetail.email} required />

      <label htmlFor="password">Password</label>
      <input placeholder='Enter Your Password' type="password" id="password" name="password" onChange={onInputChange} value={loginDetail.password} required />

      <button onClick={login}>Login</button>
    </form>
    <p className='mt-2'>Don't have account <Link to="/register">Sign up Now</Link></p>
  </div> }
    </>
  )
}

export default Login
