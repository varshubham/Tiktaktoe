import React, { useState,useContext } from "react";
import Context from "../Context/Context";
import { useNavigate } from "react-router-dom";
import '../App.css'

const Gamelayout = () => {
    const context = useContext(Context);
    const {data,euser} = context
    const navigate = useNavigate();
    const backclick = () =>{
        navigate(-1);
    }

    const cross = <svg width="106" height="106" viewBox="0 0 106 106" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="105.09" height="105.09" fill="white"/><rect width="16.1985" height="72.8932" rx="8.09924" transform="matrix(0.706472 0.707741 -0.706472 0.707741 72.5152 21.0184)" fill="#2C8DFF"/><rect width="16.1985" height="72.8932" rx="8.09924" transform="matrix(0.706472 -0.707741 0.706472 0.707741 21.131 32.4824)" fill="#2C8DFF"/></svg>
    

    const piececlick = (e)=>{
        document.getElementById(e.target.id).innerHTML += '<svg width="106" height="106" viewBox="0 0 106 106" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="105.09" height="105.09" fill="white"/><rect width="16.1985" height="72.8932" rx="8.09924" transform="matrix(0.706472 0.707741 -0.706472 0.707741 72.5152 21.0184)" fill="#2C8DFF"/><rect width="16.1985" height="72.8932" rx="8.09924" transform="matrix(0.706472 -0.707741 0.706472 0.707741 21.131 32.4824)" fill="#2C8DFF"/></svg>';

    }
    return (
        <>
            <div className="gamelayout">
                <div className="header"><svg onClick={backclick} width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.62 0.989998C10.13 0.499998 9.34 0.499998 8.85 0.989998L0.539998 9.3C0.149998 9.69 0.149998 10.32 0.539998 10.71L8.85 19.02C9.34 19.51 10.13 19.51 10.62 19.02C11.11 18.53 11.11 17.74 10.62 17.25L3.38 10L10.63 2.75C11.11 2.27 11.11 1.47 10.62 0.989998Z" fill="#333333" />
                </svg>
                </div>
                <div className="lgtext">Game with {data.name}</div>
                <div className="smtext">{euser.status}</div>
                <div className="piece">
                    <div className="left">
                    </div>
                    <div className="right">
                    </div>
                </div>
                <div className="gamebox">
                    <div className="rect">
                    <p className="text">Your move</p>
                    </div>
                    <div className="movebox">
                        <div className="one" id="one" onClick={piececlick}></div>
                        <div className="two" id="two" onClick={piececlick}></div>
                        <div className="three" id="three" onClick={piececlick}></div>
                        <div className="four" id="four" onClick={piececlick}></div>
                        <div className="five" id="five" onClick={piececlick}></div>
                        <div className="six" id="six" onClick={piececlick}></div>
                        <div className="seven" id="seven" onClick={piececlick}></div>
                        <div className="eight" id="eight" onClick={piececlick}></div>
                        <div className="nine" id="nine" onClick={piececlick}></div>
                    </div>
                </div>
                <button className="submitbutton">Submit</button>
            </div>
        </>
    )
}

export default Gamelayout