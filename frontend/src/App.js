import './App.css';
import Nav from './components/Nav';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
 import { Notifications } from "react-push-notification";
// General Section 

import ChatPage from "./components/ChatPage";
import Footer from "./components/Footer";
// Admin Section 
import AdminLogin from "./components/Admin/AdminLogin";
import JobPosting from "./components/Admin/JobPosting";
import AllApplications from "./components/Admin/ShowApplicant";
import Report from "./components/Admin/Report";
import PrivateComponent from "./components/PrivateComponent";
import SignUp from "./components/SignUp";
import AdminAllPosts from './components/Admin/AllPosts';

// Subscriber Section
import Subscriber from './components/Subscriber';
import Loginsubscriber from "./components/Loginsubscriber";
import Applicant from "./components/Applicant";
import ApplicationStatus from './components/ApplicationStatus';
import Home from './components/Home';
import Job_details from './components/Job_details';
import JobListing from './components/JobListing';
import EditJobPost from './components/Admin/EditJobPost';




function App() {
  return (
    <div className="App">
      <Notifications />
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/adminAllPosts" element={<AdminAllPosts />} />
            <Route path="/add-post" element={<JobPosting />} />
            <Route path="all-applicant" element={<AllApplications />} />
            <Route path="/adminchatpage" element={<ChatPage />} />
            <Route path="/admin/applicant-count" element={<Report />} />
            <Route path="/admin/editpost/:id" element ={ <EditJobPost/>}/>
        
          </Route>

          {/* <Route path="/all-posts" element={<AllPosts />}>
            {" "}
          </Route> */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/loginsubscriber" element={<Loginsubscriber />} />
          <Route path="/subscribe" element={<Subscriber />} />

          <Route path="/applicant/:id/" element={<Applicant />} />
          <Route path="/job_details/:id" element={<Job_details />} />

          <Route path="/chatpage" element={<ChatPage />} />
          <Route path="/status" element={<ApplicationStatus />} />
          <Route path="/" element={<Home />} />
          <Route path="/joblisting" element={<JobListing />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}
export default App;
