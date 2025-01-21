import React from "react";

const ConferencesList = ({ conferences, onSelectConference }) => (
    <div>
        <h1>Conferințele tale</h1>
        <div className="conference-list">
            {conferences.length > 0 ? (
                conferences.map((conference) => (
                    <div
                        key={conference.idConference}
                        className="conference-card"
                        onClick={() => onSelectConference(conference)}
                    >
                        <h3>{conference.name}</h3>
                        <p>Data: {new Date(conference.date).toLocaleString("ro-RO")}</p>
                        <p>Locație: {conference.location}</p>
                        <h5>{conference.description}</h5>
                    </div>
                ))
            ) : (
                <p>Nu există conferințe disponibile.</p>
            )}
        </div>
    </div>
);

export default ConferencesList;