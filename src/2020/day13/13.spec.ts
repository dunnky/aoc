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
    it('Solution', () => {
      expect(solveB(read(), 1e14)).toBe(0)
    })
  })
})
