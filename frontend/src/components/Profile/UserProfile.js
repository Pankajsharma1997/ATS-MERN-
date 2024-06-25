import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/Profile.css";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const [subscriberDetails, setSubscriberDetails] = useState("");

    const navigate = useNavigate();
    //  Logout functionality
    const logout = () => {
      localStorage.clear();
      navigate("/");
    };

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
              <div className="personal_detail">
                <h2> Profile </h2>
                <div className="profile-img-wrapper">
                  <h3> {subscriberDetails.name} </h3>
                  <img src={subscriberDetails.pic} alt="image" />
                </div>
                {/*   */}
                <div className="profile_detail">
                  <h3> Email </h3>
                  <p> {subscriberDetails.email} </p>
                </div>

                <div className="profile_detail">
                  <h3> Mobile </h3>
                  <p> {subscriberDetails.mobile} </p>
                </div>

                <div className="profile_detail">
                  <h3>
                    {" "}
                    <Link onClick={logout} to="/">
                      {" "}
                      Logout{" "}
                    </Link>{" "}
                  </h3>
                </div>
              </div>
    </>
  );
  
}

export default Profile;
