import React from "react";

const ArticleCardAuthor = ({ article, navigate }) => {
  return (
    <div className="article-card">
      <h3>{article.title}</h3>
      <p>Status: {article.status}</p>
      {article.status === "în așteptare" ? (
        <button
          className="article-button"
          onClick={() => navigate(`/edit/article/${article.idArticle}`)}
        >
          Editează
        </button>
      ) : article.status === "acceptat" ? (
        <button
          className="article-button"
          onClick={() => navigate(`/view/article/${article.idArticle}`)}
        >
          Vizualizează
        </button>
      ) : (
        <button className="article-button" disabled>
          Status: {article.status}
        </button>
      )}
    </div>
  );
};

export default ArticleCard;
