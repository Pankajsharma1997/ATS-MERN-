import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// const Post = require("./DB/Post");
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "bootstrap-icons/font/bootstrap-icons.css";

import axios from "axios";

const Applicant = () => {
  const { id } = useParams(); // Get the job ID from URL params
  const [post, setPost] = useState(null); // State to store job details
  const [subscriberDetails, setSubscriberDetails] = useState(null); // State to store subscriber details
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      if (!file) {
        setError(true);
        return false;
      }
      const formData = new FormData();
      formData.append("resume", file); // Append the file
      // Append other form data
      formData.append("jobTitle", post.jobTitle);
      formData.append("companyName", post.companyName);
      formData.append("jobDescription", post.jobDescription);
      formData.append("name", subscriberDetails.name);
      formData.append("email", subscriberDetails.email);
      formData.append("mobile", subscriberDetails.mobile);
      formData.append("subscriberId", subscriberDetails._id);

      const existingApplicantResponse = await axios.get(
        `/check-applicant`,
        {
          params: {
            name: subscriberDetails.name,
            email: subscriberDetails.email,
            jobTitle: post.jobTitle,
            companyName: post.companyName,
          },
        }
      );

      // If the user already exists, alert and return
      if (existingApplicantResponse.data.exists) {
        alert("You Alerady Apply for that job");
        navigate("/");
        return;
      }

      const response = await axios.post(
        "/applicant/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for sending files
          },
        }
      );

      const result = response.data;
      console.warn(result);

      if (result) {
        alert("Successully Submit The application");
        navigate("/");
      } else {
        console.error("Submission failed:", result);
        alert("Failed to apply. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while applying. Please try again later.");
    }
  };

  useEffect(() => {
    // Fetch job details using the job ID
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get(`/applyPost/${id}`);
        setPost(response.data); // Set job details in state
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [id]);

  // Fetch subscriber details from local storage and then from the database
  useEffect(() => {
    const subscriberId = JSON.parse(localStorage.getItem("subscriber"))._id;
    const fetchSubscriberDetails = async () => {
      try {
        const response = await axios.get(
          `/subscriber/${subscriberId}`
        );
        setSubscriberDetails(response.data); // Set subscriber details in state
      } catch (error) {
        console.error("Error fetching subscriber details:", error);
      }
    };

    if (subscriberId) {
      fetchSubscriberDetails();
    }
  }, []);

  return (
    <>
      <div className="applyform">
        <div className="container">
          <div className="row">
            <div className="col-lg-2 col-md-2 col-sm-12 col-12"></div>
            <div className="col-lg-8 col-md-8 col-sm-12 col-12">
              <div className="subscfrm">
                <h1>Apply for Job</h1>
                {post && subscriberDetails ? (
                  <form onSubmit={handleApply}>
                    <h5> Job Detail </h5>

                    <div className="formadatainr">
                      <label htmlFor="jobTitle"> JobTitle </label>
                      <Form.Control
                        type="text"
                        id="jobTitle"
                        value={post.jobTitle || ""}
                        readOnly
                      />
                    </div>

                    {/* CompanyName */}
                    <div className="formadatainr">
                      <label htmlFor="CompanyName "> CompanyName </label>
                      <Form.Control
                        type="text"
                        id="jobTitle"
                        value={post.companyName || ""}
                        readOnly
                      />
                    </div>

                    {/* Job Description */}
                    <div className="formadatainr">
                      <label htmlFor="JobDescription"> JobDescription </label>
                      <Form.Control
                        as="textarea"
                        id="jobDescription"
                        rows="3"
                        value={post.jobDescription || ""}
                        readOnly
                      />
                    </div>


                    <h5> User Detail </h5>

                    {/*  User Name  */}
                    <div className="formadatainr">
                      <label htmlFor="Name"> Name </label>
                      <Form.Control
                        type="text"
                        id="jobTitle"
                        value={subscriberDetails ? subscriberDetails.name : ""}
                        readOnly // Disable editing
                      />
                    </div>

                    {/*  User Email   */}
                    <div className="formadatainr">
                      <label htmlFor="email "> Email </label>
                      <Form.Control
                        type="text"
                        id="jobTitle"
                        value={subscriberDetails.email}
                        readOnly // Disable editing
                      />
                    </div>

                    {/* Mobile  */}
                    <div className="formadatainr">
                      <label htmlFor="mobile"> Mobile </label>
                      <Form.Control
                        type="number"
                        id="jobTitle"
                        value={
                          subscriberDetails ? subscriberDetails.mobile : ""
                        }
                        readOnly
                      />
                    </div>
                    {/* Resume   */}
                    <div className="formadatainr">
                      <label htmlFor="Resume"></label>
                      <Form.Control
                        type="file"
                        placeholder="choose a file"
                        className="mt-3"
                        accept="application/pdf"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                      {error && !file && (
                        <span className="invalid-input">
                          {" "}
                          Please Choose Resume PDF{" "}
                        </span>
                      )}
                    </div>

                    <div className="formadatainr">
                      <button
                        type="submit"
                        className="btn btn-success btn-md m-5"
                      >
                        Apply
                      </button>
                    </div>
                  </form>
                ) : (
                  <p>Loading...</p>
                )}
              </div>
              <div className="col-lg-2 col-md-2 col-sm-12 col-12"></div>
            </div>
          </div>
        </div>
      </div>
      {/* // job Detail Area */}
     
    </>
  );
 };
export default Applicant;
