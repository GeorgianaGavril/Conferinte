import React from "react";
import { useNavigate } from "react-router-dom";

const ArticleCard = ({ article, author }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/article/${article.idArticle}`);
  };

  return (
    <div className="conference-card" onClick={handleClick}>
      <h3>{article.title}</h3>
      <p>Autor: {author}</p>
      <h5>Status: {article.status}</h5>
    </div>
  );
};

export default ArticleCard;