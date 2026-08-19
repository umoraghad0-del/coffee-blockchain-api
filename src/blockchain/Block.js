import crypto from "crypto";

class Block {
    constructor(index, timestamp, transactions, previousHash) {
        this.index = index;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash;
    }

    calculateHash() {
        const data = `${this.index}${this.timestamp}${JSON.stringify(this.transactions)}${this.previousHash}`;
        return crypto.createHash("sha256").update(data).digest("hex");
    }
}
export default Block;