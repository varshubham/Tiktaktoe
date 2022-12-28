import React, { useContext, useState } from "react";
import Context from "../Context/Context";
import '../App.css'
import { useNavigate } from "react-router-dom";
const Newgame = () => {
    const context = useContext(Context)
    const [email, setEmail] = useState("");
    const [show, setShow] = useState(false);
    const [sameshow,setSameshow] = useState(false)
    const {setData,creategame,euser} = context;
    const navigate = useNavigate();
    const onchange = (e) => {
        setEmail(e.target.value)
    }
    const startclick = async () => {
        const res = await fetch(`http://localhost:5000/api/auth/getuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ email })
        })
        const json = await res.json();
        if (json.success) {
            setShow(false)
            await setData(json.user)
            const status = "Your Move"
            const response = await creategame(json.user._id,status)
            if(response)
            {
                navigate('/game')
            }
            else{
                setShow(false)
                setSameshow(true)
            }
           
        }
        else {
            setSameshow(false)
            setShow(true);
        }
    }
    const backclick=()=>{
        navigate(-1)
    }
    return (
        <>
                <div className="newgame">
                    <div className="header">
                        <svg onClick={backclick} width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.62 0.989998C10.13 0.499998 9.34 0.499998 8.85 0.989998L0.539998 9.3C0.149998 9.69 0.149998 10.32 0.539998 10.71L8.85 19.02C9.34 19.51 10.13 19.51 10.62 19.02C11.11 18.53 11.11 17.74 10.62 17.25L3.38 10L10.63 2.75C11.11 2.27 11.11 1.47 10.62 0.989998Z" fill="#333333" />
                        </svg>
                        <div className="smtext">Start a new game</div>
                        <div className="lgtext">Whom do you want to play with?</div>
                        <div className="entry">
                            <p className="email">Email</p>
                            <input className="emailinput" type="email" name="email" value={email} onChange={onchange} placeholder="Type the email here" />
                        </div>
                        {show && <div className="invalid">User with this email doesn't exists.</div>}
                        {sameshow && <div className="invalid">A game with this user already exists.</div>}
                        <button className="start" onClick={startclick}>Start Game</button>
                    </div>
                </div>
            {/* {layout && <Gamelayout user={data}/>} */}
        </>
    )
}

export default Newgame