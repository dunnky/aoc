import { sum } from '@utils'

const inputToBagMap = (input: string) => {
    return input
      .split('\n')
      .reduce((acc: { [key: string]: { [key: string]: number } | null }, line) => {
        const [container, rawContents] = line
            .replace(/(bag)(s)?(\s|,|\.)*/g, '')
            .trim()
            .split(' contain '),
          contents = rawContents.split(' '),
          containerKey = container.replace(' ', '')

        if (contents[0] !== 'no') {
          const contentsMap: { [key: string]: number } = {}
          for (let i = 0; i < contents.length; i += 3) {
            contentsMap[contents[i + 1] + contents[i + 2]] = +contents[i]
          }
          acc[containerKey] = contentsMap
        } else {
          acc[containerKey] = null
        }
        return acc
      }, {})
  },
  expandBagMap = (
    bagMap: { [key: string]: { [key: string]: number } | null },
    containerKey: string
  ): string[] => {
    const containerContents = bagMap[containerKey]
    if (!containerContents) {
      return []
    }
    return Object.keys(containerContents).reduce((acc: string[], key) => {
      return [...acc, key, ...expandBagMap(bagMap, key)]
    }, [])
  },
  countBagsInColor = (
    bagMap: { [key: string]: { [key: string]: number } | null },
    containerKey: string
  ): number => {
    const containerContents = bagMap[containerKey]
    if (!containerContents) {
      return 0
    }
    return Object.entries(containerContents).reduce((count, [contentKey, contentQty]) => {
      return count + (contentQty + contentQty * countBagsInColor(bagMap, contentKey))
    }, 0)
  }

export function solveA(input: string) {
  const bagMap = inputToBagMap(input),
    expandedBagMap = Object.keys(bagMap).map((key) => expandBagMap(bagMap, key))
  return sum(Object.values(expandedBagMap).map((keys) => (keys.includes('shinygold') ? 1 : 0)))
}

export function solveB(input: string) {
  const bagMap = inputToBagMap(input)
  return countBagsInColor(bagMap, 'shinygold')
}
