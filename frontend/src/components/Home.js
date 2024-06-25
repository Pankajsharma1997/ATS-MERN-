import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./myStyles.css";
import Carousel from "react-bootstrap/Carousel";


  
const Home = () => {
  const [posts, setPosts] = useState([]);
  const subscriber = localStorage.getItem('subscriber');

//  Function for get all post from the db 
  const getPosts = async () => {
    try {
      const response = await axios.get("/all-posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
   useEffect(() => {
     getPosts();
   }, []);

  return (
    <>
      <div className="main-page">
        {/* <div className="banner">
          <img src="./banner2.jpg" alt="Descriptive Text" />
        </div> */}
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="./bradcam.png"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="./bradcam.png"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="./bradcam.png"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <div className="display-jobs">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="section-heading">
                  <h2> Jobs Listing </h2>
                </div>
              </div>
            </div>

            {/* Card Section  to show  the jobs */}
            <div className="card-section">
              <div className="row">
                {posts.length === 0 ? (
                  <h2> No Record Found </h2>
                ) : (
                  posts.slice(0, 3).map((post, index) => (
                    <div className="col-md-4" key={index}>
                      {" "}
                      {/* Wrap each card in a col-md-4 */}
                      <Card className="text-center" style={{ width: "23rem" }}>
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

            {/*  Button for Explore  all jobs  list  */}
            <div className="row">
              <div className="read-more">
                <Link to={"/joblisting"} className="aplybtn">
                  {" "}
                  All Jobs{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/*  job section end  */}

        {/*About Section */}
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
                  <blockquote className="generic-blockquote">
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