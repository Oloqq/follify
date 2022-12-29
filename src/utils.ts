export function splitArray<T>(arr: T[], chunkSize: number): T[][] {
  let res: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
      res.push(arr.slice(i, i + chunkSize));
  }
  return res;
}

export class DateSpan {
  min: Date;
  max: Date;

  constructor (min: Date, max: Date) {
    this.min = min;
    this.max = max;
  }

  contains(date: Date): boolean {
    return date >= this.min && date <= this.max;
  }

  static YMD(d: Date): string {
    return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
  }

  toString(): string {
    return `${DateSpan.YMD(this.min)}/${DateSpan.YMD(this.max)}`;
  }
}