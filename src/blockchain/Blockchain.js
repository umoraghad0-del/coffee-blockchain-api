import Block from "./Block.js";

class Blockchain {
  constructor() {
      this.chain = [this.createGenesisBlock()];
  this.pendingTransactions = [];

  }
  createGenesisBlock() {
    return new Block(0, Date.now(),[],"0"
);
}
addTransaction(transaction) {
  this.pendingTransactions.push(transaction);
}
minePendingTransactions() {
  const newBlock = new Block(
    this.chain.length,
    Date.now(),
    this.pendingTransactions,
    this.chain[this.chain.length - 1].hash
  );
  newBlock.mineBlock(2);
  this.chain.push(newBlock);
  this.pendingTransactions = [];
}
isChainValid() {
  for (let i = 1; i < this.chain.length; i++) {
    const currentBlock = this.chain[i];
    const previousBlock = this.chain[i - 1];

    if (currentBlock.hash !== currentBlock.calculateHash()) {
      return false;
    }

    if (currentBlock.previousHash !== previousBlock.hash) {
      return false;
    }
  }

  return true;
}
}


export default Blockchain;