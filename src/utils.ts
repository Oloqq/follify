export function splitArray<T>(arr: T[], chunkSize: number): T[][] {
  let res: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
      res.push(arr.slice(i, i + chunkSize));
  }
  return res;
}