import React,{useState,useEffect} from 'react'
import axios from "axios";
import Form from "react-bootstrap/Form";
import "./myStyles.css";
import MessagesList from './MessageList';
import Sidebar from './Admin/Sidebar';

function AdminToSubsmsg() {
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");

  const [receiverEmail, setReceiverEmail] = useState("");
  const [message, setMessage] = useState("");

  const senderDetails = JSON.parse(localStorage.getItem("subscriber"));
  // Retrieve admin details from local storage using the 'user' key
  const adminDetails = JSON.parse(localStorage.getItem("user"));

  // Determine which details to use
  const activeDetails =  adminDetails || senderDetails;
  useEffect(() => {
    if (activeDetails) {
      setSenderName(activeDetails.name);
      setSenderEmail(activeDetails.email);
    }
  }, [activeDetails]);

  // Function to handle form submission
  const sendMessage = async () => {
    const senderId = adminDetails ? adminDetails._id : senderDetails._id;
    try {
      const response = await axios.post("/message", {
        senderName,
        senderEmail,
        receiverEmail,
        message,
        senderId,
      });
      console.log(response.data);
      // Clear the message input after sending
      setMessage("");
     
    } catch (error) {
      console.error(error);
    }
  };

  // Ensure ActiveDetails is not null or undefined before trying to access its properties
  if (!activeDetails) {
    return <div>Loading...</div>; // Or some other loading state
  }

  return (
    <>
      <div className="msgcontainer">
        <div className="container">
          <div className="row">
            {adminDetails ? (
              <>
                <div className="col-md-2">
                  <Sidebar />
                </div>

                <div className="col-md-5">
                  <div className="subscfrm">
                    <h1>Messages </h1>

                    <div className="msgfield">
                      <label> Sender Name : </label>
                      <Form.Control type="text" value={senderName} />
                    </div>

                    <div className="msgfield">
                      <label> Sender Name : </label>
                      <Form.Control type="text " value={senderEmail} />
                    </div>

                    <div className="msgfield">
                      <label> Receiver Email </label>
                      <Form.Control
                        type="text"
                        placeholder="Receiver Email"
                        value={receiverEmail}
                        onChange={(e) => setReceiverEmail(e.target.value)}
                      />
                    </div>

                    <div className="text-input-area">
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Type a Message here"
                        // style={{ height: "100px" }}
                        className="text-input"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>

                    <button
                      className="btn btn-success btn-md m-2"
                      onClick={sendMessage}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
                <div className="col-md-5 messages-container">
                  <h1>Message List</h1>
                  <MessagesList email={activeDetails.email} />
                </div>
              </>
            ) : (
              <>
                {" "}
                <div className="col-md-6">
                  <div className="subscfrm">
                    <h1>Messages </h1>

                    <div className="msgfield">
                      <label> Sender Name : </label>
                      <Form.Control type="text" value={senderName} />
                    </div>

                    <div className="msgfield">
                      <label> Sender Name : </label>
                      <Form.Control type="text " value={senderEmail} />
                    </div>

                    <div className="msgfield">
                      <label> Receiver Email </label>
                      <Form.Control
                        type="text"
                        placeholder="Receiver Email"
                        value={receiverEmail}
                        onChange={(e) => setReceiverEmail(e.target.value)}
                      />
                    </div>

                    <div className="text-input-area">
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder="Type a Message here"
                        // style={{ height: "100px" }}
                        className="text-input"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
                    </div>

                    <button
                      className="btn btn-success btn-md m-2"
                      onClick={sendMessage}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
                <div className="col-md-6 messages-container">
                  <h1>Message List</h1>
                  <MessagesList email={activeDetails.email} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminToSubsmsg