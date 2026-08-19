import { describe, it, expect } from "vitest";
import Blockchain from "../src/blockchain/Blockchain.js";

describe("Blockchain", () => {
  it("should initialize with a genesis block and no pending transactions", () => {
    const blockchain = new Blockchain();
    expect(blockchain.chain).toHaveLength(1);
    expect(blockchain.pendingTransactions).toEqual([]);
  });

  it("should add a transaction to pending transactions", () => {
    const blockchain = new Blockchain();
    const transaction = {sender: "Farm A",recipient: "Roastery B",batchId: "BATCH-001",weightKg: 500
    };
  blockchain.addTransaction(transaction);

  expect(blockchain.pendingTransactions).toHaveLength(1);
  expect(blockchain.pendingTransactions[0]).toEqual(transaction);
});
});