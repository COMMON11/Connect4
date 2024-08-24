import Blank from "./assets/Blank.svg";
import YellowChip from "./assets/Yellow_chip.svg";
import RedChip from "./assets/Red_chip.svg";
import TransparentChip from "./assets/Transparent_chip.svg";
import Trans_Red_chip from "./assets/Trans_Red_chip.svg";
import Trans_Yellow_chip from "./assets/Trans_Yellow_chip.svg";

import { useState, useEffect } from "react";

function Connect4Grid() {
  const [turn, setTurn] = useState("P1");

  const [chip, setChip] = useState(new Array(7).fill(TransparentChip));
  const [board, setBoard] = useState([]);

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

  const handleClick = (index) => {
    const chipColour = turn === "P1" ? RedChip : YellowChip;
    const TransChipColour = turn === "P1" ? Trans_Yellow_chip : Trans_Red_chip;

    for (let i = 5; i >= 0; i--) {
      if (
        board[i][index].value === Trans_Red_chip ||
        board[i][index].value === Trans_Yellow_chip
      ) {
        updateBoardValue(i, index, chipColour);

        if (checkWinCondition(i, index)) {
          alert(`${turn} wins!`);
          return;
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
  };

  const checkWinCondition = (row, col) => {
    const currentChip = board[row][col].value;

    // Check horizontal line
    let count = 1;
    for (let j = col - 1; j >= 0 && board[row][j].value === currentChip; j--) {
      count++;
    }
    for (let j = col + 1; j < 7 && board[row][j].value === currentChip; j++) {
      count++;
    }
    if (count >= 4) {
      return true;
    }

    // Check vertical line
    count = 1;
    for (let i = row - 1; i >= 0 && board[i][col].value === currentChip; i--) {
      count++;
    }
    for (let i = row + 1; i < 6 && board[i][col].value === currentChip; i++) {
      count++;
    }
    if (count >= 4) {
      return true;
    }

    // Check diagonal lines (top-left to bottom-right and top-right to bottom-left)
    count = 1;
    for (
      let i = row - 1, j = col - 1;
      i >= 0 && j >= 0 && board[i][j].value === currentChip;
      i--, j--
    ) {
      count++;
    }
    for (
      let i = row + 1, j = col + 1;
      i < 6 && j < 7 && board[i][j].value === currentChip;
      i++, j++
    ) {
      count++;
    }
    if (count >= 4) {
      return true;
    }

    count = 1;
    for (
      let i = row - 1, j = col + 1;
      i >= 0 && j < 7 && board[i][j].value === currentChip;
      i--, j++
    ) {
      count++;
    }
    for (
      let i = row + 1, j = col - 1;
      i < 6 && j >= 0 && board[i][j].value === currentChip;
      i++, j--
    ) {
      count++;
    }
    if (count >= 4) {
      return true;
    }

    return false;
  };

  return (
    <>
      <div className="grid grid-rows-1 grid-cols-7 w-[600px] h-[100px]  p-2">
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
      <div className="w-[600px] h-[520px] grid grid-rows-6 grid-cols-7 gap-2 bg-sky-700 p-2 rounded-lg shadow-2xl outline-8 outline-sky-900 outline-none outline-offset-0">
        {board.flat().map((item) => (
          <img src={item.value} key={item.id} alt={item.id} />
        ))}
      </div>
    </>
  );
}

export default Connect4Grid;
