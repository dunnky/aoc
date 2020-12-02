import { read } from '.'
import { solveA, solveB } from './02'

describe('Day 02', () => {
  describe('Part 1', () => {
    it('Example 1', () => {
      expect(solveA(read('example1.txt'))).toBe(2)
    })
    it('Solution', () => {
      expect(solveA(read())).toBe(538)
    })
  })
  describe('Part 2', () => {
    it('Example 1', () => {
      expect(solveB(read('example1.txt'))).toBe(1)
    })
    it('Solution', () => {
      expect(solveB(read())).toBe(489)
    })
  })
})
