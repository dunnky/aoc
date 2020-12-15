const parseInput = (input: string) => {
  return input.split(',').map(Number)
}

export function solveA(input: string, numberAt = 2020) {
  const startingNumbers = parseInput(input),
    lastSpokeMap = new Map<number, number>()

  let prevNumber = 0
  for (let i = 0; i < startingNumbers.length; i++) {
    lastSpokeMap.set(startingNumbers[i], i)
    prevNumber = startingNumbers[i]
  }
  for (let i = startingNumbers.length; i < numberAt; i++) {
    const lastSpokeAtStep = lastSpokeMap.get(prevNumber),
      lastSpokeStepsAgo = lastSpokeAtStep === undefined ? 0 : i - 1 - lastSpokeAtStep
    lastSpokeMap.set(prevNumber, i - 1)
    prevNumber = lastSpokeStepsAgo
  }
  return prevNumber
}

export function solveB(input: string) {
  return solveA(input, 30000000)
}
