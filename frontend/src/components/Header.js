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
          <Link onClick={logout} to="/">
            {" "}
            Logout ({JSON.parse(auth).name}){" "}
          </Link>
        </ul>
      ) : (
        <ul>
          <li>
            {" "}
            <Link to="/"> Home </Link>
          </li>

          {subscriber ? (
            <>
              {/*  User can access these links after login  */}
              <li>
                {" "}
                <Link to="/chatpage"> Messages </Link>{" "}
              </li>
              <li>
                <Link to="/status"> Application Status </Link>{" "}
              </li>
              <li>
                {" "}
                <Link onClick={logout} to="/">
                  {" "}
                  Logout ({JSON.parse(subscriber).name})
                </Link>{" "}
              </li>
            </>
          ) : (
            <>
              {/* User can access these links without login  */}{" "}
              <li>
                {" "}
                <Link to="/loginsubscriber" className="nav-ul">
                  {" "}
                  Login{" "}
                </Link>{" "}
              </li>
              <li>
                {" "}
                <Link to="/subscribe"> Sign up </Link>{" "}
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
};
export default Nav;
