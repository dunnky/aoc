import { product } from '@utils'

const inputToNumbers = (input: string) => input.split('\n').map(Number),
  inputToJolts = (input: string) => {
    const numbers = inputToNumbers(input)
    numbers.sort((a, b) => a - b)
    numbers.unshift(0)
    numbers.push(numbers[numbers.length - 1] + 3)
    return numbers
  }

export function solveA(input: string) {
  const jolts = inputToJolts(input)
  return product(
    jolts.slice(0, jolts.length - 1).reduce(
      ([oneJolt, threeJolt], jolt, i) => {
        const diff = jolts[i + 1] - jolt
        if (diff === 1) {
          return [oneJolt + 1, threeJolt]
        } else if (diff === 3) {
          return [oneJolt, threeJolt + 1]
        }
        return [oneJolt, threeJolt]
      },
      [0, 0]
    )
  )
}

const validAdaptersForJolt = (baseJolt: number, jolts: number[]) => {
    const allJolts: number[] = []
    for (const jolt of jolts) {
      if (jolt - baseJolt <= 3) {
        allJolts.push(jolt)
      } else {
        break
      }
    }
    return allJolts
  },
  joltsToAdapterMap = (jolts: number[]) => {
    return jolts.slice(0, jolts.length - 1).reduce((map: { [key: number]: number[] }, jolt, i) => {
      map[jolt] = validAdaptersForJolt(jolt, jolts.slice(i + 1))
      return map
    }, {})
  },
  joltsToPathCountMap = (jolts: number[]) => {
    const adapterMap = joltsToAdapterMap(jolts),
      pathCountMap = { [jolts[jolts.length - 1]]: 1 },
      countTerminatingPathsFromKey = (key: number): number => {
        if (pathCountMap[key]) {
          return pathCountMap[key]
        }
        return adapterMap[key].reduce((acc, key) => {
          return acc + countTerminatingPathsFromKey(key)
        }, 0)
      }
    for (const jolt of jolts.reverse()) {
      pathCountMap[jolt] = countTerminatingPathsFromKey(jolt)
    }
    return pathCountMap
  }
export function solveB(input: string) {
  const jolts = inputToJolts(input),
    pathCountMap = joltsToPathCountMap(jolts)
  return pathCountMap[0]
}
