import { read } from '.'
import { solveA, solveB } from './13'

describe('Day 13', () => {
  describe('Part 1', () => {
    it('Example 1', () => {
      expect(solveA(read('example1.txt'))).toBe(295)
    })
    it('Solution', () => {
      expect(solveA(read())).toBe(3385)
    })
  })
  describe('Part 2', () => {
    it('Example 1', () => {
      expect(solveB(read('example1.txt'))).toBe(1068781)
    })
    it('Example 2', () => {
      expect(solveB(read('example2.txt'))).toBe(3417)
    })
    it('Example 3', () => {
      expect(solveB(read('example3.txt'))).toBe(754018)
    })
    it('Example 4', () => {
      expect(solveB(read('example4.txt'))).toBe(779210)
    })
    it('Example 5', () => {
      expect(solveB(read('example5.txt'))).toBe(1261476)
    })
    it('Example 6', () => {
      expect(solveB(read('example6.txt'))).toBe(1202161486)
    })

    it('Solution', () => {
      expect(solveB(read())).toBe(600689120448303)
    })
  })
})
