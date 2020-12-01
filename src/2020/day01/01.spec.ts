import { read } from '.'
import { solveA, solveB, solve } from './01'

describe('Day 01', () => {
  describe('Part 1', () => {
    it('Example 1', () => {
      expect(solveA(read('example1.txt'))).toBe(514579)
      expect(solve(read('example1.txt'), 2, 2020)).toBe(514579)
    })
    it('Solution', () => {
      expect(solveA(read())).toBe(842016)
      expect(solve(read(), 2, 2020)).toBe(842016)
    })
  })
  describe('Part 2', () => {
    it('Example 1', () => {
      expect(solveB(read('example1.txt'))).toBe(241861950)
      expect(solve(read('example1.txt'), 3, 2020)).toBe(241861950)
    })
    it('Solution', () => {
      expect(solveB(read())).toBe(9199664)
      expect(solve(read(), 3, 2020)).toBe(9199664)
    })
  })
})
