import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";


const SignUp = () => {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const navigate = useNavigate();

const handleAdd = async () => {
console.warn(name, email, password);
let result = await fetch("/register", {
method: "post",
body: JSON.stringify({ name, email, password}),
headers: {
"Content-Type": "application/json",
},
});

result = await result.json();
console.warn(result);
if (result) {
navigate('/admin-login'); // Redirect to the login page
}
}

return (
  <>
    <div className="formdatamainsct">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-4 sol-sm-12 col-12"></div>
          <div className="col-lg-4 col-md-4 sol-sm-12 col-12">
            <div className="subscfrm">
              <h1> Admin Register </h1>
              {/* Input box for the Name */}
              <div className="formadatainr">
                <label> Name </label>
                <Form.Control
                  type="text"
                  placeholder="Enter the FullName"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Input box for the email */}
              <div className="formadatainr">
                <label>Email</label>
                <Form.Control
                  type="text"
                  placeholder="Enter the Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

             

              {/* Input box for the password */}
              <div className="formadatainr">
                <label> Password </label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="sbmtbtn">
                <button onClick={handleAdd} className="sbmt">
                  Register
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 sol-sm-12 col-12"></div>
        </div>
      </div>
    </div>
  </>
);
}
export default SignUp;
