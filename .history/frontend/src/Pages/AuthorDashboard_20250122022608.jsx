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
      const response = await axios.get(`http://localhost:3001/article/$()`);
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

  async function handleSubmit(conferenceId){
    console.log(conferenceId);
    try {
      navigate(`/create/article/${conferenceId}`);
    } catch (error) {
      toast.error(
        "A apărut o eroare necunoscută. Te rugăm să încerci din nou mai târziu."
      );
      console.log(error.response)
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
                  <button onClick={() => handleSubmit(conference.idConference)}>
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
                  {article.status === "pending" ? (
                    <button
                      onClick={() => navigate(`/edit/article/${article.idArticle}`)}
                    >
                      Editează
                    </button>
                  ) : article.status === "acceptat" ? (
                    <button
                      onClick={() => navigate(`/view/article/${article.idArticle}`)}
                    >
                      Vizualizează
                    </button>
                  ) : (
                    <button disabled>Status: {article.status}</button>
                  )}
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
