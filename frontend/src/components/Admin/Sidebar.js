import React from 'react'
import "./style.css";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div>
      <div className="sidebar">
        <h5> Welcome Admin </h5>
        <div className="menu">
          {" "}
          {/* <h3> All Posts </h3> */}
          <i class="bi bi-file-earmark-bar-graph m-2"></i>
          <Link to="/adminAllPosts" className="link">
            ALL Posts{" "}
          </Link>{" "}
        </div>

        <div className="menu">
          <i class="bi bi-plus-square-dotted  m-2 "></i>
          <Link to="/add-post" className="link">
            {" "}
            Add Post{" "}
          </Link>{" "}
        </div>

        <div className="menu">
          <i class="bi bi-person-lines-fill m-2"></i>
          <Link to="/all-applicant" className="link">
            {" "}
            All Applicants{" "}
          </Link>{" "}
        </div>

        <div className="menu">
          <i class="bi bi-file-pdf-fill m-2"></i>
          <Link to="/admin/applicant-count" className="link">
            {" "}
            Report{" "}
          </Link>
        </div>

        <div className="menu">
          <i class="bi bi-chat-square-dots  m-2"></i>{" "}
          <Link to="/adminchatpage" className="link">
            {" "}
            Messages{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar