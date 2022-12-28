import Context from "./Context";
import { useState } from "react";

const State = (props) =>{
    const [data,setData] = useState("")
    const [user,setUser] = useState("")
    const [euser,setEuser] = useState("")
    const creategame = async (user2,status) =>{
        const res = await fetch(`http://localhost:5000/api/game/createGame`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'auth-token':localStorage.getItem('token')
            },
            body: JSON.stringify({user2,status})
        })
        const json = await res.json();
        console.log(json);
        setEuser(json)
        if(json.error)
        {
            return false;
        }
        return true;
    }
    return(
        <Context.Provider value={{data,setData,creategame,euser,user,setUser}}>
            {props.children}
        </Context.Provider>
    )
}

export default State