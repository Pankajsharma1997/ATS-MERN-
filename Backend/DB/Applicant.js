const mongoose = require('mongoose');

const applicantSchema = new mongoose.Schema(
  {
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

    availability: {
      type: String,
    },

    cause: {
      type: String,
    },
    pic: {
      type: "String",
      required: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },

    
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },

  { timestamps: true }
);
module.exports = mongoose.model("applicants",applicantSchema);