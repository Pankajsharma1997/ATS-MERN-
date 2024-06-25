import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Notifications } from "react-push-notification";

// General Section
import ChatPage from "./components/Chat/ChatPage";
import Footer from "./components/Footer";

// Admin Section
import AdminLogin from "./components/Admin/AdminLogin";
import AdminHome from "./components/Admin/AdminHome";
import JobPosting from "./components/Admin/JobPosting";
import EditJobPost from "./components/Admin/EditJobPost";
import AllApplications from "./components/Admin/ShowApplicant";
import ApplicantDetail from "./components/Admin/ApplicantDetail";
import Report from "./components/Admin/Report";
import PrivateComponent from "./components/PrivateComponent";
import SignUp from "./components/SignUp";
import AdminAllPosts from "./components/Admin/AllPosts";

// Subscriber Section
   
import Subscriber from "./components/Register&Login/Subscriber";              //  Register the User
import Loginsubscriber from "./components/Register&Login/Loginsubscriber";    //  Login the User
  
import Home from "./components/Home";                                         // Import  Home page 
import JobListing from "./components/Jobs/JobListing";                        // Import  Job Listing page  
import JobDetails from "./components/Jobs/Job_details";                      // Import  Job Details Page 
import ApplicationStatus from "./components/Applicant/ApplicationStatus";         // Import  ApplicationStatus  page 
import EditApplicationStatus from "./components/Applicant/EditApplicationStatus"; // Import Edit Application page 
import AcceptedList from "./components/Admin/AcceptedList";
import RejectedList from "./components/Admin/RejectedList";


function App() {
  return (
    <div className="App">
      <Notifications />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/adminhome" element={<AdminHome />} />
            <Route path="/adminAllPosts" element={<AdminAllPosts />} />
            <Route path="/add-post" element={<JobPosting />} />
            <Route path="/all-applicant" element={<AllApplications />} />
            <Route path="/acceptedapplication" element={<AcceptedList />} />
            <Route path="/rejectedapplication" element={<RejectedList />} />
            <Route path="/admin/editpost/:id" element={<EditJobPost />} />

            {/*  Applicant details Page Route  */}
            <Route path="/aplicant-detail/:id" element={<ApplicantDetail />} />

            {/* Route for Applicant Chat Page  */}
            <Route path="/adminchatpage" element={<ChatPage />} />
            {/* Route for Applicant Report Page  */}
            <Route path="/admin/applicant-count" element={<Report />} />
          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/loginsubscriber" element={<Loginsubscriber />} />
          <Route path="/subscribe" element={<Subscriber />} />
          <Route path="/job_details/:id" element={<JobDetails />} />
          <Route path="/chatpage" element={<ChatPage />} />
          <Route path="/status" element={<ApplicationStatus />} />
          <Route path="/editstatus/:id/" element={<EditApplicationStatus />} />
          <Route path="/" element={<Home />} />
          <Route path="/joblisting" element={<JobListing />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
export default App;
