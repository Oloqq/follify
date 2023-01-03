import { Moment } from "moment";

export function splitArray<T>(arr: T[], chunkSize: number): T[][] {
  let res: T[][] = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
      res.push(arr.slice(i, i + chunkSize));
  }
  return res;
}

export class SpotiDate {
  value: string;

  constructor(val: string) {
    let regex = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/g
    if (!regex.test(val)) {
      throw new Error(`date not in spotifyish format of YYYY-MM-DD: (${val})`);
    }
    this.value = val;
  }

  toString(): string {
    return this.value;
  }

  static fromMoment(mom: Moment) {
    return new SpotiDate(mom.format("YYYY-MM-DD"));
  }

  static fromDate(date: Date): SpotiDate {
    return new SpotiDate(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()}`);
  }
}

export class DateSpan {
  min: SpotiDate;
  max: SpotiDate;

  constructor (min: SpotiDate|string, max: SpotiDate|string) {
    this.min = (min instanceof SpotiDate) ? min : new SpotiDate(min);
    this.max = (max instanceof SpotiDate) ? max : new SpotiDate(max);
  }

  contains(date: SpotiDate): boolean {
    return date.toString() >= this.min.toString() && date.toString() <= this.max.toString();
  }

  toString(): string {
    return `${this.min}/${this.max}`;
  }
}