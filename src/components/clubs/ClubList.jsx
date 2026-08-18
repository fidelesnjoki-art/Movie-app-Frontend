import React from "react";
import ClubCard from "./ClubCard";

function ClubList({ clubs = [] }) {
  return (
    <div className="club-list">
      {clubs.length > 0 ? (
        clubs.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))
      ) : (
        <p>No clubs available.</p>
      )}
    </div>
  );
}

export default ClubList;