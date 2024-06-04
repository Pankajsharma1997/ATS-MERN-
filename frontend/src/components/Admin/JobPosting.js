import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import Sidebar from './Sidebar';
 
/* Create a JonPosting() functional component for  Posting a new jobs */ 
const JobPosting = ()=>{
  const [companyIntro, setCompanyIntro] = useState("");
  const [companyName, setCompanyName] = useState(" ");
  const [jobTitle, setJobTitle] = useState(" ");
  const [jobDescription, setJobDescription] = useState(" ");
  const[jobResponsibility,setJobResponsibility] = useState(" ");
  const[jobSkills,setJobSkiils] = useState(" ");
  const[vacancy,setVacancy] = useState(" ");
  const[salary,setSalary] = useState("");
  const[location,setLocation] = useState("");
  const[jobNature, setJobNature] = useState(" ");
  const [startDate, setStartDate] = useState( );
  const [closeDate, setCloseDate]  = useState();
  const [error, setError]         =  useState(false);
  const navigate = useNavigate();

const handleSubmit = async () => {
  if( !companyIntro  || !companyName || !jobTitle|| !jobDescription || !jobResponsibility ||
     !jobSkills ||!vacancy ||!salary || !location || !jobNature || !startDate || !closeDate)
{
   setError(true);
  return false;
}

  let result = await fetch("/add-post", {
    method: "post",
    body: JSON.stringify({
      companyIntro,
      companyName,
      jobTitle,
      jobDescription,
      jobResponsibility,
      jobSkills,
      vacancy,
      salary,
      location,
      jobNature,
      startDate,
      closeDate,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  result = await result.json();
  console.warn(result);
         if (result){
           navigate("/adminAllPosts");
         }
}


  return (
    <>
      <div className="Add-posts">
 
          <div className="row">
            <div className="col-lg-2">
              <Sidebar />
            </div>
          
            <div className="col-md-10">
              <div className="section-heading">
                <h2> Add New Jobs </h2>
              </div>
              <div className="post-form">
                {/*  Comapany Introduction   */}
                <div className="form-item">
                  <label> About Company </label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Enter Company Introduction Here"
                    onChange={(e) => setCompanyIntro(e.target.value)}
                  />
                  {error && !companyIntro && (
                    <span className="invalid-input">
                      {" "}
                      Please Enter Company Introduction Here{" "}
                    </span>
                  )}
                </div>

                {/* Show Company Name & Job title in One row   */}
                <div className="row">
                  <div className="col-md-6">
                    {/* Company Name  */}
                    <div className="form-item">
                      <label> Company Name </label>
                      <Form.Control
                        type="text"
                        placeholder="Compnay Name"
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                      {error && !companyName && (
                        <span className="invalid-input">
                          {" "}
                          Enter Valid Company Details{" "}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    {/*  Job Title  */}
                    <div className="form-item">
                      <label> Job Title </label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Job Title "
                        onChange={(e) => setJobTitle(e.target.value)}
                      />
                      {error && !jobTitle && (
                        <span className="invalid-input">
                          {" "}
                          Enter Valid JobTitle{" "}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/*job Description   */}
                <div className="form-item">
                  <label> Job Description </label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter Job Description Here"
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                  {error && !jobDescription && (
                    <span className="invalid-input">
                      {" "}
                      Please Enter Job Description Here{" "}
                    </span>
                  )}
                </div>
                {/*  Show job Nature and Location in same row  */}
                <div className="row">
                  {/* job Location  */}
                  <div className="col-md-6">
                    <div className="form-item">
                      <label> Job Location </label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Job Location "
                        onChange={(e) => setLocation(e.target.value)}
                      />
                      {error && !location && (
                        <span className="invalid-input">
                          {" "}
                          Please Enter Job Location Here{" "}
                        </span>
                      )}
                    </div>
                  </div>
                  {/*  Job Nature  */}
                  <div className="col-md-6">
                    <div className="form-item">
                      <label> Job Nature </label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Job Nature"
                        onChange={(e) => setJobNature(e.target.value)}
                      />
                      {error && !jobNature && (
                        <span className="invalid-input">
                          {" "}
                          Please Enter Job Nature Here{" "}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/*job Responsibility    */}
                <div className="form-item">
                  <label> Job Responsibility</label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter Job Responsibiliy Here"
                    onChange={(e) => setJobResponsibility(e.target.value)}
                  />
                  {error && !jobResponsibility && (
                    <span className="invalid-input">
                      {" "}
                      Please Enter Job Responsibility Here{" "}
                    </span>
                  )}
                </div>

                {/*  Show Vacancy and salary in the same row  */}
                <div className="row">
                  <div className="col-md-6">
                    {/* Vacancy   */}
                    <div className="form-item">
                      <label> Vacancy</label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Vacancy Here"
                        onChange={(e) => setVacancy(e.target.value)}
                      />
                      {error && !vacancy && (
                        <span className="invalid-input">
                          {" "}
                          Enter Valid Company Details{" "}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    {/* salary  */}
                    <div className="form-item">
                      <label> Salary </label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Salary Here "
                        onChange={(e) => setSalary(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/*job Skills     */}
                <div className="form-item">
                  <label> Job Skills </label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter Job Job Skills  Here"
                    onChange={(e) => setJobSkiils(e.target.value)}
                  />
                  {error && !jobSkills && (
                    <span className="invalid-input">
                      {" "}
                      Please Enter Job skills Here{" "}
                    </span>
                  )}
                </div>
                {/*  Show the Posting date and Close date in same row  */}
                <div className="row">
                  <div className="col-md-6">
                    {/* Job Posting date  */}
                    <div className="form-item">
                      <label> Publish Date </label>
                      <DatePicker
                        showIcon
                        selected={startDate}
                        isClearable
                        placeholderText="Select the Date"
                        onChange={(date) => setStartDate(date)}
                      />
                      {error && !startDate && (
                        <span className="invalid-input">
                          {" "}
                          Necessary to Choose the Start Date{" "}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    {/* Job Closing date  */}
                    <div className="form-item">
                      <label> End Date </label>
                      <DatePicker
                        showIcon
                        selected={closeDate}
                        isClearable
                        placeholderText="Select the Date"
                        onChange={(date) => setCloseDate(date)}
                      />
                      {error && !closeDate && (
                        <span className="invalid-input">
                          {" "}
                          Necessary to Choose the Close Date{" "}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="sbmtbtn">
                  <button onClick={handleSubmit} className="sbmt">
                    Post Job
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      
    </>
  );
}
export default JobPosting;
