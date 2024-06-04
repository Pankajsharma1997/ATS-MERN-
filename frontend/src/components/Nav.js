import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Nav = () => {
  const auth = localStorage.getItem("user");

  const navigate = useNavigate();
  //  Logout functionality
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  const subscriber = localStorage.getItem("subscriber");

  return (
    <div className="nav-ul">
      {auth ? (
        <ul>
          {/* <li>
            {" "}
            <Link to="/adminAllPosts">ALL Posts </Link>{" "}
          </li>
          <li>
            {" "}
            <Link to="/add-post"> Add Post </Link>{" "}
          </li>
          <li>
            {" "}
            <Link to="/all-applicant"> All Applicants </Link>{" "}
          </li>
          <li>
            <Link to="/admin/applicant-count"> Report </Link>
          </li>
          <li>
            <Link to="/adminchatpage"> Messages </Link>
          </li> */}
          <Link onClick={logout} to="/">
            {" "}
            Logout ({JSON.parse(auth).name}){" "}
          </Link>
        </ul>
      ) : (
        <ul classNameName="nav-right">
          <li>
            {" "}
            <Link to="/"> Home </Link>

          </li>

          {subscriber ? (
            <>
              <Link to="/chatpage"> Messages </Link>
              <Link to="/status"> Application Status </Link>
              <Link onClick={logout} to="/">
                {" "}
                Logout ({JSON.parse(subscriber).name}){" "}
              </Link>
            </>
          ) : (
            <>
              {" "}
              <li>
                {" "}
                <Link to="/loginsubscriber"> Login </Link>{" "}
              </li>
              <li>
                {" "}
                <Link to="/subscribe"> Subscribe Here </Link>{" "}
              </li>
            </>
          )}
        </ul>
      )}
    </div>  
  );
};
export default Nav;
