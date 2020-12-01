import { readFileSync } from 'fs'

export const reader = (year: number, day: number) => {
  return (filename = 'input.txt') =>
    readFileSync(`src/${year}/day${day < 10 ? '0' + day : day}/fixtures/${filename}`, 'utf8').trim()
}
