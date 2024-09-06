// src/WinnerPopup.jsx
import React, { useState, useEffect } from "react";

function WinnerPopup({ winner, onClose }) {
  const [winnerChip, setWinnerChip] = useState("");
  useEffect(() => {
    if (winner === "P1") {
      const winnerName = "Red";
      setWinnerChip(winnerName);
    } else {
      const winnerName = "Yellow";
      setWinnerChip(winnerName);
    }
  }, [winner]);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg text-center w-[30%] h-[30%] flex flex-col items-center justify-center">
        <h2 className="text-5xl font-bold mb-4">{winnerChip} wins!</h2>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded text-2xl"
        >
          Start new game
        </button>
      </div>
    </div>
  );
}

export default WinnerPopup;
