import React, { useState, useEffect } from "react";
import "../css/pages/conference.css";
import Sidebar from "../Components/Sidebar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ConferencesList from "../Components/ConferenceList";
import ConferenceDetails from "../Components/ConferenceDetails";

function ConferencesDashboard() {
    const [conferences, setConferences] = useState([]);
    const [selectedConference, setSelectedConference] = useState(null);
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
        document.body.classList.add("conference-page");

        fetchData();
        fetchArticlesAndAuthors();

        return () => {
            document.body.classList.remove("conference-page");
        };
    }, []);

    return (
        <div className="dashboard-container conference-page">
            <Sidebar role="organizer" />
            <div className="main-content">
                {!selectedConference ? (
                    <ConferencesList
                        conferences={conferences}
                        onSelectConference={setSelectedConference}
                    />
                ) : (
                    <ConferenceDetails
                        selectedConference={selectedConference}
                        articles={articles}
                        authors={authors}
                        onBack={() => setSelectedConference(null)}
                        onSelectArticle={(article) => console.log("Article selected:", article)}
                    />
                )}
            </div>
            <ToastContainer />
        </div>
    );
}

export default ConferencesDashboard;