import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import Table from "react-bootstrap/Table";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../myStyles.css";
import {Link} from "react-router-dom";
import Sidebar from "./Sidebar";
import ReactPaginate from "react-paginate";     // For Add Pagination 

const AllApplications = () => {
  const [applications, setApplications] = useState([]);
 
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


  //Function for set the date format
  function formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  }

  // const deleteApplicant = (id) => {
  //   // Ask the user for confirmation before deleting
  //   const userConfirmed = window.confirm(
  //     "Are you sure you want to reject this application?"
  //   );

  //   // If the user clicks 'OK', proceed with deletion
  //   if (userConfirmed) {
  //     axios
  //       .delete(`/deleteApplicant/` + id)
  //       .then((result) => {
  //         console.log(result);
  //         // Update local state without reloading the page
  //         const updatedApplications = applications.filter(
  //           (application) => application._id !== id
  //         );
  //         setApplications(updatedApplications);
  //         // Show a success message to the user
  //         alert("Application rejected successfully!");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         // Show an error message to the user
  //         alert("Failed to reject application. Please try again.");
  //       });
  //   }
  // };
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
          // Update local state to reflect the soft delete without reloading the page
          const updatedApplications = applications.map((application) =>
            application._id === id
              ? { ...application, isDeleted: true }
              : application
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
          <div className="col-lg-9 col-md-9 col-sm-10 col-10">
            <h1 className="text-center"> All Applicant List </h1>
            <div className="ovflhdn">
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th> S.No.</th>
                    <th> Applicant Name </th>
                    <th> Appllied Job Tilte </th>
                    <th> Company Name </th>
                    <th> Status </th>
                    <th> Interview Date </th>
                    <th> User Availability </th>

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
                          {/*  Serial Number  */}
                          <td> {index + 1} </td>
                          <td> {application.name} </td> {/* Applicant  Name  */}
                          <td> {application.jobTitle} </td> {/*  jobTitle  */}
                          <td> {application.companyName} </td>{" "}
                          {/*  Applied for Company */}
                          <td> {application.status}</td>{" "}
                          {/*  Application Status Pending or Accpted   */}
                          {/*  Interview Date  Start */}
                          <td>
                            {application.interviewDate
                              ? formatDate(application.interviewDate)
                              : "Pending"}
                          </td>
                          {/*  Interview Date  End */}
                          {/* User Availability  */}
                          <td>
                            {" "}
                            {application.availability
                              ? application.availability
                              : "Yet Not Updated"}
                          </td>
                          {/* Edit and Delete button  */}
                          <td>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-around",
                              }}
                            >
                              <button>
                                <Link
                                  to={"/aplicant-detail/" + application._id}
                                >
                                  <i
                                    className="bi bi-pencil-square padding-right 3"
                                    style={{ fontSize: "1.5rem" }}
                                  ></i>
                                </Link>
                              </button>

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
