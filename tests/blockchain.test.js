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
it("should return true for a valid blockchain", () => {
  const blockchain = new Blockchain();

  expect(blockchain.isChainValid()).toBe(true);
});
it("should mine pending transactions into a new block", () => {
  const blockchain = new Blockchain();

  blockchain.addTransaction({
    sender: "Farm",
    recipient: "Roastery",
    batchId: "BATCH-001",
    weightKg: 500
  });

  blockchain.minePendingTransactions();

  expect(blockchain.chain).toHaveLength(2);
  expect(blockchain.pendingTransactions).toHaveLength(0);
});
it("should use difficulty 1 in test environment", () => {
  const blockchain = new Blockchain();

  expect(blockchain.difficulty).toBe(1);
});
it("should return false when a block has been tampered with", () => {
  const blockchain = new Blockchain();

  blockchain.addTransaction({
    sender: "Farm A",
    recipient: "Roastery A",
    batchId: "BATCH-001",
    weightKg: 500
  });

  blockchain.minePendingTransactions();

  blockchain.chain[1].transactions[0].weightKg = 999;

  expect(blockchain.isChainValid()).toBe(false);
});
it("should return false when previousHash has been tampered with", () => {
  const blockchain = new Blockchain();

  blockchain.addTransaction({
    sender: "Farm A",
    recipient: "Roastery A",
    batchId: "BATCH-001",
    weightKg: 500
  });

  blockchain.minePendingTransactions();

  blockchain.chain[1].previousHash = "fake-hash";
    blockchain.chain[1].hash =
    blockchain.chain[1].calculateHash();

  expect(blockchain.isChainValid()).toBe(false);
});

});