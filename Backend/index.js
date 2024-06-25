const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const Admin = require("./DB/Admin"); // Import User Model and Schema for storing Admin information
const Post = require("./DB/Post");
const Subscriber = require("./DB/Subscriber");
const Applicant = require("./DB/Applicant");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const Message = require("./DB/Message");
const port = process.env.PORT || 5000;

const app = express();

// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors()); //

// Database connection
dotenv.config();
mongoose.connect(process.env.MONGO_CONNECTION_STRING);


                                   // Admin Part
// For  resgister the Admin
app.post("/register", async (req, resp) => {
  try {
    // Generate a salt to hash the password
    const salt = await bcrypt.genSalt(10);
    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new User object with the hashed password
    let user = new Admin({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword, // Save the hashed password
    });

    // Save the user to the database
    let result = await user.save();

    // Convert the result to a plain JavaScript object
    result = result.toObject();

    // Remove the password field from the result
    delete result.password;

    // Send the response
    resp.send(result);
  } catch (error) {
    
    // Handle errors
    console.error("Error:", error);
    resp.status(500).send("An error occurred while registering the user.");
  }
});


// For login the Admin

app.post("/login", async (req, resp) => {
  try {
    // Find user by email
    const user = await Admin.findOne({ email: req.body.email });

    // Check if user exists
    if (user) {
      // Compare hashed passwords
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (validPassword) {
        // If passwords match, send the user object without the password field
        resp.send(user.toObject());
      } else {
        // If passwords don't match, send an error message
        resp.status(401).send({ result: "Invalid password" });
      }
    } else {
      // If user doesn't exist, send an error message
      resp.status(404).send({ result: "User not found" });
    }
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    resp.status(500).send("An error occurred while logging in.");
  }
});

// Add Post to the Database
app.post("/add-post", (req, res) => {
  Post.create({
    companyIntro:req.body.companyIntro,
    companyName: req.body.companyName,
    jobTitle: req.body.jobTitle,
    jobDescription: req.body.jobDescription,
    jobResponsibility:req.body.jobResponsibility,
    jobSkills:req.body.jobSkills,
    vacancy:req.body.vacancy,
    salary:req.body.salary,
    location:req.body.location,
    jobNature: req.body.nature,
    publishDate: req.body.startDate,
    closeDate: req.body.closeDate,
  })
    .then((result) => res.json(result))
    .catch((err) => res.json(err));
});

// Get Post on the basis of id  from Posts table
app.get("/editPost/:id", async (req, resp) => {
  try {
    const id = req.params.id;
    const posts = await Post.findById({ _id: id });
    resp.json(posts);
  } catch (err) {
    resp.status(500).json({ message: err.message });
  }
});
  

