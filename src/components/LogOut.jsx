import React, { useContext } from 'react'
import { authContext } from '../context/AuthContext'

export default function LogOut() {

    const {setAuth} = useContext(authContext)

    const handleLogOut=()=>{
        localStorage.removeItem("token")
        setAuth({
            logged:false,
            name:"",
            id:""
        })
    }
    return (
        <button className="btn" onClick={handleLogOut}>
            <span>Log Out</span>
        </button>
    )
}