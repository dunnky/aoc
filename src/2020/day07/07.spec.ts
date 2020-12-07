import { read } from '.'
import { solveA, solveB } from './07'

describe('Day 07', () => {
  describe('Part 1', () => {
    it('Example 1', () => {
      expect(solveA(read('example1.txt'))).toBe(4)
    })
    it('Solution', () => {
      expect(solveA(read())).toBe(208)
    })
  })
  describe('Part 2', () => {
    it('Example 1', () => {
      expect(solveB(read('example1.txt'))).toBe(32)
    })
    it('Solution', () => {
      expect(solveB(read())).toBe(1664)
    })
  })
})
