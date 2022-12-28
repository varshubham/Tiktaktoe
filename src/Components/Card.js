import React from "react";
import { useEffect,useState } from "react";
import '../App.css'
import Context from "../Context/Context";
import { useContext } from "react";

const Card = (props)=>{
    const [name,setName] = useState()
    const context = useContext(Context);
    const {setUser} = context
    const date = new Date(props.game.date)
    const getuser = async () =>{
        const res = await fetch(`http://localhost:5000/api/auth/userdetail`,{
            method:'GET',
            headers :{
                'auth-token':localStorage.getItem('token')
            }
        })
        const json = await res.json();

        if(props.game.user1 === json._id)
        {
                const response = await fetch(`http://localhost:5000/api/auth/getdetail/${props.game.user2}`,{
                    method:'GET'
                })
                const jjson = await response.json();
                console.log(jjson)
                setName(jjson.username)
        }
        if(props.game.user2 === json._id)
        {
            const response = await fetch(`http://localhost:5000/api/auth/getdetail/${props.game.user1}`,{
                method:'GET'
            })
            const jjson = await response.json();
            console.log(jjson)
            setName(jjson.username)
        }
    }
    useEffect(()=>{
        getuser();
    },[])
    return (
        <div className="card">
            <div className="name"> Game with {name}</div>
           
            <div className="status">{props.game.status}</div>
            <div className="date">
                {date.toLocaleDateString()}
            </div>
            <button className="playbutton">Play</button>
        </div>
    )
}

export default Card