export const sum = (input?: number[]) => input?.reduce((acc, curr) => acc + curr, 0),
  product = (input?: number[]) => input?.reduce((acc, curr) => acc * curr, 1)
