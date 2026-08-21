import express from "express";
import Blockchain from "./blockchain/Blockchain.js";

const app = express();
app.use(express.json());
const blockchain = new Blockchain();
app.get("/blockchain", (req, res) => {
  res.status(200).json(blockchain);
});
app.post("/transactions", (req, res) => {
  blockchain.addTransaction(req.body);

  res.status(201).json(req.body);
});
app.post("/mine", (req, res) => {
  const newBlock = blockchain.minePendingTransactions();
  res.status(201).json(newBlock);
  
});


export default app;