// Edit and Update the Posts in Database
app.post("/updatePost/:id", (req, res) => {
  const id = req.params.id;
  const updateData = {
    companyIntro: req.body.companyIntro,
    jobTitle: req.body.jobTitle,
    companyName: req.body.companyName,
    jobDescription: req.body.jobDescription,
    jobResponsibility: req.body.jobResponsibility,
    jobSkills: req.body.jobSkills,
    vacancy: req.body.vacancy,
    salary: req.body.salary,
    location: req.body.location,
    jobNature: req.body.nature,
    publishDate: req.body.publishDate,
    closeDate: req.body.closeDate,
  };
  Post.findByIdAndUpdate(id, updateData)
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

// Delete Post  from the database
app.delete("/deletePost/:id", (req, res) => {
  const id = req.params.id;
  Post.findByIdAndDelete({ _id: id })
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});


//  Get All Applications 
app.get("/all-applications", async (req, resp) => {
  try {
    const applications = await Applicant.find();
    resp.json(applications);
  } catch (err) {
    resp.status(500).json({ message: err.message });
  }
});

// Get All Accepted Applications
app.get("/acceptedlist", async (req, resp) => {
  try {
    const applications = await Applicant.find({ isDeleted: false });
    resp.json(applications);
  } catch (err) {
    resp.status(500).json({ message: err.message });
  }
});

//  Get The Rejected Applications 
app.get("/rejectedlist", async(res, resp) => {
  try{
    const rejectedList = await Applicant.find({ isDeleted:true});
    resp.json(rejectedList);
  }
  catch(err){
    resp.status(500).json({message:err.message});
  }
});

//  Get all the vacancies from the db
app.get("/all-vacancies", async (req, resp) => {
  try {
    const posts = await Post.find();
    let totalVacancies = 0;
    let vacanciesArray = [];

    posts.forEach((post) => {
      totalVacancies += post.vacancy;
      vacanciesArray.push(post.vacancy);
    });
  
    resp.json({
      totalVacancies: totalVacancies,
      vacanciesArray: vacanciesArray,
    });
  } catch (err) {
    resp.status(500).json({ message: err.message });
  }
});




// Admin Section : Application Accept and Reject

// Get Applicant  on the basis of id  from Applicant  table
app.get( "/editApplicant/:id", async(req, resp) => {
    try{
      const id = req.params.id;
      const applicant = await Applicant.findById({ _id: id});
      resp.json(applicant);
    }catch(err)
    {
        resp.status(500).json({message:err.message});
    }
});


  

// Edit and Update the Applications in Database

app.post("/updateApplication/:id", (req, res) => {
  const id = req.params.id;
  const updateData = {
    interviewDate: req.body.interviewDate,
    status: req.body.status,
  };
  Applicant.findByIdAndUpdate(id, updateData)
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});

// Delete Applicant  from the database
// app.delete("/deleteApplicant/:id", (req, res) => {
//   const id = req.params.id;
//   Applicant.findByIdAndDelete({ _id: id })
//     .then((post) => res.json(post))
//     .catch((err) => res.json(err));
// });

app.delete("/deleteApplicant/:id", (req, res) => {
  const id = req.params.id;
  Applicant.findByIdAndUpdate(
    id,
    { isDeleted: true, deletedAt: new Date() },
    { new: true }
  )
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});





// Report Section
app.get("/applicants/:companyName", async (req, res) => {
  try {
    const { companyName } = req.params;
    const query = companyName !== "All" ? { companyName } : {};
    const items = await Applicant.find(query);
    res.json(items);
  } catch (error) {
    res.status(500).send("Server error");
  }
});



                                           //  User Part 
                                    //  Section 1 Registration and Login of the Applicant 
const bcryptSalt = bcrypt.genSaltSync(10);
app.post("/subscriber", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, bcryptSalt);
    const subscriber = new Subscriber({
      name,
      email,
      password: hashedPassword,
      mobile,
    });
    await subscriber.save();
    res.status(201).send({ userId: subscriber._id });
  } catch (error) {
    res.status(400).send(error);
  }
});

// Login the subscriber
app.post("/loginsubscriber", async (req, resp) => {
  try {
    // Find user by email
    const user = await Subscriber.findOne({ email: req.body.email });

    // Check if user exists
    if (user) {
      // Compare hashed passwords
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (validPassword) {
        // If passwords match, send the user object without the password field

        resp.send(user.toObject());
      } else {
        // If passwords don't match, send an error message
        resp.status(401).send({ result: "Invalid password" });
      }
    } else {
      // If user doesn't exist, send an error message
      resp.status(404).send({ result: "User not found" });
    }
  } catch (error) {
    // Handle errors
    console.error("Error:", error);
    resp.status(500).send("An error occurred while logging in.");
  }
});


                                //  User Section 2  View jobs and Jobs Details 
     
 // Get All the posts from the database
app.get("/all-posts", async (req, resp) => {
  try {
    const posts = await Post.find();
    resp.json(posts);
  } catch (err) {
    resp.status(500).json({ message: err.message });
  }
});



// Get Post on the basis of id  from Posts table
app.get("/applyPost/:id", async (req, resp) => {

  try {
    const id = req.params.id;
    const posts = await Post.findById({ _id: id });
    resp.json(posts);
  } catch (err) {
    resp.status(500).json({ message: err.message });
  }
});
 
                   //  User Section 3  Get Subscriber Details  and Apply for the job & check Validation for appling job   
    // Get subscriber details from Subscriber Table 
