import { read } from '.'
import { solveA, solveB } from './12'

describe('Day 12', () => {
  describe('Part 1', () => {
    it('Example 1', () => {
      expect(solveA(read('example1.txt'))).toBe(25)
    })
    it('Solution', () => {
      expect(solveA(read())).toBe(820)
    })
  })
  describe('Part 2', () => {
    it('Example 1', () => {
      expect(solveB(read('example1.txt'))).toBe(286)
    })
    it('Solution', () => {
      expect(solveB(read())).toBe(66614)
    })
  })
})
