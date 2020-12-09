const inputToNumbers = (input: string) => input.split('\n').map(Number),
  findInvalidNumber = (numbers: number[], preambleCount: number) => {
    const sums: number[][] = []
    for (let i = 0; i <= numbers.length - preambleCount; i++) {
      sums[i] = []
      for (let j = 1; j < preambleCount; j++) {
        sums[i].push(numbers[i] + numbers[i + j])
      }
    }
    for (let m = preambleCount; m < numbers.length; m++) {
      let valid = false
      for (let n = m - preambleCount; n < m; n++) {
        if (sums[n].includes(numbers[m])) {
          valid = true
          break
        }
      }
      if (!valid) {
        return numbers[m]
      }
    }
    return 0
  }

export function solveA(input: string, preambleCount: number) {
  return findInvalidNumber(inputToNumbers(input), preambleCount)
}

export function solveB(input: string, preambleCount: number) {
  const numbers = inputToNumbers(input),
    targetSum = findInvalidNumber(numbers, preambleCount)

  for (let i = 0; i < numbers.length - 1; i++) {
    for (let j = i + 1, currSum = numbers[i]; j < numbers.length && currSum < targetSum; j++) {
      currSum += numbers[j]
      if (currSum === targetSum) {
        const range = numbers.slice(i, j + 1)
        range.sort((a, b) => b - a)
        return range[0] + range[range.length - 1]
      }
    }
  }
}
