import { prompt } from '../utils'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { resolve } from 'path'

const specTemplate = (day: string) => `import { read } from '.'
import { solveA, solveB } from './${day}'

describe('Day ${day}', () => {
  describe('Part 1', () => {
    it('Example 1', () => {
      expect(solveA(read('example1.txt'))).toBe(0)
    })
    it('Solution', () => {
      expect(solveA(read())).toBe(0)
    })
  })
  describe('Part 2', () => {
    it('Example 1', () => {
      expect(solveB(read('example1.txt'))).toBe(0)
    })
    it('Solution', () => {
      expect(solveB(read())).toBe(0)
    })
  })
})
`,
  solutionTemplate = () => `
const parseInput = (input: string) => {
  return input.split('\\n')
}

export function solveA(input: string) {
  const parsed = parseInput(input)
  return
}

export function solveB(input: string) {
  const parsed = parseInput(input)
  return
}
`,
  indexTemplate = (year: string, day: string) => `import { reader } from '@utils'
export const read = reader(${+year}, ${+day})
`

;(async () => {
  const defaultYear = '2020',
    year = (await prompt(`Year (${defaultYear}): `)) || defaultYear,
    day = await prompt('Day: '),
    paddedDay = day.length === 1 ? '0' + day : day,
    dirPath = resolve('src', year, `day${paddedDay}`),
    fixturePath = dirPath + '/fixtures'

  if (existsSync(dirPath)) {
    console.log('Error: Found existing directory at', dirPath)
    return
  }

  mkdirSync(dirPath)
  mkdirSync(fixturePath)

  writeFileSync(`${dirPath}/index.ts`, indexTemplate(year, day))
  writeFileSync(`${dirPath}/${paddedDay}.ts`, solutionTemplate())
  writeFileSync(`${dirPath}/${paddedDay}.spec.ts`, specTemplate(paddedDay))
  writeFileSync(fixturePath + '/example1.txt', '')
  writeFileSync(fixturePath + '/input.txt', '')

  console.log(`\nGood luck on Day ${day}!`)
})()
