import React, { useState, useEffect } from "react";
import "../css/pages/create-article.css";
import Sidebar from "../Components/Sidebar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams, useNavigate } from 'react-router-dom';

function AuthorDashboard() {
  const [conferences, setConferences] = useState([]);
  const [articles, setArticles] = useState([]);
  const { conferenceId } = useParams();

  const navigate = useNavigate();

  const fetchConferences = async () => {
    try {
      const response = await axios.get("http://localhost:3001/conference/");
      setConferences(response.data);
    } catch (e) {
      toast.error("Eroare la încărcarea conferințelor!");
    }
  };

  const fetchArticles = async () => {
    try {
      const response = await axios.get("http://localhost:3001/articles/");
      setArticles(response.data);
    } catch (e) {
      toast.error("Eroare la încărcarea articolelor!");
    }
  };

  useEffect(() => {
    document.body.classList.add("author-dashboard");

    fetchConferences();
    fetchArticles();

    return () => {
      document.body.classList.remove("author-dashboard");
    };
  }, []);

  async function handleSubmit(e){
    e.preventDefault();
    try {
      navigate('/create/article');
      console.log('asdasd');
    } catch (error) {
      
    }
  }

  return (
    <div className="dashboard-container author-dashboard">
      <Sidebar role="author" />
      <div className="main-content">
        <h1>Bun venit pe Dashboard-ul Autorului</h1>

        {/* Secțiunea pentru conferințe */}
        <section>
          <form onSubmit={handleSubmit} className="create-article-form">
          <h2>Conferințe disponibile</h2>
          <div className="card-container">
            {conferences.length > 0 ? (
              conferences.map((conference) => (
                <div key={conference.idConference} className="card">
                  <h3>{conference.name}</h3>
                  <p>{conference.description}</p>
                  <button onClick={() => console.log("Înscriere:", conference.name)}>
                    Înscrie-te
                  </button>
                </div>
              ))
            ) : (
              <p>Nu există conferințe disponibile momentan.</p>
            )}
          </div>
          </form>
        </section>

        {/* Secțiunea pentru articole */}
        <section>
          <h2>Articole propuse</h2>
          <div className="card-container">
            {articles.length > 0 ? (
              articles.map((article) => (
                <div key={article.idArticle} className="card">
                  <h3>{article.title}</h3>
                  <p>Status: {article.status}</p>
                  <button onClick={() => console.log("Vizualizare articol:", article.title)}>
                    Vizualizează
                  </button>
                </div>
              ))
            ) : (
              <p>Nu ai propus articole încă.</p>
            )}
          </div>
        </section>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AuthorDashboard;
