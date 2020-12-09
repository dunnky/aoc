import { read } from '.'
import { solveA, solveB } from './09'

describe('Day 09', () => {
  describe('Part 1', () => {
    it('Example 1', () => {
      expect(solveA(read('example1.txt'), 5)).toBe(127)
    })
    it('Solution', () => {
      expect(solveA(read(), 25)).toBe(1212510616)
    })
  })
  describe('Part 2', () => {
    it('Example 1', () => {
      expect(solveB(read('example1.txt'), 5)).toBe(62)
    })
    it('Solution', () => {
      expect(solveB(read(), 25)).toBe(171265123)
    })
  })
})
