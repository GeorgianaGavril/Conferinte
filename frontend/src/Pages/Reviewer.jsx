import React, { useState, useEffect } from "react";
import "../css/pages/reviewer.css"; // Stilurile CSS externe
import Sidebar from "../Components/Sidebar";

function ReviewerDashboard() {
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    document.body.classList.add("review-page");

    return () => {
      document.body.classList.remove("review-page");
    };
  }, []);

  const articles = [
    {
      id: 1,
      title: "Articol 1",
      author: "Autor 1",
      status: "Revizuit",
    },
    {
      id: 2,
      title: "Articol 2",
      author: "Autor 2",
      status: "În proces de revizuire",
    },
    {
      id: 3,
      title: "Articol 3",
      author: "Autor 3",
      status: "Revizuit",
    },
    {
      id: 4,
      title: "Articol 4",
      author: "Autor 4",
      status: "În proces de revizuire",
    },
    {
      id: 5,
      title: "Articol 5",
      author: "Autor 5",
      status: "Revizuit",
    },
    {
      id: 6,
      title: "Articol 6",
      author: "Autor 6",
      status: "În proces de revizuire",
    },
  ];

  return (
    <div className="dashboard-container review-page">
      <Sidebar role="reviewer" />

      <div className="main-content">
        <h1>Articole asignate</h1>
        {!selectedArticle ? (
          <div className="article-list">
            {articles.map((article) => (
              <div
                key={article.id}
                className="article-card"
                onClick={() => setSelectedArticle(article)}
              >
                <h3>{article.title}</h3>
                <p>{article.author}</p>
                <h5>{article.status}</h5>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <button
              className="back-button"
              onClick={() => setSelectedArticle(null)}
            >
              Back to Articles
            </button>
            <h2>{selectedArticle.title}</h2>
            <p>{selectedArticle.description || "No description available"}</p>
            <textarea
              placeholder="Write your review here..."
              className="review-textarea"
            ></textarea>
            <button className="upload-button">Upload Review</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReviewerDashboard;
