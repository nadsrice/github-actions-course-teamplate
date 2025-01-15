class Game {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;
    this.board = Array(3).fill(null).map(() => Array(3).fill(undefined)); // Empty 3x3 board
    this.player = Math.random() < 0.5 ? p1 : p2; // Random player
  }

  turn(row, col) {
    if (!this.board[row][col]) {
      this.board[row][col] = this.player === this.p1 ? 'X' : 'O'; // X for p1, O for p2
      this.nextPlayer();
    }
  }

  nextPlayer() {
    this.player = this.player === this.p1 ? this.p2 : this.p1;
  }

  hasWinner() {
    // Check rows, columns, and diagonals
    for (let r = 0; r < 3; r++) {
      if (this.board[r][0] && this.board[r][0] === this.board[r][1] && this.board[r][1] === this.board[r][2]) {
        return true;
      }
    }

    for (let c = 0; c < 3; c++) {
      if (this.board[0][c] && this.board[0][c] === this.board[1][c] && this.board[1][c] === this.board[2][c]) {
        return true;
      }
    }

    if (this.board[0][0] && this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]) {
      return true;
    }

    if (this.board[2][0] && this.board[2][0] === this.board[1][1] && this.board[1][1] === this.board[0][2]) {
      return true;
    }

    return false;
  }
}

module.exports = Game;
