import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import axios from 'axios';
import "../css/pages/create-article.css"; 
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../Components/Sidebar";

import { toast, ToastContainer } from "react-toastify";
import { UserContext } from '../UserContext';
import { useContext } from 'react';


function CreateArticle() {
  const { conferenceId } = useParams(); // ID-ul conferinței din URL
  const [conferenceDetails, setConferenceDetails] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});
  const user = useContext(UserContext);
  const navigate = useNavigate();
  
    // Fetch detalii conferință
  useEffect(() => {
    async function fetchConferenceDetails() {
      try {
        const response = await axios.get(
          `http://localhost:3001/conference/${conferenceId}`
        );
        setConferenceDetails(response.data);
      } catch (error) {
        toast.error("Eroare la încărcarea detaliilor conferinței!");
      }
    }

    fetchConferenceDetails();
  }, [conferenceId]);

  
  const validateForm = () => {
    const errObj = {};
    if (!title.trim()) {
      errObj.title = "Titlul articolului este obligatoriu";
    }
    if (!content.trim()) {
      errObj.content = "Conținutul articolului este obligatoriu";
    }
    setErrors(errObj);
    return Object.keys(errObj).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        console.log(title);
        console.log(content);
        await axios.post("http://localhost:3001/article/", {
          title,
          content,
          idAuthor: user.userId,
          idConference: idConference,
        });
        toast.success("Articol trimis cu succes!");
        navigate("/author"); // Redirecționează înapoi la dashboard-ul autorului
      } catch (error) {
        toast.error(
          "Eroare la trimiterea articolului. Te rugăm să încerci din nou!"
        );
      }
    }
  };

  
  return (
    <div className="dashboard-container page">
      <Sidebar role="author" />
      <div className="main-content">
        {conferenceDetails ? (
          <>
            <h1>Înscriere la {conferenceDetails.name}</h1>
            <p>
              <strong>Locație:</strong> {conferenceDetails.location}
            </p>
            <p>
              <strong>Data:</strong> {conferenceDetails.date}
            </p>
            <p>
              <strong>Descriere:</strong> {conferenceDetails.description}
            </p>
            <form onSubmit={handleSubmit}>
              <div className="form-container">
                <label htmlFor="title">Titlu Articol</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={errors.title ? "errors" : ""}
                  required
                />
                {errors.title && <small>{errors.title}</small>}
                <label htmlFor="content">Conținut Articol</label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className={errors.content ? "errors" : ""}
                  placeholder="Scrie articolul aici..."
                  required
                ></textarea>
                {errors.content && <small>{errors.content}</small>}
              </div>
              <button type="submit">Trimite Articol</button>
            </form>
          </>
        ) : (
          <p>Se încarcă detaliile conferinței...</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

  
  export default CreateArticle;
  