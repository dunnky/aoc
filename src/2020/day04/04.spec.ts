import { read } from '.'
import { solveA, solveB } from './04'

describe('Day 04', () => {
  describe('Part 1', () => {
    it('Example 1', () => {
      expect(solveA(read('example1.txt'))).toBe(2)
    })
    it('Solution', () => {
      expect(solveA(read())).toBe(256)
    })
  })
  describe('Part 2', () => {
    it('Example 1', () => {
      expect(solveB(read('example1.txt'))).toBe(2)
    })
    it('Example 2', () => {
      expect(solveB(read('example2.txt'))).toBe(0)
    })
    it('Example 3', () => {
      expect(solveB(read('example3.txt'))).toBe(4)
    })
    it('Solution', () => {
      expect(solveB(read())).toBe(198)
    })
  })
})
