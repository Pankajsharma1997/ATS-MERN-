import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import "../CSS/Profile.css";
import { Link, useNavigate } from "react-router-dom";
import UserProfile from "../Profile/UserProfile";

function ApplicationStatus() {
  const [applicationDetails, setApplicationDetails] = useState([]);
  const [subscriberDetails, setSubscriberDetails] = useState("");

  const subscriberId = JSON.parse(localStorage.getItem("subscriber"))._id;

  const navigate = useNavigate();
  //  Logout functionality
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

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
      <div className="profile">
        <div className="row">
          <div className="col-md-12">
            <div className="section-heading">
              <Link
                to="/"
                className="backbutton"
                style={{ fontSize: "1.5rem" }}
              >
                {" "}
                Back{" "}
              </Link>{" "}
              <h2> Application Status</h2>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <UserProfile />
          </div>

          <div className="col-md-8">
            <div className="application_detail">
              <h2 className="text-center"> Applications </h2>
              <Table responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>Serial Number </th>
                    <th>Applicant Name </th>
                    <th>Job Title</th>
                    <th>Company Name</th>
                    <th>Interview Date</th>
                    <th>Status</th>
                    <th> Add Availability </th>
                  </tr>
                </thead>
                <tbody>
                  {applicationDetails && applicationDetails.length > 0 ? (
                    applicationDetails.map((details, index) => (
                      <tr key={details._id}>
                        {/* Use a unique key for each row */}
                        <td>{index + 1}</td> {/* Serial number */}
                        <td>{details.name}</td>
                        <td>{details.jobTitle}</td>
                        <td>{details.companyName}</td>
                        <td>
                          {" "}
                          {details.interviewDate
                            ? new Date(details.interviewDate).toDateString()
                            : "Updated Soon"}{" "}
                        </td>
                        <td> {details.status} </td>
                        {details.status === "Accepted" ? (
                          <button>
                            {" "}
                            <Link
                              to={"/editstatus/" + details._id}
                              type="button"
                              className="btn btn-outline-success text-decoration-none"
                            >
                              {" "}
                              Edit{" "}
                            </Link>
                          </button>
                        ) : (
                          ""
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
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplicationStatus;
