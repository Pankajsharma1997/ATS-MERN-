import {React,useEffect,useState} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate() ;

    useEffect( ()=> {
    const auth = localStorage.getItem('user');
    if(auth){
        navigate('/adminAllPosts');
    }
    },[])

    const handleLogin= async () => {
            console.warn(email,password)
            let result = await fetch('/login',{
                method:'POST',
                body: JSON.stringify({email,password}),
                headers:{
                    "Content-Type": "application/json",
                },
            });
            result = await result.json();
            console.warn(result);
            if(result.name){
                localStorage.setItem("user",JSON.stringify(result));
                navigate("/adminAllPosts");

            }else{
                alert("Please Enter Correct Details")
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
                    <h1> Admin Login  </h1>

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
                      <button onClick={handleLogin} className="sbmt">
                        Login 
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
export default AdminLogin;
