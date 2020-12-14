import { padLeft, sum, sumBigInt } from '@utils'

const parseInput = (input: string) => {
  const parts = input.replace(/mask = /g, '\n').split('\n\n')

  return parts.map((partString) => {
    const [maskString, ...rawInstructions] = partString.trim().split('\n'),
      instructions = rawInstructions.map((raw) => {
        const [, location, value] = /mem\[([0-9]+)] = ([0-9]+)/.exec(raw) || []
        return { location, value }
      })
    return { maskString, instructions }
  })
}

export function solveA(input: string) {
  const parts = parseInput(input),
    mem: { [key: number]: bigint } = {}
  for (const { maskString, instructions } of parts) {
    const maskOr = BigInt(('0b' + maskString).replace(/X/g, '0')),
      maskAnd = BigInt(('0b' + maskString).replace(/X/g, '1'))
    for (const { location, value } of instructions) {
      mem[+location] = (BigInt(value) | maskOr) & maskAnd
    }
  }
  return sumBigInt(Object.values(mem)).toString()
}

export function solveB(input: string) {
  const parts = parseInput(input),
    mem: { [key: string]: number } = {}
  for (const { maskString, instructions } of parts) {
    const maskOr = BigInt(('0b' + maskString).replace(/X/g, '0')),
      xIndices = [...maskString].reduce((acc: number[], char, i) => {
        if (char === 'X') acc.push(i)
        return acc
      }, [])

    for (const { location, value } of instructions) {
      const maskedLocation = BigInt(location) | maskOr
      for (let number = 0; number <= Math.pow(2, xIndices.length); number++) {
        const locationChars = [...padLeft(maskedLocation.toString(2), maskString.length, '0')],
          xReplacementChars = padLeft(number.toString(2), xIndices.length, '0')
        for (let xi = 0; xi < xIndices.length; xi++) {
          locationChars[xIndices[xi]] = xReplacementChars[xi]
        }
        mem[locationChars.join('')] = +value
      }
    }
  }
  return sum(Object.values(mem))
}
