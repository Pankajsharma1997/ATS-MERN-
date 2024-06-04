import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Table from "react-bootstrap/Table";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../myStyles.css";
import {Link} from "react-router-dom";
import Sidebar from "./Sidebar";

import ReactPaginate from "react-paginate";     // For Add Pagination 

const AllApplications = () => {
  const [applications, setApplications] = useState([]);
  const [editableId, setEditableId] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");
  const [editedInterviewDate, setEditedInterviewDate] = useState(new Date());

  useEffect(() => {
    getApplications();
  }, []);

  const getApplications = async () => {
    try {
      const result = await axios.get("/all-applications");
      setApplications(result.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  //  Toggle the specific row in editable form on the basis of id
  const toggleEditable = (id) => {
    const rowData = applications.find((application) => application._id === id);
    if (rowData) {
      setEditableId(id);
      setEditedInterviewDate("" || new Date());
      setEditedStatus(rowData.status);
    } else {
      setEditedInterviewDate(new Date());
      setEditedStatus("");
    }
  };

  // SaveEditedApplication Function for save the edited or modified  data
  const saveEditedApplication = (id) => {
    const editedData = {
      interviewDate: editedInterviewDate,
      status: editedStatus,
    };
    if (!editedStatus) {
      alert("All fields must be filled out.");
      return;
    }

    axios
      .post("/updateApplication/" + id, editedData)
      .then((result) => {
        console.log(result);
        setEditableId(null);
        setEditedInterviewDate(new Date());
        setEditedStatus("");
        // Update local state without reloading the page
        const updatedApplications = applications.map((application) =>
          application._id === id
            ? { ...application, ...editedData }
            : application
        );
        setApplications(updatedApplications);
      })
      .catch((err) => console.log(err));
  };

  const deleteApplicant = (id) => {
    // Ask the user for confirmation before deleting
    const userConfirmed = window.confirm(
      "Are you sure you want to reject this application?"
    );

    // If the user clicks 'OK', proceed with deletion
    if (userConfirmed) {
      axios
        .delete(`/deleteApplicant/` + id)
        .then((result) => {
          console.log(result);
          // Update local state without reloading the page
          const updatedApplications = applications.filter(
            (application) => application._id !== id
          );
          setApplications(updatedApplications);
          // Show a success message to the user
          alert("Application rejected successfully!");
        })
        .catch((err) => {
          console.log(err);
          // Show an error message to the user
          alert("Failed to reject application. Please try again.");
        });
    }
  };
  //  Pagination content
  const [pageNumber, setPageNumber] = useState(0);
  const postsPerPage = 10;
  const pagesVisited = pageNumber * postsPerPage;

  const pageCount = Math.ceil(applications.length / postsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <div className="rwtables">
        <div className="row">
          <div className="col-lg-2">
            <Sidebar />
          </div>
          <div className="col-lg-10 col-md-10 col-sm-10 col-10">
            <h1> All Applicant List </h1>
            <div className="ovflhdn">
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th> S.No.</th>
                    <th> Applicant Name </th>
                    <th> Applicant Email </th>
                    <th> Appllied Job Tilte </th>
                    <th> Company Name </th>
                    <th> Resume Detail </th>
                    <th> Status </th>
                    <th> Interview Date </th>
                    <th> User Availability </th>
                    <th> Cause </th>
                    <th> Action </th>
                  </tr>
                </thead>
                {applications.length === 0 ? (
                  <tbody>
                    <tr>
                      <td colSpan="8">
                        <h2> No Record Found </h2>
                      </td>
                    </tr>
                  </tbody>
                ) : (
                  <tbody>
                    {applications
                      .slice(pagesVisited, pagesVisited + postsPerPage)
                      .map((application, index) => (
                        <tr key={application._id}>
                          <td> {index + 1} </td>
                          <td> {application.name} </td>
                          <td> {application.email} </td>
                          <td> {application.jobTitle} </td>
                          <td> {application.companyName} </td>

                          <td>
                            <Link
                              to={`http://localhost:5000/files/${application.resume}`}
                              target="_blank"
                            >
                              {application.resume}
                            </Link>
                          </td>

                          {/*  Set the User Application Status Accept or Reject  */}
                          <td>
                            {editableId === application._id ? (
                              <select
                                value={editedStatus}
                                onChange={(e) =>
                                  setEditedStatus(e.target.value)
                                }
                              >
                                <option value="Pending"> Pending </option>

                                <option value="Accepted"> Accepted </option>
                              </select>
                            ) : (
                              application.status
                            )}
                          </td>

                          {/* Schedule the new Interview Date  */}
                          <td>
                            {editableId === application._id ? (
                              <DatePicker
                                showIcon
                                selected={editedInterviewDate}
                                isClearable
                                placeholderText="Select the new date"
                                onChange={(date) =>
                                  setEditedInterviewDate(date)
                                }
                              />
                            ) : application.interviewDate ? (
                              new Date(application.interviewDate).toDateString()
                            ) : (
                              "Pending"
                            )}
                          </td>

                          {/* User Availability  */}
                          <td>
                            {" "}
                            {application.availability
                              ? application.availability
                              : "Yet Not Updated"}
                          </td>

                          {/*  User Cause */}
                          <td>
                            {application.cause ? application.cause : "No Cause"}
                          </td>

                          <td>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-around",
                              }}
                            >
                              {editableId === application._id ? (
                                <button
                                  className="btn btn-success btn-sm me-2"
                                  onClick={() =>
                                    saveEditedApplication(application._id)
                                  }
                                >
                                  Save
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    toggleEditable(application._id)
                                  }
                                >
                                  <i
                                    className="bi bi-pencil-square"
                                    style={{ fontSize: "1.5rem" }}
                                  ></i>
                                </button>
                              )}
                              <button
                                onClick={() => deleteApplicant(application._id)}
                              >
                                <i
                                  className="bi bi-x-lg ms-2"
                                  style={{ fontSize: "1rem" }}
                                ></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                )}
              </Table>
            </div>
          </div>
        </div>
        {/* Pagination */}
        <div className="list_area">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"pagination"}
            previousLinkClassName={"pagination__link"}
            nextLinkClassName={"pagination__link"}
            disabledClassName={"pagination__link--disabled"}
            activeClassName={"pagination__link--active"}
          />
        </div>
      </div>
    </>
  );
};

export default AllApplications;
