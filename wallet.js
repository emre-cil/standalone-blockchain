const { ec: EC } = require("elliptic");
const cryptoHash = require("./cryptoHash");

const ecInstance = new EC("secp256k1");

class Wallet {
  constructor() {
    this.keyPair = ecInstance.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode("hex");
  }

  sign(data) {
    const hash = cryptoHash(data);
    const signature = this.keyPair.sign(hash);
    return signature.toDER("hex");
  }
}

module.exports = Wallet;
