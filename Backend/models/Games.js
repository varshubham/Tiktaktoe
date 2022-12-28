const mongoose = require('mongoose')
const {Schema} = mongoose;

const GamesSchema = new Schema({
    user1:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    user2:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    isend:{
        type:Boolean,
        default:false
    },
    status:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('game',GamesSchema)