# Coffee Blockchain API

## About the Project

Coffee Blockchain API is a Node.js and Express backend project that demonstrates how blockchain technology can be used to track coffee transactions.

The project uses SHA-256 hashing, Proof of Work, block validation, and transaction handling to create a simple blockchain.

The API allows users to view the blockchain, add coffee transactions, and mine pending transactions into new blocks.

## Technologies

The project is built with:

- Node.js
- JavaScript
- Express
- Node.js Crypto module
- Vitest
- Supertest
- Git and GitHub

## Blockchain Structure

Each block contains information such as:

- `index` – the position of the block in the blockchain
- `timestamp` – when the block was created
- `transactions` – the coffee transactions stored in the block
- `previousHash` – the hash of the previous block
- `nonce` – a value changed during Proof of Work
- `hash` – the SHA-256 hash of the block

The `previousHash` connects each block to the block before it and creates the blockchain structure.

## Coffee Transaction

A coffee transaction contains:

```json
{
  "sender": "Farm A",
  "recipient": "Roastery A",
  "batchId": "BATCH-001",
  "weightKg": 500
}
```

The API validates transactions before they are added to the list of pending transactions.

The required fields are:

- `sender`
- `recipient`
- `batchId`
- `weightKg`

If a required field is missing, the API responds with HTTP status `400 Bad Request`.

## SHA-256 Hashing

The project uses the built-in Node.js `crypto` module to generate SHA-256 hashes.

The hash is calculated using information from the block, including the transactions and the previous block hash.

If data inside a block is changed after the block has been created, the calculated hash will no longer match the stored hash. This can be detected by blockchain validation.

## Proof of Work

The project contains a simple Proof of Work implementation.

During mining, the `nonce` is changed until the block produces a hash that satisfies the configured difficulty.

For example, with difficulty 2, the hash must begin with:

```text
00
```

A lower difficulty is used in the test environment to keep automated tests fast.

- Test environment: difficulty `1`
- Other environments: difficulty `2`

## API Endpoints

### GET /blockchain

Returns the current blockchain, including the chain and pending transactions.

Example:

```http
GET /blockchain
```

Successful response:

```text
200 OK
```

### POST /transactions

Adds a new coffee transaction to the pending transactions.

Example request body:

```json
{
  "sender": "Farm A",
  "recipient": "Roastery A",
  "batchId": "BATCH-001",
  "weightKg": 500
}
```

Successful response:

```text
201 Created
```

If required transaction data is missing:

```text
400 Bad Request
```

### POST /mine

Mines the pending transactions into a new block.

Example:

```http
POST /mine
```

The endpoint performs Proof of Work, adds the new block to the blockchain, clears the pending transactions, and returns the newly mined block.

Successful response:

```text
201 Created
```

## Input Validation

The project uses Express middleware to validate incoming coffee transactions.

The middleware runs before the transaction route handler.

The flow is:

```text
POST /transactions
        |
        v
validateTransaction middleware
        |
        +-- Invalid --> 400 Bad Request
        |
        +-- Valid --> next()
                        |
                        v
                addTransaction()
                        |
                        v
                   201 Created
```

This prevents incomplete transactions from being added to the blockchain.

## Testing

The project uses:

- **Vitest** for unit testing
- **Supertest** for API integration testing
- **V8 coverage** for measuring test coverage

The tests cover functionality such as:

- SHA-256 block hashing
- Proof of Work mining
- Genesis block creation
- Pending transactions
- Blockchain validation
- Mining pending transactions
- Test environment difficulty
- GET `/blockchain`
- POST `/transactions`
- POST `/mine`
- Transaction validation
- Detection of tampered block data
- Detection of an invalid `previousHash`

Run the tests with:

```bash
npm test
```

## Test Coverage

Coverage can be checked with:

```bash
npm run coverage
```

The project currently has:

```text
Statements: 100%
Branches:    83.33%
Functions:   100%
Lines:       100%
```

This gives more than 80% overall test coverage.

## Test-Driven Development (TDD)

The project was developed using Test-Driven Development.

The main workflow was:

```text
1. Write a test
2. Run the test
3. RED - test fails
4. Commit the failing test
5. Implement the functionality
6. Run the test again
7. GREEN - test passes
8. Commit the implementation
```

This creates a Git history that demonstrates the RED → GREEN development process.

Examples of functionality developed with TDD include:

- Block hashing
- Proof of Work
- Blockchain initialization
- Pending transactions
- Chain validation
- Mining pending transactions
- Express API endpoints
- Transaction validation

## TDD Commit Examples

The project contains separate RED and GREEN commits that demonstrate the TDD workflow.

### 1. Block Hashing

- 🔴 RED – [Failing block hash test](https://github.com/umoraghad0-del/coffee-blockchain-api/commit/9a1ae8a)
- 🟢 GREEN – [Implement block hashing](https://github.com/umoraghad0-del/coffee-blockchain-api/commit/3779ec8)

### 2. Proof of Work

- 🔴 RED – [Failing mining difficulty test](https://github.com/umoraghad0-del/coffee-blockchain-api/commit/042f7df)
- 🟢 GREEN – [Implement Proof of Work mining](https://github.com/umoraghad0-del/coffee-blockchain-api/commit/21d0292)

### 3. Chain Validation

- 🔴 RED – [Failing chain validation test](https://github.com/umoraghad0-del/coffee-blockchain-api/commit/c2601c0)
- 🟢 GREEN – [Implement chain validation](https://github.com/umoraghad0-del/coffee-blockchain-api/commit/032c1a2)

These commits show the RED → GREEN process used during development. The failing test was committed first, followed by the implementation that made the test pass.
## Tampering Detection

The blockchain contains validation logic that can detect changes to previously mined block data.

For example, if a coffee transaction is mined with:

```text
weightKg: 500
```

and the stored transaction is later changed to:

```text
weightKg: 999
```

the block data no longer matches its original hash.

The `isChainValid()` method detects this and returns `false`.

The blockchain also checks that each block's `previousHash` matches the hash of the previous block.

## Installation

Clone the repository:

```bash
git clone https://github.com/umoraghad0-del/coffee-blockchain-api.git
```

Enter the project folder:

```bash
cd coffee-blockchain-api
```

Install dependencies:

```bash
npm install
```

## Running Tests

Run Vitest:

```bash
npm test
```

Run the test coverage report:

```bash
npm run coverage
```

## Project Structure

```text
coffee-blockchain-api/
|
├── src/
│   ├── app.js
│   |
│   ├── blockchain/
│   │   ├── Block.js
│   │   └── Blockchain.js
│   |
│   └── middleware/
│       └── validateTransaction.js
│
├── tests/
│   ├── block.test.js
│   ├── blockchain.test.js
│   └── api.test.js
│
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```

## What I Learned

Through this project I practiced:

- Building a backend API with Node.js and Express
- Creating blocks and a blockchain in JavaScript
- SHA-256 hashing
- Proof of Work and nonce
- Blockchain validation
- Working with pending transactions
- Creating REST API endpoints
- Express middleware and input validation
- Unit testing with Vitest
- Integration testing with Supertest
- Measuring code coverage
- Test-Driven Development
- Git commits and GitHub workflow

## Author

Najma Hasan