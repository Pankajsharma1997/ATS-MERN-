import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import axios from "axios";


// import "react-datepicker/dist/react-datepicker.css";

import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./myStyles.css";



    
const Home = () => {
  const [posts, setPosts] = useState([]);
  const subscriber = localStorage.getItem('subscriber');

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const response = await axios.get("/all-posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  return (
    <>
      <div className="main-page">
        <div className="banner">
          <img src="./1.png" alt="Descriptive Text" />
        </div>

        <div className="display-jobs">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-heading">
                  <h2> Jobs Listing </h2>
                </div>
              </div>
            </div>

            <div className="card-section">
              <div className="row">
                {" "}
                {/* Ensure this row wraps the col-md-4 elements */}
                {posts.length === 0 ? (
                  <h2> No Record Found </h2>
                ) : (
                  
                  posts.slice(0, 3).map((post, index) => (
                    <div className="col-md-4" key={index}>
                      {" "}
                      {/* Wrap each card in a col-md-4 */}
                      <Card className="text-center" style={{ width: "25rem" }}>
                        <Card.Header>Company: {post.companyName}</Card.Header>
                        <Card.Body>
                          <Card.Title>{post.jobTitle}</Card.Title>
                          <Card.Text className="truncate-text">
                            {post.jobDescription}
                          </Card.Text>
                          {subscriber ? (
                            <>
                              <Link
                                to={"/job_details/" + post._id}
                                className="btn btn-primary btn-md ms-4"
                              >
                                Apply Now
                              </Link>
                            </>
                          ) : (
                            <Link
                              to={`/loginsubscriber`}
                              className="btn btn-primary btn-sm"
                            >
                              Login First
                            </Link>
                          )}
                        </Card.Body>
                        <Card.Footer className="text-muted">
                          Last Date: {new Date(post.closeDate).toDateString()}
                        </Card.Footer>
                      </Card>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="row">
              <div className="read-more">
                {/* <button className="aplybtn"> All Jobs </button> */}
                <Link to={"/joblisting"} className="aplybtn">
                  {" "}
                  All Jobs{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/*  job section end  */}

        {/*  */}
        <div className="whole-wrap">
          <div className="container box_1170">
            <div className="section-top-border">
              <h3 className="mb-30">About ATS </h3>
              <div className="row">
                <div className="col-md-3">
                  <img src="./postingbaner.jpg" alt="" className="img-fluid" />
                </div>

                <div className="col-md-9 mt-sm-20">
                  <p>
                    Recently, the US Federal government banned online casinos
                    from operating in America by making it illegal to transfer
                    money to them through any US bank or payment system. As a
                    result of this law, most of the popular online casino
                    networks such as Party Gaming and PlayTech left the United
                    States. Overnight, online casino players found themselves
                    being chased by the Federal government. But, after a
                    fortnight, the online casino industry came up with a
                    solution and new online casinos started taking root. These
                    began to operate under a different business umbrella, and by
                    doing that, rendered the transfer of money to and from them
                    legal. A major part of this was enlisting electronic banking
                    systems that would accept this new clarification and start
                    doing business with me. Listed in this article are the
                    electronic banking systems that accept players from the
                    United States that wish to play in online casinos.
                  </p>
                </div>
              </div>
            </div>

            <div className="section-top-border">
              <h3 className="mb-30">Definition</h3>
              <div className="row">
                <div className="col-md-4">
                  <div className="single-defination">
                    <h4 className="mb-20">Definition 01</h4>
                    <p>
                      Recently, the US Federal government banned online casinos
                      from operating in America by making it illegal to transfer
                      money to them through any US bank or payment system. As a
                      result of this law, most of the popular online casino
                      networks
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="single-defination">
                    <h4 className="mb-20">Definition 02</h4>
                    <p>
                      Recently, the US Federal government banned online casinos
                      from operating in America by making it illegal to transfer
                      money to them through any US bank or payment system. As a
                      result of this law, most of the popular online casino
                      networks
                    </p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="single-defination">
                    <h4 className="mb-20">Definition 03</h4>
                    <p>
                      Recently, the US Federal government banned online casinos
                      from operating in America by making it illegal to transfer
                      money to them through any US bank or payment system. As a
                      result of this law, most of the popular online casino
                      networks
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="section-top-border">
              <h3 className="mb-30">Block Quotes</h3>
              <div className="row">
                <div className="col-lg-12">
                  <blockquote class="generic-blockquote">
                    “Recently, the US Federal government banned online casinos
                    from operating in America by making it illegal to transfer
                    money to them through any US bank or payment system. As a
                    result of this law, most of the popular online casino
                    networks such as Party Gaming and PlayTech left the United
                    States. Overnight, online casino players found themselves
                    being chased by the Federal government. But, after a
                    fortnight, the online casino industry came up with a
                    solution and new online casinos started taking root. These
                    began to operate under a different business umbrella, and by
                    doing that, rendered the transfer of money to and from them
                    legal. A major part of this was enlisting electronic banking
                    systems that would accept this new clarification and start
                    doing business with me. Listed in this article are the
                    electronic banking”
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
   
}

export default Home