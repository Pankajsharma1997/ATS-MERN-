import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import "./myStyles.css";

function ApplicationStatus() {
  const [applicationDetails, setApplicationDetails] = useState([]);
  const [editableId, setEditableId] = useState([null]);
  const [editedAvailability, setEditedAvailability] = useState("");
  const [editedCause, setEditedCause] = useState(" ");

  // const [availability, setAvailability] = useState("");
  const subscriberId = JSON.parse(localStorage.getItem("subscriber"))._id;

  useEffect(() => {
    const fetchApplicationDetails = async () => {
      try {
        const response = await axios.get(`/aplicationstatus/${subscriberId}`);
        setApplicationDetails(response.data); // Set application details in state
      } catch (error) {
        console.error("Error fetching application details:", error);
      }
    };

    if (subscriberId) {
      fetchApplicationDetails();
    }
  }, []);

  //  Toggle the specific row in editable form on the basis of id
  const toggleEditable = (id) => {
    const rowData = applicationDetails.find(
      (application) => application._id === id
    );
    if (rowData) {
      setEditableId(id);
      setEditedAvailability(rowData.availability);
      setEditedCause(rowData.cause);
    } else {
      setEditedAvailability(" ");
      setEditedCause("");
    }
  };

 

  // SaveEditedApplication Function to save the edited or modified data
  const saveEditedApplication = (id) => {
    const editedData = {
      availability: editedAvailability,
      cause: editedCause,
    };
    if (!editedAvailability) {
      alert("All fields must be filled out.");
      return;
    }

    axios
      .post(`/updateApplicantAvailablity/${id}`, editedData)
      .then((result) => {
        console.log(result);
        setEditableId(null);
        setEditedAvailability("");
        setEditedCause("");
        // Update local state without reloading the page
        const updatedApplications = applicationDetails.map((application) =>
          application._id === id
            ? { ...application, ...editedData }
            : application
        );
        setApplicationDetails(updatedApplications);
      })
      .catch((err) => console.log(err));
  };

 

  return (
    <>
      <div className="rwtables">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <h2>Application Status</h2>
              <div className="ovflhdn">
                <table>
                  <thead>
                    <tr>
                      <th>Serial Number </th>
                      <th>Applicant Name </th>
                      <th>Job Title</th>
                      <th>Company Name</th>
                      {/* <th>Job Description</th> */}
                      <th>Interview Date</th>
                      <th>Status</th>
                      <th>Availability </th>
                      <th> Cause </th>
                      <th> Action </th>
                    </tr>
                  </thead>
                  <tbody>
                    {applicationDetails && applicationDetails.length > 0 ? (
                      applicationDetails.map((details, index) => (
                        <tr key={details._id}>
                          {" "}
                          {/* Use a unique key for each row */}
                          <td>{index + 1}</td> {/* Serial number */}
                          <td>{details.name}</td>
                          <td>{details.jobTitle}</td>
                          <td>{details.companyName}</td>
                          {/* <td>
                            {details.jobDescription}
                          </td> */}
                          <td>
                            {details.interviewDate
                              ? new Date(details.interviewDate).toDateString()
                              : "Updated Soon"}
                          </td>
                          {/* Check the condition First if the form is accepted then user add availablity  */}
                          {details.status === "Accepted" ? (
                            <>
                              <td className="bg-success text-light">
                                {details.status}
                              </td>

                              <td>
                                {editableId === details._id ? (
                                  <select
                                    value={editedAvailability}
                                    onChange={(e) =>
                                      setEditedAvailability(e.target.value)
                                    }
                                  >
                                    <option value="Yes"> Yes </option>

                                    <option value="No"> No </option>
                                  </select>
                                ) : (
                                  details.availability
                                )}
                              </td>

                              <td>
                                {editableId === details._id ? (
                                  <Form.Control
                                    as="textarea"
                                    className="form-control"
                                    value={editedCause}
                                    onChange={(e) =>
                                      setEditedCause(e.target.value)
                                    }
                                  />
                                ) : (
                                  details.cause
                                )}
                              </td>

                              <td>
                                <div>
                                  {editableId === details._id ? (
                                    <button
                                      className="btn btn-success btn-md m-1"
                                      onClick={() =>
                                        saveEditedApplication(details._id)
                                      }
                                    >
                                      Save
                                    </button>
                                  ) : (
                                    <button
                                      className="btn btn-success btn-md m-1"
                                      onClick={() =>
                                        toggleEditable(details._id)
                                      }
                                    >
                                      Add Availability
                                    </button>
                                  )}
                                </div>
                              </td>
                            </>
                          ) : (
                            <td className="bg-success text-light">
                              {details.status}
                            </td>
                          )}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="10" className="text-center">
                          {" "}
                          <strong> No applications found </strong>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplicationStatus;
