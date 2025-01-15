const Game = require('../src/game').default
const fs = require('fs')

describe('App', () => {
  it('Contains the compiled JavaScript', async () => {
    const data = await fs.promises.readFile('./public/main.js', 'utf8')
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
        for (let c = 0; c < game.board[r].length; c++) { // Fixed typo: `lenght` -> `length`
          expect(game.board[r][c]).toBeUndefined()
        }
      }
    })

    it('Starts the game with a random player', () => {
      Math.random = () => 0.4
      expect(new Game(p1, p2).player).toBe('Salem')

      Math.random = () => 0.6
      expect(new Game(p1, p2).player).toBe('Nate')
    })
  })

  describe('turn', () => {
    it("Inserts an 'X' into the top center", () => {
      game.turn(0, 1)
      expect(game.board[0][1]).toBe('X')
    })

    it("Inserts an 'X' into the top left", () => {
      game.turn(0, 0) // Added missing column argument to align with function expectations
      expect(game.board[0][0]).toBe('X')
    })
  })

  describe('nextPlayer', () => {
    it('Sets the current player to be whoever it is not', () => {
      Math.random = () => 0.4
      const game = new Game(p1, p2)
      expect(game.player).toBe('Salem')
      game.nextPlayer()
      expect(game.player).toBe('Nate')
    })
  })

  describe('hasWinner', () => {
    it('Wins if any row is filled', () => {
      for (let r = 0; r < game.board.length; r++) {
        for (let c = 0; c < game.board[r].length; c++) {
          game.board[r][c] = 'X'
        }
        expect(game.hasWinner()).toBe(true)

        for (let c = 0; c < game.board[r].length; c++) {
          game.board[r][c] = null
        }
      }
    })

    it('Wins if any column is filled', () => {
      for (let c = 0; c < game.board[0].length; c++) {
        for (let r = 0; r < game.board.length; r++) { // Fixed loop structure to iterate columns
          game.board[r][c] = 'X'
        }
        expect(game.hasWinner()).toBe(true)

        for (let r = 0; r < game.board.length; r++) {
          game.board[r][c] = null
        }
      }
    })

    it('Wins if down-left diagonal is filled', () => {
      for (let r = 0; r < game.board.length; r++) {
        game.board[r][r] = 'X'
      }
      expect(game.hasWinner()).toBe(true)
    })

    it('Wins if up-right diagonal is filled', () => {
      for (let r = 0; r < game.board.length; r++) {
        game.board[game.board.length - 1 - r][r] = 'X' // Adjusted for dynamic board size
      }
      expect(game.hasWinner()).toBe(true)
    })
  })
})