app.get("/subscriber/:subscriberId", async (req, res) => {
  try {
    const subscriber = await Subscriber.findById(req.params.subscriberId);
    res.json(subscriber);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

  
// Multer configuration for File upload 
const multer = require("multer");
// const cookieParser = require("cookie-parser");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });

    // Fill the Application form and upload the Resume  
app.post("/applicant", upload.single("resume"), async (req, res) => {
  //     console.log(req.file);
  const jobTitle = req.body.jobTitle;
  const companyName = req.body.companyName;
  const jobDescription = req.body.jobDescription;
  const name = req.body.name;
  const email = req.body.email;
  const fileName = req.file.filename;
  const subscriberId = req.body.subscriberId;

  try {
    await Applicant.create({
      jobTitle: jobTitle,
      companyName: companyName,
      jobDescription: jobDescription,
      name: name,
      email: email,
      resume: fileName,
      subscriberId: subscriberId,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});



// Check applicant already exist or not
app.get("/check-applicant", async (req, res) => {
  const { name, email, jobTitle, companyName } = req.query;
  const applicantExists = await Applicant.findOne({
    name,
    email,
    jobTitle,
    companyName,
    isDeleted:false
  });
  res.send({ exists: !!applicantExists });
});
                                            //   User Section 4      Applicant Messages 
//  Store the  Message
app.post("/message", async (req, res) => {
  try {
    const {senderId, senderName, senderEmail, receiverEmail, message } =
      req.body;

    const chatMessage = new Message({
      senderId,
      senderEmail,
      senderName,
      receiverEmail,
      message,
    });
    await chatMessage.save();
    res.status(201).send({ senderId: Subscriber._id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET  fetch messages by email
app.get("/messages", async (req, res) => {
  const { email } = req.query; // Get the email from query parameters

  try {
    const messages = await Message.find({
      $or: [{ senderEmail: email }, { receiverEmail: email }],
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

                                          //  User Section 5   Applicantion Status and Availablity 
                         
// Get ApplicationStatus details
app.get("/aplicationstatus/:subscriberId", async (req, res) => {
  try {
    const subscriberId = req.params.subscriberId;
    const applicationStatus = await Applicant.find({
      subscriberId: subscriberId,
    });
    res.json(applicationStatus);
  } catch (error) {
    res.status(500).send("Server error");
  }
});


// Get Applicant  on the basis of id  from Applicant  table
app.get( "/editApplication/:id", async(req, resp) => {
    try{
      const id = req.params.id;
      const applicant = await Applicant.findById({ _id: id});
      resp.json(applicant);
    }catch(err)
    {
        resp.status(500).json({message:err.message});
    }
});




// Edit and Update the Availablity of user in the Database
app.post("/updateApplicantAvailablity/:id", (req, res) => {
  const id = req.params.id;
  const updateData = {
    availability: req.body.availability,
    cause: req.body.cause,
  };
  Applicant.findByIdAndUpdate(id, updateData)
    .then((post) => res.json(post))
    .catch((err) => res.json(err));
});



                            // User Section 6   Filtering The jobs on the different Criteria 
       // Filter job on the basis of nature 
app.get("/jobnature/:nature", async (req, res) => {
  try {
    const { jobNature } = req.params;
    const query = jobNature !== "All" ? { jobNature } : {};
    const items = await Post.find(query);
    res.json(items);
  } catch (error) {
    res.status(500).send("Server error");
  }
});



app.get("/jobs/:location/:jobNature/:jobTitle", async (req, res) => {
  try {
    const { location, jobNature,jobTitle } = req.params;
    let query = {};
    if (location !== "All") {
      query.location = location ;
    }
    if (jobNature !== "All") {
      query.jobNature = jobNature;
    }
    if (jobTitle !== "All"){
      query.jobTitle = jobTitle;
    }
    // If both location and nature are "All", the query will be empty, returning all posts
    const items = await Post.find(query);
    res.json(items);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});




// 




                            //  User Section  Mix

// Serve static files from the 'files' directory
app.use("/files", express.static(path.join(__dirname, "files")));


//  Access the port Number 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});