const Blockchain = require('./blockchain');
const Transaction = require('./transaction');
const Wallet = require('./wallet');

const myBlockchain = new Blockchain();
console.log('Is blockchain valid?', myBlockchain.isChainValid());

// charity wallet
const charity = new Wallet();

// Initial wallets
const wallets = [];
for (let i = 0; i < 4; i++) {
  wallets.push(new Wallet());
}

const newBlock = () => {
  const transactions = [];
  const transactionCount = Math.floor(Math.random() * 10 + 1);
  for (let i = 0; i < transactionCount; i++) {
    const tx = new Transaction(
      wallets[Math.floor(Math.random() * wallets.length)].publicKey,
      charity.publicKey,
      Math.floor(Math.random() * 100)
    );
    tx.signTransaction(wallets[Math.floor(Math.random() * wallets.length)]);
    transactions.push(tx);
  }

  transactions.forEach((tx) => myBlockchain.addTransaction(tx));
  myBlockchain.minePendingTransactions(
    wallets[Math.floor(Math.random() * wallets.length)].publicKey
  );

  console.log(`Mined ${transactions.length} transactions...`);
  transactions.forEach((tx) => {
    console.log(
      `Transaction ${tx.sender.substring(0, 9)}... sent ${tx.amount} to ${tx.recipient.substring(
        0,
        9
      )}... with signature ${tx.signature.substring(0, 9)}...`
    );
  });
  console.log(`Balance of charity wallet: ${myBlockchain.getBalanceOfAddress(charity.publicKey)}`);
};

// Genesis block
newBlock();
// every 9 seconds, create a new block
setInterval(() => {
  newBlock();
}, 3000);

// console.log(`Balance of wallet1: ${myBlockchain.getBalanceOfAddress(wallet1.publicKey)}`);
// console.log(`Balance of wallet2: ${myBlockchain.getBalanceOfAddress(wallet2.publicKey)}`);
