const express = require('express')
const User = require('../models/Users')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')

const SECRET_KEY = "madhavisagoodboy"





router.post('/createUser', [
    body('email', 'Enter correct email').isEmail(),
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('password', 'password should not be less than 5').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        let success = false;
        //check is user already exist
        let user = await User.findOne({ email: req.body.email })
        let user2 = await User.findOne({username:req.body.username})
        if (user || user2) {
            success=false;
            return res.status(400).json({ error: "sorry user this already exist" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        // secPass = req.body.password
        user = await User.create({
            name: req.body.name,
            username:req.body.username,
            email: req.body.email,
            password: secPass
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, SECRET_KEY);

        // .then(user => res.json(user)).catch(err=>{console.log(err)
        // res.json({error:"please enter correct values",message:err.message})})

        // console.log(req.body);
        // const user=User(req.body);
        // user.save();
        success=true;
        res.json({success, authtoken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured")
    }
})



//new route ie authenticating a user
router.post('/login',[
    body('username','Enter a valid username').exists(),
    body('password','Password cannot be black').exists()
],async (req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {username,password} = req.body;
    try {
        let success=false;
        let user=await User.findOne({username});
        if(!user){
            success=false;
            return res.status(400).json({error:"please try to login with correct credentials"});
        }

        const passwordcompare = await bcrypt.compare(password,user.password);
        if(!passwordcompare){
            success=false;
            return res.status(400).json({error:"please try to login with correct credentials"})
        }

        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data,SECRET_KEY)
        success=true;
        res.json({success,authtoken})
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Internal Server Error")
    }
})

// route 3: get loggedin user details
router.post('/getuser',fetchuser,async(req,res)=>{
    try {
        // const userId = req.user.id;
        // const user=await User.findById(userId).select("-password")
        // res.send(user)
        const email = req.body.email;
        const user = await User.findOne({email}).select("-password");
        if(user)
        {
            const success=true;
            res.send({success,user});
        }
        else{
            const success=false;
            res.send({success})
        }
    } catch (error) {
        res.status(500).send("Internal server  huhuerror")
    }
})

router.get('/userdetail',fetchuser,async(req,res)=>{
    try{
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch(error)
    {
        res.status(500).send("Internal server  error")
    }
})

router.get('/getdetail/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const user = await User.findById(id).select("username");
        if(!user)
        {
            return res.status(404).send("Not found")
        }
        res.send(user)
    } catch(error)
    {
        res.status(500).send("Internal server  error")
    }
})


module.exports = router