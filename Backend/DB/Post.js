const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  // Total :12
  //    list : (1) company Introduction, (2) company Name, (3) jobTitle, (4) job Description, (5) Job Responsibility,
  //     (6)job skills, (7) Vacancy , (8) Salary  ,(9) location  ,(10) Nature , (11) Publish Date (12) Close Date ,

  //  1 Company Introduction
  companyIntro: {
    type: String,
  },

  // 2 Company Name
  companyName: {
    type: String,
    required: true,
  },

  // 3 JobTitile
  jobTitle: {
    type: String,
    required: true,
  },

  // 4 Job Description
  jobDescription: {
    type: String,
    required: true,
  },

  // 5 Job Responsibility
  jobResponsibility: {
    type: String,
  },

  // 6 job Skills
  jobSkills: {
    type: String,
  },

  // 7 vacancy 
  vacancy:{
    type:Number
  },

  // 8 Salary
  salary: {
    type: Number,
  },

  // 9 location
  location: {
    type: String,
  },

  // 10 Nature
  jobNature: {
    type: String,
  },

  // 11  Publish Date
  publishDate: {
    type: Date,
  },
  // 12 Close Date
  closeDate: {
    type: Date,
  },
});
postSchema.index({ jobTitle: "text", location: "text" });
module.exports = mongoose.model("posts",postSchema);