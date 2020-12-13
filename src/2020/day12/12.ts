import { sum } from '@utils'

const inputToDirections = (input: string) => {
    return input.split('\n').map((line) => {
      const [, action, count] = /([A-Z])([0-9]*)/.exec(line) || []
      return { action, count: +count }
    })
  },
  cardinalVectors: { [key: string]: [number, number] } = {
    N: [0, 1],
    E: [1, 0],
    S: [0, -1],
    W: [-1, 0],
  },
  addVectorToPosition = (
    originPosition: [number, number],
    vecD: [number, number],
    vecM: number
  ) => {
    originPosition[0] += vecD[0] * vecM
    originPosition[1] += vecD[1] * vecM
  },
  normalizeCyclical = (raw: number, max: number) => {
    return ((raw % max) + max) % max
  }

export function solveA(input: string) {
  const directions = inputToDirections(input),
    position: [number, number] = [0, 0],
    forwardCardinality = ['E', 'S', 'W', 'N']

  let forwardCardinalityIndex = 0
  for (const { action, count } of directions) {
    switch (action) {
      case 'N':
      case 'E':
      case 'S':
      case 'W':
        addVectorToPosition(position, cardinalVectors[action], count)
        break
      case 'R':
        forwardCardinalityIndex = normalizeCyclical(forwardCardinalityIndex + count / 90, 4)
        break
      case 'L':
        forwardCardinalityIndex = normalizeCyclical(forwardCardinalityIndex - count / 90, 4)
        break
      case 'F':
        addVectorToPosition(
          position,
          cardinalVectors[forwardCardinality[forwardCardinalityIndex]],
          count
        )
        break
    }
  }

  return sum(position.map((x) => Math.abs(x)))
}

export function solveB(input: string) {
  const directions = inputToDirections(input),
    position: [number, number] = [0, 0],
    offset: [number, number] = [10, 1],
    rotatePosition = (_position: [number, number], rawDegrees: number) => {
      const degrees = normalizeCyclical(rawDegrees, 360),
        rotate90 = () => {
          const temp = _position[0]
          _position[0] = _position[1]
          _position[1] = -temp
        }
      if (degrees >= 90) {
        rotate90()
      }
      if (degrees >= 180) {
        rotate90()
      }
      if (degrees >= 270) {
        rotate90()
      }
    }

  for (const { action, count } of directions) {
    switch (action) {
      case 'N':
      case 'E':
      case 'S':
      case 'W':
        addVectorToPosition(offset, cardinalVectors[action], count)
        break
      case 'R':
        rotatePosition(offset, count)
        break
      case 'L':
        rotatePosition(offset, -count)
        break
      case 'F':
        addVectorToPosition(position, offset, count)
        break
    }
  }

  return sum(position.map((x) => Math.abs(x)))
}
