import { read } from '.'
import { solveA, solveB } from './03'

describe('Day 03', () => {
  describe('Part 1', () => {
    it('Example 1', () => {
      expect(solveA(read('example1.txt'))).toBe(7)
    })
    it('Solution', () => {
      expect(solveA(read())).toBe(181)
    })
  })
  describe('Part 2', () => {
    it('Example 1', () => {
      expect(solveB(read('example1.txt'))).toBe(336)
    })
    it('Solution', () => {
      expect(solveB(read())).toBe(1260601650)
    })
  })
})
