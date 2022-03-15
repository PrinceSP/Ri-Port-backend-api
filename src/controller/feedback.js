const Feedback = require('../model/feedback')

exports.createFeedback = async (req,res)=>{
  const newFeedback = new Feedback(req.body)
  try {
    const feedback = await newFeedback.save()
    res.status(200).json(feedback)
  } catch (e) {
    return res.status(500).json(e)
  }
}

exports.deleteFeedback = async (req,res) =>{
  try {
    const feedback = await Feedback.findById(req.params.id)
    if (feedback.userId === req.body.userId) {
      await feedback.deleteOne()
      res.status(200).json('feedback has been deleted')
    } else{
      return res.status(403).json('you can only delete your feedback')
    }
  } catch (e) {
    return res.status(500).json(e)
  }
}

exports.getPost = async (req,res)=>{
  try{
    const feedback = await Feedback.find().sort({_id:-1})
    res.status(200).json(feedback)
  } catch(e){
    res.status(500).json(e)
  }
}
