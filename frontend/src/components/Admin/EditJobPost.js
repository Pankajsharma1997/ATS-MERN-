import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
 import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import addNotification from "react-push-notification";
import Sidebar from "./Sidebar";
import "./AdminPartCSS/Job_editing.css";

function EditJobPost() {
  const { id } = useParams(); // Get the job ID from URL params
  const [post, setPost] = useState({});
  const [editableId, setEditableId] = useState(null);
  const [editedCompanyIntro, setEditedCompanyIntro] = useState("");
  const [editedCompanyName, setEditedCompanyName] = useState("");
  const [editedJobTitle, setEditedJobTitle] = useState("");
  const [editedJobDescription, setEditedJobDescription] = useState("");
  const [editedJobResponsibility, setEditedJobResponsibility] = useState("");
  const [editedJobSkills, setEditedJobSkills] = useState(" ");
  const [editedVacancy, setEditedVacancy] = useState("");
  const [editedSalary, setEditedSalary] = useState("");
  const [editedLocation, setEditedLocation] = useState(" ");
  const [editedJobNature,setEditedJobNature] = useState(" ");
  const [editedDate, setEditedDate] = useState(new Date());
  const [editedCloseDate, setEditedCloseDate] = useState(new Date());
  const auth = localStorage.getItem("user");

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`/editPost/${id}`);
        setPost(response.data); // Assuming the response is a single post object
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    getPost();
  }, [id]);

  const toggleEditable = (id) => {
    if (post && post._id === id) {
      setEditableId(id);
      setEditedCompanyIntro(post.companyIntro);
      setEditedJobTitle(post.jobTitle);
      setEditedCompanyName(post.companyName);
      setEditedJobDescription(post.jobDescription);
      setEditedJobResponsibility(post.jobResponsibility);
      setEditedJobSkills(post.jobSkills);
      setEditedVacancy(post.vacancy);
      setEditedSalary(post.salary);
      setEditedLocation(post.location);
      setEditedJobNature(post.jobNature);
      setEditedDate(new Date(post.publishDate) || new Date());
      setEditedCloseDate(new Date(post.closeDate) || new Date());
    } else {
      setEditableId(null);
      setEditedCompanyIntro("");
      setEditedJobTitle("");
      setEditedCompanyName("");
      setEditedJobDescription("");
      setEditedJobResponsibility("");
      setEditedJobSkills("");
      setEditedVacancy("");
      setEditedSalary("");
      setEditedLocation("");
      setEditedJobNature("");
      setEditedDate(new Date());
      setEditedCloseDate(new Date());
    }
  };

  //   /**
  //    * @param {*} id
  //    * @returns
  //    * saveEditedPost Function for save the edited or modified  data
  //    */
  const saveEditedPost = (id) => {
    const editedData = {
      companyIntro: editedCompanyIntro,
      jobTitle: editedJobTitle,
      companyName: editedCompanyName,
      jobDescription: editedJobDescription,
      jobResponsibility: editedJobResponsibility,
      jobSkills: editedJobSkills,
      vacancy: editedVacancy,
      salary: editedSalary,
      location: editedLocation,
      jobNature: editedJobNature,
      publishDate: editedDate,
      closeDate: editedCloseDate,
    };
    if ( !editedCompanyIntro || !editedJobTitle ||  !editedCompanyName || !editedJobDescription ||
       !editedJobResponsibility || !editedJobSkills || !editedVacancy || !editedSalary || !editedLocation || !editedJobNature ||
         !editedDate || !editedCloseDate) 
        {
      alert("All fields must be filled out.");
      return;
    }

    axios.post("/updatePost/" + id, editedData)
      .then((result) => {
        console.log(result);
        setEditableId(null);
        setEditedCompanyIntro("");
        setEditedJobTitle("");
        setEditedCompanyName("");
        setEditedJobDescription("");
        setEditedJobResponsibility("");
        setEditedJobSkills("");
        setEditedVacancy("");
        setEditedLocation("");
        setEditedSalary("");
        setEditedJobNature("");
        setEditedDate(new Date());
        setEditedCloseDate(new Date());

           addNotification({
             title: "Success",
             subtitle: "You have successfully Edit Job Post",
             theme: "light",
             closeButton: "X",
             backgroundTop: "green",
             colorTop: "white",
             backgroundBottom: "lightgray",
           });

   
        // update Job Post data without loading the page ;
        if (post._id === id) {
          setPost({ ...post, ...editedData });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="job_editing_area">
        <div className="row">
          {/*  Sidebar Section Start */}
          <div className="col-lg-2">
            <Sidebar />
          </div>
          {/*Job Details Section   */}
          <div className="col-lg-10">
            <div className="headsection">
              <Link
                to="/adminAllPosts"
                className="backbutton"
                style={{ fontSize: "1.5rem" }}
              >
                {" "}
                Back{" "}
              </Link>{" "}
              <h3> Edit Job Detail </h3>{" "}
            </div>

            <div className="row">
              {
                <>
                  <div className="col-md-8">
                    {/*  job Details Start  */}
                    <div className="editdetails">
                      <h2 className="text-center"> Job Detail </h2>

                      {/*  Company Introduction  */}
                      <div className="jobdetail">
                        <h3> Company Intro </h3>
                        {editableId === post._id ? (
                          <Form.Control
                            as="textarea"
                            rows={3}
                            className="form-control"
                            value={editedCompanyIntro}
                            onChange={(e) =>
                              setEditedCompanyIntro(e.target.value)
                            }
                          />
                        ) : (
                          post.companyIntro
                        )}
                      </div>

                      {/* Comapany Name  */}
                      <div className="jobdetail">
                        <h3> Company Name </h3>
                        {editableId === post._id ? (
                          <Form.Control
                            type="text"
                            className="form-control"
                            value={editedCompanyName}
                            onChange={(e) =>
                              setEditedCompanyName(e.target.value)
                            }
                          />
                        ) : (
                          post.companyName
                        )}
                      </div>

                      {/*  Job Title  */}
                      <div className="jobdetail">
                        <h3> Job Title </h3>
                        {editableId === post._id ? (
                          <Form.Control
                            type="text"
                            className="form-control"
                            value={editedJobTitle}
                            onChange={(e) => setEditedJobTitle(e.target.value)}
                          />
                        ) : (
                          post.jobTitle
                        )}
                      </div>

                      <div className="jobdetail">
                        <h3> Job Description </h3>
                        {editableId === post._id ? (
                          <Form.Control
                            as="textarea"
                            rows={4}
                            className="form-control"
                            value={editedJobDescription}
                            onChange={(e) =>
                              setEditedJobDescription(e.target.value)
                            }
                          />
                        ) : (
                          <div>
                            {post.jobDescription &&
                              post.jobDescription
                                .split(".")
                                .map(
                                  (sentence, index) =>
                                    sentence.trim() && (
                                      <li key={index}>{sentence.trim()}.</li>
                                    )
                                )}
                          </div>
                        )}
                      </div>

                      {/* Job Responsibilities*/}
                      <div className="jobdetail">
                        <h3> Job Responsibilities </h3>
                        {editableId === post._id ? (
                          <Form.Control
                            as="textarea"
                            rows={4}
                            className="form-control"
                            value={editedJobResponsibility}
                            onChange={(e) =>
                              setEditedJobResponsibility(e.target.value)
                            }
                          />
                        ) : (
                          <div>
                            {post.jobResponsibility &&
                              post.jobResponsibility
                                .split(".")
                                .map(
                                  (sentence, index) =>
                                    sentence.trim() && (
                                      <li key={index}>{sentence.trim()}.</li>
                                    )
                                )}
                          </div>
                        )}
                      </div>

                      {/* Job Skills*/}

                      <div className="jobdetail">
                        <h3> Job Skills </h3>
                        {editableId === post._id ? (
                          <Form.Control
                            as="textarea"
                            rows={4}
                            className="form-control"
                            value={editedJobSkills}
                            onChange={(e) => setEditedJobSkills(e.target.value)}
                          />
                        ) : (
                          <div>
                            {post.jobSkills &&
                              post.jobSkills
                                .split(".")
                                .map(
                                  (sentence, index) =>
                                    sentence.trim() && (
                                      <li key={index}>{sentence.trim()}.</li>
                                    )
                                )}
                          </div>
                        )}
                      </div>
                    </div>
                    {/* Job Details End  */}
                  </div>

                  <div className="col-md-4">
                    {
                      /* job summery Content Start  */
                      <div className="editsummery">
                        {/*  Heading Section start  */}
                        <h2 className="text-center"> Edit Job Summery </h2>
                        {/*  Heading Section End  */}

                        {/* Job Summery Content Start  */}
                        {/*  Publish Date  */}
                        <div className="summerycontent">
                          <strong> Publish Date :- </strong>
                          {editableId === post._id ? (
                            <DatePicker
                              showIcon
                              selected={editedDate}
                              isClearable
                              placeholderText="Select the new date"
                              onChange={(date) => setEditedDate(date)}
                            />
                          ) : post.publishDate ? (
                            new Date(post.publishDate).toDateString()
                          ) : (
                            ""
                          )}
                        </div>

                        {/* Vacancy  */}
                        <div className="summerycontent">
                          <strong> vacancy :- </strong>
                          {editableId === post._id ? (
                            <Form.Control
                              type="text"
                              className="form-control"
                              value={editedVacancy}
                              onChange={(e) => setEditedVacancy(e.target.value)}
                            />
                          ) : (
                            post.vacancy
                          )}
                        </div>

                        {/* Salary   */}
                        <div className="summerycontent ">
                          <strong> Salary :- </strong>
                          {editableId === post._id ? (
                            <Form.Control
                              type="text"
                              className="form-control"
                              value={editedSalary}
                              onChange={(e) => setEditedSalary(e.target.value)}
                            />
                          ) : (
                            post.salary
                          )}
                        </div>

                        {/* Location  */}
                        <div className="summerycontent">
                          <strong> Location :- </strong>
                          {editableId === post._id ? (
                            <Form.Control
                              type="text"
                              className="form-control"
                              value={editedLocation}
                              onChange={(e) =>
                                setEditedLocation(e.target.value)
                              }
                            />
                          ) : (
                            post.location
                          )}
                        </div>

                        {/* Job Nature  */}
                        <div className="summerycontent">
                          <strong> Job Nature :- </strong>
                          {editableId === post._id ? (
                            <Form.Control
                              type="text"
                              className="form-control"
                              value={editedJobNature}
                              onChange={(e) =>
                                setEditedJobNature(e.target.value)
                              }
                            />
                          ) : (
                            post.jobNature
                          )}
                        </div>

                        {/*  Close Date  */}
                        <div className="summerycontent">
                          <strong> CloseDate :- </strong>
                          {editableId === post._id ? (
                            <DatePicker
                              showIcon
                              selected={editedCloseDate}
                              isClearable
                              placeholderText="Select the new date"
                              onChange={(date) => setEditedCloseDate(date)}
                            />
                          ) : post.closeDate ? (
                            new Date(post.closeDate).toDateString()
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    }
                  </div>
                  
                  <div>
                    {auth ? (
                      <>
                        {editableId === post._id ? (
                          <button
                            className="savebutton"
                            style={{ fontSize: "1.5rem" }}
                            onClick={() => saveEditedPost(post._id)}
                          >
                            Save
                          </button>
                        ) : (
                          <button
                            className="editbutton"
                            style={{ fontSize: "1.5rem" }}
                            onClick={() => toggleEditable(post._id)}
                          >
                            Edit
                          </button>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}



export default EditJobPost;
