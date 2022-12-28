import '../App.css';
import React from "react";
import {useNavigate} from 'react-router-dom'
const Login = ()=>{
    let navigate = useNavigate();
    const loginclick = ()=>{
        navigate('/signin');
    }
    const registerclick =()=>{
        navigate('/register');
    }
    return(
        <>
        <div className="login">
            <p className="first">async</p>
            <p className="heading">tic tac toe</p>
            <button className="button1" onClick={loginclick}>Login
            </button>
            <button className="button2" onClick={registerclick}>Register</button>
        </div>
        </>
    )
}

export default Login