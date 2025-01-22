import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/pages/author.css";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Components/Sidebar";
import { toast, ToastContainer } from "react-toastify";
import { UserContext } from "../UserContext";

function ArticlesDashboard() {
    const [articles, setArticles] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const user = useContext(UserContext);
    const [reviews, setReviews] = useState([]);

    const fetchArticles = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3001/article/author/" + user.userId
            );
            setArticles(response.data);
        } catch (e) {
            console.error("Eroare la încărcarea datelor: ", e);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3001/reviews/article/" + selectedArticle.idArticle
            );
            setReviews(response.data);
        } catch (e) {
            console.error("Eroare la încărcarea datelor: ", e);
        }
    };

    useEffect(() => {
        document.body.classList.add("author-page");

        if (user) {
            fetchArticles();
        }

        return () => {
            document.body.classList.remove("author-page");
        };
    }, [user]);

    useEffect(() => {
        if (selectedArticle) {
            setTitle(selectedArticle.title);
            setContent(selectedArticle.content);
            fetchReviews();
        }
    }, [selectedArticle]);

    const handleUpdateArticle = async () => {
        try {
            await axios.patch(`http://localhost:3001/article/${selectedArticle.idArticle}`, {
                title,
                content,
            });
            toast.success("Articolul a fost actualizat cu succes!");
            setSelectedArticle(null);
            fetchArticles();
        } catch (error) {
            toast.error("Eroare la actualizarea articolului. Te rugăm să încerci din nou!");
        }
    };

    return (
        <div className="dashboard-container author-page">
            <Sidebar role="author" />
            <div className="main-content">
                {!selectedArticle ? (
                    <>
                        <h1>Articolele mele</h1>
                        <div className="article-list">
                            {articles.map((article) => (
                                <div
                                    key={article.idArticle}
                                    className="article-card"
                                    onClick={() => {
                                        if (article.status === "în așteptare") {
                                            setSelectedArticle(article);
                                        } else {
                                            toast.warning("Doar articolele cu statusul 'în așteptare' pot fi modificate.");
                                        }
                                    }}
                                >
                                    <h3>{article.title}</h3>
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
                            }}
                        >
                            Back to Articles
                        </button>
                        <h1>Editează articolul</h1>
                    
                            <h2>Titlu Articol</h2>
                            <input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <h4>Conținut Articol</h4>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                     
                        <button
                            className="update-button"
                            onClick={handleUpdateArticle}
                        >
                            Salvează modificările
                        </button>
                        <h2>Reviews: </h2>
                        <div >
                            {reviews.map((review) => (
                                <div
                                    key={review.idReview}
                         
                                >
                                    <div className="review">
                                        <h4 class = "rating">Rating: {review.rating}/5</h4>
                                        <p>{review.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
}

export default ArticlesDashboard;
