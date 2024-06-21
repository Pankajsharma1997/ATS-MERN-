import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import { useParams, Link } from "react-router-dom";
import addNotification from "react-push-notification";
import UserProfile from "../Profile/UserProfile";

function EditApplicationStatus() {
  const { id } = useParams();
  const [application, setApplication] = useState({});
  const [editableId, setEditableId] = useState(null);
  const [editedAvailability, setEditedAvailability] = useState("");
  const [editedCause, setEditedCause] = useState("");

  useEffect(() => {
    const editApplication = async () => {
      try {
        const response = await axios.get(`/editApplication/${id}`);
        setApplication(response.data); // Assuming the response is a single Appliation  object
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    editApplication();
  }, [id]);

  const toggleEditable = (id) => {
    if (application && application._id === id) {
      setEditableId(id);
      setEditedAvailability(application.availability);
      setEditedCause(application.cause);
    } else {
      setEditableId(null);
      setEditedAvailability("");
      setEditedCause("");
    }
  };

  const saveEditedApplication = (id) => {
    const editedData = {
      availability: editedAvailability,
      cause: editedCause,
    };
    // Directly check if the editedAvailability and editedCause are empty
    if (!editedAvailability.trim() || !editedCause) {
      alert("All fields must be filled out.");
      return; // Exit the function if any field is empty
    }

    axios
      .post(`/updateApplicantAvailablity/${id}`, editedData)
      .then((result) => {
        console.log(result);
        setEditableId(null);
        setEditedAvailability("");
        setEditedCause("");

        addNotification({
          title: "Success",
          subtitle: "You Application Edit Sucessfully",
          theme: "light",
          closeButton: "X",
          backgroundTop: "green",
          colorTop: "white",
          backgroundBottom: "lightgray",
        });

        // update the data without Page loading
        if (application._id === id) {
          setApplication({ ...application, ...editedData });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="edit_application">
        <div className="row">
          <div className="section-heading">
            <Link
              to="/status"
              className="backbutton"
              style={{ fontSize: "1.5rem" }}
            >
              {" "}
              Back{" "}
            </Link>{" "}
            <h3 className="text-center"> Add Availability </h3>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <UserProfile />
          </div>

          <div className="col-md-6">
            <h3> Application Detail </h3>

            <div className="application_detail">
              <h5> Applicant Name </h5>
              <p> {application.name} </p>
            </div>

            <div className="application_detail">
              <h5> Job Title</h5>
              <p> {application.jobTitle} </p>
            </div>

            {/*  Applied for company  */}
            <div className="application_detail">
              <h5> Company Name </h5>
              <p> {application.companyName} </p>
            </div>

            {/*  Job Description  */}
            <div>
              <h5> Job Description </h5>
              <p> {application.jobDescription} </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="Staus">
              <h3> Status Detail </h3>

              <div className="application_detail">
                <h5> Status </h5>
                <p> {application.status} </p>
              </div>

              <div className="application_detail">
                <h5>Interview Date</h5>
                <p>
                  {" "}
                  {application.interviewDate
                    ? new Date(application.interviewDate).toDateString()
                    : "update soon"}{" "}
                </p>
              </div>

              <div className="application_detail">
                <h5> Add Availability </h5>
                <p>
                  {editableId === application._id ? (
                    <select
                      value={editedAvailability}
                      onChange={(e) => setEditedAvailability(e.target.value)}
                    >
                      <option> </option>
                      <option value="Yes"> Yes </option>
                      <option value="No"> No </option>
                    </select>
                  ) : (
                    application.availability
                  )}
                </p>
              </div>

              <div className="application_detail">
                <h5> Add Cause </h5>
                <p>
                  {" "}
                  {editableId === application._id ? (
                    <Form.Control
                      as="textarea"
                      row={2}
                      className="form-control"
                      value={editedCause}
                      onChange={(e) => setEditedCause(e.target.value)}
                    />
                  ) : (
                    application.cause
                  )}
                </p>
              </div>

              <div>
                {editableId === application._id ? (
                  <button
                    className="add_availability_save"
                    onClick={() => saveEditedApplication(application._id)}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="add_availability"
                    onClick={() => toggleEditable(application._id)}
                  >
                    Add Availability
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditApplicationStatus;
