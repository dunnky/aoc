const parseInput = (input: string) => {
  return input.split(',').map(Number)
}

export function solveA(input: string, turnCount = 2020) {
  const startingNumbers = parseInput(input),
    latest = new Map<number, number>()

  let prevNumber = 0
  for (let i = 0; i < startingNumbers.length; i++) {
    latest.set(startingNumbers[i], i)
    prevNumber = startingNumbers[i]
  }
  for (let i = startingNumbers.length; i < turnCount; i++) {
    const latestTurn = latest.get(prevNumber),
      latestTurnDiff = latestTurn === undefined ? 0 : i - 1 - latestTurn
    latest.set(prevNumber, i - 1)
    prevNumber = latestTurnDiff
  }
  return prevNumber
}

export function solveB(input: string) {
  return solveA(input, 30000000)
}
