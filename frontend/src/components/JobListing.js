import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
 import "./myStyles.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { Link,  } from "react-router-dom";
import ReactPaginate from "react-paginate";     // For Add Pagination 
import RangeSlider from "rsuite/RangeSlider";   // For Range slider 
import "rsuite/dist/rsuite.min.css";           // Add styling to the range slider


function JobListing() {
  const [posts, setPosts] = useState([]);
  const [jobNature, setJobNature] = useState("All");
  const [location, setLocation] = useState("All");
  const [jobTitle, setJobTitle] = useState("All");
  const subscriber = localStorage.getItem("subscriber");
   const [sortedPosts, setSortedPosts] = useState([...posts]);

  const [salaryRange, setSalaryRange] = useState([0, 50000]);

  //   Get All Posts from the Posts Table from the Mongo DB data base
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
  //  Pagination content
  const [pageNumber, setPageNumber] = useState(0);
  const postsPerPage = 5;
  const pagesVisited = pageNumber * postsPerPage;

  const pageCount = Math.ceil(posts.length / postsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // Get the Filtered job on the basis of location , nature and job-title
  useEffect(() => {
    getJobLocation();
  }, [location, jobNature, jobTitle]);

  const getJobLocation = async () => {
     
    try {
      const response = await axios.get(
        `/jobs/${location}/${jobNature}/${jobTitle}`
      );

      setSortedPosts(response.data); // Update the items state with the fetched data
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  // Filter the jobs on the basis of the salary range
  const handleSalaryRangeChange = (value) => {
   
    setSalaryRange(value);
    const [minSalary, maxSalary] = value;
    const filtered = posts.filter(
      (post) => post.salary >= minSalary && post.salary <= maxSalary
    );
    setSortedPosts(filtered);
  };
   

// resetFilters set to the fields to its default state 
  const resetFilters = () => {
    setLocation("All");
    setJobNature("All");
    setJobTitle("All");
    setSalaryRange([0, 50000]);
    setSortedPosts([...posts]); // Assuming 'posts' holds the default unfiltered data
  };
  //Function for set the date format  
  function formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("en-US", options);
  }

  return (
    <>
      <div class="bradcam_area bradcam_bg_1">
        <div class="container">
          <div class="row">
            <div class="col-xl-12">
              <div class="bradcam_text">
                <h3>{sortedPosts.length}+ Jobs Available </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="job-listing">
        <div className="container">
          <div className="row">
            {/* Heading Area Start */}
            <div className="col-md-6">
              <div>
                {" "}
                <h3> Filter Area </h3>
              </div>
            </div>

            <div className="col-md-6">
              <div>
                {" "}
                <h4> All Job Lists </h4>{" "}
              </div>
            </div>
          </div>
          {/* Heading Area End  */}
          <div className="row">
            <div className="col-lg-4">
              <div className="filter-area">
                <div className="row">
                  {/* <div class="col-lg-12">
                                        <div className="single_field">
                                            <input type="text" placeholder="Search keyword"/>
                                        </div>
                                    </div> */}

                  {/*  location filter start  */}
                  <div className="col-lg-12">
                    <div className="single_field">
                      <select
                        className="wide"
                        onChange={(e) => setLocation(e.target.value)}
                       
                      >
                        <option value="All">Location</option>
                        <option value="Mohali">Mohali</option>
                        <option value="Delhi"> Delhi </option>
                      </select>
                    </div>
                  </div>
                  {/*  location filter End  */}

                  {/*  Category  filter Start */}
                  <div className="col-lg-12">
                    <div className="single_field">
                      <select
                        className="wide"
                        onChange={(e) => setJobTitle(e.target.value)}
                      >
                        <option data-display="Category">Category</option>
                        <option value="Web Developer"> Web Developer </option>
                        <option value="Web Designer"> Web Designer </option>
                        <option value="Full-Stack-Developer">
                          {" "}
                          Full-Stack-Developer{" "}
                        </option>
                      </select>
                    </div>
                  </div>
                  {/* Category filter End  */}

                  {/*  Job Type Start */}
                  <div className="col-lg-12">
                    <div className="single_field">
                      <select
                        className="wide"
                        onChange={(e) => setJobNature(e.target.value)}
                      >
                        <option value="All"> Job Type </option>
                        <option value="Full-Time"> Full-Time </option>
                        <option value="Part-Time"> Part-Time </option>
                      </select>
                    </div>
                  </div>
                  {/* 
                  <label htmlFor=" Min Salary"> Min Salary </label>
                  <input
                    type="number"
                    placeholder="Min Salary"
                    value={minSalary}
                    onChange={(e) => setMinSalary(e.target.value)}
                    className="m-3"
                  /> */}
                  {/* <label htmlFor=" Max Salary"> Max Salary </label>
                  <input
                    type="number"
                    placeholder="Max Salary"
                    value={maxSalary}
                    onChange={(e) => setMaxSalary(e.target.value)}
                    className="m-3"
                  /> */}

                  {/* <button
                    className="m-3 btn btn-success"
                    type="submit"
                    onClick={handleFilterByPriceRange}
                  >
                    Filter
                  </button> */}

                  <div style={{ width: "50rem", padding: "20px" }}>
                    <h4>Filter by Salary Range</h4>
                    <RangeSlider
                      defaultValue={[0, 50000]}
                      onChange={handleSalaryRangeChange}
                      min={0}
                      max={50000}
                      step={1000}
                    />
                    <p>
                      The salary range is {salaryRange[0]} - {salaryRange[1]}.
                    </p>
                  </div>

                  {/* job Type End  */}
                  <button
                    className="m-3  btn btn-danger"
                    type="reset"
                    onClick={resetFilters}
                  >
                    {" "}
                    Reset{" "}
                  </button>
                </div>
              </div>
            </div>

            {/*  job List Area Start   */}
            <div className="col-lg-8">
              <div className="recent_area">
                {/*  Recent list Area   */}
                <div className="row">
                  <div className="col-md-6">
                    <h4> Job Listing </h4>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex justify-content-end wide">
                      <select
                        className="wide"
                        onChange={(e) => setJobTitle(e.target.value)}
                      >
                        <option value ="All">Most Recent</option>
                        <option value="Full-Stack-Developer">
                          Full-Stack-Developer{" "}
                        </option>
                        <option value="Web Developer">Web Developer </option>
                        <option value="Web Designer"> Web Designer</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Jobs list    */}
              <div className="list_area">
                <div className="row">
                  {sortedPosts.length === 0 ? (
                    <h2> No Record Found </h2>
                  ) : (
                    sortedPosts
                      .slice(pagesVisited, pagesVisited + postsPerPage)
                      .sort(
                        (a, b) =>
                          new Date(b.publishDate) - new Date(a.publishDate)
                      )
                      .map((post, index) => (
                        <div className="list_wrap d-flex" key={post._id}>
                          <div className="col-md-3">
                            <img src="./favicon.ico" alt="job-icon" />
                          </div>

                          <div className="col-md-5">
                            <p>
                              {" "}
                              <strong> {post.jobTitle} </strong>{" "}
                            </p>

                            <div className="d-flex">
                              <div className="me-3">
                                {" "}
                                <span className="m-2">
                                  {" "}
                                  <i class="bi bi-geo-alt"></i>
                                </span>
                                {post.location}
                              </div>
                              <div className="me-3">
                                {" "}
                                <span className="ms-5 me-2">
                                  {" "}
                                  <i className="bi bi-clock"></i>
                                </span>
                                {post.jobNature}
                              </div>{" "}
                            </div>

                            <div className="d-flex mt-3">
                              <div className="me-3">
                                {" "}
                                <span className="m-2">
                                  <i class="bi bi-buildings"></i>{" "}
                                </span>
                                {post.companyName}{" "}
                              </div>
                              <div className="me-3">
                                {" "}
                                <i class="bi bi-currency-rupee"></i>
                                {post.salary}
                              </div>{" "}
                            </div>
                          </div>
                          <div className="col-md-4">
                            {subscriber ? (
                              <>
                                <Link
                                  to={"/job_details/" + post._id}
                                  className="btn btn-primary btn-md ms-1"
                                >
                                Apply Now
                                </Link>

                                {index < 3 && (
                                  <div
                                    className="spinner-grow spinner-grow-sm ms-4 text-success"
                                    role="status"
                                    aria-hidden="true"
                                  >
                                    <span className="ms-4">New</span>
                                  </div>
                                )}
                              </>
                            ) : (
                              <>
                                {" "}
                                <button
                                  disabled={true}
                                  className="btn btn-primary btn-md m-4"
                                >
                                  Apply Now
                                </button>
                                <span>
                                  {" "}
                                  <strong> Note:</strong>Login First{" "}
                                </span>
                              </>
                            )}

                            <div>
                              <p>
                                <strong>Publish Date:</strong>{" "}
                                {formatDate(post.publishDate)}
                              </p>

                              <p>
                                {" "}
                                <strong> Last Date:</strong>{" "}
                                {formatDate(post.closeDate)}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                  )}
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

            {/*  Job list Area End  */}
          </div>
        </div>
      </div>
    </>
  );
}

export default JobListing;
