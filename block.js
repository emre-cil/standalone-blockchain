const crypto = require('crypto');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0; // For proof-of-work
  }

  calculateHash() {
    return crypto
      .createHash('sha256')
      .update(
        this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce
      )
      .digest('hex');
  }

  mineBlock(difficulty) {
    const target = Array(difficulty + 1).join('0'); // Create a string with difficulty number of leading zeros
    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log(this.index, 'Block mined:', this.hash);
  }
}

module.exports = Block;
