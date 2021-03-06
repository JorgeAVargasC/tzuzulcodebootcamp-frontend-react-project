import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../context/AuthContext'

export default function LogOut() {

    const navigate = useNavigate()

    const {setAuth} = useContext(authContext)

    const handleLogOut=()=>{
        localStorage.removeItem("token")
        setAuth({
            logged:false,
            name:"",
            id:"",
            email:"",
            role:"",
        })
        navigate("/",{replace:true})
    }
    return (
        <button className="btn btn-logout" onClick={handleLogOut}>
            <span>Log Out</span>
        </button>
    )
}