import { read } from '.'
import { solveA, solveB } from './05'

describe('Day 05', () => {
  describe('Part 1', () => {
    it('Example 1', () => {
      expect(solveA(read('example1.txt'))).toBe(820)
    })
    it('Solution', () => {
      expect(solveA(read())).toBe(885)
    })
  })
  describe('Part 2', () => {
    it('Solution', () => {
      expect(solveB(read())).toBe(623)
    })
  })
})
