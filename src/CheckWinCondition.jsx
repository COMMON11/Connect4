const checkWinCondition = (board, row, col) => {
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

export default checkWinCondition;
