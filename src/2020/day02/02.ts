import { xor } from '@utils'

interface PasswordDetail {
  params: [number, number]
  character: string
  password: string
}

const inputToDetails = (input: string): PasswordDetail[] => {
  return input.split('\n').map((line) => {
    const [rawRange, rawCharacter, password] = line.split(' '),
      [paramA, paramB] = rawRange.split('-').map(Number),
      character = rawCharacter.replace(':', '')
    return { params: [paramA, paramB], character, password }
  })
}

export function solveA(input: string) {
  return inputToDetails(input).filter(
    ({ params: [min, max], character, password: [...characters] }) => {
      const { length: matchCount } = characters.filter((x) => x === character)
      return matchCount >= min && matchCount <= max
    }
  ).length
}

export function solveB(input: string) {
  return inputToDetails(input).filter(
    ({ params: [i, j], character, password: [...characters] }) => {
      return xor(characters[i - 1] === character, characters[j - 1] === character)
    }
  ).length
}
