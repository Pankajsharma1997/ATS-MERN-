import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import ReactPaginate from "react-paginate";
import Table from "react-bootstrap/Table";

import addNotification from "react-push-notification";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";


/**
 * 
 * @returns 
 */

        
const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  // const [editableId, setEditableId] = useState(null);
  // const [editedJobTitle, setEditedJobTitle] = useState("");
  // const [editedCompanyName, setEditedCompanyName] = useState("");
  // const [editedJobDescription, setEditedJobDescription] = useState("");
  // const [editedDate, setEditedDate] = useState(new Date());
  // const [editedCloseDate, setEditedCloseDate] = useState(new Date());
  const auth = localStorage.getItem("user");

  
  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = async () => {
    try {
      const response = await axios.get(`/all-posts`);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  /**
   * Toggle the entire row on the basis of the id in editable state
   * @param {*} id
   *
   */
  // const toggleEditable = (id) => {
  //   const rowData = posts.find((post) => post._id === id);
  //   if (rowData) {
  //     setEditableId(id);
  //     setEditedJobTitle(rowData.jobTitle);
  //     setEditedCompanyName(rowData.companyName);

  //     setEditedJobDescription(rowData.jobDescription);
  //     setEditedDate(new Date(rowData.publishDate) || new Date());
  //     setEditedCloseDate(new Date(rowData.closeDate) || new Date());
  //   } else {
  //     setEditableId(null);
  //     setEditedJobTitle("");
  //     setEditedCompanyName("");
  //     setEditedJobDescription("");
  //     setEditedDate(new Date());
  //   }
  // };

  /**
   * @param {*} id
   * @returns
   * saveEditedPost Function for save the edited or modified  data
   */
  // const saveEditedPost = (id) => {
  //   const editedData = {
  //     jobTitle: editedJobTitle,
  //     companyName: editedCompanyName,
  //     jobDescription: editedJobDescription,
  //     publishDate: editedDate,
  //     closeDate: editedCloseDate,
  //   };
  //   if (
  //     !editedJobTitle ||
  //     !editedCompanyName ||
  //     !editedJobDescription ||
  //     !editedDate ||
  //     !editedCloseDate
  //   ) {
  //     alert("All fields must be filled out.");
  //     return;
  //   }

  //   axios
  //     .post("/updatePost/" + id, editedData)
  //     .then((result) => {
  //       console.log(result);
  //       setEditableId(null);
  //       setEditedJobTitle("");
  //       setEditedCompanyName("");
  //       setEditedJobDescription("");
  //       setEditedDate(new Date());
  //       setEditedCloseDate(new Date());
  //       // Update local state without reloading the page
  //       const updatedPosts = posts.map((post) =>
  //         post._id === id ? { ...post, ...editedData } : post
  //       );
  //       setPosts(updatedPosts);
  //     })
  //     .catch((err) => console.log(err));
  // };

 
  /**
   *
   * @param {*} id
   *  deletePost() method is used for delete the post from the Database and also remove from frontend
   */
  const deletePost = (id) => {
    // Ask the user for confirmation before deleting
    const userConfirmed = window.confirm(
      "Are you sure you want to reject this Job Post"
    );

    // If the user clicks 'OK', proceed with deletion
    if (userConfirmed) {
      axios.delete("/deletePost/" + id).then((result) => {
        console.log(result);
        // Update local state without reloading the page
        const updatedPosts = posts.filter((post) => post._id !== id);
        setPosts(updatedPosts);

      /**
       * show the warning message when admin delete the job from the table 
       */
        addNotification({
          title: "Warning",
          subtitle: "You have successfully Delete Job Post",
          message: "The Job post is Remove from job table as well as DB",
          theme: "light",
          closeButton: "X",
          backgroundTop: "sucess",
          backgroundBottom: "yellowgreen",
        });
      });
    }
  };
  
  // Pagination content
  const [pageNumber, setPageNumber] = useState(0);
  const postsPerPage = 5;
  const pagesVisited = pageNumber * postsPerPage;

  const pageCount = Math.ceil(posts.length / postsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <div className="rwtables">
      <div className="row">
        {/*  Sidebar Section Start */}
        <div className="col-lg-2">
          <Sidebar />
        </div>
        {/* Sidebar Section End  */}
        <div className="col-lg-10">
          <h2 className="text-center m-3 p-4"> All Job Posts </h2>
          <div className="ovflhdn">
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th> Job Title </th>
                  <th> Company Name </th>
                  {/* <th> Job Description </th> */}
                  <th> Publish Date</th>
                  <th> Last Date</th>

                  <th>Actions</th>
                </tr>
              </thead>

              {posts.length === 0 ? (
                <tbody>
                  <tr>
                    <td colSpan="6">
                      <h2 className="text-center"> No Record Found </h2>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {posts
                    .slice(pagesVisited, pagesVisited + postsPerPage)
                    .sort(
                      (a, b) =>
                        new Date(b.publishDate) - new Date(a.publishDate)
                    )
                    .map((post) => (
                      <tr key={post._id}>
                        {/* <td>
                          {editableId === post._id ? (
                            <Form.Control
                              type="text"
                              className="form-control"
                              value={editedJobTitle}
                              onChange={(e) =>
                                setEditedJobTitle(e.target.value)
                              }
                            />
                          ) : (
                            post.jobTitle
                          )}
                        </td> */}

                        <td> {post.jobTitle} </td>

                        <td> {post.companyName}</td>

                        <td>
                          {" "}
                          {post.publishDate
                            ? new Date(post.publishDate).toDateString()
                            : ""}
                        </td>

                        <td>
                          {post.closeDate
                            ? new Date(post.closeDate).toDateString()
                            : ""}{" "}
                        </td>

                        {auth ? (
                          <td>
                            <button>
                            
                                <Link to={"/admin/editpost/" + post._id }>
                                   <i className="bi bi-pencil-square padding-right 3"
                                  style={{ fontSize: "1.5rem" }}> </i>
                                </Link>
                            </button>

                            <button>
                              <i
                                className="bi bi-x-lg ms-2"
                                style={{ fontSize: "1.5rem" }}
                                onClick={() => deletePost(post._id)}
                              ></i>
                            </button>
                          </td>
                        ) : (
                          " "
                        )}
                      </tr>
                    ))}
                </tbody>
              )}
            </Table>
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
      </div>
    </div>
  );
};

export default AllPosts;