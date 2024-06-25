
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate"; 


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

  

  

  // Pagination
  const [pageNumber, setPageNumber] = useState(0);
  const msgPerPage = 5;
  const pagesVisited = pageNumber * msgPerPage;
  const pageCount = Math.ceil(messages.length / msgPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <>
      <div>
        {messages
          .slice(pagesVisited, pagesVisited + msgPerPage)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((message) => (
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
    </>
  );
};

export default MessagesList;
