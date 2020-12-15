import { solveA, solveB } from './15'

describe('Day 15', () => {
  describe('Part 1', () => {
    it('Example 1', () => {
      expect(solveA('0,3,6')).toBe(436)
    })
    it('Solution', () => {
      expect(solveA('14,1,17,0,3,20')).toBe(387)
    })
  })
  describe('Part 2', () => {
    it('Example 1', () => {
      expect(solveB('0,3,6')).toBe(175594)
    })
    it('Solution', () => {
      expect(solveB('14,1,17,0,3,20')).toBe(6428)
    })
  })
})
