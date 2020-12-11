import { sum } from '@utils'

type SeatLoc = [number, number]
type SeatMap = SeatLoc[][][]
type MemoizedSeats = { locations: SeatLoc[]; map: SeatMap }

const inputToSeats = (input: string) => {
    return input.split('\n').map((line) => [...line])
  },
  adjacencyIncrements = [
    [-1, -1],
    [-1, +0],
    [-1, +1],
    [+0, -1],
    [+0, +1],
    [+1, -1],
    [+1, +0],
    [+1, +1],
  ],
  memoizeSeatAdjacency = (seats: string[][]) => {
    const locations: SeatLoc[] = [],
      map: SeatMap = [...seats.map(() => [])]
    for (let r = 0; r < seats.length; r++) {
      for (let c = 0; c < seats[0].length; c++) {
        if (seats[r][c] === 'L') {
          locations.push([r, c])
          map[r][c] = adjacencyIncrements.reduce((acc: SeatLoc[], [rInc, cInc]) => {
            return acc.concat(seats[r + rInc]?.[c + cInc] ? [[r + rInc, c + cInc]] : [])
          }, [])
        }
      }
    }
    return { locations, map }
  },
  memoizeSeatVisibility = (seats: string[][]) => {
    const locations: SeatLoc[] = [],
      map: SeatMap = [...seats.map(() => [])],
      nextVisibleSeat = ([r, c]: SeatLoc, [rInc, cInc]: SeatLoc): SeatLoc | undefined => {
        let seatValue: string | undefined
        do {
          r += rInc
          c += cInc
          seatValue = seats[r]?.[c]
        } while (seatValue && seatValue !== 'L')
        return seatValue === 'L' ? [r, c] : undefined
      }
    for (let r = 0; r < seats.length; r++) {
      for (let c = 0; c < seats[0].length; c++) {
        if (seats[r][c] === 'L') {
          locations.push([r, c])
          map[r][c] = adjacencyIncrements.reduce((acc: SeatLoc[], [rInc, cInc]) => {
            const seat = nextVisibleSeat([r, c], [rInc, cInc])
            return acc.concat(seat ? [seat] : [])
          }, [])
        }
      }
    }
    return { locations, map }
  },
  updateSeats = (seats: string[][], { locations, map }: MemoizedSeats, crowdedCount: number) => {
    const seatsToFlip: [...SeatLoc, string][] = [],
      seatAt = (r: number, c: number) => (seats[r]?.[c] === '#' ? 1 : 0)

    for (const [r, c] of locations) {
      const crowdCount = sum(map[r][c].map(([nr, nc]) => seatAt(nr, nc)))
      if (seats[r][c] === '#' && crowdCount >= crowdedCount) {
        seatsToFlip.push([r, c, 'L'])
      } else if (seats[r][c] === 'L' && crowdCount === 0) {
        seatsToFlip.push([r, c, '#'])
      }
    }
    for (const [r, c, val] of seatsToFlip) {
      seats[r][c] = val
    }
    return Boolean(seatsToFlip.length)
  },
  findStableOccupancyCount = (
    seats: string[][],
    memoizedSeats: MemoizedSeats,
    crowdedCount: number
  ) => {
    while (updateSeats(seats, memoizedSeats, crowdedCount)) {}
    return sum(seats.map((row) => sum(row.map((seat) => (seat === '#' ? 1 : 0)))))
  }

export function solveA(input: string) {
  const seats = inputToSeats(input)
  return findStableOccupancyCount(seats, memoizeSeatAdjacency(seats), 4)
}

export function solveB(input: string) {
  const seats = inputToSeats(input)
  return findStableOccupancyCount(seats, memoizeSeatVisibility(seats), 5)
}
