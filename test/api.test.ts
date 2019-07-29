import request from "supertest";
import app from "../src/app";

describe("GET /v1/status", () => {
  it("should return 200 OK", () => {
    return request(app)
      .get("/v1/status")
      .expect(200);
  });
});
