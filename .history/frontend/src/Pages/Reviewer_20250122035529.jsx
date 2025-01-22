import React, { useState, useEffect } from "react";
import "../css/pages/reviewer.css";
import Sidebar from "../Components/Sidebar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function ReviewerDashboard() {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [articles, setArticles] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [content, setContent] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");

  const fetchData = async () => {
    try {
      // primeste toate articolele existente
      const articlesRes = await axios.post("http://localhost:3001/article/user/", {
        id: -1,
      });
      const myArticles = arti

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

  useEffect(() => {
    document.body.classList.add("review-page");

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
      console.error(
        "Trebuie să încărcați un review și să selectați un rating!"
      );
      toast.error("Trebuie să încărcați un review și să selectați un rating!");
      return;
    }
    if (Number(rating) < 1 || Number(rating) > 5) {
      console.error("Rating-ul poate fi intre 1 si 5!");
      toast.error("Rating-ul poate fi intre 1 si 5!");
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
      toast.success("Feedback adăugat cu succes!");
      setReview("");
      setRating(null);
    } catch (e) {
      console.error("Eroare la adaugarea recenziei: ", e.message);
      toast.error("Nu s-a putut adauga feedback-ul!");
    }
  }

  async function handleAccept(e) {
    e.preventDefault();
    try {
      const acceptReview = await axios.patch(
        `http://localhost:3001/article/${selectedArticle.idArticle}`,
        {
          status: "acceptat",
        }
      );
      setSelectedArticle((prev) => ({
        ...prev,
        status: "acceptat",
      }));
      console.log("Articol aprobat cu succes: ", acceptReview.data);
      toast.success("Articolul a fost aprobat!");
      fetchData();
    } catch (e) {
      console.error("Eroare la aprobarea articolului: ", e.message);
      toast.error("Nu s-a putut aproba articolul!");
    }
  }

  return (
    <div className="dashboard-container review-page">
      <Sidebar role="reviewer" />

      <div className="main-content">
        {!selectedArticle ? (
          <>
            <h1>Articole asignate</h1>
            <div className="article-list">
              {articles.map((article) => (
                <div
                  key={article.idArticle}
                  className="article-card"
                  onClick={() => setSelectedArticle(article)}
                >
                  <h3>{article.title}</h3>
                  <p>
                    Autor: {authors[article.idAuthor] || "Autor necunoscut"}
                  </p>
                  <h5>Status: {article.status}</h5>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>
            <button
              className="upload-button"
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
            {selectedArticle.status !== "acceptat" ? (
              <>
                <button
                  className="upload-button"
                  onClick={(e) => handleAccept(e)}
                >
                  Aprobă articolul
                </button>
                <textarea
                  placeholder="Scrieți aici feedback-ul..."
                  className="review-textarea"
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                ></textarea>
                <h4>Rating:</h4>
                <input
                  className="input-rating"
                  type="number"
                  value={rating || ""}
                  onChange={(e) => setRating(e.target.value)}
                ></input>
                <br></br>
                <button className="upload-button" onClick={handleUpload}>
                  Încărcați feedback
                </button>
              </>
            ) : undefined}
            <ToastContainer />
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewerDashboard;
