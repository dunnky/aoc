export const sum = (input: number[]) => input.reduce((acc, curr) => acc + curr, 0),
  sumBigInt = (input: bigint[]) => input.reduce((acc, curr) => acc + curr, 0n),
  product = (input?: number[]) => input?.reduce((acc, curr) => acc * curr, 1),
  xor = (a: boolean, b: boolean) => Boolean(+a ^ +b)
