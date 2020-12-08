type NotIntCode = [string, number][]

const inputToNotIntCode = (input: string): NotIntCode => {
    return input.split('\n').map((x) => {
      const [op, param] = x.split(' ')
      return [op, +param]
    })
  },
  runNotIntCode = (notIntCode: NotIntCode) => {
    let offset = 0,
      acc = 0
    const history = new Set<number>()
    while (offset !== notIntCode.length) {
      if (history.has(offset)) {
        return { ok: false, acc }
      }
      history.add(offset)
      const [op, param] = notIntCode[offset]
      switch (op) {
        case 'acc':
          acc += param
          break
        case 'jmp':
          offset += param - 1
          break
      }
      offset++
    }
    return { ok: true, acc }
  }

export function solveA(input: string) {
  return runNotIntCode(inputToNotIntCode(input)).acc
}

export function solveB(input: string) {
  const sourceNotIntCode = inputToNotIntCode(input)
  for (let index = 0; index < sourceNotIntCode.length; index++) {
    const [opAtIndex, paramAtIndex] = sourceNotIntCode[index]
    if (['nop', 'jmp'].includes(opAtIndex)) {
      const notIntCode = [...sourceNotIntCode]
      notIntCode.splice(index, 1, [opAtIndex === 'nop' ? 'jmp' : 'nop', paramAtIndex])
      const { ok, acc } = runNotIntCode(notIntCode)
      if (ok) {
        return acc
      }
    }
  }
}
