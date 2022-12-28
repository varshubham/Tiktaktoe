import React, { useEffect, useState } from "react";
import '../App.css'
import { useNavigate } from "react-router-dom";
import Card from "./Card";

const Home = () => {
  const navigate = useNavigate();
  const [games, setGames] = useState([])
  const getGames = async () => {
    const response = await fetch(`http://localhost:5000/api/game/fetchall`, {
      method: 'GET',
      headers: {
        'auth-token': localStorage.getItem('token')
      }

    });
    const json = await response.json();
    setGames(json)
  }

  const newgameclick = ()=>{
    navigate('/newgame')
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getGames();
    }
    else {
      navigate('/login')
    }
  }, [])
  return (
    <div className="home">
      <div className="header">Your Games</div>
      {(games.length===0) && <><div className="lgtext">No Games Found</div><button className="start" onClick={newgameclick}>Start a New Game</button></>}
      {(games.length!==0) && <div><div className="cardmap">
        {games.map((game)=>{
          return <Card key={game._id} game={game}/>
        })}
        </div>
        <button className="new" onClick={newgameclick}>+ New Game</button>
      </div>}
    </div>
  )
}
export default Home