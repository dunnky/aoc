import { read } from '.'
import { solveA, solveB } from './11'

describe('Day 11', () => {
  describe('Part 1', () => {
    it('Example 1', () => {
      expect(solveA(read('example1.txt'))).toBe(37)
    })
    it('Solution', () => {
      expect(solveA(read())).toBe(2283)
    })
  })
  describe('Part 2', () => {
    it('Example 1', () => {
      expect(solveB(read('example1.txt'))).toBe(26)
    })
    it('Solution', () => {
      expect(solveB(read())).toBe(2054)
    })
  })
})
