const cryptoHash = require('./cryptoHash');

class Transaction {
  constructor(sender, recipient, amount) {
    this.sender = sender;
    this.recipient = recipient;
    this.amount = amount;
    this.timestamp = Date.now();
    this.signature = '';
  }

  calculateHash() {
    return cryptoHash(this.sender + this.recipient + this.amount + this.timestamp);
  }

  signTransaction(wallet) {
    const data = this.calculateHash();
    this.signature = wallet.sign(data);
  }

  isValid() {
    if (this.sender === null) {
      return true; // Genesis transaction
    }

    if (!this.signature || this.signature.length === 0) {
      throw new Error('No signature found for this transaction');
    }

    const publicKey = ec.keyFromPublic(this.sender, 'hex');
    return publicKey.verify(this.calculateHash(), this.signature);
  }
}

module.exports = Transaction;