import React, { useState, useEffect } from "react";
import axios from "axios";
const MessagesList = ({ email }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Make sure the URL matches your backend server's URL
        const response = await axios.get(`/messages?email=${email}`);
         setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (email) {
      fetchMessages();
    }
  }, [email]);

  return (
    <>
      <div>
        {messages.map((message) => (
          <div key={message._id}>
            <div className="other-message-container">
              <div className="conversation-container">
                <p className="con-icon"> {message.senderName[0]} </p>
                <div className="other-text-content">
                  <div className="contitletxt">
                    <div className="contitxtinr">
                      <p>
                        {" "}
                        <strong>From:</strong> {message.senderName}{" "}
                      </p>
                    </div>
                    
                    <div className="contitxtinr">
                      <p>
                        <strong>To:</strong> {message.receiverEmail}
                      </p>
                    </div>
                  </div>
                  <div className="mesgtxtsct">
                    <p>
                      {" "}
                      <strong>Message:</strong> {message.message}{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MessagesList;
