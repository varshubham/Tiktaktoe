const express = require('express')
const router = express.Router();
const Games = require('../models/Games')
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')

router.post('/createGame',fetchuser,async (req, res) => {
        try {
            const{isend,status,user2}=req.body;
            let game = await Games.findOne({user1:req.user.id,user2:user2,isend:false})
            if(game)
            {
                return res.status(400).json({ error: "a game with user is already exist " })
            }
            let game2 = await Games.findOne({user1:user2,user2:req.user.id,isend:false})
            if(game2)
            {
                return res.status(400).json({ error: "a game with user is already exist " })
            }
            const newgame = new Games({
                isend,status,user1:req.user.id,user2
            })
            const savedgame = await newgame.save();
            res.json(savedgame)
        } catch (error) {
            res.status(500).send("Internal Server Error")
        }
    })


router.get('/fetchall',fetchuser,async(req,res)=>{
    try {
        // const game = await Games.find({user1:req.user.id})
        const game = await Games.find({$or : [{user1:req.user.id},{user2:req.user.id}]})
        res.json(game)
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})

router.put('/update/:id',fetchuser,async(req,res)=>{
    try {
        const {status,isend} = req.body;
        const newgame={}
        if(status){newgame.status=status}

        if(isend){newgame.isend=isend}

        let game = await Games.findById(req.params.id)
        if(!game) { return res.status(404).send("Not Found")}
        if(game.user.toString() !== req.user.id)
        {
            return res.status(401).send("Not Allowed")
        }
        game = await Games.findByIdAndUpdate(req.params.id,{$set:newgame},{new:true})
        res.json({game})
    } catch (error) {
        res.status(500).send("Internal Server Error")
    }
})

module.exports = router 