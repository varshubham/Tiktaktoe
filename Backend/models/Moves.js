const mongoose = require('mongoose')
const {Schema} = mongoose

const MoveSchema = new Schema({
    game:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'game'
    },
    user1 : {
       id :{
        type: mongoose.Schema.Types.ObjectId,
        ref:'game'
       },
       moves : {
         type: Array,
         default:[]
       }
    },
    user2 :{
        id :{
            type: mongoose.Schema.Types.ObjectId,
            ref:'game'
           },
           moves : {
             type: Array,
             default:[]
           }
    }
})

module.exports = mongoose.model('move',MoveSchema)