import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [credentials, setCredentials] = useState({ name: "", username: "", email: "", password: "" })
    const [show,setShow] = useState(false)
    const navigate = useNavigate();
    const handleclick = async ()=>{
        const res = await fetch(`http://localhost:5000/api/auth/createUser`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name,username:credentials.username,email:credentials.email,password:credentials.password})
        })
        const json = await res.json();
        console.log(json)
        if(json.success)
        {
            localStorage.setItem("token", json.authtoken);
            setShow(true)
            setTimeout(() => {
                setShow(false)
                navigate('/')
            }, 1500);
        }
        else {
            alert("Email or Username already exist")
        }
    }
    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const backclick = () => {
        navigate(-1);
    }

    return (
        <>
            <div className="register">
                <div className="header" onClick={backclick}><svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.6201 0.990059C10.1301 0.500059 9.34006 0.500059 8.85006 0.990059L0.540059 9.30006C0.150059 9.69006 0.150059 10.3201 0.540059 10.7101L8.85006 19.0201C9.34006 19.5101 10.1301 19.5101 10.6201 19.0201C11.1101 18.5301 11.1101 17.7401 10.6201 17.2501L3.38006 10.0001L10.6301 2.75006C11.1101 2.27006 11.1101 1.47006 10.6201 0.990059Z" fill="#333333" />
                </svg></div>
                <div className="smtext">Create Account</div>
                <div className="lgtext">Let's get to know you Better!</div>
                <div className="entries">
                    <p>Your Name</p>
                    <input type="text" name="name" value={credentials.name} onChange={onchange} placeholder="Type your name here" />
                    <p>Username</p>
                    <input type="text" name="username" value={credentials.username} onChange={onchange} placeholder="Type your username here" />
                    <p>Email</p>
                    <input type="email" name="email" value={credentials.email} onChange={onchange} placeholder="Type your email here" />
                    <p>Password</p>
                    <input type="password" name="password" value={credentials.password} onChange={onchange} placeholder="Type your password here" />
                </div>
                {show && <div className="invalid">Congratulations!!!! Account Created</div>}
                <button type="submit" className="rbutton" onClick={handleclick}>Register</button>
            </div>
        </>
    )
}

export default Register