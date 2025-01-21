import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../Components/Sidebar";
import "../css/pages/conference.css";
import { ToastContainer, toast } from "react-toastify";

const ArticleDetails = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [author, setAuthor] = useState("");
  const navigate = useNavigate();  

  useEffect(() => {
    document.body.classList.add("conference-page");

    // Fetch article details
    axios.get(`http://localhost:3001/article/${id}`)
      .then(response => {
        setArticle(response.data);
      })
      .catch(error => {
        console.error("Eroare:", error);
      });
  }, [id]);

  useEffect(() => {
    // Only fetch author if article is available
    if (article && article.idAuthor) {
        console.log(article.idAuthor)
      axios.get(`http://localhost:3001/users/${article.idAuthor}`)
        .then(response => {
            console.log(response.data)
          setAuthor(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [article]); // Run this effect whenever article state changes

  if (!article) {
    return <div>Loading...</div>;
  }

  const handleBack = () => {
    navigate(-1);
  };


  const decline = () => {
    axios.patch(`http://localhost:3001/article/${id}`, {
      status: "refuzat",
      idConference: null
    })
    .then(response => {
      setArticle(prevArticle => ({
        ...prevArticle,
        status: "refuzat",
        idConference: null
      }));
      toast.success("Articolul a fost refuzat")
      console.log("Articolul a fost refuzat!");
    })
    .catch(error => {
      console.error("Eroare la refuz:", error);
    });
  };



  return (
    <div className="dashboard-container conference-page">
      <Sidebar role="organizer" />  
      <div className="main-content">
        <button className="upload-button" onClick={handleBack}>Back</button> 
        <h1>{article.title}</h1>
        <p>Autor: {author.firstname + " " +  author.lastname}</p>
        <p>Status: {article.status}</p>
        <p>{article.content}</p>
        <button className="upload-button decline-button"  onClick={decline}>Refuza</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ArticleDetails;