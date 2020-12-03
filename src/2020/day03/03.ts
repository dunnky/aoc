import { product } from '@utils'

const inputToGrid = (input: string) => input.split('\n').map((line) => [...line]),
  pointsOnSlope = (height: number, width: number, rise: number, run: number) => {
    const points: [number, number][] = []
    for (let row = 0; row < height; row += rise) {
      points.push([row, ((row / rise) * run) % width])
    }
    return points
  },
  treeCountForSlope = (grid: string[][], rise: number, run: number) => {
    return pointsOnSlope(grid.length, grid[0].length, rise, run).reduce(
      (acc, [row, col]) => (grid[row][col] === '#' ? acc + 1 : acc),
      0
    )
  }

export function solveA(input: string) {
  return treeCountForSlope(inputToGrid(input), 1, 3)
}

export function solveB(input: string) {
  const grid = inputToGrid(input),
    slopes = [
      [1, 1],
      [1, 3],
      [1, 5],
      [1, 7],
      [2, 1],
    ] as const
  return product(slopes.map(([rise, run]) => treeCountForSlope(grid, rise, run)))
}
