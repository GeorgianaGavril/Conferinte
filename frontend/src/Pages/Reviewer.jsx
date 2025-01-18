import React, { useState, useEffect } from "react";
import "../css/pages/reviewer.css"; // Stilurile CSS externe

const ReviewerDashboard = () => {
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
      status: "In proces de revizuire",
    },
    {
      id: 3,
      title: "Articol 3",
      author: "Autor 3",
      status: "Revizuit",
    },
  ];

  return (
    <div className="dashboard-container review-page">
      <div className="sidebar">
        <h2>Reviewer Menu</h2>
        <ul>
          <li>Assigned Articles</li>
          <li>Profile</li>
          <li>
            <button className="logout-button">Logout</button>
          </li>
        </ul>
      </div>

      <div className="main-content">
        <h1>Assigned Articles</h1>
        {!selectedArticle ? (
          <div>
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
            <p>{selectedArticle.description}</p>
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
};

export default ReviewerDashboard;
