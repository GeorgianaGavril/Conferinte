import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditArticle() {
  const { id } = useParams(); // Preia ID-ul articolului din URL
  const navigate = useNavigate(); // Navigare înapoi după salvare
  const [article, setArticle] = useState(null); // Stochează articolul original
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    content: '',
  }); // Valori pentru formular

  // Fetch articol pe baza ID-ului
  const fetchArticle = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/article/${id}`);
      setArticle(response.data); // Setează datele articolului
      setFormValues({
        title: response.data.title,
        description: response.data.description,
        content: response.data.content,
      }); // Preia valorile pentru formular
    } catch (error) {
      toast.error('Eroare la încărcarea articolului!');
    }
  };

  useEffect(() => {
    fetchArticle();
  }, [id]);

  // Actualizează valorile formularului la fiecare schimbare
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Tratează submit-ul formularului
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previne refresh-ul paginii
    try {
      await axios.put(`http://localhost:3001/article/${id}`, formValues); // Trimite modificările la server
      toast.success('Articolul a fost actualizat cu succes!');
      navigate('/'); // Navighează înapoi la dashboard
    } catch (error) {
      toast.error('Eroare la actualizarea articolului!');
    }
  };

  if (!article) {
    return <p>Se încarcă articolul...</p>;
  }

  return (
    <div className="edit-article-container">
      <h1>Editează Articolul</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Titlu</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formValues.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descriere</label>
          <textarea
            id="description"
            name="description"
            value={formValues.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="content">Conținut</label>
          <textarea
            id="content"
            name="content"
            value={formValues.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <p><strong>Status:</strong> {article.status}</p>
        <p><strong>Data:</strong> {new Date(article.date).toLocaleString()}</p>
        <button type="submit">Salvează Modificările</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default EditArticle;
