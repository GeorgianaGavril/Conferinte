// import { useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import ReviewerDashboard from "./Pages/Reviewer";

export default function App() {
  return (
    <div>
      {/* <Login /> */}
      {/* <ToastContainer /> */}
      <ReviewerDashboard />
    </div>
  );
}
