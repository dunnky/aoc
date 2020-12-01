import { product, sum } from '@utils'

export const solveA = (input: string) => {
  const numbers = input.split('\n').map(Number),
    targetNumber = numbers.find((n) => numbers.includes(2020 - n)) || 0
  return (2020 - targetNumber) * targetNumber
}

export const solveB = (input: string) => {
  const numbers = input.split('\n').map(Number)
  for (let a = 0; a < numbers.length - 2; a++) {
    for (let b = a + 1; b < numbers.length - 1; b++) {
      for (let c = b + 1; c < numbers.length; c++) {
        if (sum([numbers[a], numbers[b], numbers[c]]) === 2020) {
          return product([numbers[a], numbers[b], numbers[c]])
        }
      }
    }
  }
}

const omitIndex = <T>(source: T[], index: number) => {
    const dest = [...source]
    dest.splice(index, 1)
    return dest
  },
  findSubsetWithSum = (numbers: number[], size: number, sum: number): number[] | undefined => {
    for (const [index, number] of numbers.entries()) {
      if (size === 1) {
        if (number === sum) {
          return [number]
        }
      } else if (sum - number > 0) {
        const matchingSet = findSubsetWithSum(omitIndex(numbers, index), size - 1, sum - number)
        if (matchingSet) {
          return [number, ...matchingSet]
        }
      }
    }
  }

export const solve = (input: string, subsetSize: number, subsetSum: number) => {
  const numbers = input.split('\n').map(Number)
  return product(findSubsetWithSum(numbers, subsetSize, subsetSum))
}
