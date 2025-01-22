// import { useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Login";
import ReviewerDashboard from "./Pages/Reviewer";
import CreateConference from "./Pages/CreateConference";
import ConferencesDashboard from "./Pages/Conferences";
import AuthorDashboard from "./Pages/Author";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from './UserContext'; 
import ArticleDetails  from "./Components/ArticleDetails";
import UploadArticle from "./Pages/UploadArticle"
import ArticlesDashboard from "./Pages/Articles"

export default function App() {
  return (
    <UserProvider>  
    <div>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/reviewer" element={<ReviewerDashboard />} />
            
            <Route path="/create/conference" element={<CreateConference />} />
            <Route path="/conferences" element={<ConferencesDashboard />} />
            <Route path="/article/:id" element={<ArticleDetails />}/>

            
            <Route path="/join-conference" element={<AuthorDashboard/>} />
            <Route path="/upload-article/:id" element={<UploadArticle/>} />
            <Route path="/articles" element={<ArticlesDashboard/>} />
          </Routes>
        </div>
      </Router>
    </div>
    </UserProvider>
  );
}
