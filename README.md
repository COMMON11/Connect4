# Connect 4 game

check out the project at 👉 [Link](https://common11.github.io/Connect4/)

## Explanation

### Generating board

The board is an 2D array of img sources, initially all elements are given the scource of blank chip.

> A typical board of Connect4 is of the dimensions 6 rows x 7 columns

```jsx
import Blank from "./assets/Blank.svg";
```

```jsx
useEffect(() => {
  const initialBoard = new Array(6)
    .fill()
    .map((_, i) =>
      new Array(7).fill().map((_, j) => ({ id: `${i}-${j}`, value: Blank }))
    );
  setBoard(initialBoard);
}, []);
```

Rendering the board:

```jsx
...
return(
<div>
{board.flat().map((item) => (
    <img src={item.value} key={item.id} alt={item.id} />
))}
</div>
...
)
```

Output generated with styling:

![Image](/public/board.png)

### Inserting chips

An array of 7 elements of buttons is used to represent each column in which chips can be placed.
This array is placed on top of the board for easy interpretation by the user.

```jsx
const [chip, setChip] = useState(new Array(7).fill(TransparentChip));
```

> **TransparentChip** is Blank chip with opacity of 0

```jsx
    return(
    ...
      <div>
        {!winCondition && (
          <div>
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
    ...
    )
```

The rendered top column with styling:

![Image](/public/topColumn.png)

As you have have noticed, there are 3 actions to each button has 3 actions: **onMouseEnter**, **onMouseLeave** and **onClick**

**onMouseEnter** and **onMouseLeave**:

These functions are used to temporarily add the chip to indicate to the player whose turn it is and on which column the chip will be placed. Futhermore a preview of where the chipp will be placed is shown to the user.

The app knows which button's image should change as during rendering, each button is given an index which is provided to the funciton when its called.

```jsx
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
```

> **Trans_Red_chip** and **Trnas_Yellow_chip** are **Red_chip** and **Yellow_chip** with 0.5 opacity

Examples of hovering mouse on button:

![Imange](/public/hoverChipEx1.png){width=250} ![Imange](/public/hoverChipEx2.png){width=250}

**onClick**:
We already have know which **column** the chip is to be placed as the **index** of the button that is pressed gives us that information.

Since in real life, the chips fall down to occupy the bottommost availible slot, we implement the same by inserting chips from the bottom up.

The onClick fuction starts from the bottom row and moves up uptil it finds an element either with **Trans_Red_chip** or **Trans_Yellow_chip** because when the mouse was hovering over the column in which chip was to be placed, the availible slot had one of these 2 chips instead of **Blank chip**.

```jsx
  async function handleClick(index) {
    const chipColour = turn === "P1" ? RedChip : YellowChip;
    const TransChipColour = turn === "P1" ? Trans_Yellow_chip : Trans_Red_chip;
    for (let i = 5; i >= 0; i--) {
      if (
        board[i][index].value === Trans_Red_chip ||
        board[i][index].value === Trans_Yellow_chip
      ) {
        ...
      }
    }
    ...
  }
```

when condition is met, updateBoard function is called which places the chip at the giver location

```jsx
...
updateBoardValue(i, index, chipColour);
...
```

```jsx
const updateBoardValue = (x, y, newValue) => {
  const updatedVar = [...board];
  updatedVar[x][y].value = newValue;
  setBoard(updatedVar);
};
```

After placing the chip, the turn is changed:

```jsx
setTurn((prevTurn) => (prevTurn === "P1" ? "P2" : "P1"));
```

### Checking for win condition

After each chip is placed, The game checks if a player has won. This is done by checking for the existance of the same chip in directions **North and South**, **West and East**, **North-West and South-East** and **North-East and South-West** relative to the chip placed most recently:

![Image](/public/CheckExample.png)

Code example for **West and East** checking:

```jsx
//CheckWinCondition.jsx
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
```

and finally:

```jsx
...
const isWin = checkWinCondition(board, i, index);
setWinCondition(isWin);

if (isWin) {
    setWinner(turn);
    onWin(turn);
}
...
```
