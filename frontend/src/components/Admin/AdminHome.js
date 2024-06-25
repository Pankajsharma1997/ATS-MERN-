import React,{useState, useEffect} from 'react';
import { PieChart } from "@mui/x-charts/PieChart";
// import { BarChart } from "@mui/x-charts/BarChart";
import Sidebar from './Sidebar';
import "./AdminPartCSS/AdminHome.css";
import axios from "axios";



const AdminHome = () => {
  const [posts, setPosts] = useState([]);
  const [applicants, setApplicants] = useState([]);
  const [totalVacancies, setTotalVacancies] = useState(0);
  const [acceptedList, setAcceptedList] = useState([]);
  const [rejectedList, setRejectedList] = useState([]);
  //  const [totalWebDeveloper, setTotalWebDeveloper] = useState(0);

  // const [error, setError] = useState(null);

  //    getposts function for fetch the  posts
  useEffect(() => {
    getPosts();
  }, []);
  const getPosts = async () => {
    try {
      const response = await fetch(`/all-posts`);
      if (!response.ok) {
        throw new Error(` HTTP error: Status${response.status}`);
      }
      let postsData = await response.json();
      setPosts(postsData);
    } catch (err) {
      setPosts(err.message);
      setPosts(null);
    }
  };
  //getposts function for fetch the  posts
  useEffect(() => {
    getVcancies();
  }, []);
  const getVcancies = async () => {
    try {
      const response = await fetch(`/all-vacancies`);
      if (!response.ok) {
        throw new Error(` HTTP error: Status${response.status}`);
      }
      let postsData = await response.json();
      setTotalVacancies(postsData.totalVacancies);
      //  setTotalWebDeveloper(postsData.totalWebDeveloper);
    } catch (err) {
      setTotalVacancies(err.message);
      setTotalVacancies(null);
    }
  };

  // getApplicant() for fetch the Applicants details
  useEffect(() => {
    getApplicants();
  }, []);
  const getApplicants = async () => {
    try {
      const applicantData = await fetch(`/all-applications`);
      if (!applicantData.ok) {
        throw new Error(`HTTP error: Status${applicantData.status}`);
      }
      let applicantDetail = await applicantData.json();
      setApplicants(applicantDetail);
    } catch (err) {
      setApplicants(err.message);
      setApplicants(null);
    }
  };

  // acceptedApplicationList() for fetch the Accepted Applicants details
  useEffect(() => {
    acceptedApplicationList();
  }, []);

  const acceptedApplicationList = async () => {
    try {
      const result = await axios.get("/acceptedlist");
      setAcceptedList(result.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  



  //  rejectedApplicationList() for fetch the Rejected Applicants details 
  useEffect(() => {
    rejectedApplicationList();
  }, []);
  

  const rejectedApplicationList = async () => {
    try {
      const result = await axios.get("/rejectedlist");
      setRejectedList(result.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  return (
    <>
      <div className="admin_home">
        <div className="row">
          <div className="col-lg-2">
            <Sidebar />
          </div>
          <div className="col-lg-10">
            <div className="section-heading">
              <h1> Home </h1>
            </div>
            <div className="row">
              <div className="cards">
                <div className="col-md-3 card1">
                  <h3> Total job Posts </h3>
                  <h4> {posts.length}</h4>
                </div>

                <div className="col-md-3 card1">
                  <h3> Total Vacancies </h3>
                  <h4> {totalVacancies} </h4>
                  {/* <h4> {totalWebDeveloper} </h4> */}
                </div>

                <div className="col-md-3 card1">
                  {" "}
                  <h3> Total Applicants </h3>
                  <h4>{applicants.length} </h4>
                </div>
                <div className="col-md-3 card1">
                  {" "}
                  <h3> Accepted </h3>
                  <h4>{acceptedList.length} </h4>
                </div>
                <div className="col-md-3 card1">
                  {" "}
                  <h3> Rejected  </h3>
                  <h4>{rejectedList.length} </h4>
                </div>

                {/* <div className="col-md-3 card1 ">
                  {" "}
                  <h3> Accpted </h3>
                  <h4>
                    {" "}
                    Accepted ={" "}
                    {
                      applicants.filter(
                        (applicant) => applicant.status === "Accepted"
                      ).length
                    }
                  </h4>
                </div>
                <div className="col-md-3 card1 ">
                  {" "}
                  <h3> Pending </h3>
                  <h4>
                    {" "}
                    Pending ={" "}
                    {
                      applicants.filter(
                        (applicant) => applicant.status === "Pending"
                      ).length
                    }
                  </h4>
                </div> */}
              </div>
            </div>

            {/* Graph */}
            <div className="row graph_area">
              <div className="col-md-6 graph1">
                {/* <BarChart
                  series={[
                    {
                      data: [
                        				applicants.filter((applicant) => {
    // Assuming createdAt is a Date object or a string in a standard date format
    const createdAt = new Date(applicant.createdAt);
    const startDate = new Date("2024-01-01");
    const endDate = new Date("2024-03-31");
    return createdAt >= startDate && createdAt < endDate;
}).length,
                        44,
                        24,
                        34,
                      ],
                    },
                    { data: [51, 6, 49, 30] },
                    { data: [15, 25, 30, 50] },
                    { data: [60, 50, 15, 25] },
                  ]}
                  height={290}
                  xAxis={[
                    { data: ["Q1", "Q2", "Q3", "Q4"], scaleType: "band" },
                  ]}
                  margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                /> */}
                <h1 className="text-center"> Jobs Graph </h1>
                <PieChart
                  series={[
                    {
                      highlightScope: { faded: "global", highlighted: "item" },
                      faded: {
                        innerRadius: 30,
                        additionalRadius: -30,
                        color: "black",
                      },
                      data: [
                        {
                          id: 0,
                          value: posts.length,
                          label: "Total Job Posts",
                        },

                        {
                          id: 1,
                          value: totalVacancies,
                          label: "Total Vacancies",
                        },
                        {
                          id: 2,
                          value: applicants.length,
                          label: "Total Applicants ",
                        },

                        {
                          id: 3,
                          value: applicants.filter(
                            (applicant) => applicant.status === "Pending"
                          ).length,
                          label: "Pending",
                        },
                        {
                          id: 4,
                          value: applicants.filter(
                            (applicant) => applicant.status === "Accepted"
                          ).length,
                          label: "Accepted",
                        },
                      ],
                    },
                  ]}
                  width={500}
                  height={200}
                />
              </div>

              <div className="col-md-6">
                <h1 className="text-center"> Applicantion Graph </h1>
                <PieChart
                  series={[
                    {
                      data: [
                        {
                          id: 0,
                          value: applicants.filter(
                            (applicant) => applicant.jobTitle === "Web Designer"
                          ).length,
                          label: "Web Designer",
                        },

                        {
                          id: 1,
                          value: applicants.filter(
                            (applicant) =>
                              applicant.jobTitle === "Full-Stack-Developer"
                          ).length,
                          label: "Full-Stack",
                        },

                        {
                          id: 2,
                          value: applicants.filter(
                            (applicant) =>
                              applicant.jobTitle === "Web Developer"
                          ).length,
                          label: "Web Developer",
                        },
                      ],
                    },
                  ]}
                  width={500}
                  height={200}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminHome