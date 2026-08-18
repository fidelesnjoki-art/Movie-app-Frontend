import React from "react";
import { Link } from "react-router-dom";

function ClubCard({ club }) {
  return (
    <div className="club-card">
      <img
        src={club.image || "/placeholder.jpg"}
        alt={club.name}
        className="club-card-image"
      />

      <div className="club-card-content">
        <h3>{club.name}</h3>

        <p>{club.description}</p>

        <span>{club.memberCount || 0} members</span>

        <Link to={`/clubs/${club.id}`}>
          View Club
        </Link>
      </div>
    </div>
  );
}

export default ClubCard;