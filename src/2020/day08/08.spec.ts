import { read } from '.'
import { solveA, solveB } from './08'

describe('Day 08', () => {
  describe('Part 1', () => {
    it('Example 1', () => {
      expect(solveA(read('example1.txt'))).toBe(5)
    })
    it('Solution', () => {
      expect(solveA(read())).toBe(1949)
    })
  })
  describe('Part 2', () => {
    it('Example 1', () => {
      expect(solveB(read('example1.txt'))).toBe(8)
    })
    it('Solution', () => {
      expect(solveB(read())).toBe(2092)
    })
  })
})
