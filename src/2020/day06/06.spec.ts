import { read } from '.'
import { solveA, solveB } from './06'

describe('Day 06', () => {
  describe('Part 1', () => {
    it('Example 1', () => {
      expect(solveA(read('example1.txt'))).toBe(11)
    })
    it('Solution', () => {
      expect(solveA(read())).toBe(6291)
    })
  })
  describe('Part 2', () => {
    it('Example 1', () => {
      expect(solveB(read('example1.txt'))).toBe(6)
    })
    it('Solution', () => {
      expect(solveB(read())).toBe(3052)
    })
  })
})
