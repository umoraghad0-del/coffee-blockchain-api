import { describe, it, expect } from "vitest";
import Blockchain from "../src/blockchain/Blockchain.js";

describe("Blockchain", () => {
  it("should initialize with a genesis block and no pending transactions", () => {
    const blockchain = new Blockchain();

    expect(blockchain.chain).toHaveLength(1);
    expect(blockchain.pendingTransactions).toEqual([]);
  });
});