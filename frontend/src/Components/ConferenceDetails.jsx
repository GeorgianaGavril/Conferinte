import React from "react";
import ArticleCard from "./ArticleCard";

const ConferenceDetails = ({
    selectedConference,
    articles,
    authors,
    onBack,
    onSelectArticle,
}) => {
    const filteredArticles = articles.filter(
        (article) => article.idConference === selectedConference.idConference
    );

    return (
        <div>
            <button className="upload-button" onClick={onBack}>
                Back to Conferences
            </button>
            <div className="conference-details">
                <h1>Detalii Conferință</h1>
                <p>Nume: {selectedConference.name}</p>
                <p>Data și ora: {new Date(selectedConference.date).toLocaleString("ro-RO")}</p>
                <p>Locație: {selectedConference.location}</p>
                <p>{selectedConference.description}</p>
                <h2>Articole propuse:</h2>
                <div className="conference-list">
                    {filteredArticles.length > 0 ? (
                        filteredArticles.map((article) => (
                            <ArticleCard
                                key={article.idArticle}
                                article={article}
                                author={authors[article.idAuthor] || "Necunoscut"}
                                onClick={() => onSelectArticle(article)}
                            />
                        ))
                    ) : (
                        <p>Nu există articole pentru această conferință.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConferenceDetails;