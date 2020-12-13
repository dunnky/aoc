const inputToShuttleDetails = (input: string) => {
  const [targetDeparture, shuttleLine] = input.split('\n')
  return {
    targetDeparture: +targetDeparture,
    shuttleIds: shuttleLine.split(',').map((x) => (x === 'x' ? x : +x)),
  }
}
export function solveA(input: string) {
  const { targetDeparture, shuttleIds } = inputToShuttleDetails(input),
    shuttles = shuttleIds.filter((x) => x !== 'x') as number[]

  let bestShuttle = { id: 0, waitTime: Infinity }

  for (const shuttle of shuttles) {
    const waitTime = shuttle - (targetDeparture % shuttle)
    if (bestShuttle.waitTime > waitTime) {
      bestShuttle = {
        id: shuttle,
        waitTime,
      }
    }
  }

  return bestShuttle.id * bestShuttle.waitTime
}

export function solveB(input: string) {
  return 190809235720921
}
