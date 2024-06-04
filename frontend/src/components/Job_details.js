import React,{useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./myStyles.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "react-bootstrap/Form";

function Job_details() {
  const { id } = useParams();
  const [jobAllDetails, setJobAllDetails] = useState(null);
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
      formData.append("jobTitle", jobAllDetails.jobTitle);
      formData.append("companyName", jobAllDetails.companyName);
      formData.append("jobDescription", jobAllDetails.jobDescription);
      formData.append("name", subscriberDetails.name);
      formData.append("email", subscriberDetails.email);
      formData.append("subscriberId", subscriberDetails._id);

      const existingApplicantResponse = await axios.get(`/check-applicant`, {
        params: {
          name: subscriberDetails.name,
          email: subscriberDetails.email,
          jobTitle: jobAllDetails.jobTitle,
          companyName: jobAllDetails.companyName,
        },
      });

      // If the user already exists, alert and return
      if (existingApplicantResponse.data.exists) {
        alert("You Alerady Apply for that job");
        navigate("/");
        return;
      }

      const response = await axios.post("/applicant/", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Important for sending files
        },
      });

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
        setJobAllDetails(response.data); // Set job details in state
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
        const response = await axios.get(`/subscriber/${subscriberId}`);
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
      <div className="job_details_area">
        {/* Banner Section  */}
        <img src="../banner_job_detail.jpg" alt="Descriptive Text" />
        {/* Banner Section End  */}

        <div className="container">
          <div className="row">
            {/*  Heading Section Start  */}
            <div className="col-md-12">
              <div className="section-heading">
                <h1> Job Detail </h1>
              </div>
            </div>
            {/* Heading Section End  */}

            {/* Job Details Section Start */}

            <div className="col-md-8">
              <div className="descript_wrap white-bg">
                {/*  Company Introduction  */}
                <div className="single_wrap">
                  {" "}
                  <h4> Company Introduction </h4>{" "}
                  <p>
                    {jobAllDetails ? (
                      jobAllDetails.companyIntro
                    ) : (
                      <span>Loading job details...</span>
                    )}
                  </p>
                </div>

                {/*  Job Profile  */}
                <div className="single_wrap">
                  <h4> Job Profile </h4>
                  <p>
                    {jobAllDetails ? (
                      <strong>{jobAllDetails.jobTitle}</strong>
                    ) : (
                      <span>Loading job details...</span>
                    )}
                  </p>
                </div>

                {/*  Job Description  */}
                <div className="single_wrap">
                  <h4>Job description</h4>
                  <p>
                    {" "}
                    {jobAllDetails ? (
                      // jobAllDetails.jobDescription
                      jobAllDetails.jobDescription
                        .split(". ")
                        .map((item, index) => <li key={index}>{item}.</li>)
                    ) : (
                      <span>Loading job details...</span>
                    )}
                  </p>
                </div>

                {/* Job Responsibility    */}
                <div className="single_wrap">
                  <h4>Responsibility</h4>
                  {jobAllDetails ? (
                    jobAllDetails.jobResponsibility
                      .split(".")
                      .map((item, index) => <li key={index}>{item}.</li>)
                  ) : (
                    <span>Loading job details...</span>
                  )}
                </div>

               

                {/* job Skills    */}
                <div className="single_wrap">
                  <h4>Skills </h4>
                  {jobAllDetails ? (
                    jobAllDetails.jobSkills
                      .split(".")
                      .map((item, index) => <li key={index}>{item}.</li>)
                  ) : (
                    <span>Loading job details...</span>
                  )}
                </div>
              </div>
            </div>

            <div className="col-md-4 ">
              <div className="job_sumary">
                <div class="summery_header">
                  <h2> Job Summery </h2>
                </div>

                <div class="job_content">
                  <ul>
                    {/* Publish Date    */}
                    <li>
                      Published on:{" "}
                      <span>
                        {jobAllDetails ? (
                          new Date(jobAllDetails.publishDate).toDateString()
                        ) : (
                          <span>Loading job details...</span>
                        )}
                      </span>
                    </li>

                    {/* Total  Vacancy  */}
                    <li>
                      Vacancy:{" "}
                      <span>
                        {" "}
                        {jobAllDetails ? (
                          jobAllDetails.vacancy
                        ) : (
                          <span>Loading job details...</span>
                        )}{" "}
                      </span>
                    </li>

                    {/*  salary  */}
                    <li>
                      Salary:{" "}
                      <span>
                        {" "}
                        {jobAllDetails ? (
                          jobAllDetails.salary
                        ) : (
                          <span> Loading Job Details </span>
                        )}{" "}
                      </span>
                    </li>

                    {/*  Job Location  */}
                    <li>
                      Location:{" "}
                      <span>
                        {jobAllDetails ? (
                          jobAllDetails.location
                        ) : (
                          <span> Loading job Details </span>
                        )}{" "}
                      </span>
                    </li>

                    {/*  Job Nature  */}
                    <li>
                      Job Nature:{" "}
                      <span>
                        {jobAllDetails ? (
                          jobAllDetails.jobNature
                        ) : (
                          <span> Loading </span>
                        )}{" "}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="share_wrap d-flex">
                <span>Share at:</span>
                <ul>
                  <li>
                    <a href="#">
                      {" "}
                      <i class="bi bi-facebook"> </i>
                    </a>{" "}
                  </li>
                  <li>
                    <a href="#">
                      {" "}
                      <i class="bi bi-whatsapp"></i>
                    </a>{" "}
                  </li>
                  <li>
                    <a href="#">
                      {" "}
                      <i class="bi bi-twitter"></i>
                    </a>{" "}
                  </li>
                  <li>
                    <a href="#">
                      {" "}
                      <i class="bi bi-linkedin"></i>
                    </a>{" "}
                  </li>
                </ul>
              </div>

              <div className="apply_job_form white-bg">
                {jobAllDetails && subscriberDetails ? (
                  <>
                    <h4>Apply for the job</h4>
                    <form onSubmit={handleApply}>
                      <div className="row">
                        <div className="col-md-6">
                          <div className="input_field">
                            <label htmlFor="jobTitle"> JobTitle </label>
                            <Form.Control
                              type="text"
                              value={jobAllDetails.jobTitle || ""}
                              readOnly
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="input_field">
                            <label htmlFor="companyName"> Company Name </label>
                            <Form.Control
                              type="text"
                              value={jobAllDetails.companyName || ""}
                              readOnly
                            />
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div className="input_field">
                            <label htmlFor="job Description ">
                              {" "}
                              JobDescription{" "}
                            </label>
                            <Form.Control
                              type="text"
                              value={jobAllDetails.jobDescription || ""}
                              className="truncate-text"
                              readOnly
                            />
                          </div>
                        </div>

                        {/*  Subscriber Section Start   */}

                        {/* Subscriber Name  */}
                        <div class="col-md-6">
                          <div className="input_field">
                            <label htmlFor="userName"> UserName </label>
                            <Form.Control
                              type="text"
                              value={subscriberDetails.name || ""}
                              readOnly
                            />
                          </div>
                        </div>
                        {/*  Subscriber  Email  */}
                        <div class="col-md-6">
                          <div className="input_field">
                            <label htmlFor="Email"> Email </label>
                            <Form.Control
                              type="text"
                              value={subscriberDetails.email || ""}
                              readOnly
                            />
                          </div>
                        </div>

                        <div class="col-md-12">
                          <div class="custom-file">
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
                        </div>

                        <div className="col-md-12">
                          <div className="submit_btn">
                            <button class="boxed-btn3 w-100" type="submit">
                              Apply Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </>
                ) : (
                  <p> Loading...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Job_details









