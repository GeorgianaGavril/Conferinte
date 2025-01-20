import React, { useState, useEffect } from "react";
import "../css/pages/reviewer.css";
import Sidebar from "../Components/Sidebar";
import axios from "axios";

function ReviewerDashboard() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [content, setContent] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    document.body.classList.add("review-page");

    const fetchData = async () => {
      try {
        const articlesRes = await fetch("http://localhost:3001/article/");
        const articlesData = await articlesRes.json();

        const authorIds = [
          ...new Set(articlesData.map((article) => article.idAuthor)),
        ];
        const authorsData = await Promise.all(
          authorIds.map(async (id) => {
            const res = await fetch(`http://localhost:3001/users/${id}`);
            return res.json();
          })
        );

        const authorsMap = {};
        authorsData.forEach((author) => {
          authorsMap[author.idUser] = `${author.lastname} ${author.firstname}`;
        });

        setArticles(articlesData);
        setAuthors(authorsMap);
      } catch (e) {
        console.error("Eroare la încărcarea datelor: ", e);
      }
    };

    fetchData();

    return () => {
      document.body.classList.remove("review-page");
    };
  }, []);

  useEffect(() => {
    if (selectedArticle) {
      const fetchContent = async () => {
        try {
          const res = await fetch(
            `http://localhost:3001/article/${selectedArticle.idArticle}`
          );
          const data = await res.json();

          setContent(data.content);
        } catch (e) {
          console.error(
            "Eroare la incarcarea continutului articolului: ",
            e.message
          );
        }
      };

      fetchContent();
    }
  }, [selectedArticle]);

  async function handleUpload(e) {
    e.preventDefault();
    if (!review || !rating) {
      console.error("Review și rating trebuie completate!");
      return;
    }
    if (Number(rating) < 1 || Number(rating) > 5) {
      console.error("Rating-ul poate fi intre 1 si 5!");
      return;
    }
    try {
      const uploadReview = await axios.post("http://localhost:3001/reviews/", {
        idArticle: selectedArticle.idArticle,
        idReviewer: 1,
        content: review,
        rating: Number(rating),
      });
      console.log("Recenzie adaugata cu succes: ", uploadReview.data);
      setReview("");
      setRating(null);
    } catch (e) {
      console.error("Eroare la adaugarea recenziei: ", e.message);
    }
  }

  return (
    <div className="dashboard-container review-page">
      <Sidebar role="reviewer" />

      <div className="main-content">
        <h1>Articole asignate</h1>
        {!selectedArticle ? (
          <div className="article-list">
            {articles.map((article) => (
              <div
                key={article.idArticle}
                className="article-card"
                onClick={() => setSelectedArticle(article)}
              >
                <h3>{article.title}</h3>
                <p>Autor: {authors[article.idAuthor] || "Autor necunoscut"}</p>
                <h5>Status: {article.status}</h5>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <button
              className="back-button"
              onClick={() => {
                setSelectedArticle(null);
                setContent(null);
              }}
            >
              Back to Articles
            </button>
            <h1>{selectedArticle.title}</h1>
            <h3>{authors[selectedArticle.idAuthor]}</h3>
            <p>{content}</p>
            <textarea
              placeholder="Write your review here..."
              className="review-textarea"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
            <h4>Rating:</h4>
            <input
              type="number"
              value={rating || ""}
              onChange={(e) => setRating(e.target.value)}
            ></input>
            <br></br>
            <button className="upload-button" onClick={handleUpload}>
              Upload Review
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewerDashboard;
