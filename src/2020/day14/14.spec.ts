import { read } from '.'
import { solveA, solveB } from './14'

describe('Day 14', () => {
  describe('Part 1', () => {
    it('Example 1', () => {
      expect(solveA(read('example1.txt'))).toBe('165')
    })
    it('Solution', () => {
      expect(solveA(read())).toBe('17934269678453')
    })
  })
  describe('Part 2', () => {
    it('Example 1', () => {
      expect(solveB(read('example2.txt'))).toBe(208)
    })
    it('Solution', () => {
      expect(solveB(read())).toBe(3440662844064)
    })
  })
})
