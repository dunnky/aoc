import { sum } from '@utils'

const inputToSeats = (input: string) => {
    return input.split('\n').map((line) => [...line])
  },
  seatsToSeatAdjacencyMap = (seats: string[][]) => {
    const map: { [key: string]: [number, number][] } = {}
    for (let r = 0; r < seats.length; r++) {
      for (let c = 0; c < seats[0].length; c++) {
        map[`${r}|${c}`] = [
          [-1, -1],
          [-1, +0],
          [-1, +1],
          [+0, -1],
          [+0, +1],
          [+1, -1],
          [+1, +0],
          [+1, +1],
        ]
          .map(([rInc, cInc]) => (seats[r + rInc]?.[c + cInc] ? [r + rInc, c + cInc] : undefined))
          .filter((x) => x) as [number, number][]
      }
    }
    return map
  },
  findNextVisibleSeat = (
    seats: string[][],
    fromIndex: [number, number],
    rInc: number,
    cInc: number
  ): [number, number] | undefined => {
    let r = fromIndex[0],
      c = fromIndex[1],
      seatValue: string | undefined
    do {
      r += rInc
      c += cInc
      seatValue = seats[r]?.[c]
    } while (seatValue && seatValue !== 'L')

    return seatValue === 'L' ? [r, c] : undefined
  },
  seatsToSeatVisibilityMap = (seats: string[][]) => {
    const map: { [key: string]: [number, number][] } = {}
    for (let r = 0; r < seats.length; r++) {
      for (let c = 0; c < seats[0].length; c++) {
        map[`${r}|${c}`] = [
          findNextVisibleSeat(seats, [r, c], -1, -1),
          findNextVisibleSeat(seats, [r, c], -1, +0),
          findNextVisibleSeat(seats, [r, c], -1, +1),
          findNextVisibleSeat(seats, [r, c], +0, -1),
          findNextVisibleSeat(seats, [r, c], +0, +1),
          findNextVisibleSeat(seats, [r, c], +1, -1),
          findNextVisibleSeat(seats, [r, c], +1, +0),
          findNextVisibleSeat(seats, [r, c], +1, +1),
        ].filter((x) => x) as [number, number][]
      }
    }
    return map
  },
  updateSeats = (
    seats: string[][],
    neighborMap: { [key: string]: [number, number][] },
    crowdedCount: number
  ) => {
    const newSeats: string[][] = [],
      seatAt = (r: number, c: number) => (seats[r]?.[c] === '#' ? 1 : 0)

    for (let r = 0; r < seats.length; r++) {
      newSeats[r] = []
      for (let c = 0; c < seats[0].length; c++) {
        const currSeat = seats[r][c]
        if (currSeat === '.') {
          newSeats[r][c] = '.'
          continue
        }
        const neighborSeatLocations = neighborMap[`${r}|${c}`],
          occupiedNeighborCount =
            neighborSeatLocations.length === 0
              ? 0
              : sum(neighborSeatLocations.map(([nr, nc]) => seatAt(nr, nc)))
        if (currSeat === '#' && occupiedNeighborCount >= crowdedCount) {
          newSeats[r][c] = 'L'
        } else if (currSeat === 'L' && occupiedNeighborCount === 0) {
          newSeats[r][c] = '#'
        } else {
          newSeats[r][c] = currSeat
        }
      }
    }
    return newSeats
  },
  isSeatingChartStable = (prev: string[][], curr: string[][]) => {
    for (let r = 0; r < prev.length; r++) {
      for (let c = 0; c < prev[0].length; c++) {
        if (prev[r][c] !== curr[r][c]) {
          return false
        }
      }
    }
    return true
  }

export function solveA(input: string) {
  const seats = inputToSeats(input),
    seatAdjacencyMap = seatsToSeatAdjacencyMap(seats)
  let currSeats = seats,
    prevSeats: string[][]
  do {
    prevSeats = currSeats
    currSeats = updateSeats(prevSeats, seatAdjacencyMap, 4)
  } while (!isSeatingChartStable(prevSeats, currSeats))

  return sum(currSeats.map((row) => sum(row.map((seat) => (seat === '#' ? 1 : 0)))))
}

export function solveB(input: string) {
  const seats = inputToSeats(input),
    seatVisibilityMap = seatsToSeatVisibilityMap(seats)
  let currSeats = seats,
    prevSeats: string[][]
  do {
    prevSeats = currSeats
    currSeats = updateSeats(prevSeats, seatVisibilityMap, 5)
  } while (!isSeatingChartStable(prevSeats, currSeats))

  return sum(currSeats.map((row) => sum(row.map((seat) => (seat === '#' ? 1 : 0)))))
}
