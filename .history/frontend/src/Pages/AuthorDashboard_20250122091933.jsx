import React, { useState, useEffect } from "react";
import "../css/pages/create-article.css";
import Sidebar from "../Components/Sidebar";
import ConferenceCard from "../Components/ConferenceCard";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useParams, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { useContext } from 'react';

function AuthorDashboard() {
  const [conferences, setConferences] = useState([]);
  const { userId } = useParams();
  const [articles, setArticles] = useState([]);

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
      const response = await axios.post("http://localhost:3001/article/user/", {
        id: userId,
      });
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
          <h2>Conferințe disponibile</h2>
          <div className="conference-list">
            {conferences.length > 0 ? (
              conferences.map((conference) => (
                <ConferenceCard
                  key={conference.idConference}
                  conference={conference}
                  navigate={navigate}
                />
              ))
            ) : (
              <p>Nu există conferințe disponibile momentan.</p>
            )}
          </div>
        </section>

        {/* Secțiunea pentru articole */}
        <section>
          <h2>Articole propuse</h2>
          <div className="article-list">
            {articles.length > 0 ? (
              articles.map((article) => (
                <ArticleCard
                  key={article.idArticle}
                  article={article}
                  navigate={navigate}
                />
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
