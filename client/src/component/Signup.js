import React, { useState, useEffect,useContext } from 'react'
import Loader from "../component/Loader/Loader"
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../GraphQL/Mutation";
import {useNavigate} from "react-router-dom"
import { Link } from "react-router-dom"
import {UserData} from "../App"

const initialSignupDetail = {
    name: "",
    email: "",
    mobile: "",
    age: "",
    password: "",
    cPassword: "",

}
const Signup = () => {
    const {userDetail,_,setAuthToken} = useContext(UserData)
    const [signupDetail, setSignupDetail] = useState(initialSignupDetail)
    const [registerUser, { loading, error, data }] = useMutation(REGISTER_USER);
    const navigate = useNavigate()


    const onInputChange = (e) => {
        const { name, value } = e.target
        return setSignupDetail({ ...signupDetail, [name]: value })
    }

    const createUser = async (e) => {
        e.preventDefault()
        if(!signupDetail.name || !signupDetail.email || !signupDetail.mobile || !signupDetail.age ||!signupDetail.password){
            return alert("Please fill the all field")
        }else if(signupDetail.password !== signupDetail.cPassword){
            return alert("Password not match")
        }
        try {
            await registerUser({
                variables: {
                    name: signupDetail.name,
                    email: signupDetail.email,
                    mobile: signupDetail.mobile,
                    age: signupDetail.age,
                    password: signupDetail.password,
                },
            })
        } catch (error) {
        }

    }


    useEffect(() => {
        if (!loading && error?.message) {
            return alert(error?.message)
        } else if (!loading && data) {
            setSignupDetail(initialSignupDetail)
            navigate("/login")
        }
    }, [loading, error, data,navigate])


    useEffect(()=>{
        const token = localStorage.getItem("authToken")
   
        if(token && token !== "null"){
            setAuthToken(token)
        }
    
    },[])


    return (
        <>
            {loading ? <Loader /> :
                    <div className="card">
                        <h2>Sign up</h2>
                        <form>
                            <label htmlFor="username">Name</label>
                            <input type="text" id="name" name="name" placeholder='Enter Your Name' onChange={onInputChange} value={signupDetail.name} required />

                            <label htmlFor="username">Email</label>
                            <input type="email" id="email" name="email" placeholder='Enter Your Email' onChange={onInputChange} value={signupDetail.email} required />

                            <label htmlFor="username">Mobile Number</label>
                            <input type="text" id="mobile" name="mobile" placeholder='Enter Your Mobile' onChange={onInputChange} value={signupDetail.mobile} required />

                            <label htmlFor="username">Age</label>
                            <input type="text" id="age" name="age" placeholder='Enter Your Age' onChange={onInputChange} value={signupDetail.age} required />

                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" placeholder='Enter Your Paasword' onChange={onInputChange} value={signupDetail.password} required />

                            <label htmlFor="password">Confirm Password</label>
                            <input type="password" id="cPassword" name="cPassword" placeholder='Confirm Paasword' onChange={onInputChange} value={signupDetail.cPassword} required />

                            <button onClick={createUser}>Sign Up</button>
                        </form>
                        <p className='mt-2'>already have account ? <Link to="/login">Login Now</Link></p>
                    </div>

            }
        </>
    )
}

export default Signup
