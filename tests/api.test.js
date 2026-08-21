import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/app.js";

describe("Blockchain API", () => {
  it("should return the blockchain", async () => {
    const response = await request(app).get("/blockchain");

    expect(response.status).toBe(200);
    expect(response.body.chain).toBeDefined();
  });
  it("should add a new transaction", async () => {
  const transaction = {
    sender: "Farm A",
    recipient: "Roastery A",
    batchId: "BATCH-001",
    weightKg: 500
  };

  const response = await request(app)
    .post("/transactions")
    .send(transaction);

  expect(response.status).toBe(201);
});
});