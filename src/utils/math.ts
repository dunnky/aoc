export const sum = (input: number[]) => input.reduce((acc, curr) => acc + curr, 0),
  sumBigInt = (input: bigint[]) => input.reduce((acc, curr) => acc + curr, 0n),
  product = (input: number[]) => input.reduce((acc, curr) => acc * curr, 1),
  xor = (a: boolean, b: boolean) => Boolean(+a ^ +b),
  gcd = (a: number, b: number): number => {
    let t = 0
    a < b && ((t = b), (b = a), (a = t)) // swap them if a < b
    t = a % b
    return t ? gcd(b, t) : b
  },
  lcm = (a: number, b: number) => {
    return (a / gcd(a, b)) * b
  }
