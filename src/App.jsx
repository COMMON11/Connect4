import React, { useState } from "react";
import Connect4Grid from "./Connect4Grid";

function App() {
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  // Function to handle win condition
  const handleWin = (winner) => {
    if (winner === "P1") {
      setPlayer1Score(player1Score + 1);
    } else if (winner === "P2") {
      setPlayer2Score(player2Score + 1);
    }
  };

  // Function to handle reset
  const handleReset = () => {
    console.log("handleReset called");
    setPlayer1Score(0);
    setPlayer2Score(0);
  };

  return (
    <>
      <header className="w-full text-center my-5">
        <h1 className="text-8xl text-yellow-100 [text-shadow:_#FC0_1px_0_10px] dancing-script-bold">
          Connect 4!
        </h1>
      </header>

      <div className="flex justify-between mx-10 flex-wrap">
        <aside className="mt-60 w-[300px] h-[30vh] bg-gradient-to-r from-sky-700 to-blue-900 p-2 rounded-lg shadow-2xl outline-8 outline-sky-900 outline-none outline-offset-0 sm:order-2 2xl:order-1">
          <div className="text-white text-center flex flex-col items-center justify-center h-full">
            <p className="text-3xl justify-self-start">
              <strong>Player 1: Red</strong>
            </p>
            <p className="text-7xl">
              <strong>{player1Score}</strong>
            </p>
          </div>
        </aside>

        <main className="sm:order-1 2xl: order-2 my-4">
          <Connect4Grid onWin={handleWin} onReset={handleReset} />
        </main>

        <aside className="mt-60 w-[300px] h-[30vh] bg-gradient-to-r from-sky-700 to-blue-900 p-2 rounded-lg shadow-2xl outline-8 outline-sky-900 outline-none outline-offset-0 sm:order-2 2xl:order-1">
          <div className="text-white text-center flex flex-col items-center justify-center h-full">
            <p className="text-3xl justify-self-start">
              <strong>Player 2: Yellow</strong>
            </p>
            <p className="text-7xl">
              <strong>{player2Score}</strong>
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}

export default App;
