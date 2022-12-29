import { expect } from "chai";
import { DateSpan, SpotiDate } from "../src/utils";

describe("SpotiDate", () => {
  it("accepts only correct format", () => {
    expect(() => new SpotiDate("2022-1-1")).throws();
    expect(() => new SpotiDate("2022-01-01")).not.throws();
    expect(() => new SpotiDate("2022-01-03")).not.throws();
  })
});

describe("DateSpan", () => {
  it("constructs from SpotiDates", () => {
    const period = new DateSpan(new SpotiDate("2022-01-01"), new SpotiDate("2022-01-01"));
  })

  it("constructs from strings", () => {
    const period = new DateSpan("2022-01-01", "2023-03-01");
  })

  it("contains boundary values", () => {
    const period = new DateSpan("2022-12-01", "2023-03-01");
    expect(period.contains(new SpotiDate("2023-01-01"))).true;
    expect(period.contains(new SpotiDate("2022-12-01"))).true;
    expect(period.contains(new SpotiDate("2023-02-01"))).true;
  })

  it("stringifies nicely", () => {
    const period = new DateSpan("2022-12-01", "2023-03-01");
    expect(`${period}`).eq("2022-12-01/2023-03-01");
  })
});