import { readFileSync } from 'fs'
import { createInterface } from 'readline'

export const reader = (year: number, day: number) => {
  return (filename = 'input.txt') =>
    readFileSync(`src/${year}/day${day < 10 ? '0' + day : day}/fixtures/${filename}`, 'utf8').trim()
}

export const prompt = async (label: string) => {
  const prompt = createInterface({
      input: process.stdin,
      output: process.stdout,
    }),
    answer = await new Promise<string>((resolve) => {
      prompt.question(label, resolve)
    })
  prompt.close()
  return answer
}
export const times = <T>(count: number, producer: () => T): T[] => {
  return Array.from(new Array(count), () => producer())
}
export const range = (count: number) => Array.from(new Array(count), (_, i) => i)

export const padLeft = (value: string, desiredLength: number, filler = ' ') => {
  while (value.length < desiredLength) {
    value = filler + value
  }

  return value.substr(0, desiredLength)
}
