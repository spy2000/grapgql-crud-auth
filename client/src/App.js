
import React, { createContext, useEffect, useState } from "react";
import { Route, Routes,useNavigate } from "react-router-dom";
import './App.css';
import Navbar from "./component/Navbar";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Profile from "./component/Profile";
// import Loader from "./component/Loader"
import { useQuery } from "@apollo/client";
// import { CREATE_POST, DELETE_POST } from "./GraphQL/Mutation";
import { getMyDetail } from "./GraphQL/Query";


export const UserData = createContext()

function App() {
  const [userDetail, setUserDetail] = useState(null)
  const [authToken,setAuthToken] = useState(localStorage.getItem("authToken"))
  const navigate = useNavigate()

  const { loading, error, data ,refetch} = useQuery(getMyDetail, {
    skip: !authToken,
    context: {
      headers: authToken !== "null" ? {authorization: authToken} : {},
    },
  });


  useEffect(() => {
    // Re-run the query when the condition becomes true
    if (authToken !== "null") {
      console.log("token==>",typeof authToken,authToken)
      refetch();
    }

  }, [authToken, refetch]);



  useEffect(() => {
    console.log(loading, error?.message, data)
    // if (!loading && error?.message) {
    //   return alert(error?.message)
    // } else 
    if (!loading && data && data.getMyData) {
      console.log(data.getMyData)
      setUserDetail(data.getMyData)
      navigate("/profile")
    }else if(!loading && error?.message){
      navigate("/login")
      return alert(error?.message)
    }
  }, [loading, error, data,navigate])
  return (
    <>
      <UserData.Provider value={{ userDetail, setUserDetail,setAuthToken }}>
        <Navbar />
        <div className="container mt-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </UserData.Provider>
    </>
  );
}

export default App;
