import React,{useContext, useEffect, useState} from 'react'
import {UserData} from "../App"
import {useNavigate} from "react-router-dom"
import { useMutation } from "@apollo/client";
import { UPDATE_USER } from "../GraphQL/Mutation";

const Profile = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("authToken")
    const [user,setUser]= useState(null)
    const [UpdateMyData, { loading, error, data }] = useMutation(UPDATE_USER,{
        context: {
            headers: {authorization :token},
          },
    });


    const {userDetail,_,setAuthToken} = useContext(UserData)

    const onInputChange =(e)=>{
        const {name,value} = e.target
        return setUser({ ...user, [name]: value })
    }

    const onUpdateUser = async (e)=>{
        e.preventDefault()
        console.log(user)
        if(!user.name || !user.mobile || !user.age){
            return alert("Please fill the all field of form")
        }
        try {
            await UpdateMyData({
                variables: {
                    name: user.name,
                    mobile: user.mobile,
                    age: user.age,
                },
            })
        } catch (error) {
            
        }
    }


    useEffect(()=>{
        const token = localStorage.getItem("authToken")
        console.log(token)
        if(token && token !== "null"){
            setAuthToken(token)
        }
    
    },[])


    useEffect(() => {
        console.log(loading, error?.message, data)
        if (!loading && error?.message) {
            return alert(error?.message)
        } else if (!loading && data) {
            console.log(data)
            setUser(null)
        }
    }, [loading, error, data,navigate])

    return (
        <>
            <div className="card">
                <h2>Profile</h2>
                {userDetail && <div className='row'>
                    <div className=" col-12 text-center">
                        <h5>Full Name:<span>{userDetail.name}</span> </h5>
                    </div>
                    <div className=" col-12 text-center">
                        <h5>email:<span>{userDetail.email}</span> </h5>
                    </div>
                    <div className=" col-12 text-center">
                        <h5>mobile:<span>{userDetail.mobile}</span> </h5>
                    </div>
                    <div className=" col-12 text-center">
                        <h5>age:<span>{userDetail.age}</span> </h5>
                    </div>
                    <div className=" col-12 text-center">
                    <button type="button" class="btn btn-info" onClick={()=>setUser(userDetail)}>
  Edit
</button>
                    </div>
                </div>}
            </div>
            <>
            {/* <!-- Modal --> */}
{user ? <div className="modal fade show" style={{display:"block"}} id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Update My Detail</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={()=>setUser(null)}>
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <div className="row mb-3">
                  {/* Full Name */}
                  <div className="field_main_div col-6">
                    <label
                      className="requiredLabel col-form-label"
                      htmlFor="basic-default-name"
                    >
                      Name
                    </label>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        placeholder="Enter Your Name"
                        onChange={onInputChange}
                        value={user && user.name}
                      />
                      <p className="text-danger errorField"></p>
                    </div>
                  </div>
                   {/* Email */}
                   <div className="field_main_div col-6">
                    <label
                      className="requiredLabel col-form-label"
                      htmlFor="basic-default-name"
                    >
                      Email
                    </label>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Enter Your Email"
                        // onChange={onInputChange}
                        value={user && user.email}
                        disabled
                      />
                      <p className="text-danger errorField"></p>
                    </div>
                  </div>
      </div>
      <div className="row mb-3">
                  {/* mobile */}
                  <div className="field_main_div col-6">
                    <label
                      className="requiredLabel col-form-label"
                      htmlFor="basic-default-name"
                    >
                      Mobile
                    </label>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        id="mobile"
                        name="mobile"
                        placeholder="Enter your mobile number"
                        onChange={onInputChange}
                        value={user && user.mobile}
                      />
                      <p className="text-danger errorField"></p>
                    </div>
                  </div>
                   {/* age */}
                   <div className="field_main_div col-6">
                    <label
                      className="requiredLabel col-form-label"
                      htmlFor="basic-default-name"
                    >
                      age
                    </label>
                    <div className="">
                      <input
                        type="text"
                        className="form-control"
                        id="age"
                        name="age"
                        placeholder="Enter Your age"
                        onChange={onInputChange}
                        value={user && user.age}
                      />
                      <p className="text-danger errorField"></p>
                    </div>
                  </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={()=>setUser(null)}>Close</button>
        <button type="button" className="btn btn-primary" onClick={onUpdateUser}>Update</button>
      </div>
    </div>
  </div>
</div>
</div> : ""}
            </>
        </>
    )
}

export default Profile
