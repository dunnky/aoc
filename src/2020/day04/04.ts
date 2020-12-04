interface Passport {
  byr: string
  iyr: string
  eyr: string
  hgt: string
  hcl: string
  ecl: string
  pid: string
  cid: string
}
type MaybePassport = Partial<Passport>

const parsePassportLine = (line: string): MaybePassport => {
    return line
      .split(' ')
      .map((x) => x.split(':'))
      .reduce((acc: MaybePassport, [key, value]) => {
        return {
          ...acc,
          [key]: value,
        }
      }, {})
  },
  inputToPassports = (input: string): MaybePassport[] => {
    return input
      .split('\n\n')
      .map((x) => x.replace(/\n/g, ' '))
      .map(parsePassportLine)
  }

export function solveA(input: string) {
  const maybePassports = inputToPassports(input),
    requiredKeys: (keyof Passport)[] = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'],
    validPassports = maybePassports.filter((passport) =>
      requiredKeys.every((key) => Boolean(passport[key]))
    )
  return validPassports.length
}

const PassportValidator: { [P in keyof Passport]: (x: Passport[P]) => boolean } = {
  byr: (x) => +x >= 1920 && +x <= 2002,
  iyr: (x) => +x >= 2010 && +x <= 2020,
  eyr: (x) => +x >= 2020 && +x <= 2030,
  hgt: (x) => {
    const [, height, unit] = /^([0-9]*)(cm|in)$/i.exec(x) ?? []
    if (unit === 'cm') {
      return +height >= 150 && +height <= 193
    }
    if (unit === 'in') {
      return +height >= 59 && +height <= 76
    }
    return false
  },
  hcl: (x) => /^#[a-f0-9]{6}$/i.test(x),
  ecl: (x) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(x),
  pid: (x) => /^[0-9]{9}$/.test(x),
  cid: () => true,
}

export function solveB(input: string) {
  const maybePassports = inputToPassports(input),
    requiredKeys: (keyof Passport)[] = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'],
    validPassports = maybePassports.filter((passport) => {
      return requiredKeys.every((key) => {
        const value = passport[key]
        return value && PassportValidator[key]?.(value)
      })
    })
  return validPassports.length
}
