// import { useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Login";
import ReviewerDashboard from "./Pages/Reviewer";
import AuthorDashboard from "./Pages/AuthorDashboard";
import CreateConference from "./Pages/CreateConference";
import CreateArticle from "./Pages/CreateArticle";
import ConferencesDashboard from "./Pages/Conferences";
import EditArticle from "./Pages/EditArticle";
import ViewArticle from "./Pages/ViewArticle";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from './UserContext'; 

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
            <Route path="/author" element={<AuthorDashboard />} />
            <Route path="/create/article" element={<CreateArticle />} />
            <Route path="/edit/article/:id" element={<EditArticle />} />
            <Route path="/view/article/:id" element={<ViewArticle />} />
          </Routes>
        </div>
      </Router>
    </div>
    </UserProvider>
  );
}
