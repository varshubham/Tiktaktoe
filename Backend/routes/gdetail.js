const express = require('express')
const router = express.Router();
const Moves = require('../models/Moves')
const fetchuser = require('../middleware/fetchuser')


router.post('/createmove',async (req,res)=>{
    try {
        const {gameid,user1id,user2id,u1moves,u2moves} = req.body;
        const newmove = new Moves({
            game:gameid,
            user1:{
                id:user1id,
                moves:u1moves
            },
            user2:{
                id:user2id,
                moves:u2moves
            }
        })
        const savedmove = await newmove.save();
        res.json(savedmove)
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router