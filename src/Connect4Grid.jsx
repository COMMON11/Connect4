import Blank from "./assets/Blank.svg";
import YellowChip from "./assets/Yellow_chip.svg";
import RedChip from "./assets/Red_chip.svg";
import TransparentChip from "./assets/Transparent_chip.svg";
import Trans_Red_chip from "./assets/Trans_Red_chip.svg";
import Trans_Yellow_chip from "./assets/Trans_Yellow_chip.svg";

import { useState, useEffect } from "react";
import checkWinCondition from "./CheckWinCondition.jsx";
import WinnerPopup from "./WinnerPopUp.jsx";

function Connect4Grid({ onWin, onReset }) {
  const [turn, setTurn] = useState("P1");

  const [chip, setChip] = useState(new Array(7).fill(TransparentChip));
  const [board, setBoard] = useState([]);

  const [winCondition, setWinCondition] = useState(false);
  const [winner, setWinner] = useState("");

  //* initialize blank board
  useEffect(() => {
    const initialBoard = new Array(6)
      .fill()
      .map((_, i) =>
        new Array(7).fill().map((_, j) => ({ id: `${i}-${j}`, value: Blank }))
      );
    setBoard(initialBoard);
  }, []);

  //* update/add chip to board
  const updateBoardValue = (x, y, newValue) => {
    const updatedVar = [...board];
    updatedVar[x][y].value = newValue;
    setBoard(updatedVar);
  };

  //* Show chip when hovered
  const handleMouseEnter = (index) => {
    const chipColour = turn === "P1" ? RedChip : YellowChip;
    const TransChipColour = turn === "P1" ? Trans_Red_chip : Trans_Yellow_chip;

    setChip((prevChip) =>
      prevChip.map((chip, i) => (i === index ? chipColour : chip))
    );

    for (let i = 5; i >= 0; i--) {
      if (board[i][index].value === Blank) {
        updateBoardValue(i, index, TransChipColour);
        break;
      }
    }
  };
  //* Hide chip not hovered
  const handleMouseLeave = (index) => {
    setChip((prevChip) =>
      prevChip.map((chip, i) => (i === index ? TransparentChip : chip))
    );
    for (let i = 5; i >= 0; i--) {
      if (
        board[i][index].value === Trans_Red_chip ||
        board[i][index].value === Trans_Yellow_chip
      ) {
        updateBoardValue(i, index, Blank);
        break;
      }
    }
  };

  const handleNewGame = () => {
    const newBoard = board.map((row) =>
      row.map((cell) => ({ ...cell, value: Blank }))
    );
    setBoard(newBoard);
    setWinCondition(false);
    setTurn("P1");
    setWinner(null);
    setChip(new Array(7).fill(TransparentChip));
  };

  async function handleClick(index) {
    const chipColour = turn === "P1" ? RedChip : YellowChip;
    const TransChipColour = turn === "P1" ? Trans_Yellow_chip : Trans_Red_chip;

    for (let i = 5; i >= 0; i--) {
      if (
        board[i][index].value === Trans_Red_chip ||
        board[i][index].value === Trans_Yellow_chip
      ) {
        updateBoardValue(i, index, chipColour);
        const isWin = checkWinCondition(board, i, index);
        setWinCondition(isWin);

        if (isWin) {
          setWinner(turn);
          onWin(turn);
        }

        setTurn((prevTurn) => (prevTurn === "P1" ? "P2" : "P1"));

        const nextChipColour = turn === "P1" ? YellowChip : RedChip;
        setChip((prevChip) =>
          prevChip.map((chip, j) => (j === index ? nextChipColour : chip))
        );

        updateBoardValue(i - 1, index, TransChipColour);

        break;
      }
    }
  }

  return (
    <>
      {winner && <WinnerPopup winner={winner} onClose={handleNewGame} />}
      <p className="text-2xl text-center text-white">
        Place Mouse inside to Place Chips 👇
      </p>
      <div className="w-[600px] h-[100px] border-gray-600 border-dashed rounded-xl mb-2 border-4">
        {!winCondition && (
          <div className="grid grid-rows-1 grid-cols-7 w-[600px] h-[100px]  p-2  ">
            {new Array(7).fill().map((_, i) => (
              <button
                key={i}
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={() => handleMouseLeave(i)}
                onClick={() => handleClick(i)}
              >
                <img src={chip[i]} alt={`chip-${i}`} />
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="w-[600px] h-[520px] grid grid-rows-6 grid-cols-7 gap-2 bg-sky-700 p-2 rounded-lg shadow-2xl outline-8 outline-sky-900 outline-none outline-offset-0">
        {board.flat().map((item) => (
          <img src={item.value} key={item.id} alt={item.id} />
        ))}
      </div>
      <div className="w-full flex justify-center">
        <button
          onClick={handleNewGame}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4 mr-4"
        >
          New Game
        </button>
        <button
          onClick={onReset}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Reset Score
        </button>
      </div>
    </>
  );
}

export default Connect4Grid;
