import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap styling 
import { Link } from "react-router-dom";

const Footer = ()=> {
    const auth = localStorage.getItem("user");
     const subscriber = localStorage.getItem("subscriber");
    
    return (
      <>
        <div className="footer">
          {auth ? (
            <h5> &#169; 2024 Matrix infologics Ltd.|| All Rights Reserved </h5>
          ) : (
            <>
              <div className="row ftstyle">
                <div className="col-md-6">
                  <ul>
                    <li>
                      <Link to={"/"}>
                        {" "}
                        <p> Home </p>{" "}
                      </Link>
                    </li>
                    <li>
                      {" "}
                      <p>About Us </p>
                    </li>
                    
                    {subscriber ? (
                      <>
                        <Link to={"/status"}>
                          {" "}
                          <p> ApplicationStatus </p>{" "}
                        </Link>
                        <li>
                          <Link to={"/chatpage"}>
                            {" "}
                            <p> Messages </p>
                          </Link>
                        </li>
                      </>
                    ) : (
                      " "
                    )}
                  </ul>
                </div>
              

                <div className="col-md-6">
                  <ul>
                    <li>
                      <Link to={"/joblisting"}>
                        {" "}
                        <p>All Jobs </p>
                      </Link>
                    </li>
                    
                  </ul>
                </div>
                <h5>
                  {" "}
                  &#169; 2024 Matrix infologics Ltd.|| All Rights Reserved{" "}
                </h5>
              </div>
            </>
          )}
        </div>
      </>
    );
} 

 export default Footer;
