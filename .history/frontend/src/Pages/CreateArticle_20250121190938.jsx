import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../css/pages/create-articlcss"; 
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from "../Components/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import { UserContext } from '../UserContext';
import { useContext } from 'react';


function CreateArticle() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [errors, setErrors] = useState({});
    const user = useContext(UserContext);
  
    useEffect(() => {
      document.body.classList.add("page");
  
      return () => {
        document.body.classList.remove("page");
      };
    }, []);
  
    const validateForm = () => {
      const errObj = {};
      if (!title.trim()) {
        errObj.title = "Titlul este obligatoriu";
      }
  
      if (!content.trim()) {
        errObj.content = "Conținutul articolului este obligatoriu";
      }
  
      setErrors(errObj);
      return Object.keys(errObj).length === 0;
    };
  
    async function handleSubmit(e) {
      e.preventDefault();
      if (validateForm()) {
        try {
          const response = await axios.post("http://localhost:3001/articles", {
            title,
            content,
            idAuthor: user.userId,
          });
          console.log(response.data);
          toast.success("Articol creat cu succes!");
          setTitle("");
          setContent("");
        } catch (error) {
          if (error.response) {
            toast.error("Eroare la crearea articolului: " + error.response.data.message);
          } else if (error.request) {
            toast.error("Nu s-a primit răspuns de la server. Te rugăm să încerci din nou.");
          } else {
            toast.error("A apărut o eroare necunoscută. Te rugăm să încerci mai târziu.");
          }
        }
      }
    }
  
    return (
      <div className="dashboard-container page">
        <Sidebar role="author" />
        <div className="main-content">
          <h1>Creare Articol</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-container">
              <div className="form-left">
                <label htmlFor="title">Titlu Articol</label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`${errors.title ? "errors" : ""}`}
                  required
                />
                {errors.title && <small>{errors.title}</small>}
              </div>
              <div className="form-right">
                <label htmlFor="content">Conținut Articol</label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className={`${errors.content ? "errors" : ""}`}
                  required
                  placeholder="Scrie conținutul articolului aici..."
                ></textarea>
                {errors.content && <small>{errors.content}</small>}
              </div>
            </div>
            <button type="submit">Adaugă Articol</button>
          </form>
        </div>
        <ToastContainer />
      </div>
    );
  }
  
  export default CreateArticle;
  