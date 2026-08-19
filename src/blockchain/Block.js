import crypto from "crypto";

class Block {
    constructor(index, timestamp, transactions, previousHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        const data = `d${this.index}${this.timestamp}${JSON.stringify(this.transactions)}${this.previousHash}${this.nonce}`;
        return crypto.createHash("sha256").update(data).digest("hex");
    }
    mineBlock(difficulty) {
  const target = "0".repeat(difficulty);

  while (!this.hash.startsWith(target)) {
    this.nonce++;
    this.hash = this.calculateHash();
  }
}
}
export default Block;