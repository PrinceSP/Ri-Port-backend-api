const mongoose = require('mongoose')

const Feedback = new mongoose.Schema({
  userId:{
    type:String,
    required:true
  },
  desc:{
    type:String,
    required:true
  }
})

module.exports = mongoose.model("Feedback",Feedback)
