import { expect } from "chai";
import env from "../src/environment";
import { AuthDB } from "../src/database/authorization";

describe("Authorization database", () => {
  it("initializes properly", (done) => {
    let db = new AuthDB("auth_test");

    db.db.all("select name from sqlite_master where type='table'", (err, tables) => {
      expect(tables[0]["name"]).to.eq("authorization");
      done();
    });
  })
})