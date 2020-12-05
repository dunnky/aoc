const inputToSpaces = (input: string) => {
    return input.split('\n').map((line) => {
      const chars = [...line]
      return [chars.splice(0, 7), chars]
    })
  },
  searchLeft = ([min, max]: number[]) => {
    return [min, Math.round(max - (max - min) / 2)]
  },
  searchRight = ([min, max]: number[]) => {
    return [Math.round(min + (max - min) / 2), max]
  },
  searchSeat = ([rowSpaces, colSpaces]: [string[], string[]]) => {
    const [row] = rowSpaces.reduce(
        (acc: number[], space) => (space === 'F' ? searchLeft(acc) : searchRight(acc)),
        [0, 127]
      ),
      [col] = colSpaces.reduce(
        (acc: number[], space) => (space === 'L' ? searchLeft(acc) : searchRight(acc)),
        [0, 7]
      )
    return { row, col, id: row * 8 + col }
  }

export function solveA(input: string) {
  const spaces = inputToSpaces(input),
    seats = spaces.map(([rowSpaces, colSpaces]) => searchSeat([rowSpaces, colSpaces]))

  seats.sort((a, b) => b.id - a.id)
  return seats[0].id
}

export function solveB(input: string) {
  const spaces = inputToSpaces(input),
    seats = spaces.map(([rowSpaces, colSpaces]) => searchSeat([rowSpaces, colSpaces])),
    seatIds = seats.map(({ id }) => id)

  for (let r = 1; r < 127; r++) {
    for (let c = 0; c <= 7; c++) {
      if (!seats.find(({ row, col }) => row === r && col === c)) {
        const myId = r * 8 + c
        if (seatIds.includes(myId - 1) && seatIds.includes(myId + 1)) {
          return myId
        }
      }
    }
  }
}
