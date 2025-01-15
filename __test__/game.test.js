const fs = require('fs');
const Game = require('../src/game'); // Adjust the path to where your Game class is located

describe('App', () => {
  it('Contains the compiled JavaScript', async () => {
    const data = await fs.promises.readFile('./public/main.js', 'utf8');
    expect(data).toMatchSnapshot();
  });
});

describe('Game', () => {
  let game;
  const p1 = 'Salem';
  const p2 = 'Nate';

  beforeEach(() => {
    game = new Game(p1, p2);
  });

  describe('Game', () => {
    it('Initializes with two players', () => {
      expect(game.p1).toBe('Salem');
      expect(game.p2).toBe('Nate');
    });

    it('Initializes with an empty board', () => {
      for (let r = 0; r < game.board.length; r++) {
        for (let c = 0; c < game.board[r].length; c++) {
          expect(game.board[r][c]).toBeUndefined(); // Ensuring undefined values
        }
      }
    });

    it('Starts the game with a random player', () => {
      Math.random = () => 0.6; // Mocking random value
      expect(new Game(p1, p2).player).toBe('Nate');
    });
  });

  describe('turn', () => {
    it('Inserts an "X" into the top center', () => {
      game.turn(0, 1);
      expect(game.board[0][1]).toBe('X');
    });

    it('Inserts an "X" into the top left', () => {
      game.turn(0, 0);
      expect(game.board[0][0]).toBe('X');
    });
  });

  describe('nextPlayer', () => {
    it('Sets the current player to be whoever it is not', () => {
      expect(game.player).toBe('Salem');
      game.nextPlayer();
      expect(game.player).toBe('Nate');
    });
  });

  describe('hasWinner', () => {
    it('Wins if any row is filled', () => {
      game.board[0] = ['X', 'X', 'X'];
      expect(game.hasWinner()).toBe(true);
    });

    it('Wins if any column is filled', () => {
      game.board[0][1] = 'X';
      game.board[1][1] = 'X';
      game.board[2][1] = 'X';
      expect(game.hasWinner()).toBe(true);
    });

    it('Wins if down-left diagonal is filled', () => {
      game.board[0][0] = 'X';
      game.board[1][1] = 'X';
      game.board[2][2] = 'X';
      expect(game.hasWinner()).toBe(true);
    });

    it('Wins if up-right diagonal is filled', () => {
      game.board[0][2] = 'X';
      game.board[1][1] = 'X';
      game.board[2][0] = 'X';
      expect(game.hasWinner()).toBe(true);
    });
  });
});
