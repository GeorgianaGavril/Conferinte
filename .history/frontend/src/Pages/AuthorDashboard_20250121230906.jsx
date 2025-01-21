import React, { useState, useEffect } from "react";
import "../css/pages/create-article.css";
import Sidebar from "../Components/Sidebar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function AuthorDashboard() {
  const [conferences, setConferences] = useState([]);
  const [articles, setArticles] = useState([]);

  // Fetch conferințe disponibile
  const fetchConferences = async () => {
    try {
      const response = await axios.get("http://localhost:3001/conference/");
      setConferences(response.data);
    } catch (e) {
      toast.error("Eroare la încărcarea conferințelor!");
    }
  };

  // Fetch articole propuse de autor
  const fetchArticles = async () => {
    try {
      const response = await axios.get("http://localhost:3001/articles/author/1"); // Exemplu: ID-ul autorului este 1
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
    if(!validateForm()){
      try {
        // trimite pe pagina de inscriere articol
        const response = await axios.post('http://localhost:3001/conference/', { 
          name, 
          description, 
          date, 
          location, 
          idOrganizer: user.userId,
          reviewers: selectedIds 
        });
       console.log(response.data)
      //  setMessage("Conferinta creata cu succes!");
        toast.success("Conferinta creata cu succes");
     //   setTimeout(() => setMessage(""), 3000);
        setName('');
        setDescription('');
        setDate('');
        setLocation('');
        setSelectedOptions([])
      } catch (error) {
        if (error.response) {
          toast.error("Crearea conferintei esuata! " + error.response.data.message);
        } else if (error.request) {
          toast.error(
            "Nu s-a primit răspuns de la server. Te rugăm să încerci din nou."
          );
        } else {
          toast.error(
            "A apărut o eroare necunoscută. Te rugăm să încerci din nou mai târziu."
          );
          console.log(error.response)
        }
      }
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
