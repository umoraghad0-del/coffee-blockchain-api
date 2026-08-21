import express from "express";
import Blockchain from "./blockchain/Blockchain.js";

const app = express();
const blockchain = new Blockchain();
app.get("/blockchain", (req, res) => {
  res.status(200).json(blockchain);
});
export default app;