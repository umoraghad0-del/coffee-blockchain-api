import { describe, it, expect } from "vitest";
import Block from "../src/blockchain/Block.js";

describe("Block", () => {
  it("should generate a SHA-256 hash", () => {
    const block = new Block(
      1,
      "2026-08-19",
      [],
      "previous-hash"
    );

    const hash = block.calculateHash();

    expect(hash).toHaveLength(64);
  });
});