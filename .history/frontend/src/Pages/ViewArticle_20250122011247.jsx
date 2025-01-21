import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ViewArticle() {
  const { id } = useParams(); // Preia ID-ul articolului din URL
  const [article, setArticle] = useState(null);

  // Fetch articol pe baza ID-ului
  const fetchArticle = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/article/${id}`);
      setArticle(response.data);
    } catch (e) {
      toast.error('Eroare la încărcarea articolului!');
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [id]);

  if (!article) {
    return <p>Se încarcă articolul...</p>;
  }

  return (
    <div className="view-article-container">
      <h1>{article.title}</h1>
      <p><strong>Descriere:</strong> {article.description}</p>
      <p><strong>Conținut:</strong></p>
      <div className="article-content">
        <p>{article.content}</p>
      </div>
      <p><strong>Status:</strong> {article.status}</p>
      <ToastContainer />
    </div>
  );
}

export default ViewArticle;
