import React,{useContext} from 'react'
import {UserData} from "../App"
import {Link} from "react-router-dom"
import {useLocation,useNavigate} from "react-router-dom"

const Navbar = () => {
    const {userDetail,setAuthToken,setUserDetail} = useContext(UserData)
    const location = useLocation()
    const navigate = useNavigate()

const logoutUser = () => {
    localStorage.setItem("authToken",null)
    setUserDetail(null)
    setAuthToken(null)
    navigate("/login")

}


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">

  <p></p>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse mx-auto text-center" id="navbarSupportedContent">
    <ul className="navbar-nav mx-auto">
    {
        !userDetail ? <>
        <li className={`nav-item ${location.pathname === "/login" && "active"}`}>
        <Link className="nav-link"  to="/login">Sign In</Link>
      </li>
      <li className={`nav-item ${location.pathname === "/register" && "active"}`}>
        <Link className="nav-link" to="/register">Sign Up</Link>
      </li>
        </> : <>
        <li className={`nav-item ${location.pathname === "/profile" && "active"}`}>
        <Link className="nav-link" to="/profile">Profile</Link>
      </li>
      <li className={`nav-item`}>
        <span style={{cursor:"pointer"}} onClick={logoutUser} className="nav-link">Logout</span>
      </li>
        </>
    }
      
     
    </ul>
  </div>
</nav>
    </>
  )
}

export default Navbar
