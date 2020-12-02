interface PasswordDetail {
  paramA: number
  paramB: number
  character: string
  password: string
}

const inputToDetails = (input: string): PasswordDetail[] => {
  const lines = input.split('\n')
  return lines.reduce((acc: PasswordDetail[], line) => {
    const [rawRange, rawCharacter, password] = line.split(' '),
      [paramA, paramB] = rawRange.split('-').map(Number),
      character = rawCharacter.replace(':', '')
    acc.push({ paramA, paramB, character, password })
    return acc
  }, [])
}

export function solveA(input: string) {
  return inputToDetails(input).reduce((acc, { paramA, paramB, character, password }) => {
    const characterCount = password.split('').filter((x) => x === character).length,
      isAdmissible = characterCount >= paramA && characterCount <= paramB
    return isAdmissible ? acc + 1 : acc
  }, 0)
}

export function solveB(input: string) {
  return inputToDetails(input).reduce((acc, { paramA, paramB, character, password }) => {
    const characters = password.split(''),
      inFirstIndex = characters[paramA - 1] === character,
      inSecondIndex = characters[paramB - 1] === character,
      isAdmissible = (inFirstIndex && !inSecondIndex) || (inSecondIndex && !inFirstIndex)
    return isAdmissible ? acc + 1 : acc
  }, 0)
}
