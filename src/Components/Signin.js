import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import '../App.css'


const Signin = () => {
    const navigate = useNavigate();
    const [show,setShow] = useState(false)
    const [credentials,setCredentials] = useState({username:"",password:""})

    const handleclick = async ()=>{
        const res = await fetch(`http://localhost:5000/api/auth/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({username:credentials.username,password:credentials.password})
        })
        const json = await res.json();
        console.log(json)
        if(json.success)
        {
            localStorage.setItem("token", json.authtoken);
            setTimeout(() => {
                navigate('/')
            }, 1000);
        }
        else {
            setShow(true)
        }
    }
    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const backclick = () =>{
        navigate(-1);
    }
    return (
        <>
            <div className="signin">
                <div className="header" onClick={backclick}><svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.6201 0.990059C10.1301 0.500059 9.34006 0.500059 8.85006 0.990059L0.540059 9.30006C0.150059 9.69006 0.150059 10.3201 0.540059 10.7101L8.85006 19.0201C9.34006 19.5101 10.1301 19.5101 10.6201 19.0201C11.1101 18.5301 11.1101 17.7401 10.6201 17.2501L3.38006 10.0001L10.6301 2.75006C11.1101 2.27006 11.1101 1.47006 10.6201 0.990059Z" fill="#333333" />
                </svg></div>
                <div className="smtext">Login</div>
                <div className="lgtext">Please enter your details</div>
                <div className="entries">
                    <p>Username</p>
                    <input type="text" name="username" value={credentials.username} onChange={onchange} placeholder="Type your username here" />
                    <p>Password</p>
                    <input type="password" name="password" value={credentials.password} onChange={onchange} placeholder="Type your password here"  />
                </div>
               {show && <div className="invalid">Enter Correct Details</div>}
               
                <button type="submit" className="login" onClick={handleclick}>Login</button>
            </div>
        </>
    )
}
export default Signin