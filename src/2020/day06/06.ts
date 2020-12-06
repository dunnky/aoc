import { sum } from '@utils'

export function solveA(input: string) {
  const anyoneGroups = input.split('\n\n').map((groupBlock) => {
    return new Set([...groupBlock.replace(/\n/g, '')])
  })
  return sum(anyoneGroups.map((group) => group.size))
}

export function solveB(input: string) {
  const everyoneGroups = input.split('\n\n').map((groupBlock) => {
    const people = groupBlock.split('\n'),
      yesMap = people.reduce((acc: { [key: string]: number }, [...answers]) => {
        answers.forEach((key) => (acc[key] = (acc[key] || 0) + 1))
        return acc
      }, {})
    return Object.entries(yesMap).reduce((acc: string[], [key, value]) => {
      return value === people.length ? [...acc, key] : acc
    }, [])
  })
  return sum(everyoneGroups.map((group) => group.length))
}
