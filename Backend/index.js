const express = require('express');
const connectToMongo = require('./db')
var cors = require('cors')

connectToMongo();
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors())
app.get('/',(req,res)=>{
    res.send("hello world");
})
app.use('/api/auth',require('./routes/auth'))
app.use('/api/game',require('./routes/games'))
app.use('/api/gdetail',require('./routes/gdetail'))
app.listen(port,()=>{
    console.log(`example app is listening at http://localhost:${port} `)
})