const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema({
  jobTitle: String,
  companyName: String,
  jobDescription: String,
  name: String,
  email: String,
  // mobile: String,
  resume: String,
  interviewDate: Date,
  // subscriberId:String,
  subscriberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subscriber", // Assuming 'Subscriber' is the name of your subscriber model
    // required: true,
  },
  
  status: {
    type: String,
    default: "Pending",
  },

  availability:{
    type: String,
  },

  cause:{
    type:String
  }
});
module.exports = mongoose.model("applicants",applicantSchema);