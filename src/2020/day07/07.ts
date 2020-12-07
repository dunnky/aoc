import { sum } from '@utils'

type BagMap = { [key: string]: { [key: string]: number } }

const inputToBagMap = (input: string) => {
    return input.split('\n').reduce((acc: BagMap, line) => {
      const [containerKey, rawContents] = line
          .replace(/(bag)(s)?(\s|,|\.)*/g, '')
          .trim()
          .split(' contain '),
        contents = rawContents.split(' ')

      if (contents[0] === 'no') {
        acc[containerKey] = {}
      } else {
        const contentsMap: { [key: string]: number } = {}
        while (contents.length) {
          const [contentCount, ...contentKeyParts] = contents.splice(0, 3)
          contentsMap[contentKeyParts.join(' ')] = +contentCount
        }
        acc[containerKey] = contentsMap
      }
      return acc
    }, {})
  },
  expandBagMap = (bagMap: BagMap) => {
    const expandedBagMap: { [key: string]: string[] } = {},
      allColorsInColor = (containerKey: string): string[] => {
        return (
          expandedBagMap[containerKey] ||
          Object.keys(bagMap[containerKey]).reduce((acc: string[], key) => {
            acc.push(key, ...allColorsInColor(key))
            return acc
          }, [])
        )
      }

    for (const key of Object.keys(bagMap)) {
      expandedBagMap[key] = allColorsInColor(key)
    }
    return expandedBagMap
  },
  countBagsInColor = (bagMap: BagMap, containerKey: string): number => {
    return Object.entries(bagMap[containerKey]).reduce((count, [contentKey, contentQty]) => {
      return count + (contentQty + contentQty * countBagsInColor(bagMap, contentKey))
    }, 0)
  }

export function solveA(input: string) {
  const bagMap = inputToBagMap(input),
    expandedBagMap = expandBagMap(bagMap)
  return sum(Object.values(expandedBagMap).map((keys) => (keys.includes('shiny gold') ? 1 : 0)))
}

export function solveB(input: string) {
  const bagMap = inputToBagMap(input)
  return countBagsInColor(bagMap, 'shiny gold')
}
