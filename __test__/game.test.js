const Game = require('../src/game').default
const fs = require('fs').promises

describe('App', () => {
  it('Contains the compiled JavaScript', async () => {
    const data = await fs.readFile('./public/main.js', 'utf8')
    expect(data).toMatchSnapshot()
  })
})

describe('Game', () => {
  let game, p1, p2

  beforeEach(() => {
    p1 = 'Salem'
    p2 = 'Nate'
    game = new Game(p1, p2)
  })

  describe('Game', () => {
    it('Initializes with two players', () => {
      expect(game.p1).toBe('Salem')
      expect(game.p2).toBe('Nate')
    })

    it('Initializes with an empty board', () => {
      for (let r = 0; r < game.board.length; r++) {
        for (let c = 0; c < game.board[r].length; c++) {
          expect(game.board[r][c]).toBeNull()
        }
      }
    })

    it('Starts the game with a random player', () => {
      Math.random = jest.fn(() => 0.4)
      expect(new Game(p1, p2).player).toBe('Salem')

      Math.random = jest.fn(() => 0.6)
      expect(new Game(p1, p2).player).toBe('Nate')
    })
  })

  describe('turn', () => {
    it("Inserts an 'X' into the specified cell", () => {
      game.turn(0, 1)
      expect(game.board[0][1]).toBe('X')
    })

    it("Inserts an 'X' into the top-left cell", () => {
      game.turn(0, 0)
      expect(game.board[0][0]).toBe('X')
    })
  })

  describe('nextPlayer', () => {
    it('Sets the current player to the other player', () => {
      Math.random = jest.fn(() => 0.4)
      const newGame = new Game(p1, p2)
      expect(newGame.player).toBe('Salem')
      newGame.nextPlayer()
      expect(newGame.player).toBe('Nate')
    })
  })

  describe('hasWinner', () => {
    it('Wins if any row is filled', () => {
      for (let r = 0; r < game.board.length; r++) {
        game.board[r] = ['X', 'X', 'X']
        expect(game.hasWinner()).toBe(true)
        game.board[r] = [null, null, null] // Reset the row
      }
    })

    it('Wins if any column is filled', () => {
      for (let c = 0; c < game.board[0].length; c++) {
        for (let r = 0; r < game.board.length; r++) {
          game.board[r][c] = 'X'
        }
        expect(game.hasWinner()).toBe(true)
        for (let r = 0; r < game.board.length; r++) {
          game.board[r][c] = null // Reset the column
        }
      }
    })

    it('Wins if the down-left diagonal is filled', () => {
      for (let r = 0; r < game.board.length; r++) {
        game.board[r][r] = 'X'
      }
      expect(game.hasWinner()).toBe(true)
    })

    it('Wins if the up-right diagonal is filled', () => {
      for (let r = 0; r < game.board.length; r++) {
        game.board[2 - r][r] = 'X'
      }
      expect(game.hasWinner()).toBe(true)
    })

    it('Returns false if there is no winner', () => {
      expect(game.hasWinner()).toBe(false)
    })
  })
})
