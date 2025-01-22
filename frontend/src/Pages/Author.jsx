import React, { useState, useEffect } from "react";
import "../css/pages/author.css";
import Sidebar from "../Components/Sidebar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ConferencesList from "../Components/ConferenceList";
import { useContext } from 'react';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router-dom';

function AuthorDashboard() {
    const navigate = useNavigate();
    const [conferences, setConferences] = useState([]);
    const [selectedConference, setSelectedConference] = useState(null);
    const user = useContext(UserContext);
    const [articles, setArticles] = useState([]);
    const [authors, setAuthors] = useState({});
    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:3001/conference/");
            setConferences(response.data);
        } catch (e) {
            toast.error("Eroare la încărcarea datelor!");
        }
    };

    const fetchArticlesAndAuthors = async () => {
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


    


    useEffect(() => {
        document.body.classList.add("author-page");

        fetchData();
        fetchArticlesAndAuthors();

        return () => {
            document.body.classList.remove("author-page");
        };
    }, []);

    const uploadArticle = () => {
        navigate(`/upload-article/${selectedConference.idConference}`)
    }


    return (
        <div className="dashboard-container author-page">
        <Sidebar role="author" />
        <div className="main-content">
                {!selectedConference ? (
                    <ConferencesList
                        conferences={conferences}
                        onSelectConference={setSelectedConference}
                    />
                ) : (
                    <>
                        
                        <button className="upload-button" onClick={() => setSelectedConference(null)}>
                Back to Conferences
            </button>
                <div className="conference-details">
                    <h1>Detalii Conferință</h1>
                    <p>Nume: {selectedConference.name}</p>
                    <p>Data și ora: {new Date(selectedConference.date).toLocaleString("ro-RO")}</p>
                    <p>Locație: {selectedConference.location}</p>
                    <p>{selectedConference.description}</p>
                    <button  className="upload-button" 
                    onClick = {uploadArticle}
                    >Inscrie-te cu un articol</button>
                </div>
                    </>
                )}
            </div>
        <ToastContainer />
    </div>
);
}

export default AuthorDashboard;
