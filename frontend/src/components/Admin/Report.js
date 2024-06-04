import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Sidebar from "./Sidebar";

const Report = () => {
  const [items, setItems] = useState([]);
  const [companyName, setCompanyName] = useState("All");

  useEffect(() => {
    // This function will fetch items based on the selected company name
    const fetchItems = async () => {
      try {
        const response = await axios.get(`/applicants/${companyName}`);
        setItems(response.data); // Update the items state with the fetched data
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems(); // Call the fetchItems function
  }, [companyName]); // This effect should run whenever companyName changes

  return (
    <div className="report">
        <div className="row">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="container col-md-10 mt-5 mb-4 bg-light text-dark">
            <Table responsive striped bordered hover>
              <thead>
                <tr>
                  <th> Serial Number </th>
                  {}
                  <th>
                    {" "}
                    Select Company{" "}
                    <select onChange={(e) => setCompanyName(e.target.value)}>
                      <option value="All">All</option>
                      {/* Map through your companies here */}
                      <option value="Experts Solutions">
                        Experts Solutions
                      </option>
                      <option value="Matrix Infologics">
                        Matrix Infologics
                      </option>
                    </select>{" "}
                  </th>
                  {/* <th> Company Name </th> */}
                  <th> Applicant Name </th>
                  <th> Profile </th>
                  <th> status </th>
                </tr>
              </thead>
              <tbody>
                <>
                  {items.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1} </td>
                      <td> {item.companyName} </td>
                      <td> {item.name} </td>
                      <td> {item.jobTitle} </td>
                      <td colSpan={2}> {item.status} </td>
                    </tr>
                  ))}
                  <tr>
                    {" "}
                    <td colSpan={2}>Total Applicants: {items.length} </td>
                    <td> </td>
                    <td>
                      <li>
                        Developer:{" "}
                        {
                          items.filter(
                            (applicant) =>
                              applicant.jobTitle === "Web Developer"
                          ).length
                        }{" "}
                      </li>
                      <li>
                        {" "}
                        Designer:{" "}
                        {
                          items.filter(
                            (applicant) => applicant.jobTitle === "Web Designer"
                          ).length
                        }
                      </li>

                      <li>
                        {" "}
                        FullStack ={" "}
                        {
                          items.filter(
                            (applicant) =>
                              applicant.jobTitle === "Full-Stack-Developer"
                          ).length
                        }
                      </li>
                    </td>
                    <td>
                      <li>
                        Accepted:{" "}
                        {
                          items.filter(
                            (applicant) => applicant.status === "Accepted"
                          ).length
                        }{" "}
                      </li>
                      <li>
                        {" "}
                        Pending ={" "}
                        {
                          items.filter(
                            (applicant) => applicant.status === "Pending"
                          ).length
                        }
                      </li>
                    </td>
                  </tr>
                </>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    
  );
};

export default Report;
