import { expect } from "chai";
import { DateSpan } from "../src/utils";

describe("DateSpan", () => {
  it("contains boundary values", () => {
    const minDate = new Date(2022, 11, 1);
    const maxDate = new Date(2023, 2, 1);
    const period = new DateSpan(minDate, maxDate);
    expect(period.contains(new Date(2023, 1, 1))).true;
    expect(period.contains(new Date(2022, 11, 1))).true;
    expect(period.contains(new Date(2023, 2, 1))).true;
  })

  it("stringifies nicely", () => {
    const minDate = new Date(2022, 11, 1);
    const maxDate = new Date(2023, 2, 1);
    const period = new DateSpan(minDate, maxDate);
    expect(`${period}`).eq("2022-12-1/2023-3-1");
  })
});