import React from "react";

const ConferenceCard = ({ conference, navigate }) => {
  return (
    <div
      className="conference-card"
      onClick={() => navigate(`/create/article/${conference.idConference}`)}
    >
      <h3>{conference.name}</h3>
      <p>Data: {new Date(conference.date).toLocaleString("ro-RO")}</p>
      <p>Locație: {conference.location}</p>
      <p>{conference.description}</p>
    </div>
  );
};

export default ConferenceCard;
