import { product } from '@utils'

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

const findNextMatch = (startAt: number, jumpBy: number, divisor: number, remainder: number) => {
  let curr = startAt
  while (true) {
    if ((curr + remainder) % divisor === 0) {
      return curr
    }
    curr += jumpBy
  }
}

export function solveB(input: string) {
  const { shuttleIds } = inputToShuttleDetails(input),
    indexById = shuttleIds.reduce((acc: { [key: number]: number }, shuttleId, index) => {
      if (shuttleId !== 'x') {
        acc[shuttleId] = index
      }
      return acc
    }, {}),
    ids = Object.keys(indexById).map(Number),
    matched: number[] = []

  let match = ids[0]
  for (const id of ids) {
    match = findNextMatch(match, product(matched), id, indexById[id])
    matched.push(id)
  }
  return match
}
