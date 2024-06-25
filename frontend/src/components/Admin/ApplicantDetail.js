import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import addNotification from "react-push-notification";
import Sidebar from "./Sidebar";
import "./AdminPartCSS/Applicant_deatail&Report.css"

function ApplicantDetail() {
  const { id } = useParams();
  const [applicant, setApplicant] = useState({});
  const [editableId, setEditableId] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");
  const [editedInterviewDate, setEditedInterviewDate] = useState(new Date());
  const auth = localStorage.getItem("user");

  useEffect(() => {
    getApplicantDetail();
  }, [id]);

  const getApplicantDetail = async () => {
    try {
      const response = await axios.get(`/editApplicant/${id}`);
      setApplicant(response.data); // Assuming the response is a single Applicant  object
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };
  const toggleEditable = (id) => {
    if (applicant && applicant._id === id) {
      setEditableId(id);
      setEditedStatus(applicant.status);
      setEditedInterviewDate("" || applicant.interviewDate);
    } else {
      setEditedInterviewDate(new Date());
      setEditedStatus("");
    }
  };
  const saveEditedApplicant = (id) => {
    const editedData = {
      interviewDate: editedInterviewDate,
      status: editedStatus,
    };
    // if (!editedInterviewDate) {
    //   alert("All fields must be filled out.");
    //   return;
    // }

    axios
      .post("/updateApplication/" + id, editedData)
      .then((result) => {
        console.log(result);
        setEditableId(null);
        setEditedStatus(" ");
        setEditedInterviewDate(new Date());

        addNotification({
          title: "Success",
          subtitle:
            "You have successfully schedule the Interview date and Status",
          theme: "light",
          closeButton: "X",
          backgroundTop: "green",
          colorTop: "white",
          backgroundBottom: "lightgray",
        });

        // update the page without reloading the page
        if (applicant._id === id) {
          setApplicant({ ...applicant, ...editedData });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="applicant_detail_area">
        <div className="row">
          <div className="col-lg-2">
            <Sidebar />
          </div>

          <div className="col-lg-10">
            <div className="headsection">
              <Link
                to="/all-applicant"
                className="backbutton"
                style={{ fontSize: "1.5rem" }}
              >
                {" "}
                Back{" "}
              </Link>{" "}
              <h3 className="text-center"> Applicant Detail </h3>
            </div>

            {/*  Applicant Detail  */}
            <div className="row">
              <div className="col-md-6 applicantDetail">
                <h2> Applicant Detail </h2>
                <div className="detailpart profile-img-wrapper">
                  <h3>{applicant.name} </h3>
                  <img src={applicant.pic} alt="image" />
                </div>

                <div className="detailpart">
                  <h3>  Email </h3>
                  <p> {applicant.email}</p>
                </div>

                <div className="detailpart">
                  <h3> Applied For  </h3>
                  <p> {applicant.jobTitle}</p>
                </div>

                <div className="detailpart">
                  <h3> Company Name </h3>
                  <p> {applicant.companyName}</p>
                </div>

                <div className="detailpart">
                  <h3> Resume Detail </h3>
                  <Link
                    to={`http://localhost:5000/files/${applicant.resume}`}
                    target="_blank"
                  >
                    {applicant.resume}
                  </Link>
                </div>
              </div>

              <div className="col-md-4 editDetail">
                <h2> Status Detail </h2>

                <div className="detailpart">
                  <h3> Job Status </h3>
                  <p>
                    {" "}
                    {editableId === applicant._id ? (
                      <select
                        value={editedStatus}
                        onChange={(e) => setEditedStatus(e.target.value)}
                      >
                        <option value="Pending"> Pending </option>

                        <option value="Accepted"> Accepted </option>
                      </select>
                    ) : (
                      applicant.status
                    )}
                  </p>
                </div>
                <div className="detailpart">
                  <h3> Interview Date </h3>
                  <p>
                    {" "}
                    {editableId === applicant._id ? (
                      <DatePicker
                        showIcon
                        selected={editedInterviewDate}
                        isClearable
                        placeholderText="Select the new date"
                        onChange={(date) => setEditedInterviewDate(date)}
                      ></DatePicker>
                    ) : applicant.interviewDate ? (
                      new Date(applicant.interviewDate).toDateString()
                    ) : (
                      "Pending "
                    )}
                  </p>
                </div>

                <div className="detailpart">
                  <h3> User Availability </h3>
                  <p>
                    {" "}
                    {applicant.availability
                      ? applicant.availability
                      : "Yet Not Updated"}
                  </p>
                </div>

                <div className="detailpart">
                  <h3> Cause </h3>
                  <p>{applicant.cause ? applicant.cause : "No Cause"} </p>
                </div>
              </div>

              <div>
                {auth ? (
                  <>
                    {editableId === applicant._id ? (
                      <button
                        className="savebutton"
                        style={{ fontSize: "1.5rem" }}
                        onClick={() => saveEditedApplicant(applicant._id)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="editbutton"
                        style={{ fontSize: "1.5rem" }}
                        onClick={() => toggleEditable(applicant._id)}
                      >
                        Edit
                      </button>
                    )}
                  </>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplicantDetail;
