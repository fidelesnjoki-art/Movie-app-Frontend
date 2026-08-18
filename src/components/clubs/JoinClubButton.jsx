import React, { useState } from "react";

function JoinButton({ initialJoined = false, onToggle }) {
  const [joined, setJoined] = useState(initialJoined);

  const handleClick = () => {
    const newState = !joined;

    setJoined(newState);

    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <button onClick={handleClick}>
      {joined ? "Leave Club" : "Join Club"}
    </button>
  );
}

export default JoinButton;