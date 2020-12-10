import { read } from '.'
import { solveA, solveB } from './10'

describe('Day 10', () => {
  describe('Part 1', () => {
    it('Example 1', () => {
      expect(solveA(read('example1.txt'))).toBe(35)
    })
    it('Example 2', () => {
      expect(solveA(read('example2.txt'))).toBe(220)
    })
    it('Solution', () => {
      expect(solveA(read())).toBe(2376)
    })
  })
  describe('Part 2', () => {
    it('Example 1', () => {
      expect(solveB(read('example1.txt'))).toBe(8)
    })
    it('Example 2', () => {
      expect(solveB(read('example2.txt'))).toBe(19208)
    })
    it('Solution', () => {
      expect(solveB(read())).toBe(129586085429248)
    })
  })
})
